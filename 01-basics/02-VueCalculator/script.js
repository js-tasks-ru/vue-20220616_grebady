import { createApp } from './vendor/vue.esm-browser.js';

const calculatorOperators = {
  sum: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => (b === 0 ? 'На ноль делить не будем' : a / b),
};

// Создайте Vue приложение
const app = createApp({
  data() {
    return {
      arg1: 0,
      arg2: 0,
      operator: 'sum',
      operators: [
        { name: 'sum', value: '➕' },
        { name: 'subtract', value: '➖' },
        { name: 'multiply', value: '✖' },
        { name: 'divide', value: '➗' },
      ],
    };
  },
  computed: {
    result() {
      return calculatorOperators[this.operator]?.(this.arg1, this.arg2);
    },
  },
}).mount('#app');
