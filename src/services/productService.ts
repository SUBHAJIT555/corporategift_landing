export interface ApiProduct {
  id: number | string;
  name: string;
  image: string;
  category?: string;
  rating?: number;
  reviewCount?: number;
  description?: string;
}

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
