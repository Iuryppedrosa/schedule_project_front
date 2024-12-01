<template>
  <q-dialog v-model="isVisible">
    <q-card v-if="isVisible">
      <q-card-section>
        <div class="text-h6">Editar Evento: {{ localEvent.title }}</div>
      </q-card-section>

      <q-card-section>
        <q-input v-model="localEvent.title" label="Título" filled />
        <q-input v-model="localEvent.detalhes" label="Detalhes" filled />
        <q-input v-model="localEvent.start" label="Início" type="datetime-local" filled />
        <q-input v-model="localEvent.end" label="Fim" type="datetime-local" filled />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="negative" @click="closeModal" />
        <q-btn flat label="Salvar" color="primary" @click="saveChanges" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'EditSchedule',
  props: {
    event: {
      type: Object as PropType<{ start: string; end: string; title: string; detalhes: string }>,
      required: true,
    },
  },
  data() {
    return {
      isVisible: true, // O modal está visível ao ser exibido
      localEvent: { ...this.event }, // Cria uma cópia local do evento
    }
  },
  methods: {
    closeModal() {
      // Fecha o modal emitindo o evento 'close' para o componente pai
      this.$emit('close')
    },
    saveChanges() {
      // Emite as mudanças de volta para o componente pai
      this.$emit('save', this.localEvent)
    },
  },
  watch: {
    // Se o evento mudar, faz uma nova cópia local do evento
    event: {
      handler(newEvent) {
        this.localEvent = { ...newEvent }
      },
      deep: true, // Observa mudanças profundas no objeto
    },
  },
})
</script>

<style scoped>
/* Estilos para o modal de edição */
</style>
