<template>
  <div class="q-pa-md">
    <q-layout view="hHh Lpr lff" container style="height: 1000px" class="shadow-2 rounded-borders">
      <q-header elevated :class="this.$q.dark.isActive ? 'bg-secondary' : 'bg-black'">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title>Header</q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above
        :mini="miniState"
        @mouseenter="miniState = false"
        @mouseleave="miniState = true"
        :width="200"
        :breakpoint="500"
        bordered
        :class="this.$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
      >
        <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: '0' }">
          <q-list padding>
            <q-item clickable v-ripple tag="router-link" :to="{ name: 'schedule' }">
              <q-item-section avatar>
                <q-icon name="send" />
              </q-item-section>

              <q-item-section> Agenda </q-item-section>
            </q-item>

            <q-item clickable v-ripple @click="isInsertVisible = true">
              <q-item-section avatar>
                <q-icon name="inbox" />
              </q-item-section>

              <q-item-section> Inserir Agenda </q-item-section>
            </q-item>

            <q-item clickable v-ripple tag="router-link" :to="{ name: 'users' }">
              <q-item-section avatar>
                <q-icon name="star" />
              </q-item-section>

              <q-item-section> Usuários </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="send" />
              </q-item-section>

              <q-item-section> Send </q-item-section>
            </q-item>

            <q-separator />

            <q-item clickable v-ripple @click="logout" class="logout-button">
              <q-item-section avatar>
                <q-icon name="exit_to_app" color="red" />
              </q-item-section>

              <q-item-section>
                <span class="logout-text">Sair</span>
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <router-view></router-view>
        <insert-schedule
          :isVisible="isInsertVisible"
          @close="isInsertVisible = false"
          class="floating-schedule"
        />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import InsertSchedule from './InsertSchedule.vue'
import { Loading } from 'quasar'
import { useUserStore } from '../stores/userStore'

export default defineComponent({
  name: 'HomeComponent',
  components: {
    InsertSchedule,
  },
  data() {
    return {
      drawer: false,
      miniState: true,
      isInsertVisible: false,
    }
  },
  methods: {
    async logout() {
      const userStore = useUserStore()

      try {
        Loading.show({
          message: 'Carregando...',
          spinnerSize: 150,
          spinnerColor: 'blue',
          backgroundColor: 'white',
        })
        await new Promise((resolve) => setTimeout(resolve, 1000))
        userStore.logoutUser()
        this.$router.push({ name: 'login' })
      } catch (error) {
        this.$q.notify({
          color: 'negative',
          position: 'top',
          message: error.response?.data?.message || 'Erro ao realizar o logout.',
        })
      } finally {
        Loading.hide()
      }
    },
    testLoading() {
      Loading.show({
        message: 'Teste de carregamento...',
        spinnerSize: 150,
        spinnerColor: 'blue',
        backgroundColor: 'white',
      })
      setTimeout(() => {
        Loading.hide()
      }, 2000)
    },
  },
})
</script>
<style scoped>
.floating-schedule {
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  background-color: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 1);
  border-radius: 8px;
  padding: 16px;
  min-width: 400px;
}

.logout-button {
  color: red;
  background-color: #ffe6e6;
  border-radius: 8px;
  transition:
    background-color 0.3s,
    transform 0.2s;
}

.logout-button:hover {
  background-color: #ffcccc;
  transform: scale(1.05);
}

.logout-text {
  font-weight: bold;
  font-size: 1.1em;
}
</style>
