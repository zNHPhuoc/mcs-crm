<script setup lang="ts">
defineOptions({ name: 'LoginIndex' });
import ChangeLocale from '@/components/common/ChangeLocale.vue';

import { useI18n } from 'vue-i18n';
import { useForm } from 'vee-validate';
import { Field, ErrorMessage } from 'vee-validate';

const { t } = useI18n();

const { handleSubmit } = useForm();
const onSubmit = handleSubmit((values) => {
  console.log('Form Values:', values);
});

onMounted(() => {
  console.log('Login component mounted');
});
</script>

<template>
  <div>
    <ChangeLocale />

    <div class="w-full h-full text-center">
      <form @submit.prevent="onSubmit">
        <div>
          <label>{{ t('auth.email') }}:</label>
          <Field
            name="email"
            type="email"
            :label="t('auth.email')"
            rules="required|email"
          />
          <p><ErrorMessage name="email" /></p>
        </div>

        <div>
          <label>{{ t('auth.password') }}:</label>
          <Field
            name="password"
            :label="t('auth.password')"
            type="password"
            rules="required|min:6"
          />
          <p><ErrorMessage name="password" /></p>
        </div>

        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
