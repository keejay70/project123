<template>
  <div class="payhiram-list-wrapper">
    <div class="payhiram-list-left-container">
<!--       <div class="payhiram-container-header">
        <request-filter :size="size"></request-filter>
      </div> -->
      <span class="incre-row">
        <b>Billing</b>
      </span>
      <table class="table table-responsive table-bordered" v-if="billing !== null">
        <thead>
          <tr>
            <td>Next billing</td>
            <td>Amount</td>
            <td>Penalty</td>
            <td>Total</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item, index in billing">
            <td>{{item.next_billing_date_human}}</td>
            <td>{{auth.displayAmount(item.amount)}}</td>
            <td>{{auth.displayAmount(item.penalty)}}</td>
            <td>{{auth.displayAmount(parseFloat(item.penalty) + parseFloat(item.amount))}}</td>
            <td class="text-center">
              <button class="btn btn-primary" @click="makePayment(item.id, item.next_billing_date, item.amount)">Pay</button>
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr class="">
            
          </tr>
        </tbody>
      </table>
      <span class="incre-row">
        <b>Payment History</b>
      </span>
      <table class="table table-responsive table-bordered" v-if="data !== null">
        <thead>
          <tr>
            <td>Billing Date</td>
            <td>Payment Date</td>
            <td>Amount</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item, index in data">
            <td>{{item.date_human}}</td>
            <td>{{item.created_at_human}}</td>
            <td>{{auth.displayAmount(item.amount)}}</td>
          </tr>
        </tbody>
        <tbody>
          <tr class="">
            
          </tr>
        </tbody>
      </table>
      <empty v-if="data === null" :title="'You don\'t have payments yet'" :action="'Be back soon.'" :icon="'far fa-smile'" :iconColor="'text-primary'"></empty>
    </div>
    <div class="payhiram-list-right-container">
    </div>
    <invest :item="selecteditem"></invest>
    <profile :item="selecteditem"></profile>
    <report :item="selecteditem"></report>
  </div>
</template>
<style scoped>
.payhiram-list-wrapper{
  width: 100%;
  float: left;
  min-height: 400px;
  overflow-y: hidden;
  margin-top: 25px;
  margin-bottom: 100px;
}

.payhiram-container-header{
  width: 100%;
  float: left;
  height: 70px;
  border: solid 1px #ddd;
}

.payhiram-container-item{
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
.payhiram-list-left-container{
  float: left;
  width: 68%;
  min-height: 50px;
  overflow-y: hidden;
}

.payhiram-list-right-container{
  float: left;
  width: 30%;
  min-height: 50px;
  overflow-y: hidden;
  margin-left: 2%;
}
.dropdown-item{
  height: 40px !important;
  line-height: 40px;
}

@media (max-width: 992px){
  .payhiram-list-wrapper{
    margin-bottom: 200px;
  }
  .payhiram-list-right-container, .payhiram-list-left-container{
    width: 100%;
    margin-left: 0%;
  }
}

</style>
<script>
import ROUTER from '../../router'
import AUTH from '../../services/auth'
import CONFIG from '../../config.js'
export default{
  mounted(){
    this.retrieve({
      column: 'created_at',
      value: 'desc'
    })
  },
  data(){
    return {
      user: AUTH.user,
      data: null,
      billing: null,
      size: null,
      selecteditem: null,
      config: CONFIG,
      activePage: 0,
      sort: {
        column: 'created_at',
        value: 'desc'
      },
      auth: AUTH
    }
  },
  components: {
    'invest': require('modules/request/Invest.vue'),
    'profile': require('modules/request/Profile.vue'),
    'report': require('modules/request/Report.vue'),
    'request-filter': require('modules/request/Filter.vue'),
    'ratings': require('components/increment/generic/rating/DirectRatings.vue'),
    'empty': require('components/increment/generic/empty/EmptyDynamicIcon.vue')
  },
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    },
    showRequestModal(){
      $('#createRequestModal').modal('show')
    },
    showInvestmentModal(item){
      this.selecteditem = item
      $('#createInvestmentModal').modal('show')
    },
    showProfileModal(item){
      this.selecteditem = item
      $('#profileModal').modal('show')
    },
    showReportModal(item){
      this.selecteditem = item
      $('#createReportModal').modal('show')
    },
    retrieve(sort){
      let parameter = {
        account_id: this.user.userID,
        limit: 10,
        offset: 0,
        sort: {
          column: 'created_at',
          value: 'desc'
        }
      }
      this.APIRequest('payments/retrieve', parameter).then(response => {
        this.billing = response.billing
        if(response.data.length > 0){
          this.data = response.data
        }else{
          this.data = null
        }
      })
    },
    makePayment(requestId, date, amount){
      let parameter = {
        request_id: requestId,
        date: date,
        amount: amount,
        account_id: this.user.userID
      }
      this.APIRequest('payments/create', parameter).then(response => {
        this.retrieve({
          column: 'created_at',
          value: 'desc'
        })
      })
    }
  }

}
</script>
