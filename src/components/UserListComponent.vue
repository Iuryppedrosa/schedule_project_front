<template>
  <div class="q-pa-md">
    <q-table title="Usuários" :rows="rows" :columns="columns" row-key="name" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'UserListComponent',
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
    }
  },
})
</script>

<style></style>
