<template>
  <div class="ledgers-container-item bg-primary" > 
    <label><b>Account Balance</b></label>
    <label>{{auth.displayAmount(data)}}</label>
    <span style="margin-bottom: 5px;">
      <button class="btn btn-primary">Withdraw</button>
      <button class="btn btn-warning pull-right" style="margin-top: 4px;" @click="showDepositModal(data)">Deposit</button>
    </span>
		<deposit :item="selecteditem"></deposit>
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
import ROUTER from '../../router'
import AUTH from '../../services/auth'
import CONFIG from '../../config.js'
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
    'deposit': require('modules/request/Deposit.vue'),
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
    }
  }
}
</script>
