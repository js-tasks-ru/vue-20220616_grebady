import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'CounterButton',

  // Компонент должен иметь входной параметр
  props: {
    count: {
      type: Number,
      required: false,
      default: 0,
    },
  },

  emits: ['update:count'],

  // Шаблон лучше держать максимально простым, а логику выносить в методы

  // Шаблон потребуется отредактировать
  template: `<button @click="$emit('update:count', count + 1)" type="button">{{ count }}</button>`,
});
