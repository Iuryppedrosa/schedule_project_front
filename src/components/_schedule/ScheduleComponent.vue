<template>
  <div class="q-pa-md">
    <vue-cal
      ref="vuecal"
      :events="events"
      :selected-date="selectedDateToday"
      eventsOnMonthView="true"
      view-active="day"
      :disable-views="['years', 'year', 'week']"
      hide-weekends
      locale="pt-br"
      :time-from="8 * 60"
      :time-to="22 * 60"
      :time-step="30"
      today-button
      @view-change="logEvents('view-change', $event)"
      :on-event-dblclick="expandDayCard"
    >
      <template #today-button>
        <q-btn dense color="black" unelevated icon="my_location" />
      </template>
      <template #event="{ event }">
        <div class="bottonsSchedule">
          <q-btn flat dense icon="edit" color="blue" @click.stop="editSchedule(event)" />
          <q-btn flat dense icon="delete" color="red" @click.stop="deleteSchedule(event)" />
        </div>

        <span v-html="event.title" class="event-title"></span>

        <q-tooltip
          v-if="event && tab === 'day'"
          anchor="top middle"
          self="bottom middle"
          :offset="[10, 10]"
        >
          <em>click 2x</em> (<q-icon name="keyboard_arrow_up" />)
        </q-tooltip>

        <!-- TODO:
              o objeto event pode receber um parametro class, que define uma class pra ele, podendo estar ser manipulada -->
        <br />

        <div>
          <em>
            <strong>Event start:</strong> {{ formatTime(event.start) }}<br />
            <strong>Event end:</strong> {{ formatTime(event.end) }}
          </em>
          <p>{{ event.detalhes }}</p>
        </div>
      </template>
    </vue-cal>
    <edit-schedule
      v-if="isEditVisible"
      :event="selectedEvent"
      @close="closeEditModal"
      @save="saveEvent"
    />

    <delete-schedule-component
      v-if="isDeleteVisible"
      :event="selectedEventForDeletion"
      @close="closeDeleteModal"
      @confirm="confirmDelete"
    />

    <q-dialog v-model="showDialogBox">
      <q-card class="teams-card">
        <q-card-section class="teams-card-header">
          <q-card-title class="teams-card-title">
            {{ selectedEvent.title }}
          </q-card-title>
        </q-card-section>
        <q-card-section class="teams-card-content">
          <slot name="content">
            <em>
              <strong>Event start:</strong> {{ formatTime(selectedEvent.start) }}<br />
              <strong>Event end:</strong> {{ formatTime(selectedEvent.end) }}
            </em>
          </slot>
        </q-card-section>
        <q-card-section class="teams-card-content">
          <p>{{ selectedEvent.detalhes }}</p>
        </q-card-section>
        <q-card-section class="teams-card-actions">
          <q-btn label="Fechar" color="primary" @click="showDialogBox = false" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import { defineComponent } from 'vue'
