<template>
  <div class="tip-sidebar">
    <n3-aside placement="left" title="Title" width="100vw" ref="asideLeft">
      <div class="content">

      </div>
    </n3-aside>
  </div>
</template>

<script>
export default {
  name: 'TipSidebar',
  data () {
    let factory = this.$resource('/accounts/<id>')
    return {
      shown: false,
      factory: factory,
      accounts: factory.$query()
    }
  },
  methods: {
    show () {
      this.$refs.asideLeft.open()
      this.shown = true
      return this
    },
    hide () {
      this.$refs.asideLeft.close()
      this.shown = false
      return this
    },
    toggle () {
      let action = this.shown ? this.close : this.open
      return action()
    }
  },
  created () {
    this.$services.register('sidebar', this)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
