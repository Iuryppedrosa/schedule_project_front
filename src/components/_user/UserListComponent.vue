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
    <q-table
      title="Usuários"
      :rows="rows"
      :columns="columns"
      no-data-label="Nao existe usuários"
      row-key="id"
    >
      <template v-slot:body-cell-actions="props">
        <q-td auto-width>
          <q-btn flat dense icon="edit" color="blue" @click="showEditUserModal(props.row)" />
          <q-btn flat dense icon="delete" color="red" @click="showDeleteUserModal(props.row)" />
        </q-td>
      </template>
    </q-table>

    <InsertUser
      :isVisible="isInsertVisible"
      @close="closeInsertUserModal"
      class="floating-insert-user"
    />

    <EditUserComponent
      :isVisible="isEditVisible"
      @close="closeEditUserModal"
      class="float-edit-user"
      :userDataId="userDataId"
      @data-updated="onDataUpdated"
    />

    <q-dialog v-model="isDeleteVisible" class="floating-delete-user">
      <DeleteUserComponent
        :isVisible="isDeleteVisible"
        :userData="userData"
        @close="closeDeleteUserModal"
        @confirm="onDataUpdated"
      />
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { User } from '../../types/userTypes'
import { getAllUsers } from '../../api/user_api'
import InsertUser from './InsertUser.vue'
import EditUserComponent from './EditUserComponent.vue'
import { Loading } from 'quasar'
import DeleteUserComponent from './DeleteUserComponent.vue'

export default defineComponent({
  name: 'UserListComponent',
  components: {
    InsertUser,
    EditUserComponent,
    DeleteUserComponent,
  },
  data() {
    return {
      userData: [] as User[],
      columns: [
        { name: 'name', label: 'Nome', align: 'left' as const, field: 'name', sortable: true },
        {
          name: 'federalId',
          label: 'ID Federal',
          align: 'left' as const,
          field: 'federalId',
          sortable: true,
        },
        { name: 'email', label: 'E-mail', align: 'left' as const, field: 'email', sortable: true },
        {
          name: 'contact',
          label: 'Contato',
          align: 'left' as const,
          field: 'contact',
          sortable: true,
        },
        { name: 'actions', field: 'actions', label: 'Editar/Excluir', align: 'center' as const },
      ],
      rows: [] as User[],
      isInsertVisible: false,
      isEditVisible: false,
      isDeleteVisible: false,
      userDataId: 0,
    }
  },
  methods: {
    async fetchUsers() {
      try {
        Loading.show({
          message: 'Carregando...',
          spinnerSize: 150,
          spinnerColor: 'blue',
          backgroundColor: 'white',
        })
        const users = await getAllUsers()
        this.userData = users
        this.rows = this.userData.map((user) => ({
          id: user.id,
          name: user.name,
          federalId: user.federalId,
          email: user.email,
          contact: user.contact,
        }))
      } catch (error) {
        console.error(error)
      } finally {
        Loading.hide()
      }
    },
    onDataUpdated() {
      this.fetchUsers()
    },
    showInsertUserModal() {
      this.isInsertVisible = true
    },
    showEditUserModal(row) {
      this.isEditVisible = true
      this.userDataId = row.id
    },
    showDeleteUserModal(row) {
      this.isDeleteVisible = true
      this.userData = row
    },

    closeInsertUserModal() {
      this.isInsertVisible = false
      this.newUserData = { federalId: '', name: '', email: '', contact: '' }
    },
    closeEditUserModal() {
      this.isEditVisible = false
      this.newUserData = { federalId: '', name: '', email: '', contact: '' }
      this.userDataId = 0
    },
    closeDeleteUserModal() {
      this.isDeleteVisible = false
      this.userData = { federalId: '', name: '', email: '', contact: '' }
    },
  },
  created() {
    this.fetchUsers()
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

.float-edit-user {
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
