<template>
  <div class="toast" :class="markup.class">
    <button @click="deleteToast" class="toast__delete">
      <UiIcon class="toast__icon" :icon="markup.icon" />
    </button>
    <span>{{ message }}</span>
  </div>
</template>

<script>
import UiIcon from './UiIcon.vue';

export default {
  name: 'UiToast',

  components: {
    UiIcon,
  },

  props: {
    id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      validator: (value) => ['success', 'error', 'info'].includes(value),
    },
    message: {
      type: String,
      required: true,
    },
  },

  computed: {
    markup() {
      // Будем хранить классы и иконки для каждого типа тоста
      // Легко добавить новый тип тоста при необходимости
      const toastsTypes = {
        success: {
          icon: 'check-circle',
          class: 'toast_success',
        },
        error: {
          icon: 'alert-circle',
          class: 'toast_error',
        },
        info: {
          icon: 'pen-tool',
          class: 'toast_info',
        }
      };

      return toastsTypes[this.type];
    },
  },

  methods: {
    deleteToast() {
      this.$emit('delete-toast', this.id);
    },
  },
};
</script>

<style scoped>
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

.toast__delete {
  border: none;
  background: white;
  cursor: pointer;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}

.toast.toast_info {
  color: var(--yellow);
}
</style>
