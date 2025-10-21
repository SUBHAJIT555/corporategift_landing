import { fetcher } from "../lib/fetcher";

export interface ApiProduct {
  id: number | string;
  name: string;
  image: string;
  category?: string;
  categories?: number[];
  rating?: number;
  reviewCount?: number;
  description?: string;
}

export interface ApiCategory {
  id: number;
  name: string;
  slug: string;
}

// SWR fetcher functions
// const fetcher = async (url: string): Promise<unknown> => {
//   const response = await fetch(url, {
//     headers: { Accept: "application/json" },
//   });
//   if (!response.ok) {
//     throw new Error(`Failed to fetch: ${response.status}`);
//   }
//   return response.json();
// };

// SWR fetcher functions for caching
export const fetchRandomProductsSWR = async (): Promise<ApiProduct[]> => {
  const data = await fetcher(
    "https://corporategiftsdubaii.ae/wp-json/custom/v1/random-products"
  );
  if (!Array.isArray(data)) return [];
  const getString = (v: unknown, fallback = ""): string =>
    typeof v === "string" && v.length > 0 ? v : fallback;
  const getNumber = (v: unknown, fallback = 0): number => {
    const n = typeof v === "number" ? v : Number(v);
    return Number.isFinite(n) ? n : fallback;
  };
  return data.map((p: unknown) => {
    const obj = (p ?? {}) as Record<string, unknown>;
    return {
      id:
        (obj["id"] as number | string | undefined) ??
        (obj["ID"] as number | string | undefined) ??
        Math.random(),
      name: getString(obj["name"] ?? obj["title"], "Product"),
      image: getString(
        obj["image"] ?? obj["thumbnail"] ?? obj["img"],
        "/api/placeholder/300/300"
      ),
      category: getString(obj["category"] ?? obj["cat"], "Other"),
      categories: Array.isArray(obj["categories"])
        ? (obj["categories"] as number[])
        : undefined,
      rating: getNumber(obj["rating"], 5),
      reviewCount: getNumber(obj["reviewCount"] ?? obj["reviews"], 0),
      description:
        getString(obj["description"] ?? obj["desc"], "") || undefined,
    } satisfies ApiProduct;
  });
};

export const fetchCategoriesSWR = async (): Promise<ApiCategory[]> => {
  const data = await fetcher(
    "https://corporategiftsdubaii.ae/wp-json/custom/v1/product-categories"
  );

  if (!Array.isArray(data)) return [];
  return data.map((c: unknown) => {
    const obj = (c ?? {}) as Record<string, unknown>;
    return {
      id: Number(obj["id"] ?? 0),
      name: String(obj["name"] ?? ""),
      slug: String(obj["slug"] ?? ""),
    } satisfies ApiCategory;
  });
};

export const fetchProductsByCategorySWR = async (
  categoryId: number
): Promise<ApiProduct[]> => {
  const data = await fetcher(
    `https://corporategiftsdubaii.ae/wp-json/custom/v1/products-by-category?category_id=${categoryId}`
  );
  if (!Array.isArray(data)) return [];
  const getString = (v: unknown, fallback = ""): string =>
    typeof v === "string" && v.length > 0 ? v : fallback;
  const getNumber = (v: unknown, fallback = 0): number => {
    const n = typeof v === "number" ? v : Number(v);
    return Number.isFinite(n) ? n : fallback;
  };
  return data.map((p: unknown) => {
    const obj = (p ?? {}) as Record<string, unknown>;
    return {
      id: (obj["id"] as number | string | undefined) ?? Math.random(),
      name: getString(obj["name"] ?? obj["title"], "Product"),
      image: getString(
        obj["image"] ?? obj["thumbnail"] ?? obj["img"],
        "/api/placeholder/300/300"
      ),
      category: getString(obj["category"] ?? obj["cat"], "Other"),
      categories: Array.isArray(obj["categories"])
        ? (obj["categories"] as number[])
        : undefined,
      rating: getNumber(obj["rating"], 5),
      reviewCount: getNumber(obj["reviewCount"] ?? obj["reviews"], 0),
      description:
        getString(obj["description"] ?? obj["desc"], "") || undefined,
    } satisfies ApiProduct;
  });
};

