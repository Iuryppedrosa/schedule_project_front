<template>
  <q-dialog v-model="isVisible">
    <q-card class="q-pa-md bg-warning text-dark">
      <q-card-section class="row items-center">
        <q-icon name="warning" size="3rem" class="text-red-9" />
        <div class="text-h6 q-ml-md">Confirmar Exclusão</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div>
          Certeza de que deseja permanentemente excluir o evento: <strong>{{ event.title }}</strong
          >?
        </div>
        <div class="q-mt-md text-caption text-grey-8">Esta ação não pode ser desfeita.</div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="negative" @click="closeModal" />
        <q-btn flat label="Excluir" color="red" icon="delete" @click="confirmAction" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { QDialog, QCard, QCardSection, QCardActions, QBtn, QIcon, Loading } from 'quasar'

export default defineComponent({
  name: 'DeleteScheduleComponent',
  components: {
    QDialog,
    QCard,
    QCardSection,
    QCardActions,
    QBtn,
    QIcon,
  },
  props: {
    event: {
      type: Object as () => { start: string; end: string; title: string; detalhes: string },
      required: true,
    },
  },
  emits: ['close', 'confirm'],
  data() {
    return {
      isVisible: true,
    }
  },
  watch: {
    isVisible(newVal) {
      this.localVisible = newVal
    },
    localVisible(newVal) {
      if (!newVal) {
        this.$emit('close')
      }
    },
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    async confirmAction() {
      try {
        Loading.show({
          message: 'Excluindo...',
          spinnerSize: 150,
          spinnerColor: 'blue',
          backgroundColor: 'white',
        })
        await new Promise((resolve) => setTimeout(resolve, 1000))
        // await deleteEvent(this.event.start) // A exclusão do evento com base no identificador
        this.$emit('confirm') // Emite confirmação para excluir
        this.$emit('close') // Fecha o modal
      } catch (error) {
        this.$q.notify({
          message: error.response?.data?.message || 'Erro ao excluir evento',
          color: 'negative',
          position: 'top',
          timeout: 2500,
        })
      } finally {
        Loading.hide()
        this.$q.notify({
          message: `Evento ${this.event.title} excluído com sucesso!`,
          type: 'positive',
          position: 'top',
        })
      }
    },
  },
})
</script>

<style scoped>
.q-card {
  max-width: 400px;
  margin: auto;
}
</style>
