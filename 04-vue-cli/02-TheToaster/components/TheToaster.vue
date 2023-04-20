<template>
  <div class="toasts">
    <UiToast
      v-for="toast in toasts"
      :key="toast.key"
      :id="toast.key"
      :message="toast.message"
      :type="toast.type"
      @delete-toast="deleteToast"
    />
  </div>
</template>

<script>
import UiToast from './UiToast.vue';
import { v4 as uuidv4 } from 'uuid';

const DEFAULT_DELAY = 1000000;

export default {
  name: 'TheToaster',

  components: { UiToast },

  data() {
    return {
      toasts: new Set(),
    };
  },

  // Если вдруг компонент будет уничтожен при наличии тостов, в памяти останутся висеть таймеры для их удаления.
  // Чистим перед уничтожением компонента
  beforeUnmount() {
    for (const toast of this.toasts) {
      clearTimeout(toast.timeoutId);
    }
  },

  methods: {
    error(message) {
      this.addToast({
        type: 'error',
        message,
      });
    },
    success(message) {
      this.addToast({
        type: 'success',
        message,
      });
    },

    info(message) {
      this.addToast({
        type: 'info',
        message,
      });
    },

    addToast({ type, message, delay = DEFAULT_DELAY }) {
      const key = uuidv4();

      const toast = { key, type, message, delay };

      toast.timeoutId = setTimeout(() => {
        this.toasts.delete(toast);
      }, delay);
      this.toasts.add(toast);
    },

    deleteToast(id) {
      // get toast by id from set
      const toast = [...this.toasts].find((toast) => toast.key === id);
      // clear timeout and delete toast
      clearTimeout(toast.timeoutId);
      this.toasts.delete(toast);
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
</style>
