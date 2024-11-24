<template>
  <div class="q-pa-md">
    <q-btn
      :style="{ width: '100%' }"
      class="btn-insert-user"
      color="black"
      label="Inserir Usuários"
      icon="lightbulb_outline"
      icon-align="left"
      @click="showInsertUserModal"
    />
    <q-table title="Usuários" :rows="rows" :columns="columns" row-key="name" />

    <InsertUser
      :isVisible="isInsertVisible"
      @close="closeInsertUserModal"
      class="floating-insert-user"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import InsertUser from './InsertUser.vue'
export default defineComponent({
  name: 'UserListComponent',
  components: {
    InsertUser,
  },
  data() {
    return {
      columns: [
        { name: 'name', label: 'Name', align: 'left' as const, field: 'name' },
        { name: 'calories', label: 'Calories', align: 'center' as const, field: 'calories' },
        { name: 'fat', label: 'Fat (g)', align: 'center' as const, field: 'fat' },
        { name: 'carbs', label: 'Carbs (g)', align: 'center' as const, field: 'carbs' },
        { name: 'protein', label: 'Protein (g)', align: 'center' as const, field: 'protein' },
      ],
      rows: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 24,
          protein: 6.0,
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
        },
      ],
      isInsertVisible: false,
    }
  },
  methods: {
    showInsertUserModal() {
      this.isInsertVisible = true
    },
    closeInsertUserModal() {
      this.isInsertVisible = false
      this.newUserData = { federalId: '', name: '', email: '', contact: '' }
    },
  },
})
</script>

<style>
.floating-insert-user {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  width: 80%;
  max-width: 400px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 1);
  padding: 20px;
  display: block;
}

.btn-insert-user {
  font-weight: bold;
  color: white;
  background-color: #000000;
  padding: 10px 20px;
  margin-bottom: 10px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.q-btn__content {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.q-btn__icon {
  font-size: 20px;
}
</style>
