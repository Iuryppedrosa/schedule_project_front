<template>
  <div class="q-pa-md">
    <vue-cal
      style="height: 1000px"
      :events="events"
      :selected-date="'2018-11-19'"
      active-view="month"
      :time-from="10 * 60"
      hide-weekends
      events-on-month-view
    >
      <template #event="{ event }">
        <div class="event-badge">
          <span v-html="event.title"></span>
          <hr />
          <em>
            <strong>Event start:</strong> {{ formatTime(event.start) }}<br />
            <strong>Event end:</strong> {{ formatTime(event.end) }}
          </em>
        </div>
      </template>
    </vue-cal>
  </div>
</template>

<script lang="ts">
import VueCal from 'vue-cal'
import apimixin from '../api/api'
import 'vue-cal/dist/vuecal.css'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ScheduleComponent',
  mixins: [apimixin],
  components: {
    VueCal,
  },
  data() {
    return {
      events: [] as Array<{ start: string; end: string; title: string }>,
    }
  },
  methods: {
    formatTime(date: string): string {
      // Formatação simples para exibir horário (pode ser ajustado conforme necessário)
      const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
      }
      return new Date(date).toLocaleTimeString([], options)
    },
  },
  async created() {
    try {
      const events = await this.fetchData('events')
      if (events) {
        this.events = events
      }
    } catch (error) {
      console.error('Error fetching events:', error)
    }
  },
})
</script>

<style scoped>
.event-badge {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 5px;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background-color: rgba(0, 123, 255, 0.1);
  border: 1px solid rgba(0, 123, 255, 0.3);
  border-radius: 4px;
}

hr {
  width: 100%;
  border: none;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  margin: 5px 0;
}

em {
  font-style: normal;
  color: #555;
}
</style>
