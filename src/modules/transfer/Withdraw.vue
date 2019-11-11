<template>
  <div class="modal fade" id="createWithdrawModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Withdrawal</h5>
          <button type="button" class="close" @click="hideModal()" aria-label="Close">
            <span aria-hidden="true" class="text-primary">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <!-- Step 1 inputs -->
          <span v-if="errorMessage !== null" class="text-danger text-center">
              <label><b>Opps! </b>{{errorMessage}}</label>
          </span>

          <div v-if="step === 1">
            <br v-if="errorMessage !== null">
            <div class="form-group">
              <label for="exampleInputEmail1">Select options:</label>
              <select class="form-control" v-model="payment.type">
                <option v-for="(item, index) in common.payments" :key="index" :value="item.title" class="form-control">{{item.title}}</option>
              </select>
            </div>
          </div>
          <div v-if="step === 1 && payment.type !== null">
            <br v-if="errorMessage !== null">
            <div class="form-group">
              <label for="exampleInputEmail1">Account Name</label>
              <input type="text" class="form-control" v-model="payment.account.name" placeholder="Enter account name">                           
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Account Number</label>
              <input type="number" class="form-control" v-model="payment.account.number" placeholder="Enter account number">
            </div>
            <div class="form-group" v-if="payment.account.number !== null && payment.account.name !== null">
              <label for="exampleInputEmail1">Amount to withdraw</label>
              <input type="number" class="form-control" v-model="payment.withdrawal.amount" placeholder="Enter amount">
            </div>
          </div>

          <div v-if="step === 2">
            <div class="form-group">
              <label>Summary</label>
              <span class="incre-row transfer-details">
                <label>Current balance</label>
                <label class="pull-right"><b>{{auth.displayAmount(this.item)}}</b></label>
              </span>
              <span class="incre-row transfer-details">
                <label>Withdrawal amount</label>
                <label class="pull-right"><b>{{auth.displayAmount(this.payment.withdrawal.amount)}}</b></label>
              </span>
              <span class="incre-row transfer-details">
                <label>Withdrawal charge</label>
                <label class="pull-right"><b>{{auth.displayAmount(this.payment.charge)}}</b></label>
              </span>
              <span class="incre-row transfer-details" style="border-top: solid 1px #ccc;">
                <label>Remaining balance</label>
                <label class="pull-right"><b>{{auth.displayAmount(this.item - (this.payment.charge + this.payment.withdrawal.amount))}}</b></label>
              </span>
            </div>
          </div>

          <!-- Step 3 OTP -->

          <div v-if="step === 3">
            <div class="form-group">
              <label for="exampleInputEmail1 text-gray">
                Please enter the OTP Code sent to your email address.
              </label>
              <input type="text" class="form-control" v-model="otp" placeholder="123456">
            </div>
            <div class="form-group text-gray">
              <label>Didn't received an email? Click the link below.</label>
              <label class="text-center action-link text-primary">Resend</label>
            </div>
          </div>

          <!-- Step 3 Deduct -->
          <div v-if="step === 4" class="text-center">
            <i class="fa fa-check text-primary" style="font-size: 100px"></i>
            <label class="text-primary">Your transaction was succcessfully sent!</label>
          </div>

        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-danger" @click="hideModal()" v-if="loading === false">Cancel</button>
            <button type="button" class="btn btn-primary" @click="next()" v-if="step === 1 && loading === false">Next
            </button>
            <button type="button" class="btn btn-primary" @click="next()" v-if="step === 2 && loading === false">
              Continue
            </button>
            <button type="button" class="btn btn-primary" @click="next()" v-if="step === 3 && loading === false">
              Verify
            </button>
            <label v-if="loading === true" class="text-primary">
              Checking <i class="fas fa-circle-o-notch fa-spin"></i>
            </label>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "~assets/style/colors.scss";
.container {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 12px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default radio button */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

/* Create a custom radio button */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
  border-radius: 50%;
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  background-color: #ccc;
}

.form-radio-item {
padding-bottom: 15px;
padding-top: 15px;
}

/* When the radio button is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: #2196F3;
}

/* Create the indicator (the dot/circle - hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the indicator (dot/circle) when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the indicator (dot/circle) */
.container .checkmark:after {
  top: 9px;
  left: 9px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: white;
}
.form-control{
  min-height: 30px !important;
  overflow-y: hidden;
}
.input-group{
  margin-bottom: 15px !important;
}
.input-group-addon{
  width: 100px !important;
  background: #22b173 !important;
  color: #fff !important;
}
.modal{
  color: black !important;
}

