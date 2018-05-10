<template>
  <div class="home" :style="gridStyle">
    <nav-bar :styleObj="leftStyle" />
    <posts-list :styleObj="rightStyle" />
  </div>
</template>

<script>
  // @ is an alias to /src
  import NavBar from '@/components/NavBar'
  import PostsList from '@/components/PostsList'

  export default {
    name: 'posts',
    components: {
      NavBar,
      PostsList,
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
