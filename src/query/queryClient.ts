// src/queryClient.ts
import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    //   cacheTime: 1000 * 60 * 10, // 10 minutes
      retry: 3, // Retry failed requests up to 3 times
      refetchOnWindowFocus: false,
    },
  },
});

export default queryClient;