.fa-spin{
  animation-duration: 0.50s;
}

.transfer-details label{
  line-height: 30px;
}
</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
import COMMON from 'src/common.js'
export default {
  data(){
    return {
      user: AUTH.user,
      auth: AUTH,
      config: CONFIG,
      payment: {
        type: null,
        account: {
          name: null,
          number: null
        },
        withdrawal: {
          amount: null
        },
        charge: null
      },
      errorMessage: null,
      step: 1,
      otpUseCounter: 0,
      otp: '',
      payload: null,
      loading: false,
      common: COMMON
    }
  },
  props: ['item'],
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    },
    hideModal(){
      $('#createWithdrawModal').modal('hide')
      this.step = 1
      this.errorMessage = null
      this.payment = {
        type: null,
        account: {
          name: null,
          number: null
        },
        withdrawal: {
          amount: null
        }
      }
    },
    next(){
      if(this.step === 1){
        if(this.payment.type == null){
          this.errorMessage = 'Please select a service.'
        }else if(this.payment.account.name == null){
          this.errorMessage = null
          this.errorMessage = 'Please input account name.'
        }else if(this.payment.account.number == null){
          this.errorMessage = null
          this.errorMessage = 'Please input account number.'
        }else if(this.payment.withdrawal.amount == null){
          this.errorMessage = null
          this.errorMessage = 'Please withdrawal.'
        }else{
          this.errorMessage = null
          this.charges()
        }
      }else if(this.step === 2){
        this.withdrawal(0)
      }else if(this.step === 3){
        this.verifyOtp()
      }
    },
    charges(){
      let paremeter = {
        condition: [{
          column: 'min_amount',
          clause: '<=',
          value: this.payment.withdrawal.amount
        }, {
          column: 'max_amount',
          clause: '>=',
          value: this.payment.withdrawal.amount
        }, {
          column: 'type',
          clause: '=',
          value: this.payment.type
        }]
      }
      this.APIRequest('transfer_charges/retrieve', paremeter).then(response => {
        this.errorMessage = null
        if(response.data.length > 0){
          this.payment.charge = response.data[0].charge
          this.step++
        }else{
          this.payment.charge = null
          this.errorMessage = 'Charge not found!'
        }
      })
    },
    withdrawal(otp){
      let amount = parseFloat(this.payment.withdrawal.amount)
      console.log(this.item)
      let remainingAmount = parseFloat(this.item) - amount
      if(amount < COMMON.MINIMUM_WITHDRAWAL){
        this.errorMessage = 'The minimum withdrawal is PHP ' + COMMON.MINIMUM_WITHDRAWAL + '.'
      }else if(remainingAmount < 0){
        this.errorMessage = 'Insufficient Balance! Your withdrawal amount is greater than your current balance.'
      }else if(amount <= parseFloat(this.item)){
        this.errorMessage = null
        let parameter = {
          account_id: this.user.userID,
          amount: this.payment.withdrawal.amount,
          payload: this.payment.type,
          payload_value: this.payment.account.name + '/' + this.payment.account.number,
          otp_code: this.otp,
          otp: otp
        }
        this.loading = true
        this.APIRequest('withdrawals/create', parameter, response => {
          this.loading = false
          if(response.data !== null){
            // this.$parent.retrieve({column: 'created_at', value: 'asc'})
            this.step++
          }else if(response.otp === true){
            this.step++
          }else{
            this.errorMessage = response.error
          }
        }, () => {
          this.loading = false
        })
      }
    },
    verifyOtp(){
      let parameter = {
        condition: [{
          value: this.user.userID,
          column: 'account_id',
          clause: '='
        }, {
          value: this.otp,
          column: 'code',
          clause: '='
        }]
      }
      let flag = false
      if(isNaN(this.otp) || this.otp.length < 6){
        this.errorMessage = 'Invalid Code. Click resend to get new Code.'
      }
      this.otpUseCounter++
      if(this.otpUseCounter > 1){
        this.errorMessage = 'OTP Code can only be use once.'
      }
      this.loading = true
      this.APIRequest('notification_settings/retrieve', parameter).then(response => {
        if(response.data.length > 0){
          this.withdrawal(1)
          this.step++
          this.hideModal()
        }else{
          this.errorMessage = 'Invalid Code. Click resend to get new code'
        }
      })
    }
  }
}
</script>
