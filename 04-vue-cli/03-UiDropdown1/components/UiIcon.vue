<template>
  <img class="icon" :alt="icon" :src="iconSrc" />
</template>

<script>
import AlertCircle from '../../../src/assets/icons/icon-alert-circle.svg';
import CalSm from '../../../src/assets/icons/icon-cal-sm.svg';
import CalLg from '../../../src/assets/icons/icon-cal-lg.svg';
import Check from '../../../src/assets/icons/icon-check.svg';
import CheckCircle from '../../../src/assets/icons/icon-check-circle.svg';
import ChevronDown from '../../../src/assets/icons/icon-chevron-down.svg';
import Clock from '../../../src/assets/icons/icon-clock.svg';
import Coffee from '../../../src/assets/icons/icon-coffee.svg';
import Key from '../../../src/assets/icons/icon-key.svg';
import List from '../../../src/assets/icons/icon-list.svg';
import Map from '../../../src/assets/icons/icon-map.svg';
import PenTool from '../../../src/assets/icons/icon-pen-tool.svg';
import PillActive from '../../../src/assets/icons/icon-pill-active.svg';
import Search from '../../../src/assets/icons/icon-search.svg';
import Trash from '../../../src/assets/icons/icon-trash.svg';
import Tv from '../../../src/assets/icons/icon-tv.svg';
import User from '../../../src/assets/icons/icon-user.svg';

const icons = {
  'alert-circle': AlertCircle,
  'cal-sm': CalSm,
  'cal-lg': CalLg,
  check: Check,
  'check-circle': CheckCircle,
  'chevron-down': ChevronDown,
  clock: Clock,
  coffee: Coffee,
  key: Key,
  list: List,
  map: Map,
  'pen-tool': PenTool,
  'pill-active': PillActive,
  search: Search,
  trash: Trash,
  tv: Tv,
  user: User,
};

export default {
  name: 'UiIcon',

  props: {
    icon: {
      type: String,
      required: true,
      validator: (name) => Object.keys(icons).includes(name),
    },
  },

  computed: {
    iconSrc() {
      return icons[this.icon];
    },
  },
};
</script>

<style scoped>
.icon {
  display: block;
}
</style>
