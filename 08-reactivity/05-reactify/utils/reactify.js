import { computed, isRef } from 'vue';

/**
 * @template T
 * @param {function(...[*]): T} func - Исходная функция вычисления
 * @returns {function(...[*]): ComputedRef<any>} - Функция вычисления от ref-ов, возвращающая вычисляемое значение computed
 */
export function reactify(func) {
  return function (...args) {
    return computed(() =>
      func.apply(
        this,
        args.map((arg) => (isRef(arg) ? arg.value : arg)),
      ),
    );
  };
}
