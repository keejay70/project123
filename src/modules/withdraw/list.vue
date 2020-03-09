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
        <button class="btn btn-primary pull-right btn-custom" @click="newWithdrawalFlag = !newWithdrawalFlag">New withdrawal</button>
      </span>
      <span class="inputs">
        <div class="alert alert-success" role="alert">
          Hi <b>{{user.username}}!</b> We are happy to serve you! Just a friendly reminder that the processing of the withdrawal will take up to 7 working days!
        </div>
      </span>
      <span class="inputs" v-if="newWithdrawalFlag === true">
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
          <input type="text" class="form-control form-control-custom" v-model="newWithdrawal.account_number" placeholder="Enter account number">
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Account Name <b class="text-danger">*</b></label>
          <input type="text" class="form-control form-control-custom" v-model="newWithdrawal.account_name" placeholder="Enter account name">
        </div>
      </span>
      <span class="sidebar" v-if="newWithdrawalFlag === true">
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
          <label class="pull-right"><b>{{auth.displayAmountWithCurrency(newWithdrawal.charge, newWithdrawal.currency)}}</b></label>
        </span>
        <button class="btn btn-warning pull-right btn-custom" style="margin-bottom: 10px; width: 100%!important;" @click="checkCharges()" v-if="newWithdrawal.charge === 0">Verify Charges</button>
        <button class="btn btn-primary pull-right btn-custom" style="margin-bottom: 10px;; width: 100%!important;" @click="withdrawals()" v-if="newWithdrawal.charge > 0">Withdraw</button>
        <button class="btn btn-danger pull-right btn-custom" style="margin-bottom: 100px; width: 100%!important;" @click="init()">Cancel</button>
      </span>
    </div>
    <div class="inputs" v-if="data !== null">
      <div><label><b>Pending transactions</b></label></div>
      <div class="summary-container-item" v-for="item, index in data" v-if="data !== null" @click="setActiveIndex(index)">
        <span class="header" style="padding-top: 10px;">
          <span style="width: 100%; float: left;">
            <label>Withdraw via {{item.bank}}</label>
            <label class="pull-right text-primary" style="padding-right: 10px;"><b>{{auth.displayAmountWithCurrency(item.amount + item.charge, item.currency)}}</b></label>
          </span>
          <span style="width: 100%; float: left; padding-bottom: 10px;">
            <label>
              {{item.created_at_human}}
            </label>
          </span>
        </span>
        <table class="table table-borderless text-center" v-if="activeIndex === index">
          <tr>
            <td>Transaction amount</td>
          </tr>
          <tr>
            <td class="text-gray">{{auth.displayAmountWithCurrency(item.amount, item.currency)}}</td>
          </tr>
          <tr>
            <td>Transaction charge</td>
          </tr>
          <tr>
            <td class="text-gray">{{auth.displayAmountWithCurrency(item.charge, item.currency)}}</td>
          </tr>
          <tr>
            <td>Account name</td>
          </tr>
          <tr>
            <td class="text-gray">{{item.account_name}}</td>
          </tr>
          <tr>
            <td>Account number</td>
          </tr>
          <tr>
            <td class="text-gray">{{item.account_number}}</td>
          </tr>
          <tr>
            <td>Transaction ID</td>
          </tr>
          <tr>
            <td class="text-gray">{{item.code}}</td>
          </tr>
          <tr>
            <td class="text-primary">Processing of the withdrawal will take up to 7 working days!</td>
          </tr>
        </table>
      </div>
    </div>
    <authenticate-otp ref="authenticateOTP" v-if="common.authorize === 'OTP'"></authenticate-otp>
    <authenticate-pin ref="authenticateOTP" v-if="common.authorize === 'PIN'"></authenticate-pin>
  </div>
</template>
<style lang="scss" scoped>
@import "~assets/style/colors.scss";
.ledger-summary-container{
  width: 100%;
  float: left;
  height: auto;
  margin-bottom: 100px;
  margin-top: 25px;
}

