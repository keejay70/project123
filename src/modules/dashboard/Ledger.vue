<template>
  <div class="ledgers-container-item bg-primary">
    <label><b>Account Balance</b></label>
    <label v-if="data !== null">{{auth.displayAmount(data)}}</label>
    <span style="margin-bottom: 5px;">
      <button class="btn btn-primary">Withdraw</button>
      <button class="btn btn-warning pull-right" style="margin-top: 4px;">Deposit</button>
    </span>
  </div>
</template>
<style scoped>
.ledgers-container-item{
  width: 100%;
  float: left;
  min-height: 50px;
  overflow-y: hidden;
  border: solid 1px #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
}
.ledgers-container-item label, .ledgers-container-item span{
  width: 96%;
  float: left;
  height: 40px;
  line-height: 40px;
  margin-left: 2%;
  margin-right: 2%;
  padding: 0px;
  margin-bottom: 0px;
}
</style>
<script>
import ROUTER from '../../router'
import AUTH from '../../services/auth'
import CONFIG from '../../config.js'
export default{
  data(){
    return {
      user: AUTH.user,
      auth: AUTH
    }
  },
  props: ['data'],
  methods: {
  }

}
</script>
