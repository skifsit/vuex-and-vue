<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  // import 'bulma/css/bulma.css'
  export default {}
</script>

<style lang="sass">
  @import "~bulma/sass/utilities/initial-variables"
  @import "~bulma/sass/utilities/functions"

  $primary: #20ebc9

  @import "~bulma/sass/utilities/derived-variables"

  @import "~bulma"

  #app
    font-family: 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    text-align: center
    color: #2c3e50


</style>
