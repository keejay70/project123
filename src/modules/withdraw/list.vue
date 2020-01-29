<template>
  <div class="ledger-summary-container">
<!--     <basic-filter 
      v-bind:category="category" 
      :activeCategoryIndex="0"
      :activeSortingIndex="0"
      @changeSortEvent="retrieve($event.sort, $event.filter)"
      @changeStyle="manageGrid($event)"
      :grid="['list', 'th-large']"></basic-filter> -->
    <div>
      <span class="inputs">
        <div class="alert alert-success" role="alert">
          Hi <b>{{user.username}}!</b>We are happy to serve you! Just a friendly reminder that the processing of the withdrawal will take up to 7 working days!
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Select Bank <b class="text-danger">*</b></label>
          <select class="form-control form-control-custom" v-model="newWithdrawal.bank">
            <option v-for="(item, index) in common.payments" :key="index" :value="item.title" class="form-control">{{item.title}}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Select Currency <b class="text-danger">*</b></label>
          <select class="form-control form-control-custom" v-model="newWithdrawal.currency">
            <option v-for="(item, index) in common.currencies" :key="index" :value="item.value" class="form-control">{{item.title}} - {{item.value}}</option>
          </select>
        </div>
        <div class="form-group" style="margin-top: 25px;">
          <label for="address">Amount <b class="text-danger">*</b></label>
          <input type="number" class="form-control form-control-custom" placeholder="Type Amount" v-model="newWithdrawal.amount">
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Account Number <b class="text-danger">*</b></label>
          <input type="text" class="form-control form-control-custom" v-model="newWithdrawal.accountNumber" placeholder="Enter account number">
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Account Name <b class="text-danger">*</b></label>
          <input type="text" class="form-control form-control-custom" v-model="newWithdrawal.accountName" placeholder="Enter account name">
        </div>
      </span>
      <span class="sidebar">
        <span class="sidebar-header" style="margin-top: 25px;"><b>Summary</b></span>
        <span class="incre-row" v-if="errorMessage !== null">
          <label class="text-danger" style="width: 100%;"><b>Opps!</b> {{errorMessage}}</label>
        </span>
        <span  class="incre-row" style="line-height: 45px;">
          <label class="pull-left">Your current balance</label>
          <label class="pull-right text-primary"><b>{{auth.displayAmountWithCurrency(auth.user.ledger.amount, auth.user.ledger.currency)}}</b></label>
        </span>
        <span  class="incre-row" style="line-height: 45px;">
          <label class="pull-left">Amount</label>
          <label class="pull-right"><b>{{auth.displayAmountWithCurrency(newWithdrawal.amount, newWithdrawal.currency)}}</b></label>
        </span>
        <span  class="incre-row" style="line-height: 45px;">
          <label class="pull-left">Charge</label>
          <label class="pull-right"><b>{{auth.displayAmountWithCurrency(newWithdrawal.charges.amount, newWithdrawal.charges.currency)}}</b></label>
        </span>
        <button class="btn btn-warning pull-right btn-custom" style="margin-bottom: 100px; width: 100%!important;" @click="checkCharges()" v-if="newWithdrawal.charges.amount === 0">Verify Charges</button>
        <button class="btn btn-primary pull-right btn-custom" style="margin-bottom: 100px; width: 100%!important;" @click="withdrawals()" v-if="newWithdrawal.charges.amount > 0">Withdraw</button>
      </span>
    </div>
    <table class="table table-bordered table-responsive" v-if="data !== null">
      <thead>
        <td>Transfer via</td>
        <td>Details</td>
        <td>Amount</td>
        <td>Charge</td>
        <td>Status</td>
        <td>Date</td>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="index">
          <td>{{item.payload}}</td>
          <td>{{item.payload_value}}</td>
          <td>{{auth.displayAmount(item.amount)}}</td>
          <td>{{auth.displayAmount(item.charge)}}</td>
          <td style="text-transform: UPPERCASE">{{item.status}}</td>
          <td>{{item.created_at_human}}</td>
        </tr>
      </tbody>
    </table>
    <authenticate-otp ref="authenticateOTP"></authenticate-otp>
  </div>
