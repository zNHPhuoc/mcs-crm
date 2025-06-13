<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { i18n, setI18nLanguage, SUPPORT_LOCALES } from '@/plugins/i18n.plugin';
import { setLocaleVeeValidate } from '@/plugins/vee-validate.plugin.ts';
import { APP_DEFAULT_LOCALE_NAME } from '@/common/constants.ts';

const route = useRoute();
const router = useRouter();

const currentLocale = ref<string | undefined>(
  (route.params.locale as string) || i18n.global.locale.value
);

const switchLocale = (locale: string): void => {
  if (locale === currentLocale.value) return;

  router.push({
    name: route.name as string,
    params: { ...route.params, locale },
    query: route.query,
  });
};

watch(
  () => route.params.locale,
  (newLocale) => {
    if (newLocale && newLocale !== currentLocale.value) {
      setI18nLanguage(i18n, newLocale as AppLocale);
      setLocaleVeeValidate(newLocale as AppLocale);
      currentLocale.value = newLocale as string;
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="locale-switcher">
    <button
      v-for="locale in SUPPORT_LOCALES"
      :key="locale"
      :disabled="locale === currentLocale"
      class="locale-button"
      @click="switchLocale(locale)"
    >
      {{ APP_DEFAULT_LOCALE_NAME[locale] }}
    </button>
  </div>
</template>

<style scoped lang="scss">
.locale-switcher {
  display: flex;
  gap: 0.5rem;
}

.locale-button {
  padding: 0.3rem 0.8rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  cursor: pointer;
  background: white;
  transition: all 0.2s ease;
}

.locale-button:disabled {
  background: #ddd;
  cursor: default;
}
</style>
