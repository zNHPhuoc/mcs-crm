<script setup lang="ts">
defineOptions({ name: 'ProfileIndex' });
import PasswordChange from '@/components/profile/PasswordChange.vue';
import { useAuthStore } from '@/stores/auth.store.ts';
import type { AuthStore } from '@/stores/auth.store.ts';
import { useUserQuery } from '@/queries/useUserQuery';

const authStore: AuthStore = useAuthStore();
const { data: user, isLoading } = useUserQuery();

watch(user, (value) => {
  if (value) {
    authStore.setUser(value);
    authStore.setToken(value.token);
  }
});
</script>

<template>
  <div>
    <h1>👤 Đây là trang cá nhân</h1>

    ===================
    <p v-if="isLoading">Đang tải thông tin người dùng...</p>
    <p v-else-if="user">Xin chào {{ user.email }}</p>
    <p v-else>Không có thông tin người dùng.</p>
    ===================

    <PasswordChange />
  </div>
</template>

<style scoped></style>
