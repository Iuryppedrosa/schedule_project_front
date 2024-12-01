<template>
  <q-dialog v-model="localVisible" persistent>
    <q-card class="q-pa-md bg-warning text-dark">
      <q-card-section class="row items-center">
        <q-icon name="warning" size="3rem" class="text-red-9" />
        <div class="text-h6 q-ml-md">Confirmar Ação</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div>
          Certeza de que deseja permanentemente <strong>{{ userData.name }}</strong
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
import { QDialog, QCard, QCardSection, QCardActions, QBtn, QIcon } from 'quasar'
import { deleteUser } from '../../api/user_api'
import { Loading } from 'quasar'

export default defineComponent({
  name: 'DeleteConfirmationDialog',
  components: {
    QDialog,
    QCard,
    QCardSection,
    QCardActions,
    QBtn,
    QIcon,
  },
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    userData: {
      type: Object,
      required: true,
    },
  },
  emits: ['close', 'confirm'],
  data() {
    return {
      localVisible: this.isVisible,
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
          message: 'Carregando...',
          spinnerSize: 150,
          spinnerColor: 'blue',
          backgroundColor: 'white',
        })
        await new Promise((resolve) => setTimeout(resolve, 1000))
        await deleteUser(this.userData.id)
        this.$emit('confirm')
        this.$emit('close')
      } catch (error) {
        this.$q.notify({
          message: error.response?.data?.message || 'Erro ao excluir usuário',
          color: 'negative',
          position: 'top',
          timeout: 2500,
        })
      } finally {
        Loading.hide()
        this.$q.notify({
          message: `Usuário ${this.userData.name} excluido com sucesso!`,
          type: 'positive',
          position: 'top',
        })
      }
    },
  },
})
</script>

<style scoped>
/* Personalização adicional opcional */
.q-card {
  max-width: 400px;
  margin: auto;
}
</style>
