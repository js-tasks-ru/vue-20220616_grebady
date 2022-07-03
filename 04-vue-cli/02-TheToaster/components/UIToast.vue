<template>
  <div class="toast" :class="`toast_${type}`">
    <UiIcon class="toast__icon" :icon="icon" />
    <span>{{ message }}</span>
  </div>
</template>

<script>
import UiIcon from './UiIcon.vue';

export default {
  name: 'UIToast',

  components: {
    UiIcon,
  },

  props: {
    type: {
      type: String,
      required: true,
      validator: (value) => ['success', 'error'].includes(value),
    },
    icon: {
      type: String,
      required: true,
      validator: (value) => ['check-circle', 'alert-circle'].includes(value),
    },
    message: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped></style>
