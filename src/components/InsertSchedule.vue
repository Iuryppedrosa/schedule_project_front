<template>
  <!-- Modal -->
  <q-card style="min-width: 400px" v-if="isModalOpen">
    <q-card-section>
      <div class="text-h6">Novo Evento</div>
    </q-card-section>

    <q-card-section>
      <q-input
        v-model="eventData.start"
        label="Hora de Início"
        mask="##:##"
        placeholder="HH:MM"
        filled
      />
      <q-input
        v-model="eventData.end"
        label="Hora de Fim"
        mask="##:##"
        placeholder="HH:MM"
        filled
      />
      <q-input v-model="eventData.title" label="Título" filled />
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat label="Cancelar" color="negative" @click="closeModal" />
      <q-btn flat label="Salvar" color="primary" @click="saveEvent" />
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'InsertSchedule',
  data() {
    return {
      eventData: {
        start: '',
        end: '',
        title: '',
      },
      isModalOpen: false,
      events: [],
    }
  },
  methods: {
    closeModal() {
      this.isModalOpen = false
    },
    saveEvent() {
      if (this.eventData.start && this.eventData.end && this.eventData.title) {
        this.events.push({ ...this.eventData })
        this.$q.notify({
          message: 'Evento adicionado com sucesso!',
          type: 'positive',
          position: 'top',
        })
        this.closeModal()
        this.eventData = { start: '', end: '', title: '' } // Resetar o formulário
      } else {
        this.$q.notify({
          message: 'Por favor, preencha todos os campos.',
          type: 'warning',
          position: 'top',
        })
      }
    },
  },
  created() {
    this.isModalOpen = true
  },
})
</script>

<style scoped>
.q-mb-lg {
  margin-bottom: 24px;
}
</style>
