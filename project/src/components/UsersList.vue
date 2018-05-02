<template>
  <div :style="styleObj">
    <div v-if="fetching">
      FETCHING...
    </div>
    <div v-else="">
      <router-link v-for="user in GET_REVERSED_USERS"
           :key="user.id"
           :to="`/users/${user.id}`"
           class="flex-row border">
        <div>{{user.id}}</div>
        <div>{{user.name}}</div>
        <div>{{user.email}}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'UsersList',
  props: {
    styleObj: {
      type: Object,
    }
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['fetching', 'users']),
    ...mapGetters(['GET_REVERSED_USERS']),
  },
  methods: {
    ...mapMutations(['SET_FETCHING', 'SET_USERS']),
    ...mapActions(['FETCH_USERS']),
    loadUsers () {
      this.FETCH_USERS()
      // this.$store.getters['GET_REVERSED_USERS']
      // this.$store.dispatch('FETCH_USERS')
      // this.SET_USERS([
      //   {
      //     "id": 1,
      //     "name": "Leanne Graham",
      //     "username": "Bret",
      //     "email": "Sincere@april.biz",
      //     "address": {
      //       "street": "Kulas Light",
      //       "suite": "Apt. 556",
      //       "city": "Gwenborough",
      //       "zipcode": "92998-3874",
      //       "geo": {
      //         "lat": "-37.3159",
      //         "lng": "81.1496"
      //       }
      //     },
      //     "phone": "1-770-736-8031 x56442",
      //     "website": "hildegard.org",
      //     "company": {
      //       "name": "Romaguera-Crona",
      //       "catchPhrase": "Multi-layered client-server neural-net",
      //       "bs": "harness real-time e-markets"
      //     }
      //   },
      // ])
      // this.$store.commit('SET_USERS', [
      //   {
      //     "id": 1,
      //     "name": "Leanne Graham",
      //     "username": "Bret",
      //     "email": "Sincere@april.biz",
      //     "address": {
      //       "street": "Kulas Light",
      //       "suite": "Apt. 556",
      //       "city": "Gwenborough",
      //       "zipcode": "92998-3874",
      //       "geo": {
      //         "lat": "-37.3159",
      //         "lng": "81.1496"
      //       }
      //     },
      //     "phone": "1-770-736-8031 x56442",
      //     "website": "hildegard.org",
      //     "company": {
      //       "name": "Romaguera-Crona",
      //       "catchPhrase": "Multi-layered client-server neural-net",
      //       "bs": "harness real-time e-markets"
      //     }
      //   },
      // ])
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
