<template>
  <div class="modal fade" id="createDepositModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm" role="document">
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
          <br v-if="errorMessage !== null">
          <div class="form-group">
            <label for="exampleInputEmail1" color="black">Amount to Deposit</label>
            <input type="text" class="form-control" v-model="newDeposit.amount">
          </div>

          <div class="form-group">
            <label for="exampleInputEmail1">Deposit Message</label>
            <textarea rows="10" v-model="newDeposit.message" class="form-control" placeholder="Optional">
              
            </textarea>
          </div>

        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-danger" @click="hideModal()">Cancel</button>
            <button type="button" class="btn btn-primary" @click="submit()">Deposit</button>
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
export default {
  data(){
    return {
      user: AUTH.user,
      config: CONFIG,
      errorMessage: null,
      newDeposit: {
        amount: 0,
        message: null,
        account_id: null,
        request_id: null,
        minimum: null
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
    submit(){
      let amount = parseFloat(this.newDeposit.amount)
      let remainingAmount = parseFloat(this.item.amount) - amount
      this.errorMessage = null
      this.newDeposit.account_id = this.user.userID
      this.newDeposit.request_id = this.item.id
      $('#loading').css({display: 'none'})
      this.APIRequest('deposits/update', this.newDeposit).then(response => {
        $('#loading').css({display: 'none'})
        if(response.data !== null){
          this.hideModal()
          ROUTER.push('/deposits')
          // this.$parent.retrieve({column: 'created_at', value: 'asc'})
        }else{
          this.errorMessage = response.error
        }
      })
    }
  }
}
</script>
