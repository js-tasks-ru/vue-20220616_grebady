import { defineComponent } from './vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import { fetchMeetupById } from './meetupService.js';
import MeetupView from '../06-MeetupView/MeetupView.js';

const States = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  States,

  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      state: States.IDLE,
      meetup: null,
      errorMessage: null,
    };
  },

  watch: {
    meetupId() {
      this.getMeetup();
    },
  },

  mounted() {
    this.getMeetup(this.meetupId);
  },

  methods: {
    async getMeetup() {
      // Переводим состояние в "загрузка". Чистим данные и ошибку
      this.state = States.LOADING;
      this.meetup = null;
      this.errorMessage = null;

      try {
        this.meetup = await fetchMeetupById(this.meetupId);
        // Данные успешно загрузились
        this.state = States.SUCCESS;
      } catch (e) {
        // Произошла ошибка при получении данных
        this.errorMessage = e.message ?? 'Ошибка при загрузки митапа';
        this.state = States.ERROR;
      }
    },
  },

  template: `
    <div class="page-meetup">
      <meetup-view v-if="state === $options.States.SUCCESS" :meetup="meetup"/>

      <ui-container v-else-if="state === $options.States.LOADING">
        <ui-alert >Загрузка...</ui-alert>
      </ui-container>

      <ui-container v-else-if="state === $options.States.ERROR">
        <ui-alert >{{ errorMessage }}</ui-alert>
      </ui-container>
    </div>`,
});
