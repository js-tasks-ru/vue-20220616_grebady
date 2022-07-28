<script>
import { isVNode, h } from 'vue';

export default {
  name: 'VNode',

  props: {
    vnode: {
      type: [Object, Array],
      require: true,
      validator: (vnodes) => (Array.isArray(vnodes) ? vnodes : [vnodes]).every((mustBeVNode) => isVNode(mustBeVNode)),
    },
  },

  render() {
    return Array.isArray(this.vnode) ? this.vnode.map((vnode) => h(vnode)) : h(this.vnode);
  },
};
</script>
