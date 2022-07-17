<template>
  <button @click="setCount()">{{ localCount }}</button>
</template>

<script>
export default {
  name: 'CounterButton',

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  emits: ['update:count'],

  data() {
    return {
      localCount: this.count,
    };
  },

  watch: {
    count: {
      handler() {
        this.localCount = this.count;
      },
    },
  },

  methods: {
    setCount() {
      this.$emit('update:count', ++this.localCount);
    },
  },
};
</script>
