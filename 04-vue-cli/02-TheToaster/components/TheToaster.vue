<template>
  <div class="toasts">
    <UiToast
      v-for="toast in toasts"
      :key="toast.key"
      :icon="toast.icon"
      :class="`toast_${toast.type}`"
      :message="toast.message"
    />
  </div>
</template>

<script>
import UiToast from './UiToast.vue';
import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'TheToaster',

  components: { UiToast },

  data() {
    return {
      toasts: [],
    };
  },
  methods: {
    error(message) {
      this.toasts.push({
        key: uuidv4(),
        type: 'error',
        icon: 'alert-circle',
        message,
      });
      setTimeout(() => this.toasts.shift(), 5000);
    },
    success(message) {
      this.toasts.push({
        key: uuidv4(),
        type: 'success',
        icon: 'check-circle',
        message,
      });
      setTimeout(() => this.toasts.shift(), 5000);
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}

.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>
