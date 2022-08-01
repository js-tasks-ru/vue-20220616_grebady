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
  render() {
    const tempComponent = defineComponent({
      components: this.components,
      props: {
        bindings: {
          type: Object,
          default: () => ({}),
        },
      },
      render: compile(this.template),
    });
    const bindings = this.bindings;
    return h(tempComponent, { bindings }, null);
  },
};
</script>