.summary-container-item{
  width: 100%;
  float: left;
  min-height: 50px;
  overflow-y: hidden;
  border: solid 1px #ddd;
  margin-top: 10px;
  padding-left: 10px;
  border-radius: 5px;
}

.summary-container-item:hover{
  cursor: pointer;
  border: solid 1px $primary;
}
.summary-container-item .header{
  width: 100%;
  float: left;
}

.text-gray{
  color: $gray;
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

.form-control-custom, td{
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
    this.retrieve()
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
        account_name: null,
        account_number: null,
        charge: 0,
        account_id: 0
      },
      config: CONFIG,
      errorMessage: null,
      common: COMMON,
      newWithdrawalFlag: false,
      activeIndex: null
    }
  },
  components: {
    'basic-filter': require('components/increment/generic/filter/Basic.vue'),
    'authenticate-otp': require('modules/transfer/Otp.vue'),
    'authenticate-pin': require('modules/transfer/Pin.vue')
  },
  methods: {
    redirect(params){
      ROUTER.push(params)
    },
    setActiveIndex(index){
      if(index === this.activeIndex){
        this.activeIndex = null
      }else{
        this.activeIndex = index
      }
    },
    retrieve(){
      let parameter = {
        condition: [{
          column: 'account_id',
          value: this.user.userID,
          clause: '='
        }, {
          column: 'status',
          value: 'pending',
          clause: '='
        }],
        sort: {
          created_at: 'desc'
        },
        account_id: this.user.userID
      }
      $('#loading').css({display: 'block'})
      this.APIRequest('withdrawals/retrieve', parameter).then(response => {
        $('#loading').css({display: 'none'})
        if(response.data.length > 0){
          this.data = response.data
          AUTH.user.ledger.amount = response.ledger
          this.newWithdrawalFlag = false
        }else{
          this.data = null
          AUTH.user.ledger.amount = response.ledger
          this.newWithdrawalFlag = true
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
      if(this.newWithdrawal.amount > COMMON.MAXIMUM_WITHDRAWAL){
        this.errorMessage = 'Maximum transaction is ' + AUTH.displayAmountWithCurrency(COMMON.MAXIMUM_WITHDRAWAL, 'PHP')
        return
      }
      if(this.newWithdrawal.account_name === null || this.newWithdrawal.account_name === ''){
        this.errorMessage = 'Account name is required.'
        return
      }
      if(this.newWithdrawal.account_number === null || this.newWithdrawal.account_number === ''){
        this.errorMessage = 'Account number is required.'
        return
      }
      let total = parseInt(this.newWithdrawal.amount) + this.newWithdrawal.charge
      if(total > AUTH.user.ledger.amount){
        this.errorMessage = 'You have an insufficient balance.'
        return
      }
    },
    init(){
      this.newWithdrawal = {
        currency: 'PHP',
        amount: 0,
        bank: null,
        account_name: null,
        account_number: null,
        charge: 0,
        account_id: this.user.userID
      }
      this.newWithdrawalFlag = false
    },
    withdrawals(){
      let total = parseInt(this.newWithdrawal.amount) + this.newWithdrawal.charge
      if(total <= AUTH.user.ledger.amount){
        this.$refs.authenticateOTP.show()
      }else{
        this.errorMessage = 'You have an insufficient balance.'
      }
    },
    successOTP(){
      this.validate()
      this.newWithdrawal.account_id = this.user.userID
      this.APIRequest('withdrawals/create', this.newWithdrawal).then(response => {
        this.retrieve()
        this.init()
      })
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
      this.APIRequest('transfer_charges/retrieve', paremeter).then(response => {
        $('#loading').css({display: 'none'})
        this.errorMessage = null
        if(response.data.length > 0){
          this.newWithdrawal.charge = response.data[0].charge
        }else{
          this.newWithdrawal.charge = 0
          this.errorMessage = 'Charge not found!'
        }
      })
    }
  }
}
</script>
