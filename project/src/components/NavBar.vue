<template>
  <nav :style="styleObj">
    <router-link to="/">
      Home
    </router-link>
    <br />
    <router-link to="/">
      Dashboard
    </router-link>
    <br />
    <router-link to="/">
      Charts
    </router-link>
    <br />
    <router-link to="/">
      Settings
    </router-link>
    <br />
    <router-link to="/">
      LogOut
    </router-link>
    <br />
    <router-link to="/">
      {{fetching ? 'Fetching...' : 'Users ' + users.length}}
    </router-link>
    <br />
    {{a}}
    {{ab}}
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
    return {
      a: 1
    }
  },
  // computed: mapState({
  //   'fetchingUsers': 'fetching',
  //   'usersList': 'users',
  // }),
  computed: {
    ab () {
      return this.a + this.a
    },
    ...mapState(['fetching', 'users']),
    ...mapGetters(['GET_REVERSED_USERS']),
  },
  methods: {
    ...mapMutations(['SET_FETCHING', 'SET_USERS']),
    ...mapActions(['FETCH_USERS']),
    loadUsers () {
      // this.$store.dispatch('FETCH_USERS')
      this.FETCH_USERS()
    }
  },
  mounted () {
    setTimeout(() => {
      this.a = 5
    }, 5000)
    this.loadUsers()
  }
}
</script>

<style scoped>

</style>
