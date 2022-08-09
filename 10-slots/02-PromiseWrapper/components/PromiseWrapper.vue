<template>
  <slot v-if="!isResolved" name="pending"></slot>
  <slot v-if="isFulfilled" :result="result" name="fulfilled"></slot>
  <slot v-if="isRejected" :error="error" name="rejected"></slot>
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
      isResolved: false,
      isFulfilled: false,
      isRejected: false,
      result: null,
      error: null,
    };
  },

  watch: {
    promise: {
      immediate: true,
      handler(newPromise, oldPromise) {
        this.isResolved = false;
        this.isFulfilled = false;
        this.isRejected = false;
        this.error = null;
        this.result = null;
        newPromise
          .then((result) => {
            this.isResolved = true;
            this.isFulfilled = true;
            this.result = result;
            return result;
          })
          .catch((error) => {
            this.isResolved = true;
            this.isRejected = true;
            this.error = error;
          });
      },
    },
  },

  computed: {},
};
</script>
