<template>
  <div class="modal fade" id="authenticateOTP" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Authentication via OTP</h5>
          <button type="button" class="close" @click="hideModal()" aria-label="Close">
            <span aria-hidden="true" class="text-primary">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <!-- Step 1 inputs -->
          <span v-if="errorMessage !== null" class="text-danger text-center">
              <label><b>Opps! </b>{{errorMessage}}</label>
          </span>

          <div class="form-group text-center">
            <label for="exampleInputEmail1 text-gray incre-row" style="width: 100%;">
              Please enter the OTP Code sent to your email address.
            </label>
            <span class="incre-row text-center">
              <label>
                <input type="text" class="form-control otp-form-control" v-model="otp1">
                <input type="text" class="form-control otp-form-control" v-model="otp2">
                <input type="text" class="form-control otp-form-control" v-model="otp3">
                <input type="text" class="form-control otp-form-control" v-model="otp4">
                <input type="text" class="form-control otp-form-control" v-model="otp5">
                <input type="text" class="form-control otp-form-control" v-model="otp6">
              </label>
            </span>
          </div>
          <div class="form-group text-gray text-center" style="width: 100%; float: left;">
            <label style="width: 100%; float: left;">Didn't received an email? Click the link below.</label>
            <label class="action-link text-primary">Resend</label>
          </div>

        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-danger" @click="hide()">Cancel</button>
            <button type="button" class="btn btn-primary" @click="submit()">Transfer
            </button>
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

.otp-form-control{
  width: 60px;
  float: left;
  margin-right: 10px;
  text-align: center;
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
      otpUseCounter: 0,
      otp1: '',
      otp2: '',
      otp3: '',
      otp4: '',
      otp5: '',
      otp6: '',
      common: COMMON,
      errorMessage: null
    }
  },
  methods: {
    show(){
      $('#authenticateOTP').modal('show')
    },
    hide(){
      $('#authenticateOTP').modal('hide')
    },
    redirect(parameter){
      ROUTER.push(parameter)
    },
    verifyOtp(){
    }
  }
}
</script>
