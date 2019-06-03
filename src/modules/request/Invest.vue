<template>
  <div class="modal fade" id="createInvestmentModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Invest</h5>
          <button type="button" class="close" @click="hideModal()" aria-label="Close">
            <span aria-hidden="true" class="text-primary">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <span v-if="errorMessage !== null" class="text-danger text-center">
              <label><b>Opps! </b>{{errorMessage}}</label>
          </span>
          <br v-if="errorMessage !== null">
          <div class="form-group">
            <label for="exampleInputEmail1">Amount to invest</label>
            <input type="text" class="form-control" v-model="newInvestment.amount">
          </div>

          <div class="form-group">
            <label for="exampleInputEmail1">Message to borrower</label>
            <textarea rows="10" v-model="newInvestment.message" class="form-control" placeholder="Optional">
              
            </textarea>
          </div>

        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-danger" @click="hideModal()">Cancel</button>
            <button type="button" class="btn btn-primary" @click="submit()">Invest</button>
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
      newInvestment: {
        amount: 0,
        message: null,
        account_id: null,
        request_id: null
      }
    }
  },
  props: ['item'],
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    },
    hideModal(){
      $('#createInvestmentModal').modal('hide')
    },
    submit(){
      let amount = parseFloat(this.newInvestment.amount)
      let remainingAmount = parseFloat(this.item.amount) - amount
      if(remainingAmount < this.config.MINIMUM_INVESTMENT && remainingAmount > 0){
        this.errorMessage = 'Remaining amount should not be less than the minimum amount of investment.'
      }else if(amount < this.config.MINIMUM_INVESTMENT){
        this.errorMessage = 'The minimum investment is PHP ' + this.config.MINIMUM_INVESTMENT + '.'
      }else if(amount <= parseFloat(this.item.amount)){
        this.errorMessage = null
        this.newInvestment.account_id = this.user.userID
        this.newInvestment.request_id = this.item.id
        this.newInvestment.minimum = this.config.MINIMUM_INVESTMENT
        $('#loading').css({display: 'block'})
        this.APIRequest('investments/create', this.newInvestment).then(response => {
          $('#loading').css({display: 'none'})
          if(response.data !== null){
            this.hideModal()
            this.$parent.retrieve()
          }else{
            this.errorMessage = response.error
          }
        })
      }else{
        this.errorMessage = 'Amount must be less than to the borrowed amount.'
      }
    }
  }
}
</script>
