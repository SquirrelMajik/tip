<template>
  <div class="accounts">
    <tip-header left-icon="back"></tip-header>
    <div class="accounts-list">
      <div class="account" v-for="account in accounts">
        {{ account }}
      </div>
    </div>
  </div>
</template>

<script>
import TipHeader from '@/components/TipHeader'

export default {
  name: 'Accounts',
  data () {
    return {
      accounts: Array(30).map((_, i) => i)
    }
  },
  methods: {

  },
  components: { TipHeader }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.accounts-list {
  padding: 0 12px;
  height: calc(100vh - 48px);
  overflow: auto;
}

.account {
  height: 50px;
  background-color: lightblue;
  border-radius: 8px;
  margin-top: 12px;
  box-shadow: 1px 1px 5px #bbb;
  transition: box-shadow .3s ease;
}

.account:hover {
  box-shadow: 1px 1px 10px #bbb;
}
</style>
