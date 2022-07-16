<template>
  <ui-input :model-value="this[type]" :type="type" @change="emitValueAsNumber">
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

  computed: {
    date() {
      if (!this.modelValue) return;
      return new Date(this.modelValue).toISOString().slice(0, 10);
    },
    time() {
      if (!this.modelValue) return;
      const dateISOString = new Date(this.modelValue).toISOString();
      return this.$attrs.step === undefined || this.$attrs.step % 60 === 0
        ? dateISOString.slice(11, 16)
        : dateISOString.slice(11, 19);
    },
    'datetime-local'() {
      if (!this.modelValue) return;
      return new Date(this.modelValue).toISOString().slice(0, 16);
    },
  },

  methods: {
    emitValueAsNumber(event) {
      this.$emit('update:modelValue', event.target.valueAsNumber);
    },
  },
};
</script>
