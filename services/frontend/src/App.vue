<script setup lang="ts">
import { APP_DEBUG_VUE_QUERY_DEVTOOLS } from '@/common/constants.ts';
/*import { useSocket } from '@/composables/useSocket';

useSocket('server-message', (data) => {
  console.log('Nhận từ server:', data);
});*/
</script>

<template>
  <RouterView />
  <VueQueryDevtools v-if="APP_DEBUG_VUE_QUERY_DEVTOOLS" />
</template>

<style scoped lang="scss"></style>
