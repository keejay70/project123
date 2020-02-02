<template>
  <div class="modal fade" id="createDepositModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel" color="black">Deposit</h5>
          <button type="button" class="close" @click="hideModal()" aria-label="Close">
            <span aria-hidden="true" class="text-primary">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <span v-if="errorMessage !== null" class="text-danger text-center">
              <label><b>Opps! </b>{{errorMessage}}</label>
          </span>
          <div v-if="successMessage === null">
            <div class="alert alert-danger" role="alert">
              Hi <b>{{user.username}}!</b> Zero charges for deposit except the charges from the banks upon depositing to our accounts.
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Select Currency</label>
              <select class="form-control" v-model="newDeposit.currency">
                <option v-for="(item, index) in common.currencies" :key="index" :value="item.value" class="form-control">{{item.title}} - {{item.value}}</option>
              </select>
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1" color="black">Amount to Deposit</label>
              <input type="number" class="form-control" v-model="newDeposit.amount">
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Banks available</label>
              <select class="form-control" v-model="newDeposit.bank">
                <option v-for="(item, index) in common.payments" :key="index" :value="item.title" class="form-control">{{item.title}}</option>
              </select>
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Message</label>
              <textarea rows="10" v-model="newDeposit.message" class="form-control" placeholder="Optional">
              </textarea>
            </div> 
          </div>
          <div v-else>
            <span class="text-primary text-center">
                <label>We've sent you an email to this account for further instructions of the deposit.</label>
            </span>
          </div>
          

        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-danger" @click="hideModal()" v-if="successMessage === null">Cancel</button>
            <button type="button" class="btn btn-danger" @click="hideAndInitModal()" v-if="successMessage !== null">Close</button>
            <button type="button" class="btn btn-primary" @click="submit()" v-if="successMessage === null">Deposit</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>

.modal{
  color: black;
}
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
      config: CONFIG,
      errorMessage: null,
      successMessage: null,
      common: COMMON,
      newDeposit: {
        account_id: null,
        amount: 0,
        bank: null,
        description: null,
        currency: null,
        deposit_slip: null,
        status: 'pending'
      }
    }
  },
  props: ['item'],
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    },
    hideModal(){
      $('#createDepositModal').modal('hide')
    },
    hideAndInitModal(){
      this.errorMessage = null
      this.successMessage = null
      this.hideModal()
    },
    submit(){
      this.errorMessage = null
      this.successMessage = null
      if(parseInt(this.newDeposit.amount) < COMMON.MINIMUM_DEPOSIT){
        this.errorMessage = 'Amount should not be less than to ' + AUTH.displayAmountWithCurrency(COMMON.MINIMUM_DEPOSIT, this.newDeposit.currency)
        return
      }
      this.newDeposit.account_id = this.user.userID
      $('#loading').css({display: 'block'})
      this.APIRequest('deposits/create', this.newDeposit).then(response => {
        $('#loading').css({display: 'none'})
        if(response.data !== null){
          this.successMessage = true
        }else{
          this.errorMessage = response.error
        }
      })
    }
  }
}
</script>
