<template>
  <div class="ledgers-container-item bg-primary" > 
    <label><b>Account Balance</b></label>
    <label>{{auth.displayAmountWithCurrency(auth.user.ledger.amount, auth.user.ledger.currency)}}</label>
    <span style="margin-bottom: 5px;">
      <button class="btn btn-warning pull-left" style="margin-top: 4px;" @click="showWithdrawModal(data)">Withdraw</button>
      <button class="btn btn-warning pull-right" style="margin-top: 4px;" @click="showDepositModal(data)">Deposit</button>
    </span>
    <deposit :item="selecteditem"></deposit>
    <withdraw :item="selecteditem"></withdraw>
  </div>
</template>
<style scoped lang="scss">
@import "~assets/style/colors.scss";
.bg-primary{
  background: $primary !important;
}
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
.rl-container-item{
  width: 100%;
  float: left;
  border-radius: 5px;
  min-height: 50px;
  overflow-y: hidden;
  border: solid 1px #ddd;
  margin-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
}
</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
export default{
  data(){
    return {
      user: AUTH.user,
      auth: AUTH,
      size: null,
      selecteditem: null,
      config: CONFIG,
      activePage: 0
    }
  },
  props: ['data'],
  components: {
    'deposit': require('modules/dashboard/Deposit.vue'),
    'withdraw': require('modules/transfer/Withdraw.vue'),
    'profile': require('modules/request/Profile.vue'),
    'report': require('modules/request/Report.vue'),
    'request-filter': require('modules/request/Filter.vue'),
    'ratings': require('components/increment/generic/rating/DirectRatings.vue'),
    'empty': require('components/increment/generic/empty/EmptyDynamicIcon.vue')
  },
  methods: {
    redirect(params){
      ROUTER.push(params)
    },
    showRequestModal(){
      $('#createRequestModal').modal('show')
    },
    showDepositModal(item){
      this.selecteditem = item
      $('#createDepositModal').modal('show')
    },
    showWithdrawModal(item){
      this.selecteditem = item
      $('#createWithdrawModal').modal('show')
    }
  }
}
</script>
