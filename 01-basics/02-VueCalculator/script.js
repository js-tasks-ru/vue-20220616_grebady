import { createApp } from './vendor/vue.esm-browser.js';

// Создайте Vue приложение
const app = createApp({
  data() {
    return {
      arg1: 0,
      arg2: 0,
      operator: 'sum',
    };
  },
  computed: {
    result() {
      switch (this.operator) {
        case 'subtract':
          return this.arg1 - this.arg2;
        case 'multiply':
          return this.arg1 * this.arg2;
        case 'divide':
          if (this.arg2 === 0) return 'На ноль делить не будем';
          return this.arg1 / this.arg2;
        default:
          return this.arg1 + this.arg2;
      }
    },
  },
}).mount('#app');
