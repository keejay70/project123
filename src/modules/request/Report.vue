<template>
  <div class="modal fade" id="createReportModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Report</h5>
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
            <label for="exampleInputEmail1">Write a reason</label>
            <textarea rows="15" v-model="newReport.message" class="form-control" placeholder="Type your message here.">
              
            </textarea>
          </div>

        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-danger" @click="hideModal()">Cancel</button>
            <button type="button" class="btn btn-primary" @click="submit()">Report</button>
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
      newReport: {
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
      $('#createReportModal').modal('hide')
    },
    submit(){
      if(this.newReport.message !== null && this.newReport.message !== ''){
        this.errorMessage = null
        this.newReport.account_id = this.user.userID
        this.newReport.request_id = this.item.id
        $('#loading').css({display: 'block'})
        this.APIRequest('reports/create', this.newReport).then(response => {
          $('#loading').css({display: 'none'})
          this.hideModal()
          this.$parent.retrieve()
        })
      }else{
        this.errorMessage = 'Please fill up the required fields.'
      }
    }
  }
}
</script>
