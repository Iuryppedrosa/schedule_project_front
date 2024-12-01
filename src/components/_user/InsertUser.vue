<template>
  <q-card v-if="isVisible">
    <q-card-section>
      <div class="text-h6">Novo Usuário</div>
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
import { createUser } from '../../api/user_api'
export default defineComponent({
  name: 'InsertUser',
  props: {
    isVisible: {
      type: Boolean,
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
      if (this.userData.name && this.userData.email && this.userData.contact) {
        try {
          const newUser = await createUser(this.userData) // Chama a função para criar o usuário
          this.$q.notify({
            message: `Usuário ${newUser.name} criado com sucesso!`,
            type: 'positive',
            position: 'top',
          })
          this.closeModal() // Fecha o modal após o sucesso
          this.userData = { federalId: '', name: '', email: '', contact: '' } // Reseta os dados do formulário
        } catch (error) {
          this.$q.notify({
            message: error.response?.data?.message || 'Erro ao inserir o usuário.',
            type: 'negative',
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
})
</script>

<style scoped>
.q-mb-lg {
  margin-bottom: 24px;
}
</style>
