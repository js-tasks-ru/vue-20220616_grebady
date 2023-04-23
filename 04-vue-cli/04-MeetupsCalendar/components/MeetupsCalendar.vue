<template>
  <div class="calendar-view">
    <div class="calendar-view__controls">
      <div class="calendar-view__controls-inner">
        <button
          class="calendar-view__control-left"
          type="button"
          aria-label="Previous month"
          @click="selectPrevMonth"
        ></button>
        <div class="calendar-view__date">{{ titleMonth }}</div>
        <button
          class="calendar-view__control-right"
          type="button"
          aria-label="Next month"
          @click="selectNextMonth"
        ></button>
      </div>
    </div>

    <div class="calendar-view__grid">
      <div
        v-for="[day, month, year, isActive] in daysInCalendar"
        class="calendar-view__cell"
        :class="{ 'calendar-view__cell_inactive': !isActive }"
        tabindex="0"
      >
        <div class="calendar-view__cell-day">{{ day }}</div>
        <div class="calendar-view__cell-content">
          <template v-for="meetup in meetupsInCalendarView">
            <a
              v-if="isMeetupInDay(meetup, { day, month, year })"
              :href="'/meetups/' + meetup.id"
              class="calendar-event"
            >
              {{ meetup.title }}
            </a>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MeetupsCalendar',

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
    };
  },

  computed: {
    titleMonth() {
      return this.currentDate.toLocaleString(navigator.language, {
        year: 'numeric',
        month: 'long',
      });
    },

    currentDate() {
      return new Date(this.year, this.month);
    },

    daysOfCurrentMonth() {
      // Количество дней текущего месяца
      const numDaysInMonth = new Date(this.year, this.month + 1, 0).getDate();

      // [day, month, year, isActive]
      return Array.from({ length: numDaysInMonth }, (_, i) => [i + 1, this.month, this.year, true]);
    },

    daysOfPrevMonth() {
      // Месяц и год предыдущего месяца
      const [month, year] = this.month < 0 ? [11, this.year - 1] : [this.month - 1, this.year];

      // Количество дней из предыдущего месяца, которые отображаются на этом листе календаря (Последний понедельник прошлого месяца)
      const monday = new Date(this.year, this.month, 1).getDay() - 1;

      // Всего дней в предыдущем месяце
      const daysInPrevMonth = new Date(this.year, this.month, 0).getDate();

      // [day, month, year, isActive]
      return Array.from({ length: monday }, (_, i) => [i + daysInPrevMonth - monday + 1, month, year, false]);
    },

    daysOfNextMonth() {
      // Месяц и год следующего месяца
      const [month, year] = this.month > 11 ? [0, this.year + 1] : [this.month + 1, this.year];
      // Количество дней текущего месяца
      const numDaysInMonth = new Date(this.year, this.month + 1, 0).getDate();
      // День недели последнего дня текущего месяца
      const dayOfWeek = new Date(this.year, this.month, numDaysInMonth).getDay();

      // Количество дней из следующего месяца, которые отображаются на этом листе календаря
      const numOfDayNextMonth = dayOfWeek ? Math.abs(dayOfWeek - 7) : 0;

      // [day, month, year, isActive]
      return Array.from({ length: numOfDayNextMonth }, (_, i) => [i + 1, month, year, false]);
    },

    daysInCalendar() {
      return [...this.daysOfPrevMonth, ...this.daysOfCurrentMonth, ...this.daysOfNextMonth];
    },

    // Возвращает массив митапов, которые проходят во всех отображаемых ячейках календаря
    meetupsInCalendarView() {
      const meetupsThisMonth = this.meetups.filter(this.isMeetupInCalendarView);
      return meetupsThisMonth.map((meetup) => {
        const meetupDate = new Date(meetup.date);
        return {
          ...meetup,
          day: meetupDate.getDate(),
          month: meetupDate.getMonth(),
          year: meetupDate.getFullYear(),
        };
      });
    },
  },

  methods: {
    selectNextMonth() {
      this.month++;
      if (this.month > 11) {
        this.month = 0;
        this.year++;
      }
    },

    selectPrevMonth() {
      this.month--;
      if (this.month < 0) {
        this.month = 11;
        this.year--;
      }
    },

    isMeetupInCalendarView(meetup) {
      const meetupDate = new Date(meetup.date);
      const [leftDay, leftMonth, leftYear] = this.daysInCalendar[0];
      const [rightDay, rightMonth, rightYear] = this.daysInCalendar[this.daysInCalendar.length - 1];
      const leftDate = new Date(leftYear, leftMonth, leftDay);
      const rightDate = new Date(rightYear, rightMonth, rightDay);

      return meetupDate >= leftDate && meetupDate <= rightDate;
    },

    isMeetupInDay(meetup, { day, month, year }) {
      return meetup.day === day && meetup.month === month && meetup.year === year;
    },
  },
};
</script>

<style scoped>
.calendar-view {
}

.calendar-view__controls {
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  color: var(--blue);
  background-color: var(--blue-extra);
  padding: 24px;
  display: flex;
  justify-content: center;
}

.calendar-view__controls-inner {
  max-width: 325px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
}

.calendar-view__controls-inner button {
  border: none;
  padding: 0;
}

.calendar-view__control-left,
.calendar-view__control-right {
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s all;
  background: url('@/assets/icons/icon-pill-active.svg') left center no-repeat;
  background-size: cover;
}

.calendar-view__control-left:hover,
.calendar-view__control-right:hover {
  opacity: 0.8;
}

.calendar-view__control-right {
  transform: rotate(180deg);
}

.calendar-view__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}

.calendar-view__grid {
  border: 1px solid var(--grey);
  border-bottom: none;
}

.calendar-view__cell {
  position: relative;
  height: auto;
  padding: 6px 8px;
  background-color: var(--white);
  color: var(--grey-8);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border-bottom: 1px solid var(--grey);
  border-left: 1px solid var(--grey);
  text-align: right;
}

.calendar-view__cell.calendar-view__cell_inactive {
  background-color: var(--grey-light);
}

@media all and (max-width: 767px) {
  .calendar-view__cell:nth-child(5n + 1) {
    border-left: none;
  }
}

@media all and (min-width: 767px) {
  .calendar-view__grid {
    grid-template-columns: repeat(7, 1fr);
  }

  .calendar-view__cell {
    height: 144px;
  }

  .calendar-view__cell:nth-child(7n + 1) {
    border-left: none;
  }
}

.calendar-event {
  --max-lines: 2;
  --line-height: 16px;

  display: block;
  text-align: left;
  text-decoration: none;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 14px;
  font-weight: 600;
  line-height: var(--line-height);
  color: var(--white);
  padding: 4px 6px;
  border-radius: 2px;
  background-color: var(--blue);
  margin-top: 4px;
}

@media all and (min-width: 767px) {
  .calendar-event {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: calc(var(--max-lines) * var(--line-height) + 6px);
  }
}
</style>
