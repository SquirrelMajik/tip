<template>
  <div class="tip-header">
    <span class="tip-header-icon"
          v-show="leftIcon == 'menu'"
          @click="showSidebar()">
      <n3-icon type="bars" size="20px"></n3-icon>
    </span>
    <span class="tip-header-icon"
          v-show="leftIcon == 'back'"
          @click="back()">
      <n3-icon type="chevron-left" size="20px"></n3-icon>
    </span>
    <span class="tip-title">{{ title }}</span>
    <span class="tip-header-icon">
      <n3-icon type="plus" size="20px"></n3-icon>
    </span>
  </div>
</template>

<script>
export default {
  name: 'TipHeader',
  props: ['leftIcon', 'rightIcon'],
  data () {
    return {
      title: 'Test'
    }
  },
  methods: {
    showSidebar () {
      this.$services.$sidebar.show()
    },
    back () {
      this.$router.back()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tip-header {
  display: flex;
  height: 48px;
  background: lightcoral;
  box-shadow: 1px 1px 10px #bbb;
}

.tip-header-icon {
  width: 48px;
  height: 48px;
  line-height: 48px;
  text-align: center;
}

.tip-header-icon * {
  line-height: 48px;
}

.tip-title {
  flex: 1;
  text-align: center;
  font-size: 24px;
  height: 48px;
  line-height: 48px;
  text-align: center;
}
</style>