</template>
<style scoped>
.ledger-summary-container{
  width: 100%;
  float: left;
  height: auto;
  margin-bottom: 100px;
  margin-top: 25px;
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
.inputs{
  width: 60%;
  float: left;
  min-height: 50px;
  overflow-y: hidden;
  margin-right: 5%;
}

.sidebar{
  width: 35%;
  float: left;
  min-height: 50px;

  overflow-y: hidden;
}

.form-control-custom{
  height: 45px !important;
}

.btn-custom{
  height: 45px !important;
}

@media (max-width: 992px){
  .ledger-summary-container{
    width: 100%;
  }
  .sidebar, .inputs{
    width: 100%;
    margin-right: 0%;
    margin-left: 0%;
  }
}
</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
import COMMON from 'src/common.js'
export default{
  mounted(){
    this.retrieve({created_at: 'desc'}, {column: 'created_at', value: ''})
  },
  data(){
    return {
      auth: AUTH,
      user: AUTH.user,
      data: null,
      newWithdrawal: {
        currency: 'PHP',
        amount: 0,
        bank: null,
        accountName: null,
        accountNumber: null,
        charges: {
          currency: 'PHP',
          amount: 0
        }
      },
      config: CONFIG,
      errorMessage: null,
      common: COMMON
    }
  },
  components: {
    'basic-filter': require('components/increment/generic/filter/Basic.vue'),
    'authenticate-otp': require('modules/transfer/Otp.vue')
  },
  methods: {
    redirect(params){
      ROUTER.push(params)
    },
    retrieve(sort, filter){
      let parameter = {
        condition: [{
          column: 'account_id',
          value: this.user.userID,
          clause: '='
        }, {
          column: filter.column,
          clause: 'like',
          value: filter.value + '%'
        }],
        sort: sort,
        account_id: this.user.userID
      }
      $('#loading').css({display: 'block'})
      this.APIRequest('withdrawals/retrieve', parameter).then(response => {
        $('#loading').css({display: 'none'})
        if(response.data.length > 0){
          this.data = response.data
          AUTH.user.ledger.amount = response.ledger
        }else{
          this.data = null
          AUTH.user.ledger.amount = response.ledger
        }
      })
    },
    validate(){
      this.errorMessage = null
      if(this.newWithdrawal.bank === null || this.newWithdrawal.bank === ''){
        this.errorMessage = 'Bank is required.'
        return
      }
      if(this.newWithdrawal.amount < COMMON.MINIMUM_WITHDRAWAL){
        this.errorMessage = 'Minimum transaction is ' + AUTH.displayAmountWithCurrency(COMMON.MINIMUM_WITHDRAWAL, 'PHP')
        return
      }
      if(this.newWithdrawal.accountName === null || this.newWithdrawal.accountName === ''){
        this.errorMessage = 'Account name is required.'
        return
      }
      if(this.newWithdrawal.accountNumber === null || this.newWithdrawal.accountNumber === ''){
        this.errorMessage = 'Account number is required.'
        return
      }
    },
    withdrawals(){
      this.$refs.authenticateOTP.show()
    },
    successOTP(){
      console.log('')
    },
    checkCharges(){
      this.validate()
      if(this.errorMessage !== null){
        return
      }
      let paremeter = {
        condition: [{
          column: 'min_amount',
          clause: '<=',
          value: this.newWithdrawal.amount
        }, {
          column: 'max_amount',
          clause: '>=',
          value: this.newWithdrawal.amount
        }, {
          column: 'type',
          clause: '=',
          value: this.newWithdrawal.bank
        }]
      }
      $('#loading').css({display: 'block'})
      this.newWithdrawal.charges.currency = this.newWithdrawal.currency
      this.APIRequest('transfer_charges/retrieve', paremeter).then(response => {
        $('#loading').css({display: 'none'})
        this.errorMessage = null
        if(response.data.length > 0){
          this.newWithdrawal.charges.amount = response.data[0].charge
        }else{
          this.newWithdrawal.charges.amount = 0
          this.errorMessage = 'Charge not found!'
        }
      })
    }
  }
}
</script>
