import useSWR from "swr";
import {
  fetchRandomProductsSWR,
  fetchCategoriesSWR,
  fetchProductsByCategorySWR,
  type ApiProduct,
  type ApiCategory,
} from "../services/productService";

// SWR hooks for caching
export const useRandomProducts = () => {
  const { data, error, isLoading, mutate } = useSWR<ApiProduct[]>(
    "random-products",
    fetchRandomProductsSWR
  );

  return {
    products: data ?? [],
    isLoading,
    error,
    mutate,
  };
};

export const useCategories = () => {
  const { data, error, isLoading, mutate } = useSWR<ApiCategory[]>(
    "categories",
    fetchCategoriesSWR
  );

  console.log("categories", data);
  console.log("isLoading", isLoading);
  console.log("error", error);
  console.log("mutate", mutate);

  return {
    categories: data ?? [],
    isLoading,
    error,
    mutate,
  };
};

export const useProductsByCategory = (categoryId: number | null) => {
  const { data, error, isLoading, mutate, isValidating } = useSWR<ApiProduct[]>(
    categoryId ? `products-category-${categoryId}` : null,
    categoryId ? () => fetchProductsByCategorySWR(categoryId) : null
  );

  return {
    products: data ?? [],
    isLoading,
    isValidating, // Shows if SWR is validating (checking cache vs fetching)
    error,
    mutate,
    // Helper to check if data is from cache
    isFromCache: !isLoading && !isValidating && data !== undefined,
  };
};
