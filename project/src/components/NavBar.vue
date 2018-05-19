<template>
  <nav :style="styleObj">
    <router-link to="/">
      Home
    </router-link>
    <br />
    <router-link to="/">
      {{fetchingUsers ? 'Fetching USERS...' : 'Users ' + users.length}}
    </router-link>
    <br />
    <router-link to="/posts/list">
      Posts List
    </router-link>
    <br />
    <router-link to="/map">
      Map
    </router-link>
    <br />
  </nav>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'NavBar',
  props: {
    styleObj: {
      type: Object,
    }
  },
  data () {
    return {}
  },
  computed: {
    ...mapState(['fetchingUsers', 'users', 'fetchingPosts', 'posts']),
    ...mapGetters(['GET_REVERSED_USERS']),
  },
  methods: {
    ...mapMutations(['SET_FETCHING', 'SET_USERS']),
    ...mapActions(['FETCH_USERS']),
    loadUsers () {
      this.FETCH_USERS()
    },
  },
  mounted () {
    this.loadUsers()
  }
}
</script>

<style scoped>

</style>
