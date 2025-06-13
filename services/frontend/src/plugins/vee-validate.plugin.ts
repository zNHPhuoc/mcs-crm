import { defineRule, configure } from 'vee-validate';
import { localize, setLocale } from '@vee-validate/i18n';
import {
  between,
  email,
  required,
  confirmed,
  alpha,
  alpha_spaces,
  digits,
  not_one_of,
  one_of,
  is_not,
  max_value,
  min_value,
  alpha_dash,
  dimensions,
  ext,
  integer,
  length,
  mimes,
  numeric,
  size,
  alpha_num,
  image,
  is,
  max,
  min,
  regex,
  url,
} from '@vee-validate/rules';
import { DEFAULT_LOCALE } from '@/plugins/i18n.plugin.ts';

export const setLocaleVeeValidate = (locale: string) => {
  setLocale(locale);
};

export default {
  install: () => {
    configure({
      generateMessage: localize({
        en: {
          messages: {
            required: 'The {field} is required',
            email: 'The {field} must be a valid email address',
            between: 'The {field} value must be between 0:{min}, 1:{max}',
            confirmed: 'The {field} value must match {age}',
            alpha: 'The {field} must only contain letters',
            alpha_dash:
              'The {field} must only contain letters, numbers, dashes and underscores',
            alpha_num: 'The {field} must only contain letters and numbers',
            image: 'The {field} must be an image',
            regex: 'The {field}} format is invalid',
            size: 'The {field} must be {size}',
            max_value: 'The {field} must not be greater than {max_value}',
            min_value: 'The {field} must be at least {min_value}',
          },
        },
        vi: {
          messages: {
            required: 'Trường {field} không được bỏ trống',
            email: 'Trường {field} phải là một địa chỉ email hợp lệ',
            between: 'Trường {field} phải nằm trong khoảng 0:{min}, 1:{max}',
            confirmed: 'Trường {field} phải khớp với {age}',
            alpha: 'Trường {field} chỉ có thể chứa các chữ cái',
            alpha_dash:
              'Trường {field} chỉ có thể chứa chữ cái, số và dấu gạch ngang',
            alpha_num: 'Trường {field} chỉ có thể chứa chữ cái và số',
            image: 'Trường {field} phải là định dạng hình ảnh',
            regex: 'Trường {field} có định dạng không hợp lệ',
            size: 'Trường {field} phải bằng {size}',
            max_value: 'Trường {field} không được lớn hơn {max_value}',
            min_value: 'Trường {field} phải tối thiểu là {min_value}',
          },
        },
      }),
    });

    defineRule('required', required);
    defineRule('email', email);
    defineRule('between', between);
    defineRule('confirmed', confirmed);
    defineRule('alpha', alpha);
    defineRule('alpha_spaces', alpha_spaces);
    defineRule('digits', digits);
    defineRule('not_one_of', not_one_of);
    defineRule('one_of', one_of);
    defineRule('is_not', is_not);
    defineRule('max_value', max_value);
    defineRule('min_value', min_value);
    defineRule('alpha_dash', alpha_dash);
    defineRule('dimensions', dimensions);
    defineRule('ext', ext);
    defineRule('integer', integer);
    defineRule('length', length);
    defineRule('mimes', mimes);
    defineRule('numeric', numeric);
    defineRule('size', size);
    defineRule('alpha_num', alpha_num);
    defineRule('image', image);
    defineRule('is', is);
    defineRule('max', max);
    defineRule('min', min);
    defineRule('regex', regex);
    defineRule('url', url);

    setLocaleVeeValidate(DEFAULT_LOCALE);
  },
};