export async function fetchRandomProducts(
  signal?: AbortSignal
): Promise<ApiProduct[]> {
  const url =
    "https://corporategiftsdubaii.ae/wp-json/custom/v1/random-products";
  const response = await fetch(url, {
    signal,
    headers: { Accept: "application/json" },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status}`);
  }
  const data = await response.json();
  if (!Array.isArray(data)) return [];
  const getString = (v: unknown, fallback = ""): string =>
    typeof v === "string" && v.length > 0 ? v : fallback;
  const getNumber = (v: unknown, fallback = 0): number => {
    const n = typeof v === "number" ? v : Number(v);
    return Number.isFinite(n) ? n : fallback;
  };
  return data.map((p: unknown) => {
    const obj = (p ?? {}) as Record<string, unknown>;
    return {
      id:
        (obj["id"] as number | string | undefined) ??
        (obj["ID"] as number | string | undefined) ??
        Math.random(),
      name: getString(obj["name"] ?? obj["title"], "Product"),
      image: getString(
        obj["image"] ?? obj["thumbnail"] ?? obj["img"],
        "/api/placeholder/300/300"
      ),
      category: getString(obj["category"] ?? obj["cat"], "Other"),
      rating: getNumber(obj["rating"], 5),
      reviewCount: getNumber(obj["reviewCount"] ?? obj["reviews"], 0),
      description:
        getString(obj["description"] ?? obj["desc"], "") || undefined,
    } satisfies ApiProduct;
  });
}

export async function fetchCategories(
  signal?: AbortSignal
): Promise<ApiCategory[]> {
  const url =
    "https://corporategiftsdubaii.ae/wp-json/custom/v1/product-categories";
  const response = await fetch(url, {
    signal,
    headers: { Accept: "application/json" },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.status}`);
  }
  const data = await response.json();
  if (!Array.isArray(data)) return [];
  return data.map((c: unknown) => {
    const obj = (c ?? {}) as Record<string, unknown>;
    return {
      id: Number(obj["id"] ?? 0),
      name: String(obj["name"] ?? ""),
      slug: String(obj["slug"] ?? ""),
    } satisfies ApiCategory;
  });
}

export async function fetchProductsByCategory(
  categoryId: number,
  signal?: AbortSignal
): Promise<ApiProduct[]> {
  const url = `https://corporategiftsdubaii.ae/wp-json/custom/v1/products-by-category?category_id=${categoryId}`;
  const response = await fetch(url, {
    signal,
    headers: { Accept: "application/json" },
  });
  if (!response.ok) {
    throw new Error(
      `Failed to fetch products for category ${categoryId}: ${response.status}`
    );
  }
  const data = await response.json();
  if (!Array.isArray(data)) return [];
  const getString = (v: unknown, fallback = ""): string =>
    typeof v === "string" && v.length > 0 ? v : fallback;
  const getNumber = (v: unknown, fallback = 0): number => {
    const n = typeof v === "number" ? v : Number(v);
    return Number.isFinite(n) ? n : fallback;
  };
  return data.map((p: unknown) => {
    const obj = (p ?? {}) as Record<string, unknown>;
    return {
      id: (obj["id"] as number | string | undefined) ?? Math.random(),
      name: getString(obj["name"] ?? obj["title"], "Product"),
      image: getString(
        obj["image"] ?? obj["thumbnail"] ?? obj["img"],
        "/api/placeholder/300/300"
      ),
      category: getString(obj["category"] ?? obj["cat"], "Other"),
      categories: Array.isArray(obj["categories"])
        ? (obj["categories"] as number[])
        : undefined,
      rating: getNumber(obj["rating"], 5),
      reviewCount: getNumber(obj["reviewCount"] ?? obj["reviews"], 0),
      description:
        getString(obj["description"] ?? obj["desc"], "") || undefined,
    } satisfies ApiProduct;
  });
}
