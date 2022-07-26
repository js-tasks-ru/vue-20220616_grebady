import { ref, watch } from 'vue';

/**
 * @template T
 * @param {Ref<T>} source - Отслеживаемый ref
 * @returns {Object<{ history: Ref<T[]> }>} - История изменения source
 */
export function refHistory(source) {
  const history = ref();
  history.value = [source.value];
  watch(source, (value) => history.value.push(value), { flush: 'sync' });
  return { history };
}
