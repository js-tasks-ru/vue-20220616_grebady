<template>
  <slot :result="result" :error="error" :name="slotName"></slot>
</template>

<script>
export default {
  name: 'PromiseWrapper',

  props: {
    promise: {
      type: Promise,
      required: true,
    },
  },

  data() {
    return {
      result: null,
      error: null,
      slotName: 'pending',
    };
  },

  watch: {
    promise: {
      immediate: true,
      handler(newPromise, oldPromise) {
        this.error = null;
        this.result = null;
        this.slotName = 'pending';
        newPromise
          .then((result) => {
            this.result = result;
            this.slotName = 'fulfilled';
            return result;
          })
          .catch((error) => {
            this.error = error;
            this.slotName = 'rejected';
          });
      },
    },
  },

  computed: {},
};
</script>
