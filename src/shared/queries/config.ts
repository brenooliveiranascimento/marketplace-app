export const queryConfig = {
  staleTime: 5 * 60 * 1000,
  retry: 3,
  retryDelay: (attemptIndex: number) =>
    Math.min(1000 * 2 ** attemptIndex, 30000),
  gcTime: 10 * 60 * 1000,
} as const;

export const infiniteQueryConfig = {
  ...queryConfig,
  getNextPageParam: (lastPage: any) => {
    if (lastPage.page < lastPage.totalPages) {
      return lastPage.page + 1;
    }
    return undefined;
  },
  initialPageParam: 1,
} as const;