import EditScheduleComponent from './EditScheduleComponent.vue'
import DeleteScheduleComponent from './DeleteScheduleComponent.vue'
import { ref } from 'vue'
export default defineComponent({
  name: 'ScheduleComponent',
  components: {
    VueCal,
    EditSchedule: EditScheduleComponent,
    DeleteScheduleComponent,
  },
  data() {
    return {
      small: ref(false),
      events: [
        {
          start: '2024-12-01 10:00',
          end: '2024-12-01 11:00',
          title: 'Yoga class',
          detalhes: 'Sessão de yoga para relaxamento e bem-estar.',
        },
        {
          start: '2024-12-02 09:30',
          end: '2024-12-02 10:15',
          title: 'Team meeting',
          detalhes: 'Reunião de equipe para planejamento semanal.',
        },
        {
          start: '2024-12-03 14:00',
          end: '2024-12-03 15:30',
          title: 'Client presentation',
          detalhes: 'Apresentação de projeto para o cliente.',
        },
        {
          start: '2024-12-04 16:00',
          end: '2024-12-04 17:00',
          title: 'Gym session',
          detalhes: 'Treino de musculação e cardio na academia.',
        },
        {
          start: '2024-12-05 13:00',
          end: '2024-12-05 14:00',
          title: 'Lunch with colleague',
          detalhes: 'Almoço com um colega para discutir ideias de projeto.',
        },
        {
          start: '2024-12-06 08:00',
          end: '2024-12-06 08:30',
          title: 'Morning run',
          detalhes: 'Corrida matinal no parque.',
        },
        {
          start: '2024-12-07 19:00',
          end: '2024-12-07 21:00',
          title: 'Movie night',
          detalhes: 'Sessão de cinema com amigos.',
        },
        {
          start: '2018-11-19 10:35',
          end: '2018-11-19 11:30',
          title: 'Doctor appointment',
          detalhes:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.',
        },
        {
          start: '2018-11-19 10:35',
          end: '2018-11-19 11:30',
          title: 'Doctor appointment',
          detalhes:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.',
        },
        {
          start: '2018-11-19 18:30',
          end: '2018-11-19 19:15',
          title: 'Dentist appointment',
          detalhes:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.',
        },
        {
          start: '2018-11-20 18:30',
          end: '2018-11-20 20:30',
          title: 'Crossfit',
          detalhes:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.',
        },
        {
          start: '2018-11-27 18:30',
          end: '2018-11-27 20:30',
          title: 'Crossfit',
          detalhes:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.',
        },
        {
          start: '2018-11-21 11:00',
          end: '2018-11-21 13:00',
          title: 'Brunch with Jane',
          detalhes:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.',
        },
        {
          start: '2018-11-21 19:30',
          end: '2018-11-21 23:00',
          title: 'Swimming lesson',
          detalhes:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.',
        },
      ] as Array<{ start: string; end: string; title: string; detalhes: string }>,
      isEditVisible: false,
      selectedEvent: {
        start: '',
        end: '',
        title: '',
        detalhes: '',
      },
      isDeleteVisible: false,
      selectedEventForDeletion: { start: '', end: '', title: '', detalhes: '' },
      selectedDateToday: new Date(new Date().getFullYear(), 11, 31),
      showDialogBox: false,
      tab: '',
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

    logEvents(eventType: string, event: { view: string }) {
      this.tab = event.view
      console.log(this.tab)
    },

    expandDayCard(event: { start: string; end: string; title: string; detalhes: string }) {
      console.log('teste')
      if (this.tab === 'day') {
        this.showDialogBox = true
        this.selectedEvent = { ...event }
      }
    },
    editSchedule(event: { start: string; end: string; title: string; detalhes: string }) {
      this.selectedEvent = { ...event }
      this.isEditVisible = true
    },
    deleteSchedule(event: { start: string; end: string; title: string; detalhes: string }) {
      this.selectedEventForDeletion = { ...event }
      this.isDeleteVisible = true
    },
    closeDeleteModal() {
      this.isDeleteVisible = false
    },
    confirmDelete() {
      this.events = this.events.filter((e) => e.start !== this.selectedEventForDeletion.start)
      this.closeDeleteModal()
    },
    closeEditModal() {
      this.isEditVisible = false // Fecha o modal
    },
    saveEvent(updatedEvent: { start: string; end: string; title: string; detalhes: string }) {
      // Atualiza o evento no array de eventos
      const index = this.events.findIndex(
        (e) => e.start === updatedEvent.start && e.title === updatedEvent.title,
      )
      if (index !== -1) {
        this.events[index] = { ...updatedEvent } // Atualiza o evento
      }
      this.isEditVisible = false // Fecha o modal após salvar
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
  // mounted() {
  //   const vueCalElement = this.$refs.vuecal.$el
  //   const observer = new MutationObserver((mutationsList) => {
  //     for (const mutation of mutationsList) {
  //       if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
  //         this.mudança = vueCalElement.classList[2]
  //         console.log(this.mudança)
  //       }
  //     }
  //   })

  //   observer.observe(vueCalElement, {
  //     attributes: true,
  //     attributeFilter: ['class'],
  //   })
  //   this.observer = observer
  // },
  // beforeUnmount() {
  //   if (this.observer) {
  //     this.observer.disconnect()
  //   }
  // },
})
</script>

<style>
.teams-card {
  width: 600px;
  border-radius: 16px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18);
  border: 1px solid #e1e4e8;
  background: linear-gradient(135deg, #f8fafc 60%, #e3e6f3 100%);
  position: relative;
  overflow: hidden;
}

/* Ícone/avatar no topo do modal */
.teams-card::before {
  content: '\1F4C5'; /* Emoji de calendário */
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2.2em;
  opacity: 0.18;
  pointer-events: none;
}

.teams-card-header {
  border-bottom: 1px solid #e1e4e8;
  padding: 24px 16px 8px 16px;
  background: transparent;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  text-align: center;
}

.teams-card-title {
  font-size: 1.5em;
  font-weight: 700;
  color: #2d2e83;
  letter-spacing: 0.5px;
  margin-bottom: 0.2em;
}

.teams-card-content {
  padding: 18px 16px;
  color: #605e5c;
  font-size: 1.08em;
  line-height: 1.6;
  text-align: center;
}

.teams-card-actions {
  padding: 16px;
  text-align: right;
  border-top: 1px solid #e1e4e8;
  background: #f3f2f1cc;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
}

/* Botões de ação circulares com sombra */
.bottonsSchedule {
  position: absolute;
  top: 6px;
  right: 6px;
  display: flex;
  gap: 6px;
  z-index: 2;
}
.bottonsSchedule .q-btn {
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(44, 62, 80, 0.12);
  width: 32px;
  height: 32px;
  min-width: 32px;
  min-height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    box-shadow 0.2s,
    background 0.2s,
    transform 0.2s;
}
.bottonsSchedule .q-btn:hover {
  background: #e3e6f3;
  box-shadow: 0 4px 16px rgba(44, 62, 80, 0.18);
  transform: scale(1.08);
}

/* Tooltip customizado */
.q-tooltip {
  background: #2d2e83;
  color: #fff;
  border-radius: 8px;
  font-size: 1em;
  box-shadow: 0 2px 8px rgba(44, 62, 80, 0.18);
  padding: 8px 14px;
}

/* Glassmorphism nos eventos */
.vuecal__event {
  cursor: pointer;
  margin-bottom: 10px;
  width: 90%;
  padding: 5px;
  margin: 0 auto 10px;
  background: rgba(68, 71, 145, 0.65);
  color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 16px 0 rgba(44, 62, 80, 0.1);
  padding: 18px;
  backdrop-filter: blur(4px);
  transition:
    transform 0.22s cubic-bezier(0.4, 2, 0.6, 1),
    box-shadow 0.22s cubic-bezier(0.4, 2, 0.6, 1),
    background 0.22s;
  position: relative;
}
.vuecal__event:hover {
  background: rgba(68, 71, 145, 0.82);
  box-shadow: 0 8px 24px rgba(44, 62, 80, 0.22);
  transform: scale(1.04);
}

/* Badge/chip de categoria (exemplo visual, precisa ser adicionado no template se quiser usar) */
.event-category {
  display: inline-block;
  background: linear-gradient(90deg, #2d2e83 60%, #444791 100%);
  color: #fff;
  font-size: 0.85em;
  font-weight: 600;
  border-radius: 12px;
  padding: 2px 12px;
  margin-bottom: 6px;
  margin-right: 6px;
  box-shadow: 0 1px 4px rgba(44, 62, 80, 0.1);
  letter-spacing: 0.5px;
}

.event-title {
  font-size: 1.4em;
  font-weight: 700;
  color: #fff;
  margin: 4px 0 12px;
  text-shadow: 1px 1px 4px rgba(44, 62, 80, 0.25);
  border-bottom: 2px solid rgba(255, 255, 255, 0.18);
  padding-bottom: 4px;
  letter-spacing: 0.5px;
}

.vuecal--day-view .vuecal__event {
  border: 2px solid transparent;
  padding: 12px;
  position: relative;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
  border-radius: 10px;
  height: 54px !important;
}

.vuecal--day-view .vuecal__event:hover {
  box-shadow: 0 8px 20px rgba(44, 62, 80, 0.18);
  transform: scale(0.98);
}

/* Cores dinâmicas para eventos (exemplo, pode ser expandido via :class no template) */
.vuecal__event.color-1 {
  background: rgba(44, 62, 80, 0.65);
}
.vuecal__event.color-2 {
  background: rgba(68, 71, 145, 0.65);
}
.vuecal__event.color-3 {
  background: rgba(45, 46, 131, 0.65);
}
.vuecal__event.color-4 {
  background: rgba(34, 193, 195, 0.65);
}
.vuecal__event.color-5 {
  background: rgba(253, 187, 45, 0.65);
  color: #333;
}
</style>
