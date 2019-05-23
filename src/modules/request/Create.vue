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
            <label for="exampleInputEmail1">Amount</label>
            <input type="text" class="form-control" v-model="newRequest.amount">
          </div>

          <div class="form-group">
            <label for="exampleInputEmail1">Number of months</label>
            <input type="text" class="form-control" v-model="newRequest.months">
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
  height: 45px !important;
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
        months: null,
        interest: null
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
    }
  }
}
</script>
