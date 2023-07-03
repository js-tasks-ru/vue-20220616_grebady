<template>
  <div class="button-group" role="group">
    <slot />
  </div>
</template>

<script>
import { computed } from 'vue';
export default {
  name: 'UiButtonGroup',

  provide() {
    return {
      modelValue: computed(() => this.modelValue),
      setModelValue: (value) => (this.$emit('update:modelValue', value)),
    };
  },

  props: {
    modelValue: {
      required: true,
    },
  },

  emits: ['update:modelValue'],
};
</script>

<style scoped>
.button-group {
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  white-space: nowrap;
}
</style>
