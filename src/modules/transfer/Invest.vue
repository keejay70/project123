<template>
  <div class="modal fade" id="createTransferModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Invest</h5>
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
              <label for="exampleInputEmail1">Amount to invest</label>
              <input type="number" class="form-control" v-model="newInput.amount">
            </div>

            <div class="form-group">
              <label for="exampleInputEmail1">Message to borrower</label>
              <textarea rows="10" v-model="newInput.message" class="form-control" placeholder="Optional">
                
              </textarea>
            </div>
          </div>

          <!-- Step 2 OTP -->

          <div v-if="step === 2">
            <div class="form-group text-center">
              <label for="exampleInputEmail1 text-gray">
                Please enter the OTP Code sent to your email address.
              </label>
              <input type="text" class="form-control" v-model="otp" placeholder="123456">
            </div>
            <div class="form-group text-center text-gray">
              <label>Didn't received an email? Click the link below.</label>
              <label class="text-center action-link text-primary">Resend</label>
            </div>
          </div>

          <!-- Step 3 Deduct -->
          <div v-if="step === 3" class="text-center">
            <i class="fa fa-check text-primary" style="font-size: 100px"></i>
            <label class="text-primary">Your transaction was succcessfully sent!</label>
          </div>

        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-danger" @click="hideModal()" v-if="loading === false">Cancel</button>
            <button type="button" class="btn btn-primary" @click="next()" v-if="step === 1 && loading === false">Invest
            </button>
            <button type="button" class="btn btn-primary" @click="next()" v-if="step === 2 && loading === false">
              Vefify
            </button>
            <label v-if="loading === true" class="text-primary">
              Checking <i class="fas fa-circle-o-notch fa-spin"></i>
            </label>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>

.form-control{
  min-height: 45px !important;
  overflow-y: hidden;
}
.input-group{
  margin-bottom: 10px !important;
}
.input-group-addon{
  width: 100px !important;
  background: #22b173 !important;
  color: #fff !important;
}

.fa-spin{
  animation-duration: 0.50s;
}
</style>
<script>
import ROUTER from '../../router'
import AUTH from '../../services/auth'
import CONFIG from '../../config.js'
export default {
  data(){
    return {
      user: AUTH.user,
      config: CONFIG,
      errorMessage: null,
      step: 1,
      newInput: {
        amount: 0,
        message: null
      },
      otpUseCounter: 0,
      otp: '',
      payload: 'invest',
      loading: false
    }
  },
  props: ['item'],
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    },
    hideModal(){
      $('#createTransferModal').modal('hide')
    },
    next(){
      if(this.step === 1){
        if(this.payload === 'invest'){
          this.invest(0)
        }
      }else if(this.step === 2){
        this.verifyOtp()
      }
    },
    invest(otp){
      let amount = parseFloat(this.newInput.amount)
      let remainingAmount = parseFloat(this.item.amount) - amount
      if(remainingAmount < this.config.MINIMUM_INVESTMENT && remainingAmount > 0){
        this.errorMessage = 'Remaining amount should not be less than the minimum amount of investment.'
      }else if(amount < this.config.MINIMUM_INVESTMENT){
        this.errorMessage = 'The minimum investment is PHP ' + this.config.MINIMUM_INVESTMENT + '.'
      }else if(amount <= parseFloat(this.item.amount)){
        this.errorMessage = null
        this.newInput['account_id'] = this.user.userID
        this.newInput['request_id'] = this.item.id
        this.newInput['minimum'] = this.config.MINIMUM_INVESTMENT
        this.newInput['otp'] = otp
        this.loading = true
        this.APIRequest('investments/create', this.newInput, response => {
          this.loading = false
          if(response.data !== null){
            this.hideModal()
            this.$parent.retrieve({column: 'created_at', value: 'asc'})
            this.step++
          }else if(response.otp === true){
            this.step++
          }else{
            this.errorMessage = response.error
          }
        }, () => {
          this.loading = false
        })
      }else{
        this.errorMessage = 'Amount must be less than to the borrowed amount.'
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
          this.invest(1)
          this.step++
        }else{
          this.errorMessage = 'Invalid Code. Click resend to get new code'
        }
      })
    }
  }
}
</script>
