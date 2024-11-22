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
            <q-item clickable v-ripple @click="toggleInsertSchedule">
              <q-item-section avatar>
                <q-icon name="inbox" />
              </q-item-section>

              <q-item-section> Inbox </q-item-section>
            </q-item>

            <q-item active clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="star" />
              </q-item-section>

              <q-item-section> Star </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="send" />
              </q-item-section>

              <q-item-section> Send </q-item-section>
            </q-item>

            <q-separator />

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="drafts" />
              </q-item-section>

              <q-item-section> Drafts </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <router-view></router-view>
        <insert-schedule v-if="isInsertScheduleVisible" class="floating-schedule" />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import InsertSchedule from './InsertSchedule.vue'

export default defineComponent({
  name: 'HomeComponent',
  components: {
    InsertSchedule,
  },
  data() {
    return {
      drawer: false,
      miniState: true,
      isInsertScheduleVisible: false,
    }
  },
  methods: {
    toggleInsertSchedule() {
      this.isInsertScheduleVisible = !this.isInsertScheduleVisible
      console.log('toggleInsertSchedule', this.isInsertScheduleVisible)
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
</style>
