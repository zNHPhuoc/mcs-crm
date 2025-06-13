import { useMutation } from '@tanstack/vue-query';
import { login } from '@/services/api/auth.api.ts';

export function useLoginMutation() {
  return useMutation({
    mutationFn: login,
  });
}
