<template>
  <div class="home" :style="gridStyle">
    <nav-bar :styleObj="leftStyle" />
    <d3-bars-chart :styleObj="rightStyle" />
  </div>
</template>

<script>
  // @ is an alias to /src
  import NavBar from '@/components/NavBar'
  import D3BarsChart from '@/components/D3BarsChart'

  export default {
    name: 'chart',
    components: {
      NavBar,
      D3BarsChart,
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
