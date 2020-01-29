<template>
  <div class="col-sm-12 col-md-6 col-lg-4 mx-auto">
    <div class="login-wrapper">
      <div class="login-header" style="margin-top: 75px;">
        <img :src="require('src/assets/img/logo.png')" v-on:click="redirect('/')">
      </div>
      <span style="width:100%;float:left;text-align:center;font-size:20px;margin-bottom:20px;">
       Payment confirmation of <b class="text-primary">{{common.APP_NAME}}</b>
      </span>
      <div class="login-message-holder login-spacer" v-if="errorMessage != null">
        <span class="text-danger"><b>Oops!</b> {{errorMessage}}</span>
      </div>
      <div v-if="data !== null">
        <div class="input-group login-spacer">
          <label class="text-center" style="width: 100%; text-transform: UPPERCASE" :class="{'text-danger': data.status === 'pending', 'text-primary': data.status === 'completed'}">Status: <b>{{data.status}}</b></label>
        </div>
         <div class="input-group login-spacer">
          <label><b>Transaction details</b></label>
        </div>
        <div class="input-group login-spacer">
          <table class="table table-bordered table-responsive">
            <tbody>
              <tr>
                <td>Transaction Code</td>
                <td>{{data.code}}</td>
              </tr>
              <tr>
                <td>Amount</td>
                <td><b>{{auth.displayAmountWithCurrency(data.amount, data.currency)}}</b></td>
              </tr>
              <tr>
                <td>Via</td>
                <td>{{data.bank}}</td>
              </tr>
              <tr>
                <td>Date</td>
                <td>{{data.created_at_human}}</td>
              </tr>

              <tr v-if="data.description !== null">
                <td>Details</td>
                <td>{{data.description}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="input-group login-spacer" v-if="data.status !== 'completed'">
          <label><b>Bank details for deposit</b></label>
        </div>
        <div class="input-group login-spacer"  v-if="data.status !== 'completed'">
          <table class="table table-bordered table-responsive" v-if="selectedBank !== null">
            <tbody>
              <tr>
                <td>Bank name</td>
                <td><b>{{selectedBank.title}}</b></td>
              </tr>
              <tr>
                <td>Account name</td>
                <td>{{selectedBank.name}}</td>
              </tr>
              <tr>
                <td>Account number</td>
                <td>{{selectedBank.number}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="login-message-holder login-spacer" v-if="successMessage != null">
          <span class="text-primary"><b>Yehey!</b> {{successMessage}}</span>
        </div>
        <div class="input-group login-spacer" v-if="data.status !== 'completed'">
          <label>To confirm your deposit, please enter the deposit slip number or receipt number issued by the bank then click confirm button.</label>
        </div>
        <div class="input-group login-spacer" v-if="data.status !== 'completed'">
          <input type="text" class="form-control form-control-login" placeholder="Enter deposit slip number" aria-describedby="addon-1" v-model="depositSlip">
        </div>
        <button class="btn btn-primary btn-block login-spacer" v-on:click="confirm()">Confirm</button>
      </div>
    </div>
    <authenticate-otp ref="authenticateOTP"></authenticate-otp>
  </div>
</template>
<style scoped lang="scss">
@import "~assets/style/colors.scss";
.bg-primary{
  background: $primary !important; 
}

.login-wrapper{
  width: 100%;
  margin: 0 0% 50px 0%;
}

.login-header{
  height: 100px;
  color: #006600;
  width: 100%;
  float: left;
  text-align: center;
}

.login-header img{
  height: 100px !important;
  width: 100px !important;
}

.login-header img:hover{
  cursor: pointer;
}

.login-message-holder{
  min-height: 30px;
  font-size: 12px;
  float: left;
  overflow: hidden;
}

.login-spacer{
  margin-bottom: 10px;
}

.btn{
  height: 50px !important;
}

.input-group-addon{
  width: 50px;
}

.form-control-login{
  height: 45px !important;
}


@media (max-width: 992px){
  .login-wrapper{
    width: 96%;
    margin: 0 2% 0 2%;
  }
}
</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import COMMON from 'src/common.js'
import CONFIG from 'src/config.js'
export default {
  mounted(){
    $('#loading').css({display: 'block'})
    this.retrieve()
  },
  data(){
    return {
      errorMessage: null,
      successMessage: null,
      user: AUTH.user,
      tokenData: AUTH.tokenData,
      common: COMMON,
      data: null,
      selectedBank: null,
      auth: AUTH,
      depositSlip: null
    }
  },
  components: {
    'authenticate-otp': require('modules/transfer/Otp.vue')
  },
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    },
    retrieve(){
      this.errorMessage = null
      let parameter = {
        email: this.$route.params.email ? this.$route.params.email : null,
        user_code: this.$route.params.userCode ? this.$route.params.userCode : null,
        deposit_code: this.$route.params.depositCode ? this.$route.params.depositCode : null
      }
      this.APIRequest('deposits/retrieve_by_confirmation', parameter).then(response => {
        $('#loading').css({display: 'none'})
        if(response.data !== null){
          this.data = response.data
          this.errorMessage = null
          for (var i = 0; i < CONFIG.bankAccounts.length; i++) {
            let item = CONFIG.bankAccounts[i]
            if(item.title === this.data.bank){
              this.selectedBank = item
              break
            }
          }
        }else{
          this.data = null
          this.errorMessage = null
          this.selectedBank = null
        }
      })
    },
    confirm(){
      this.successMessage = null
      if(this.depositSlip === null || this.depositSlip === ''){
        this.errorMessage = 'Invalid deposit slip number'
        return
      }
      let parameter = {
        id: this.data.id,
        deposit_slip: this.depositSlip
      }
      $('#loading').css({display: 'block'})
      this.APIRequest('deposits/update', parameter).then(response => {
        $('#loading').css({display: 'none'})
        this.successMessage = 'Successfully Sent! An email will be sent to you once the transaction is verified and it will take up to 24 hours to process.'
        this.retrieve()
      })
    }
  }
}
</script>
