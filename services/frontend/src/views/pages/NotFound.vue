<script setup lang="ts">
defineOptions({ name: 'NotFound' });
</script>

<template>
  <div class="not-found">
    <h1>404 - Không tìm thấy trang</h1>
    <p>Trang bạn truy cập không tồn tại.</p>
    <RouterLink
      :to="{ name: 'home.index', params: { locale: $route.params.locale } }"
    >
      Quay lại trang chủ
    </RouterLink>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding: 3rem;
}
</style>
