<template>
  <div :style="styleObj">
    <button @click="openModal1($event)">OPEN MODAL 1</button>
    <div v-if="fetchingUsers">
      FETCHING...
    </div>
    <div v-else="">
      <table class="table">
        <tbody>
        <tr v-for="user in GET_REVERSED_USERS" :key="user.id">
          <td>
            <router-link :to="`/users/${user.id}`">{{user.id}}</router-link>
          </td>
          <td>
            <router-link :to="`/users/${user.id}`">{{user.name}}</router-link>
          </td>
          <td>
            <router-link :to="`/users/${user.id}`">{{user.email}}</router-link>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <button @click="openModal2($event)">OPEN MODAL 2</button>
    <Modal :modalOpened="modalOpened1"
           :modalTransform="modalTransform1" @close="closeModal1" >
      THIS IS MODAL CONTENT 1
    </Modal>
    <Modal :modalOpened="modalOpened2"
           :modalTransform="modalTransform2"
           @close="closeModal2" >
      THIS IS MODAL CONTENT 2
    </Modal>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import {Modal, prepareModalOpened} from './Modal'

export default {
  name: 'UsersList',
  components: {
    Modal
  },
  props: {
    styleObj: {
      type: Object,
    }
  },
  data () {
    return {
      modalOpened1: false,
      modalTransform1: '',
      modalOpened2: false,
      modalTransform2: '',
    }
  },
  computed: {
    ...mapState(['fetchingUsers', 'users']),
    ...mapGetters(['GET_REVERSED_USERS']),
  },
  methods: {
    ...mapMutations(['SET_FETCHING', 'SET_USERS']),
    ...mapActions(['FETCH_USERS']),
    loadUsers () {
      this.FETCH_USERS()
    },
    openModal1 (e) {
      this.modalOpened1 = true
      this.modalTransform1 = prepareModalOpened(e)
    },
    closeModal1 () {
      this.modalOpened1 = false
    },
    openModal2 (e) {
      this.modalOpened2 = true
      this.modalTransform2 = prepareModalOpened(e)
    },
    closeModal2 () {
      this.modalOpened2 = false
    }
  },
  mounted () {
    this.loadUsers()
  }
}
</script>

<style scoped>
  .flex-row {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  .border {
    border: 1px solid black;
  }
</style>
