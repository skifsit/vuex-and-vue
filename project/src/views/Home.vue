<template>
  <div class="home" :style="gridStyle">
    <nav-bar :styleObj="leftStyle" />
    <users-list :styleObj="rightStyle" />
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar'
import UsersList from '@/components/UsersList'

export default {
  name: 'home',
  components: {
    NavBar,
    UsersList,
  },
  data () {
    return { // CSS Grid
      gridStyle: {
        display: 'grid',
        gridTemplate: '1fr / 1fr 5fr'
      },
      leftStyle: {
        gridArea: '1 / 1 / 1 / 1'
      },
      rightStyle: {
        gridArea: '1 / 2 / 1 / 2'
      }
    }
  }
}
</script>
