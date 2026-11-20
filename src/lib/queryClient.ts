import { QueryClient } from "@tanstack/react-query"

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 3_600 * 1_000,
      staleTime: 3_600 * 1_000
    }
  }
}) // << cache objekt
