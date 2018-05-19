<template>
  <div class="home" :style="gridStyle">
    <nav-bar :styleObj="leftStyle" />
    <l-map :styleObj="rightStyle" />
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  // @ is an alias to /src
  import NavBar from '@/components/NavBar'
  import LMap from '@/components/LMap'
  import store from '../store'
  import mapModule from '../modules/map'

  store.registerModule('mapModule', mapModule)

  export default {
    name: 'posts',
    components: {
      NavBar,
      LMap,
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
    },
    methods: {
      ...mapActions('mapModule', ['FETCH_LOCATIONS'])
    },
    mounted () {
      // console.log(this.$store._modulesNamespaceMap.mapModule)
      this.FETCH_LOCATIONS()
      // this.$store._modulesNamespaceMap['mapModule/'].context.dispatch('FETCH_LOCATIONS')
      // this.$store.dispatch('mapModule', 'FETCH_LOCATIONS')
    }
  }
</script>
