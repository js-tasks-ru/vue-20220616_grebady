<script>
import { compile, h, defineComponent } from 'vue';

export default {
  name: 'TemplateRenderer',

  props: {
    template: {
      type: String,
      required: true,
    },

    bindings: {
      type: Object,
      default: () => ({}),
    },

    components: {
      type: [Object, Array],
      default: () => [],
    },
  },

  computed: {
    renderFunc() {
      return compile(this.template);
    },
    generatedComponent() {
      return defineComponent({
        components: this.components,
        props: {
          bindings: {
            type: Object,
            default: () => ({}),
          },
        },
        render: this.renderFunc,
      });
    },
  },

  render() {
    return h(this.generatedComponent, { bindings: this.bindings }, null);
  },
};
</script>
