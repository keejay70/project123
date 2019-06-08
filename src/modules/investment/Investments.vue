<template>
  <div class="investments-list-wrapper">
    <div class="investments-list-left-container">
<!--       <div class="rl-container-header">
        <request-filter :size="size"></request-filter>
      </div> -->
      <div class="il-container-item" v-for="item, index in data" v-if="data !== null">
<!--         <span class="summary-header">
          {{item.created_at_human}}
        </span> -->
        <span class="summary-header">

        </span>
        <span class="body">
          <table class="table table-responsive borderless investment-table">
            <tr>
              <td>Requested by</td>
              <td>
                {{item.request.account.username}}
              </td>
              <td>Reference #</td>
              <td>
                <label>{{item.code}}</label>
              </td>
            </tr>

            <tr>
              <td>Principal Amount</td>
              <td  class="text-primary">
                PHP {{item.request.amount.toFixed(2)}}
              </td>
              <td>Approved Date</td>
              <td>
                {{item.created_at_human}}
              </td>
            </tr>
            
            <tr>
              <td>Invested Amount</td>
              <td class="text-primary">PHP {{item.amount.toFixed(2)}}</td>
              <td>Interest Rate</td>
              <td>
                {{item.request.interest}}% per month
              </td>
            </tr>

            <tr>
              <td>ROI per month</td>
              <td>
                PHP {{item.return_per_month.toFixed(2)}}
              </td>
              <td>Payable in</td>
              <td>
                {{item.request.months_payable}}
                <label v-if="parseInt(item.request.months_payable) > 1">months</label>
                <label v-else>month</label>
                and pay {{item.request.billing_per_month_human}}
              </td>
            </tr>
          </table>
        </span>
        <span class="footer">
          <label>
            <div class="dropdown">
              <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                My Options
              </button>
              <div class="dropdown-menu">
                <div class="dropdown-item action-link" data-toggle="dropdown">Summary</div>
              </div>
            </div>
          </label>
          <label>
            <div class="dropdown">
              <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                Borrower
              </button>
              <div class="dropdown-menu">
                <div class="dropdown-item action-link" data-toggle="dropdown" @click="showProfileModal(item.request)" v-if="item.request !== null">Profile</div>
                <div class="dropdown-item action-link" data-toggle="dropdown">Payments Summary</div>
              </div>
            </div>
          </label>
        </span>
      </div>
      <empty v-if="data === null" :title="'You don\'t have investments right now'" :action="'Go to requested and start investing to our users'" :icon="'far fa-smile'" :iconColor="'text-primary'"></empty>
    </div>
    <div class="investments-list-right-container">
    </div>
    <profile :item="selecteditem"></profile>
  </div>
</template>
<style scoped>
.investments-list-wrapper{
  width: 100%;
  float: left;
  min-height: 400px;
  overflow-y: hidden;
  margin-top: 25px;
  margin-bottom: 100px;
}

.il-container-header{
  width: 100%;
  float: left;
  height: 70px;
  border: solid 1px #ddd;
}

.il-container-item{
  width: 100%;
  float: left;
  border-radius: 5px;
  min-height: 50px;
  overflow-y: hidden;
  border: solid 1px #ddd;
  margin-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
}
.il-container-item .header{
  width: 100%;
  float: left;
  height: 50px;
  line-height: 50px;
  color: #555;
}
.il-container-item .summary-header{
  width: 100%;
  float: left;
  line-height: 20px;
  color: #555; 
}
.il-container-item .header label, .il-container-item .summary-header label{
  margin-bottom: 0px;
}
.il-container-item .body{
  width: 100%;
  float: left;
  min-height: 10px;
  overflow-y: hidden;
}

.il-container-item .footer{
  width: 100%;
  float: left;
  height: 40px;
  line-height: 40px;
}

.il-container-item .footer button{
  margin-bottom: 20px;
}

.investments-list-left-container{
  float: left;
  width: 100%;
  min-height: 50px;
  overflow-y: hidden;
}
.investment-table{
  margin-bottom: 0px !important;
}
.investment-table td{
  padding-top: 5px !important;
  padding-bottom: 5px !important;
}

@media (max-width: 992px){
}

</style>
<script>
import ROUTER from '../../router'
import AUTH from '../../services/auth'
import CONFIG from '../../config.js'
export default{
  mounted(){
    this.retrieve()
  },
  data(){
    return {
      user: AUTH.user,
      data: null,
      selecteditem: null,
      config: CONFIG
    }
  },
  components: {
    'empty': require('components/increment/generic/empty/EmptyDynamicIcon.vue'),
    'profile': require('modules/request/Profile.vue')
  },
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    },
    showProfileModal(item){
      this.selecteditem = item
      $('#profileModal').modal('show')
    },
    retrieve(){
      let parameter = {
        condition: [{
          value: this.user.userID,
          column: 'account_id',
          clause: '='
        }]
      }
      $('#loading').css({display: 'none'})
      this.APIRequest('investments/retrieve', parameter).then(response => {
        $('#loading').css({display: 'none'})
        if(response.data.length > 0){
          this.data = response.data
        }else{
          this.data = null
        }
      })
    }
  }

}
</script>
