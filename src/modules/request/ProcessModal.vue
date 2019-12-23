<template>
  <div class="modal fade" id="createChargesModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Charges</h5>
          <button type="button" class="close" @click="hideModal()" aria-label="Close">
            <span aria-hidden="true" class="text-primary">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <span v-if="errorMessage !== null" class="text-danger text-center incre-row">
            <label><b>Opps! </b>{{errorMessage}}</label>
          </span>
          <div class="form-group text-center" v-if="request !== null && parseInt(request.type) === 3">
            <label for="exampleInputEmail1 incre-row">Your current balance</label>
            <label class="text-primary incre-row"><h3>{{auth.displayAmountWithCurrency(auth.user.ledger.amount, auth.user.ledger.currency)}}</h3></label>
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Select Currency</label>
            <select class="form-control" v-model="requestPeer.currency">
              <option v-for="(item, index) in common.currencies" :key="index" :value="item.value" class="form-control">{{item.title}} - {{item.value}}</option>
            </select>
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Charge</label>
            <input type="number" class="form-control" v-model="requestPeer.charge" placeholder="Add your charges" @keyup="checkBalance()" />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Your income</label>
            <input type="number" class="form-control" :value="(requestPeer.charge * ((100 - common.payhiramCharges.percentage) / 100)).toFixed(2)" placeholder="Add your charges" disabled />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Payhiram's income ({{common.payhiramCharges.percentage + '%'}})</label>
            <input type="number" class="form-control" :value="(requestPeer.charge * ((common.payhiramCharges.percentage) / 100)).toFixed(2)" placeholder="Add your charges" disabled />
          </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-danger" @click="hideModal()">Cancel</button>
            <button type="button" class="btn btn-primary" @click="processPeering()">Continue
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
  height: 45px !important;
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
      common: COMMON,
      errorMessage: null,
      requestPeer: {
        charge: 0,
        account_id: AUTH.user.userID,
        request_id: null,
        currency: 'PHP',
        status: 'requesting',
        to: null
      },
      request: null
    }
  },
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    },
    hideModal(){
      this.errorMessage = null
      this.request = null
      $('#createChargesModal').modal('hide')
    },
    show(item){
      this.requestPeer.request_id = item.id
      this.requestPeer.to = item.account_id
      this.requestPeer.account_id = this.user.userID
      this.requestPeer.charge = 0
      this.request = item
      $('#createChargesModal').modal('show')
    },
    processPeering(){
      this.checkBalance()
      if(this.requestPeer.charge === 0){
        this.errorMessage = 'Charge should not be 0.'
        return false
      }
      if(this.errorMessage !== null){
        return false
      }
      this.errorMessage = null
      $('#loading').css({display: 'block'})
      this.APIRequest('request_peers/create', this.requestPeer).then(response => {
        $('#loading').css({display: 'none'})
        if(response.data > 0){
          this.hideModal()
          this.$parent.retrieve(null, null)
        }
      })
    },
    verifyBalance(){
      if(this.request !== null && this.request.amount > AUTH.user.ledger.amount){
        this.errorMessage = 'Insufficient balance!'
      }else{
        this.errorMessage = null
      }
    },
    checkBalance(){
      if(this.request !== null && this.request.type < 101){
        switch(this.request.type){
          case 1:
            break
          case 2:
            break
          case 3:
            this.verifyBalance()
            break
        }
      }
    }
  }
}
</script>
