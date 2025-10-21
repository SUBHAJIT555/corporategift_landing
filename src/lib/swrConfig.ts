import type { SWRConfiguration } from "swr";

// Global SWR configuration for aggressive caching
export const swrConfig: SWRConfiguration = {
  // Cache data for 30 minutes by default (very aggressive)
  dedupingInterval: 1800000, // 30 minutes

  // Don't revalidate on focus (good for your use case)
  revalidateOnFocus: false,

  // Don't revalidate on reconnect
  revalidateOnReconnect: false,

  // Don't revalidate if data is stale
  revalidateIfStale: false,

  // Don't revalidate when component mounts if data exists
  revalidateOnMount: true,

  // Keep previous data while loading new data
  keepPreviousData: true,

  // Error retry configuration
  errorRetryCount: 1, // Reduce retries to prevent multiple calls
  errorRetryInterval: 10000, // 10 seconds

  // Fallback data
  fallbackData: undefined,

  // Loading timeout
  loadingTimeout: 30000, // 30 seconds

  // Additional aggressive caching options
  refreshInterval: 0, // Never auto-refresh
  refreshWhenHidden: false, // Don't refresh when tab is hidden
  refreshWhenOffline: false, // Don't refresh when offline
};
