<template>
  <div class="investments-list-wrapper">
    <div class="investments-list-left-container">
      <basic-filter 
      v-bind:category="category" 
      :activeCategoryIndex="0"
      :activeSortingIndex="0"
      @changeSortEvent="retrieve($event.sort, $event.filter)"
      @changeStyle="manageGrid($event)"
      :grid="['list', 'th-large']"></basic-filter>
      <table v-if="data !== null" class="table table-responsive table-bordered">
        <thead>
          <td>Reference #</td>
          <td>Requested by</td>
          <td>Amount</td>
          <td>Invested</td>
          <td>ROI per month</td>
          <td>Approved Date</td>
          <td>Interest Rate</td>
          <td>Payment Terms</td>
        </thead>
        <tbody>
          <tr v-for="(item, index) in data" :key="index">
            <td>
              <label class="text-primary action-link" @click="redirect('/requests/' + item.request.code)">{{item.request.code}}</label>
            </td>
            <td>
              <label class="text-primary action-link" @click="showProfileModal(item.request)">{{item.request.account.username}}</label>
            </td>
            <td>{{auth.displayAmount(item.request.amount)}}</td>
            <td>{{auth.displayAmount(item.amount)}}</td>
            <td>{{auth.displayAmount(item.return_per_month)}}</td>
            <td>{{item.created_at_human}}</td>
            <td>{{item.request.interest}}% per month</td>
            <td>
              {{item.request.months_payable}}
                <label v-if="parseInt(item.request.months_payable) > 1">months</label>
                <label v-else>month</label>
                and pay {{item.request.billing_per_month_human}}
            </td>
          </tr>
        </tbody>
      </table>
      <empty v-if="data === null" :title="'You don\'t have investments right now'" :action="'Go to requests and start investing to our users'" :icon="'far fa-smile'" :iconColor="'text-primary'"></empty>
    </div>
    <div class="investments-list-right-container">
    </div>
    <profile :item="selecteditem"></profile>
    <payments :item="selecteditem"></payments>
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
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
export default{
  mounted(){
    this.retrieve({created_at: 'desc'}, {column: 'created_at', value: ''})
  },
  data(){
    return {
      user: AUTH.user,
      auth: AUTH,
      data: null,
      selecteditem: null,
      config: CONFIG,
      category: [{
        title: 'Sort by',
        sorting: [{
          title: 'Date posted ascending',
          payload: 'created_at',
          payload_value: 'asc'
        }, {
          title: 'Date posted descending',
          payload: 'created_at',
          payload_value: 'desc'
        }, {
          title: 'Amount ascending',
          payload: 'amount',
          payload_value: 'asc'
        }, {
          title: 'Amount descending',
          payload: 'amount',
          payload_value: 'desc'
        }, {
          title: 'Message ascending',
          payload: 'message',
          payload_value: 'asc'
        }, {
          title: 'Message descending',
          payload: 'message',
          payload_value: 'desc'
        }]
      }],
      listStyle: null
    }
  },
  components: {
    'empty': require('components/increment/generic/empty/EmptyDynamicIcon.vue'),
    'profile': require('modules/request/Profile.vue'),
    'payments': require('modules/payment/Payments.vue'),
    'basic-filter': require('components/increment/generic/filter/Basic.vue')
  },
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    },
    showProfileModal(item){
      this.selecteditem = item
      $('#profileModal').modal('show')
    },
    showPaymentModal(item){
      this.selecteditem = item
      $('#paymentModal').modal('show')
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
    },
    manageGrid(event){
      switch(event){
        case 'th-large': this.listStyle = 'columns'
          break
        case 'list': this.listStyle = 'list'
          break
      }
    }
  }

}
</script>
