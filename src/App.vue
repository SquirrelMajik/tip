<template>
  <div id="app">
    <tip-sidebar></tip-sidebar>
    <router-view/>
  </div>
</template>

<script>
import TipSidebar from '@/components/TipSidebar'

export default {
  name: 'app',
  components: { TipSidebar }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
