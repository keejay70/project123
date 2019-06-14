<template>
  <div class="modal fade" id="createWorkModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-md" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Add Work</h5>
          <button type="button" class="close" @click="hideModal()" aria-label="Close">
            <span aria-hidden="true" class="text-primary">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <!-- Start --> 
            <div class="form-group" style="margin-top: 25px;">
                <label for="address">Company Name</label>
                <input type="text" class="form-control" placeholder="Enter Company Name" v-model="newWork.company_name">
            </div>

            <div class="form-group">
                <label for="address">Position</label>
                <input type="text" class="form-control" placeholder="Enter Position in the Company" v-model="newWork.position">
            </div>

            <div class="form-group">
                <label for="address">Location</label>
                <input type="text" class="form-control" placeholder="Enter Position in the Company" v-model="newWork.location">
            </div>

            <div class="form-group col-lg-6" style="float:left">
                <label for="address">Year Started</label>
                <select class="form-control" v-model="newWork.year_started">
                    <option v-bind:value="config.CURRENT_YEAR - item" v-for="item in config.MAX_YEAR">{{ config.CURRENT_YEAR - item }}</option>
                </select>
            </div>

            <div class="form-group col-lg-6" style="float:right">
                <label for="address">Month Started</label>
                <select class="form-control" v-model="newWork.month_started">
                    <option v-for="item in months" v-bind:value="item">{{ item }}</option>
                </select>
            </div>

            <div class="form-group col-lg-6" style="float:left">
                <label for="address">Year Ended</label>
                <select class="form-control" v-model="newWork.year_ended">
                    <option v-bind:value="config.CURRENT_YEAR - item" v-for="item in config.MAX_YEAR">{{ config.CURRENT_YEAR - item }}</option>
                </select>
            </div>

            <div class="form-group col-lg-6" style="float:right">
                <label for="address">Month Ended</label>
                <select class="form-control" v-model="newWork.month_ended">
                    <option v-for="item in months" v-bind:value="item">{{ item }}</option>
                </select>
            </div>

            <div class="form-group">
                <label for="address">Work Description</label>
                <textarea class="form-control" rows="10" v-model="newWork.work_description"></textarea>
            </div>
          <!-- End -->
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
      newWork: {
        account_id: null,
        company_name: null,
        position: null,
        location: null,
        work_description: null,
        year_started: null,
        year_ended: null,
        month_started: null,
        month_ended: null,
        url: 'test'
      },
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]
    }
  },
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    },
    hideModal(){
      $('#createWorkModal').modal('hide')
    },
    submit(){
      this.newWork.account_id = this.user.userID
      $('#loading').css({display: 'block'})
      this.APIRequest('works/create', this.newWork).then(response => {
        $('#loading').css({display: 'none'})
        this.hideModal()
        this.$parent.retrieve(null)
      })
    },
    validate(){
      let i = this.newWork
      if(i.first_name !== null && i.last_name !== null && i.sex !== null){
        return true
      }
      return false
    }
  }
}
</script>
