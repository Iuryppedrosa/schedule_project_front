<template>
  <div class="background">
    <q-card class="q-pa-md row items-start q-gutter-md login">
      <div class="q-pa-md" style="max-width: 400px">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-input
            filled
            v-model="userInput.username"
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

          <q-toggle v-model="accept" label="Eu aceito os termos de licenca" />
          <div class="bottons">
            <q-btn label="Submit" type="submit" color="primary" />
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
        </q-form>
      </div>
    </q-card>
    <div>
      {{ users }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import apimixin from '../api/api'
import { QForm, QInput, QToggle, QBtn } from 'quasar'
import { Loading } from 'quasar'
export default defineComponent({
  components: { QForm, QInput, QToggle, QBtn },
  name: 'LoginComponent',
  mixins: [apimixin],
  data() {
    return {
      users: {
        username: '',
        password: '',
      },
      userInput: {
        username: '',
        password: '',
      },
      accept: false,
    }
  },
  methods: {
    onSubmit() {
      if (!this.accept) {
        this.$q.notify({
          color: 'negative',
          position: 'top',
          message: 'Você precisa aceitar os termos de licença',
        })
        return
      }
      const foundUser = this.users.find(
        (user) =>
          user.username === this.userInput.username &&
          user.password_hash === this.userInput.password,
      )
      if (foundUser) {
        this.loadingMethod()
        this.notifyMethod('Login efetuado com sucesso', 'positive')
      } else {
        this.loadingMethod()
        this.notifyMethod('Usuário ou senha inválidos', 'negative')
      }
    },
    onReset() {
      this.userInput.username = ''
      this.userInput.password = ''
      this.accept = false
    },
    loadingMethod() {
      Loading.show({
        message: 'Carregando...',
        spinnerSize: 150,
        spinnerColor: 'blue',
        backgroundColor: 'white',
      })
      setTimeout(() => {
        Loading.hide()
      }, 2000)
    },
    notifyMethod(messageCheck: string, colorCheck: string) {
      setTimeout(() => {
        this.$q.notify({
          color: colorCheck,
          position: 'top',
          message: messageCheck,
        })
      }, 4000)
    },
  },
  async created() {
    const users = await this.fetchData('user')
    if (users) {
      this.users = users
    }
  },
})
</script>

<style scoped>
/* Fundo */
.background {
  background-image: url('../../public/img_login.png') !important;
  opacity: 0.8;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100vh;
  position: relative;
}

/* Estilo do Card de Login */
.login {
  width: 350px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 50%;
  left: 70%;
  transform: translate(-50%, -50%); /* Centraliza o card */
}

/* Título dentro do Card */
.q-card .q-pa-md {
  text-align: center;
  margin-bottom: 20px;
  font-weight: bold;
  color: #333;
}

/* Estilo dos campos de entrada */
.q-input {
  border-radius: 8px;
  background-color: #f4f6f8;
  margin-bottom: 15px;
}

.bottons {
  display: flex;
  align-content: center;
}

/* Estilo dos botões */
.q-btn[type='submit'],
.q-btn[type='reset'] {
  width: 100%; /* Garantindo que os botões ocupem 100% da largura disponível */
  margin-top: 10px; /* Adicionando espaçamento entre os botões */
  border-radius: 8px;
  font-weight: bold;
  padding: 10px;
}

/* Botão de Submit */
.q-btn[type='submit'] {
  background-color: #4caf50;
  color: white;
}

/* Botão de Reset */
.q-btn[type='reset'] {
  background-color: #f44336;
  color: white;
}

/* Tamanho da fonte das labels e input */
.q-input label {
  font-size: 14px;
  font-weight: 600;
}

.q-toggle {
  margin-top: 10px;
  font-size: 14px;
}

/* Estilo para inputs com validação */
.q-input--filled .q-field__control {
  border: 2px solid #4caf50;
}

.q-btn:hover {
  opacity: 0.9;
}

/* Estilo para o aviso de notificação */
.q-notify {
  font-size: 14px;
  border-radius: 5px;
}
</style>
