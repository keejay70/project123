 <template>
  <div class="request-list-wrapper">
    <div class="request-list-left-container">
      <div class="incre-row">
        <button class="btn btn-primary pull-right" @click="showRequestModal('create')">Post a request</button>
      </div>
      <div class="rl-container-header">
        <request-filter :size="size"></request-filter>
      </div>
      <div class="rl-container-item" v-for="item, index in data" v-if="data !== null">
        <span class="header">
          <label class="action-link text-primary" @click="showProfileModal(item)">
            <i class="fas fa-user-circle" style="color: #555; padding-right: 5px;" v-if="item.account.profile === null"></i>
            <img :src="config.BACKEND_URL + item.account.profile.url" height="30px" width="30px;" style="border-radius: 50%;" v-else>
            {{item.account.username}}
          </label>
          <label>
            <i class="fas fa-circle" style="font-size: 8px; color: #555; padding-right: 5px;"></i>Cebu City
          </label>
          <label class="pull-right">
            <div class="dropdown" id="dropdownMenuButtonDropdown">
              <i class="fas fa-ellipsis-h text-gray more-options" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-target="dropdownMenuButtonDropdown">
              </i>
              <div class="dropdown-menu dropdown-more-options" aria-labelledby="dropdownMenuButton" >

                <span class="dropdown-item action-link" @click="showRequestModal('update', item)">Edit</span>
                <span class="dropdown-item action-link" @click="showReportModal(item)">Report</span>
              </div>
            </div>
          </label>
        </span>
        <span class="summary-header">
          <label>
            {{item.created_at_human}}
          </label>
          <label class="text-primary">
            <i class="fas fa-circle" style="font-size: 8px; color: #555; padding-right: 5px;"></i>
            <b>{{auth.displayAmount(item.amount)}}</b>
          </label>
          <label>
            <i class="fas fa-circle" style="font-size: 8px; color: #555; padding-right: 5px;"></i>
            {{item.interest}}% interest per Month for {{item.months_payable}} 
            <label v-if="parseInt(item.months_payable) > 1">Months</label>
            <label v-else>Month</label>
          </label>
        </span>
        <span class="summary-header">
          <label>
            Pay {{item.billing_per_month_human}}
          </label>
          <label>
            <i class="fas fa-circle" style="font-size: 8px; color: #555; padding-right: 5px;"></i>
            Needed on {{item.needed_on_human}}
          </label>
        </span>
        <span class="body">
          <label>
           {{item.reason}}
          </label>
        </span>
        <span class="footer">
          <label>
            <ratings :ratings="item.rating" v-if="item.rating !== null"></ratings>
          </label>
          <label>
            Total Borrowed: {{auth.displayAmount(item.total)}}
          </label>
          <button class="btn btn-primary pull-right" style="margin-right: 5px;" @click="showInvestmentModal(item)">Invest</button>
          <button class="btn btn-warning pull-right" style="margin-right: 5px;" @click="bookmark(item.id)">Bookmark</button>
        </span>


    <label class="mt-3" v-if="item.pulling !== 0">Percentage of amount invested</label>
    <b-progress :max="item.initial_amount" class="progress-bar bg-warning"  style="margin-bottom: 10px;" v-if="item.pulling !== 0">
      <b-progress-bar :value="item.pulling" :variant="'primary'" :label="getPercentage(item) + '%'"></b-progress-bar>
    </b-progress>

      
      </div>
      <empty v-if="data === null" :title="'We just launched and we\'re still growing.'" :action="' Please check back soon, we will have tons of request for you.'" :icon="'far fa-smile'" :iconColor="'text-primary'"></empty>
    </div>
    <div class="request-list-right-container">
    </div>
    <invest :item="selecteditem"></invest>
    <profile :item="selecteditem"></profile>
    <report :item="selecteditem"></report>
    <increment-modal :property="requestModal"></increment-modal>
  </div>
</template>
<style scoped>
.request-list-wrapper{
  width: 100%;
  float: left;
  min-height: 400px;
  overflow-y: hidden;
  margin-top: 25px;
  margin-bottom: 100px;
}

.rl-container-header{
  width: 100%;
  float: left;
  height: 70px;
  border: solid 1px #ddd;
}

