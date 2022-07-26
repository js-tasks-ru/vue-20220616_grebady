import { ref, watch } from 'vue';
import debounce from 'lodash/debounce';

/**
 * @template T
 * @param {Ref<T>} source - Исходный ref
 * @param {number} wait - Ожидание в миллисекундах для debounce
 * @returns {Ref<T>} - Новый ref, обновляющийся с debounce при обновлении исходного ref-а
 */
export function debouncedRef(source, wait) {
  const debounced = ref(undefined);
  debounced.value = source.value;

  let curSource = ref(source);
  let timerId;

  watch(source, (value, oldValue) => {
    if (timerId) clearTimeout(timerId);

    timerId = setTimeout(() => {
      debounced.value = curSource.value;
    }, wait);
  });

  return debounced;
}
