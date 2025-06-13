import { useQuery } from '@tanstack/vue-query';
import { getUserInfo } from '@/services/api/auth.api.ts';

export function useUserQuery(options?: {
  onSuccess?: (data: unknown) => void;
  onError?: (err: unknown) => void;
}) {
  return useQuery<any>({
    queryKey: ['getUserInfo'],
    queryFn: getUserInfo,
    staleTime: 1000 * 60 * 5,
    ...options,
  });
}
