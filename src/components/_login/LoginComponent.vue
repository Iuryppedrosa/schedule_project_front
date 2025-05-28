<template>
  <div class="background">
    <q-card class="q-pa-md row items-start q-gutter-md login">
      <div class="q-pa-md" style="max-width: 400px">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-input
            filled
            v-model="userInput.email"
            label="Digite seu login"
            hint="Nome ou Cpf"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Digite alguma coisa']"
          />

          <q-input
            filled
            v-model="userInput.password"
            label="Sua senha"
            lazy-rules
            :rules="[(val) => (val !== null && val !== '') || 'Digite alguma coisa']"
          />

          <q-toggle v-model="accept" label="Eu aceito os termos de licença" />
          <div class="bottons">
            <q-btn label="Submit" type="submit" color="primary" />

            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
        </q-form>
      </div>
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { QForm, QInput, QToggle, QBtn } from 'quasar'
import { Loading } from 'quasar'
import { useUserStore } from '../../stores/userStore'
export default defineComponent({
  components: { QForm, QInput, QToggle, QBtn },
  name: 'LoginComponent',
  data() {
    return {
      userInput: {
        email: '',
        password: '',
      },
      accept: false,
    }
  },
  methods: {
    async onSubmit() {
      if (!this.accept) {
        this.$q.notify({
          color: 'negative',
          position: 'top',
          message: 'Você precisa aceitar os termos de licença',
        })
        return
      }
      const userStore = useUserStore()
      try {
        Loading.show({
          message: 'Carregando...',
          spinnerSize: 150,
          spinnerColor: 'blue',
          backgroundColor: 'white',
        })
        await userStore.loginUser(this.userInput)
        this.$q.notify({
          color: 'positive',
          position: 'top',
          message: 'Login efetuado com sucesso!',
        })
        this.$router.push({ name: 'home' })
      } catch (error) {
        this.$q.notify({
          color: 'negative',
          position: 'top',
          message: error.response?.data?.message || 'Erro ao realizar o login.',
        })
      } finally {
        Loading.hide()
      }
    },
    onReset() {
      this.userInput.email = ''
      this.userInput.password = ''
      this.accept = false
    },
  },
})
</script>

<style scoped>
.background {
  background: url('../../assets/fundo_.png') no-repeat center center;
  background-size: cover;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.login {
  width: 380px;
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 10px;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.15);
  position: absolute;
  right: 10%;
}

.q-card .q-pa-md {
  text-align: center;
  margin-bottom: 25px;
  font-weight: bold;
  color: #333;
}

.q-input {
  border-radius: 8px;
  margin-bottom: 20px;
}

.bottons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.q-btn {
  width: 100%;
  border-radius: 8px;
  font-weight: bold;
  padding: 12px;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;
}

.q-btn:hover {
  transform: translateY(-2px);
}

.q-btn[type='submit'] {
  background-image: linear-gradient(to right, #007bff 0%, #0056b3 51%, #007bff 100%);
  color: white !important;
}

.q-btn[type='submit']:hover {
  background-image: linear-gradient(to right, #0056b3 0%, #007bff 51%, #0056b3 100%);
}

.q-btn[type='reset'] {
  background-image: linear-gradient(to right, #6c757d 0%, #5a6268 51%, #6c757d 100%);
  color: white !important;
}

.q-btn[type='reset']:hover {
  background-image: linear-gradient(to right, #5a6268 0%, #6c757d 51%, #5a6268 100%);
}

.q-input label {
  font-size: 14px;
  font-weight: 600;
  color: #555;
}

.q-toggle {
  margin-top: 15px;
  margin-bottom: 15px;
  font-size: 14px;
  color: #444;
}

/* Estilo para o aviso de notificação */
.q-notify {
  font-size: 15px;
  border-radius: 8px;
}
</style>
