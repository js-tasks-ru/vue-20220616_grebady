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
  methods: {
    increment() {
      this.$emit('update:count', this.count + 1);
    },
  },

  // Шаблон потребуется отредактировать
  template: `<button @click="increment" type="button">{{ count }}</button>`,
});
