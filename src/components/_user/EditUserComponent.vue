<template>
  <q-card v-if="isVisible">
    <q-card-section>
      <div class="text-h6">Editar {{ userData.name }}</div>
    </q-card-section>

    <q-card-section>
      <q-input v-model="userData.federalId" label="ID Federal" filled />
      <q-input v-model="userData.name" label="Nome" filled />
      <q-input v-model="userData.email" label="E-mail" filled />
      <q-input v-model="userData.contact" label="Contato" filled />
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat label="Cancelar" color="negative" @click="closeModal" />
      <q-btn flat label="Salvar" color="primary" @click="saveEvent" />
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { UserCreateDTO } from '../../types/userTypes'
import { editUser } from '../../api/user_api'
import { getUserById } from '../../api/user_api'
import { Loading } from 'quasar'
export default defineComponent({
  name: 'EditUser',
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    userDataId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isInsertVisible: false,
      userData: {
        federalId: '',
        name: '',
        email: '',
        contact: '',
      } as UserCreateDTO,
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    async saveEvent() {
      if (
        this.userData.name ||
        this.userData.email ||
        this.userData.contact ||
        this.userData.federalId
      ) {
        try {
          Loading.show({
            message: 'Carregando...',
            spinnerSize: 150,
            spinnerColor: 'blue',
            backgroundColor: 'white',
          })
          await new Promise((resolve) => setTimeout(resolve, 1000))
          await editUser(this.userDataId, this.userData)
          this.$emit('data-updated')
          this.userData = { federalId: '', name: '', email: '', contact: '' }
        } catch (error) {
          this.$q.notify({
            message:
              error.response?.data?.message ||
              `Nao foi possível editar o usuário ${this.userData.name}!`,
            type: 'negative',
            position: 'top',
          })
        } finally {
          Loading.hide()
          this.$q.notify({
            message: `Usuário ${this.userData.name} editado com sucesso!`,
            type: 'positive',
            position: 'top',
          })
        }
      } else {
        this.$q.notify({
          message: 'Por favor, preencha todos os campos.',
          type: 'warning',
          position: 'top',
        })
      }
    },
  },
  watch: {
    userDataId: {
      immediate: true,
      async handler(newVal) {
        if (newVal) {
          try {
            const user = await getUserById(newVal)
            this.userData = user
          } catch (error) {
            this.$q.notify({
              message: error.response?.data?.message || 'Erro ao buscar o usuário.',
              type: 'negative',
              position: 'top',
            })
          }
        }
      },
    },
  },
})
</script>

<style scoped>
.q-mb-lg {
  margin-bottom: 24px;
}
</style>
