import useSWR from "swr";
import {
  fetchRandomProductsSWR,
  fetchCategoriesSWR,
  fetchProductsByCategorySWR,
  type ApiProduct,
  type ApiCategory,
} from "../services/productService";

// Debug version with console logging
export const useProductsByCategoryDebug = (categoryId: number | null) => {
  const cacheKey = categoryId ? `products-category-${categoryId}` : null;

  console.log(
    `🔍 SWR Hook called for categoryId: ${categoryId}, cacheKey: ${cacheKey}`
  );

  const { data, error, isLoading, mutate, isValidating } = useSWR<ApiProduct[]>(
    cacheKey,
    categoryId
      ? () => {
          console.log(`🚀 API call initiated for categoryId: ${categoryId}`);
          return fetchProductsByCategorySWR(categoryId);
        }
      : null,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateOnMount: false,
      revalidateIfStale: false,
      keepPreviousData: true,
      dedupingInterval: 1800000, // 30 minutes
      refreshInterval: 0,
      refreshWhenHidden: false,
      refreshWhenOffline: false,
      errorRetryCount: 1,
      errorRetryInterval: 10000,
      shouldRetryOnError: false,
      onSuccess: (data, key) => {
        console.log(
          `✅ SWR Success for key: ${key}, data length: ${data?.length}`
        );
      },
      onError: (error, key) => {
        console.log(`❌ SWR Error for key: ${key}:`, error);
      },
    }
  );

  console.log(
    `📊 SWR State - isLoading: ${isLoading}, isValidating: ${isValidating}, data length: ${data?.length}`
  );

  return {
    products: data ?? [],
    isLoading,
    isValidating,
    error,
    mutate,
    isFromCache: !isLoading && !isValidating && data !== undefined,
    cacheKey, // Expose cache key for debugging
  };
};

// Alternative approach: Use a more persistent cache key
export const useProductsByCategoryPersistent = (categoryId: number | null) => {
  // Use a more persistent cache key that includes a timestamp
  const cacheKey = categoryId ? `products-category-${categoryId}-v1` : null;

  const { data, error, isLoading, mutate, isValidating } = useSWR<ApiProduct[]>(
    cacheKey,
    categoryId ? () => fetchProductsByCategorySWR(categoryId) : null,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateOnMount: false,
      revalidateIfStale: false,
      keepPreviousData: true,
      dedupingInterval: 0, // Disable deduping to force cache-only behavior
      refreshInterval: 0,
      refreshWhenHidden: false,
      refreshWhenOffline: false,
      errorRetryCount: 0, // No retries
      shouldRetryOnError: false,
    }
  );

  return {
    products: data ?? [],
    isLoading,
    isValidating,
    error,
    mutate,
    isFromCache: !isLoading && !isValidating && data !== undefined,
    cacheKey,
  };
};
