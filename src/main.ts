import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar, Notify, Loading } from 'quasar'
import App from './App.vue'
import router from './router/router'
import Plugin from '@quasar/quasar-ui-qcalendar/dist/QCalendarDay.esm.js'
import '@quasar/quasar-ui-qcalendar/dist/QCalendarDay.min.css'

import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'
import '@quasar/extras/roboto-font/roboto-font.css'
import 'quasar/dist/quasar.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Quasar, {
  plugins: { Notify, Loading },
  config: {},
})
app.use(Plugin)
app.mount('#app')
