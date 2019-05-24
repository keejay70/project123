<template>
  <div class="modal fade" id="createRequestModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-md" role="document">
      <div class="modal-content">
        <div class="modal-header bg-primary">
          <h5 class="modal-title" id="exampleModalLabel">Add Request</h5>
          <button type="button" class="close" @click="hideModal()" aria-label="Close">
            <span aria-hidden="true" class="text-white">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <span v-if="errorMessage !== null" class="text-danger text-center">
              <label><b>Opps! </b>{{errorMessage}}</label>
          </span>
          <br v-if="errorMessage !== null">
          <div class="form-group">
            <label for="exampleInputEmail1">I want to borrow the amount of</label>
            <input type="text" class="form-control" v-model="newRequest.amount">
          </div>

          <div class="form-group">
            <label for="exampleInputEmail1">I will pay within</label>
            <select class="form-control" v-model="newRequest.months_payable">
              <option v-for="item in 12" v-bind:value="item">{{item}} Month{{(item === 1) ? '' : 's'}}</option>
            </select>
          </div>

          <div class="form-group">
            <label for="exampleInputEmail1">The reason I borrow is</label>
            <textarea rows="10" v-model="newRequest.reason" class="form-control">
              
            </textarea>
          </div>

        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-danger" @click="hideModal()">Close</button>
            <button type="button" class="btn btn-primary" @click="submit()">Submit</button>
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
      newRequest: {
        amount: null,
        months_payable: null,
        interest: 2,
        reason: null,
        status: 0,
        account_id: null
      }
    }
  },
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    },
    hideModal(){
      $('#createRequestModal').modal('hide')
    },
    submit(){
      this.newRequest.account_id = this.user.userID
      $('#loading').css({display: 'block'})
      this.APIRequest('requests/create', this.newRequest).then(response => {
        $('#loading').css({display: 'none'})
        this.hideModal()
      })
    }
  }
}
</script>
