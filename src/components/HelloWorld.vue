<template>
  <div class="hello">
    <tip-header left-icon="menu"></tip-header>
  </div>
</template>

<script>
import TipHeader from '@/components/TipHeader'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: ''
    }
  },
  components: { TipHeader }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
