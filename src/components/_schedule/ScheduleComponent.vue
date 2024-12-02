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
      :on-event-click="expandDayCard"
    >
      <template #today-button>
        <q-btn icon="event" text-color="black" unelevated class="q-px-md" />
      </template>
      <template #event="{ event }">
        <div class="bottonsSchedule">
          <q-btn flat dense icon="edit" color="blue" @click="editSchedule(event)" />
          <q-btn flat dense icon="delete" color="red" @click="deleteSchedule(event)" />
        </div>

        <span v-html="event.title" class="event-title"></span>
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
      :isVisible="isDeleteVisible"
      :event="selectedEventForDeletion"
      @close="closeDeleteModal"
      @confirm="confirmDelete"
    />

    <q-dialog v-model="showDialog" persistent>
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
          <q-btn label="Fechar" color="primary" @click="showDialog = false" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import VueCal from 'vue-cal'
import apimixin from '../../api/api'
import 'vue-cal/dist/vuecal.css'
import { defineComponent } from 'vue'
import EditScheduleComponent from './EditScheduleComponent.vue'
import DeleteScheduleComponent from './DeleteScheduleComponent.vue'
import { ref } from 'vue'
export default defineComponent({
  name: 'ScheduleComponent',
  mixins: [apimixin],
  components: {
    VueCal,
    EditSchedule: EditScheduleComponent,
    DeleteScheduleComponent,
  },
  data() {
    return {
      small: ref(false),
      events: [] as Array<{ start: string; end: string; title: string; detalhes: string }>,
      isEditVisible: false,
      selectedEvent: {} as { start: string; end: string; title: string; detalhes: string },
      isDeleteVisible: false,
      selectedEventForDeletion: {} as {
        start: string
        end: string
        title: string
        detalhes: string
      },
      selectedDateToday: new Date(new Date().getFullYear(), 11, 31),
      showDialog: false,
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

    logEvents(
      eventType: string,
      event: { start: string; end: string; title: string; detalhes: string; view?: string },
    ) {
      console.log(eventType, event)
      this.tab = event.view
      console.log(this.tab)
    },

    expandDayCard(event: { start: string; end: string; title: string; detalhes: string }) {
      if (this.tab === 'day') {
        this.showDialog = true
        this.selectedEvent = { ...event }
      }
    },
    editSchedule(event: { start: string; end: string; title: string; detalhes: string }) {
      // Quando clicar no botão de editar, o evento será passado para o modal
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
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e1e4e8;
  background-color: #ffffff;
}

.teams-card-header {
  border-bottom: 1px solid #e1e4e8;
  padding: 16px;
  background-color: #f3f2f1;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  text-align: center;
}

.teams-card-title {
  font-size: 1.2em;
  font-weight: 600;
  color: #323130;
}

.teams-card-content {
  padding: 16px;
  color: #605e5c;
  font-size: 1em;
  line-height: 1.5;
  text-align: center;
}

.teams-card-actions {
  padding: 16px;
  text-align: right;
  border-top: 1px solid #e1e4e8;
  background-color: #f3f2f1;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.bottonsSchedule {
  position: absolute; /* Permite o posicionamento absoluto dos botões dentro do evento */
  top: 1px; /* Ajuste para o topo */
  right: -3px; /* Ajuste para o lado direito */
  display: flex; /* Exibe os botões lado a lado */
  gap: -2px; /* Espaçamento entre os botões */
  z-index: 1; /* Garante que os botões fiquem acima do conteúdo do evento */
}

.vuecal__event {
  cursor: pointer;
  margin-bottom: 10px;
  width: 90%;
  padding: 5px;
  margin: 0 auto 10px;
  background-color: #444791; /* Cor de base */
  color: #ffffff; /* Cor do texto para bom contraste */
  border-radius: 4px; /* Cantos arredondados */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Sombra suave */
  padding: 16px; /* Espaçamento interno */
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease; /* Suavidade no hover */
}
.vuecal__event:hover {
  background-color: hsl(238, 36%, 50%); /* Leve clareamento */
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2); /* Aumento da sombra */
  transform: scale(1.02); /* Leve aumento no tamanho */
}

.event-title {
  font-size: 1.4em; /* Aumenta o tamanho da fonte */
  font-weight: 600; /* Deixa o texto semi-negrito */
  color: #ffffff9a; /* Garante contraste com o fundo */
  margin: 4px 0 12px; /* Ajusta margens para espaçamento */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4); /* Adiciona destaque com sombra */
  border-bottom: 2px solid rgba(255, 255, 255, 0.2); /* Linha sutil para separação */
  padding-bottom: 4px; /* Espaço entre o texto e a linha */
}

.vuecal--day-view .vuecal__event {
  border: 2px solid transparent;
  padding: 10px;
  position: relative;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
  border-radius: 5px;
  height: 47px !important;
}

.vuecal--day-view .vuecal__event:hover {
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
  transform: scale(0.98);
}
</style>