.rl-container-item{
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
.rl-container-item .header{
  width: 100%;
  float: left;
  height: 50px;
  line-height: 50px;
  color: #555;
}
.rl-container-item .summary-header{
  width: 100%;
  float: left;
  line-height: 20px;
  color: #555; 
}
.rl-container-item .header label, .rl-container-item .summary-header label{
  margin-bottom: 0px;
}
.rl-container-item .body{
  width: 100%;
  float: left;
  min-height: 10px;
  overflow-y: hidden;
}

.rl-container-item .body label{
  margin-bottom: 0px;
  width: 100%;
}

.rl-container-item .footer{
  width: 100%;
  float: left;
  margin-bottom: 5px;
  height: 40px;
  line-height: 40px;
}

.request-list-left-container{
  float: left;
  width: 68%;
  min-height: 50px;
  overflow-y: hidden;
}

.request-list-right-container{
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
  .request-list-wrapper{
    margin-bottom: 200px;
  }
  .request-list-right-container, .request-list-left-container{
    width: 100%;
    margin-left: 0%;
  }
}

</style>
<script>
import ROUTER from '../../router'
import AUTH from '../../services/auth'
import CONFIG from '../../config.js'
import REQUEST from '../modal/CreateRequest.js'
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
      auth: AUTH,
      data: null,
      showId: null,
      percentage: null,
      showInvest: 0,
      size: null,
      pulling: null,
      size2: null,
      newPulling: {
        requestId: null
      },
      selecteditem: null,
      config: CONFIG,
      activePage: 0,
      sort: {
        column: 'created_at',
        value: 'desc'
      },
      requestModal: REQUEST
    }
  },
  components: {
    'invest': require('modules/transfer/Invest.vue'),
    'profile': require('modules/request/Profile.vue'),
    'report': require('modules/request/Report.vue'),
    'request-filter': require('modules/request/Filter.vue'),
    'ratings': require('components/increment/generic/rating/DirectRatings.vue'),
    'empty': require('components/increment/generic/empty/EmptyDynamicIcon.vue'),
    'increment-modal': require('components/increment/generic/modal/Modal.vue')
  },
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    },
    show(item){
      if(this.showId === item.id){
        this.showId = null
      }else{
        this.showId = item.id
      }
    },
    showRequestModal(action, item = null){
      switch(action){
        case 'create':
          this.requestModal = {...REQUEST}
          let inputs = this.requestModal.inputs
          inputs.map(input => {
            if(input.variable === 'amount'){
              input.value = null
            }
            if(input.variable === 'interest'){
              input.value = 2
            }
            if(input.variable === 'months_payable'){
              input.value = 1
            }
            if(input.variable === 'needed_on'){
              input.value = null
            }
            if(input.variable === 'billing_per_month'){
              input.value = 1
            }
            if(input.variable === 'reason'){
              input.value = null
            }
          })
          let params = this.requestModal.params
          params.map(param => {
            if(param.variable === 'account_id'){
              param.value = this.user.userID
            }
          })
          break
        case 'update':
          let modalData = {...this.requestModal}
          let parameter = {
            title: 'Update Requests',
            route: 'requests/update',
            button: {
              left: 'Cancel',
              right: 'Update'
            },
            sort: {
              column: 'created_at',
              value: 'desc'
            },
            params: [{
              variable: 'id',
              value: item.id
            }]
          }
          modalData = {...modalData, ...parameter} // updated data without input values
          let object = Object.keys(item)
          modalData.inputs.map(data => {
            if(data.variable === 'amount'){
              data.value = item.initial_amount
            }
            if(data.variable === 'billing_per_month'){
              data.value = item.billing_per_month
            }
            if(data.variable === 'interest'){
              data.value = item.interest
            }
            if(data.variable === 'needed_on'){
              data.value = item.needed_on
            }
            if(data.variable === 'reason'){
              data.value = item.reason
            }
            if(data.variable === 'months_payable'){
              data.value = item.months_payable
            }
          })
          this.requestModal = {...modalData}
          break
      }
      $('#createRequestModal').modal('show')
    },
    getPercentage(item){
      this.percentage = item.pulling / item.initial_amount
      this.percentage = this.percentage * 100
      this.percentage = this.percentage.toFixed(2)
      return this.percentage
    },
    filterItem(item, id){
      if(item.request_id === id){
        return item.amount
      }else{
        return null
      }
    },
    showInvestmentModal(item){
      this.selecteditem = item
      $('#createTransferModal').modal('show')
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
        limit: 10,
        offset: this.activePage,
        sort: (sort !== null) ? sort : this.sort
      }
      $('#loading').css({display: 'block'})
      this.APIRequest('requests/retrieve', parameter).then(response => {
        $('#loading').css({display: 'none'})
        if(response.data !== null){
          this.data = response.data
          this.size = parseInt(response.size)
        }else{
          this.data = null
          this.size = null
        }
      })
    },
    bookmark(id){
      let parameter = {
        account_id: this.user.userID,
        request_id: id
      }
      this.APIRequest('bookmarks/create', parameter).then(response => {
        //
      })
    }
  }

}
</script>
