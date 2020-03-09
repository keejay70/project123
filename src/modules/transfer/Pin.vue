<template>
  <div class="modal fade" id="authenticateOTP" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Authentication via PIN</h5>
          <button type="button" class="close" @click="hideModal()" aria-label="Close">
            <span aria-hidden="true" class="text-primary">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <!-- Step 1 inputs -->
          <span v-if="errorMessage !== null && blockedFlag === false" class="text-danger text-center">
            <label style="width: 100%;"><b>Opps! </b>{{errorMessage}}</label>
          </span>
          <span v-if="blockedFlag === true" class="text-danger text-center">
            <label style="width: 100%;"><b>Opps! </b> Sorry, you are not authorize to proceed the transaction. You need logout/login and do the transaction again.</label>
          </span>
          <span v-if="successMessage !== null" class="text-primary text-center incre-row" >
            <i class="fa fa-check text-primary" style="font-size: 75px"></i>
            <label class="text-primary incre-row">{{successMessage}}</label>
          </span>
          <div v-if="blockedFlag === false && successMessage === null">
            <div class="form-group text-center">
              <label for="exampleInputEmail1 text-gray incre-row" style="width: 100%;">
                Please enter your PIN Code sent to your email address.
              </label>
              <span class="incre-row text-center">
                <label>
                  <input type="text" :id="'otp-' + index" v-for="(item, index) in otp" :key="index" class="form-control otp-form-control" v-model="item.code" @keypress="otpHandler(index)" :style="{'margin-left': index === 0 ? '2%' : 0}">
                </label>
              </span>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" @click="hideModal()">{{blockedFlag ? 'Close' : 'Cancel'}}</button>
          <button type="button" class="btn btn-primary" @click="verifyOtp()" v-if="successFlag === false && blockedFlag === false">Authenticate</button>
          <button type="button" class="btn btn-primary" @click="successOTP()" v-if="successFlag === true && blockedFlag === false">Continue</button>
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
  margin-right: 1%;
  width: 15%;
  float: left;
  text-align: center;
}

@media (max-width: 991px){
}
</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
import COMMON from 'src/common.js'
export default {
  mounted(){
    let pinFlag = localStorage.getItem('xyzABCdefPayhiram')
    if(parseInt(pinFlag) === 1){
      this.blockedFlag = true
    }else{
      this.blockedFlag = false
    }
  },
  data(){
    return {
      user: AUTH.user,
      auth: AUTH,
      config: CONFIG,
      otpUseCounter: 0,
      characterCounterFlag: false,
      otp: [{
        code: null
      }, {
        code: null
      }, {
        code: null
      }, {
        code: null
      }, {
        code: null
      }, {
        code: null
      }],
      common: COMMON,
      errorMessage: null,
      otpData: null,
      otpInput: null,
      successFlag: false,
      blockedFlag: false,
      successMessage: null,
      resendFlag: false
    }
  },
  methods: {
    show(){
      this.initOtp()
      $('#authenticateOTP').modal('show')
    },
    hideModal(){
      this.initOtp()
      $('#authenticateOTP').modal('hide')
    },
    redirect(parameter){
      ROUTER.push(parameter)
    },
    initOtp(){
      this.characterCounterFlag = false
      this.otpInput = null
      this.successFlag = false
      this.errorMessage = null
      this.successMessage = null
      for (var i = 0; i < this.otp.length; i++) {
        this.otp[i].code = null
      }
    },
    verifyOtp(){
      if(this.otpInput !== null && this.otpInput.length < 6){
        return false
      }
      $('#loading').css({display: 'block'})
      let id = null
      if(this.user.userID === 0){
        id = AUTH.otpDataHolder.userInfo.id
      }else{
        id = AUTH.user.userID
      }
      let parameter = {
        condition: [{
          value: id,
          column: 'account_id',
          clause: '='
        }, {
          value: this.otpInput,
          column: 'code',
          clause: '='
        }]
      }
      this.APIRequest('notification_settings/retrieve', parameter).then(response => {
        $('#loading').css({display: 'none'})
        if(response.data.length > 0){
          this.errorMessage = null
          this.successFlag = true
          this.successMessage = 'Successfully verified!'
          // true
          // call proceed
        }else{
          this.successFlag = false
          this.blockedFlag = true
          localStorage.setItem('xyzABCdefPayhiram', 1)
          this.errorMessage = 'Sorry, you are not authorize to proceed the transaction. Please get back after 30 minutes. Or you can email at ' + COMMON.APP_EMAIL + ' as well if you want to resolve the account ASAP.'
        }
      })
    },
    otpHandler(index){
      if(index < 5){
        $('#otp-' + (index + 1)).show().focus()
        this.characterCounterFlag = false
      }else{
        this.characterCounterFlag = true
        setTimeout(() => {
          this.otpInput = ''
          this.otp.map((item, index) => {
            this.otpInput += item.code
          })
        }, 100)
      }
    },
    successOTP(){
      this.hideModal()
      this.$parent.successOTP()
    }
  }
}
</script>
