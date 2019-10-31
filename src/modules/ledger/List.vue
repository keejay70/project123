<template>
  <div class="ledger-summary-container">
    <div class="ledger-summary-container-header">
      <ledger-filter :size="size"></ledger-filter>
    </div>
    <div class="summary-container-item" v-for="item, index in data" v-if="data !== null">
      <span class="header">{{item.created_at_human}}</span>
      <span class="body">
        <label>
          {{item.description}}
        </label>
        <label v-if="item.payload === 'investments'">
          <b class="text-primary action-link" @click="redirect('/requests/' + item.investments)">request</b>
        </label>
        <label  v-bind:class="{'text-danger': parseFloat(item.amount) <= 0, 'text-primary': parseFloat(item.amount) > 0}"class="pull-right amount"><b>{{auth.displayAmount(item.amount)}}</b></label>
      </span>
      <span class="footer"></span>
    </div>
    <empty v-if="data === null" :title="'Looks like your ledger is empty!'" :action="'Deposit now or start requesting money.'"></empty>
  </div>
</template>
<style scoped>
.ledger-summary-container{
  width: 60%;
  float: left;
  height: auto;
  margin-bottom: 100px;
}

.ledger-summary-container-header{
  width: 100%;
  float: left;
  height: 70px;
  border: solid 1px #ddd;
}
.summary-container-item{
  width: 100%;
  float: left;
  border-radius: 5px;
  min-height: 50px;
  overflow-y: hidden;
  border: solid 1px #ddd;
  margin-top: 10px;
  padding-left: 10px;
}
.summary-container-item .header{
  width: 100%;
  float: left;
  height: 50px;
  line-height: 50px;
  color: #555;
}
.summary-container-item .body{
  width: 100%;
  float: left;
  min-height: 50px;
  overflow-y: hidden;
  padding-right: 10px;
}

.summary-container-item .amount{
}
</style>
<script>
import ROUTER from '../../router'
import AUTH from '../../services/auth'
import CONFIG from '../../config.js'
export default{
  mounted(){
    this.retrieve({column: 'created_at', value: 'desc'})
  },
  data(){
    return {
      user: AUTH.user,
      data: null,
      activePage: 0,
      size: 0,
      auth: AUTH
    }
  },
  components: {
    'empty': require('components/increment/generic/empty/Empty.vue'),
    'ledger-filter': require('modules/ledger/Filter.vue')
  },
  methods: {
    redirect(params){
      ROUTER.push(params)
    },
    retrieve(sort){
      let parameter = {
        account_id: this.user.userID,
        offset: 0,
        limit: 50,
        sort: sort
      }
      $('#loading').css({display: 'none'})
      this.APIRequest('ledgers/summary', parameter).then(response => {
        $('#loading').css({display: 'none'})
        if(response.data !== null){
          this.data = response.data
          this.size = this.data.length
        }else{
          this.data = null
          this.size = null
        }
      })
    }
  }
}
</script>
