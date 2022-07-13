<template>
  <ui-input v-model="modelProxy" :type="type">
    <template v-for="slotName in Object.keys($slots)" #[slotName]>
      <slot :name="slotName" />
    </template>
  </ui-input>
</template>

<script>
import UiInput from './UiInput';

export default {
  name: 'UiInputDate',

  components: { UiInput },

  props: {
    ...UiInput.props,
    type: {
      type: String,
      default: 'date',
      validator: (value) => ['date', 'time', 'datetime-local'].includes(value),
    },
    modelValue: {
      type: [Number, null],
    },
  },

  emits: {
    ...UiInput.emits,
    'update:modelValue': null,
  },

  data() {
    return {};
  },

  computed: {
    date() {
      if (!this.modelValue) return;
      return new Date(this.modelValue).toISOString().slice(0, 10);
    },
    time() {
      if (!this.modelValue) return;
      return new Date(this.modelValue).toISOString().slice(11, 16);
    },
    'datetime-local'() {
      if (!this.modelValue) return;
      return new Date(this.modelValue).toISOString().slice(0, 16);
    },
    modelProxy: {
      get() {
        return this[`${this.type}`];
      },
      set(value) {
        if (this.type === 'date') {
          const [YYYY, MM, DD] = value.split('-').map((string) => parseInt(string));
          this.$emit('update:modelValue', Date.UTC(YYYY, MM - 1, DD));
          return;
        }

        if (this.type === 'time') {
          const [HH, MM] = value.split(':').map((string) => parseInt(string));
          this.$emit('update:modelValue', Date.UTC(1970, 0, 1, HH, MM));
          return;
        }

        if (this.type === 'datetime-local') {
          const [date, time] = value.split('T');
          const [YYYY, MM, DD] = date.split('-').map((string) => parseInt(string));
          const [HH, mm] = time.split(':').map((string) => parseInt(string));
          this.$emit('update:modelValue', Date.UTC(YYYY, MM - 1, DD, HH, mm));
        }
      },
    },
  },

  methods: {
    checkLeftSlot() {
      return Boolean(this.$slots['left-icon']);
    },
    checkRightSlot() {
      return Boolean(this.$slots['right-icon']);
    },
  },
};
</script>
