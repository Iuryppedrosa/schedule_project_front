<template>
  <div>
    <h1>Login</h1>
    <input type="email" v-model="email" placeholder="Email" />
    <input type="password" v-model="password" placeholder="Password" />
    <button @click="login">Login</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'LoginComponent',
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    login() {
      console.log('Email:', this.email)
      console.log('Password', this.password)
    },
  },
})
</script>

<style></style>
