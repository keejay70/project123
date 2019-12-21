 <template>
  <div class="request-list-wrapper">
    <div class="request-list-left-container">
      <div class="incre-row">
        <button class="btn btn-primary pull-right" @click="redirect('/createRequest')">Post a request</button>
        <!-- <button class="btn btn-primary pull-right" @click="showRequestModal('create')">Post a request</button> -->
      </div>
      <basic-filter 
      v-bind:category="category" 
      :activeCategoryIndex="0"
      :activeSortingIndex="0"
      @changeSortEvent="retrieve($event.sort, $event.filter)"
      @changeStyle="manageGrid($event)"
      :grid="['list', 'th-large']"></basic-filter>
      <div class="rl-container-item" v-for="(item, index) in data" :key="index">
        <span class="header">
          <label class="action-link text-primary" @click="showProfileModal(item)">
            <i class="fas fa-user-circle" style="color: #555; padding-right: 5px;" v-if="item.account.profile === null"></i>
            <img :src="config.BACKEND_URL + item.account.profile.url" height="30px" width="30px;" style="border-radius: 50%;" v-else>
            {{item.account.username}}
          </label>
          <label class="text-primary">
            <i class="fas fa-circle" style="font-size: 8px; color: #555; padding-right: 5px;"></i>
            <b>{{auth.displayAmount(item.amount)}}</b>
          </label>
          <label class="pull-right">
            <div class="dropdown" id="dropdownMenuButtonDropdown">
              <i class="fas fa-ellipsis-h text-gray more-options" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-target="dropdownMenuButtonDropdown" style="padding-top: 10px;">
              </i>
              <div class="dropdown-menu dropdown-more-options" aria-labelledby="dropdownMenuButton" >
                <span class="dropdown-item action-link" @click="showRequestModal('update', item)" v-if="parseInt(item.account_id) === user.userID || (item.comakers !== null && user.userID === parseInt(item.comakers[0].comaker))">Edit</span>
                <span class="dropdown-item action-link" @click="showReportModal(item)">Report</span>
              </div>
            </div>
          </label>
        </span>
        <span class="summary-header text-primary">
          <label style="text-transform: UPPERCASE; margin-right: 25px;">
            {{auth.showRequestType(item.type) + ' - ' + item.money_type}}
          </label>
        </span>
        <span class="summary-header">
          <label>
           <b>Posted on:</b> {{item.created_at_human}}
          </label>
        </span>
        <span class="summary-header">
          <label v-if="item.location !== null">
            <b>Location: </b>{{item.location.route + ', ' + item.location.locality + ', ' + item.location.country}}
          </label>
        </span>
        <span class="summary-header">
          <label>
            <b>Needed on: </b> {{item.needed_on_human}}
          </label>
        </span>
        <span class="summary-header">
          <label v-if="parseInt(item.type) > 100">
            <b>Interest: </b>{{item.interest}}% interest per Month for {{item.months_payable}} 
            <label v-if="parseInt(item.months_payable) > 1">Months</label>
            <label v-else>Month</label>
          </label>
        </span>
        <span class="summary-header">
          <label v-if="parseInt(item.type) > 100">
            <b>Billing per month: </b> {{item.billing_per_month_human}}
          </label>
        </span>
        <span class="body">
          <label>
           {{item.reason}}
          </label>
        </span>
        <span class="body" v-if="item.images !== null">
          <img :src="config.BACKEND_URL + imageItem.url" v-for="(imageItem, imageIndex) in item.images" :key="imageIndex" class="request-image" @click="showImage(config.BACKEND_URL + imageItem.url)" :style="{'width': (parseInt(100 / item.images.length) - 1) + '%', 'max-width': (parseInt(100 / item.images.length) - 1) + '%'}">
        </span>
        <span class="footer">
          <label>
            <ratings :ratings="item.rating" v-if="item.rating !== null"></ratings>
          </label>
          <label v-if="parseInt(item.type) > 100">
            Total Borrowed: {{auth.displayAmount(item.total)}}
          </label>
          <button class="btn btn-primary" style="margin-right: 5px;" @click="showInvestmentModal(item)" v-if="parseInt(item.type) > 100">Invest</button>
          <button class="btn btn-primary" style="margin-right: 5px;" @click="showInvestmentModal(item)" v-if="parseInt(item.type) < 101">Process</button>
          <button class="btn btn-warning" style="margin-right: 5px;" @click="bookmark(item.id)">
            <i class="fas fa-star" v-if="item.bookmark === true"></i>
            Bookmark</button>
        </span>
        
        <label class="mt-3" v-if="parseInt(item.invested) > 0 && parseInt(item.amount) > 0">Percentage of amount invested</label>
        <b-progress :max="parseInt(item.initial_amount)" class="progress-bar bg-warning"  style="margin-bottom: 10px;" v-if="parseInt(item.invested) > 0 && parseInt(item.amount) > 0">
          <b-progress-bar :value="parseFloat(item.initial_amount) - item.amount" :variant="'bg-primary'" :label="parseInt((1 - (item.amount / parseFloat(item.initial_amount))) * 100) + '%'"></b-progress-bar>
        </b-progress>
      
      </div>
      <empty v-if="data === null" :title="'We just launched and we\'re still growing.'" :action="' Please check back soon, we will have tons of request for you.'" :icon="'far fa-smile'" :iconColor="'text-primary'"></empty>
    </div>
    <div class="request-list-right-container">
    </div>
    <invest :item="selecteditemInvest"></invest>
    <profile :item="selecteditemProfile"></profile>
    <report :item="selecteditemReport"></report>
    <increment-modal :property="requestModal"></increment-modal>
    <show-image-modal ref="showImage"></show-image-modal>
  </div>
</template>
<style scoped lang="scss">
@import "~assets/style/colors.scss";
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
  line-height: 30px;
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
  min-height: 40px;
  line-height: 40px;
  overflow-y: hidden;
}

.footer label{
  float: left;
}

.footer button{
  float: right;
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

.dropdown-item{
  width: 100% !important;
  height: 40px !important;
  float: left !important;
  background: #fff !important;
  padding-top: 0px !important;
  line-height: 40px !important;
}

.dropdown-item:hover{
  background: #ddd !important;
}

.request-image{
  float: left;
  margin-right: 1%;
  max-height: auto;
  margin-bottom: 10px;
}

.request-image:hover{
  cursor: pointer;
  border: solid 1px $secondary;
}

@media (max-width: 992px){
  .request-list-wrapper{
    margin-bottom: 200px;
  }
  .request-list-right-container, .request-list-left-container{
    width: 100%;
    margin-left: 0%;
  }
  .footer button{
    float: left;
  }
}

</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
import REQUEST from '../modal/CreateRequest.js'
export default{
  mounted(){
    $('#loading').css({display: 'block'})
    if(this.$route.params.code){
      this.retrieve({created_at: 'desc'}, {column: 'code', value: this.$route.params.code})
    }else{
      this.retrieve({created_at: 'desc'}, {column: 'created_at', value: ''})
    }
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
      selecteditemInvest: null,
      selecteditemProfile: null,
      selecteditemReport: null,
      config: CONFIG,
      activePage: 0,
      requestModal: REQUEST,
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
          title: 'Interest ascending',
          payload: 'interest',
          payload_value: 'asc'
        }, {
          title: 'Interest descending',
          payload: 'interest',
          payload_value: 'desc'
        }, {
          title: 'Months payable ascending',
          payload: 'months_payable',
          payload_value: 'asc'
        }, {
          title: 'Months payable descending',
          payload: 'status',
          payload_value: 'desc'
        }, {
          title: 'Needed on ascending',
          payload: 'needed_on',
          payload_value: 'asc'
        }, {
          title: 'Needed on descending',
          payload: 'needed_on',
          payload_value: 'desc'
        }]
      }],
      listStyle: null,
      sort: null,
      filter: null
    }
  },
  components: {
    'invest': require('modules/transfer/Invest.vue'),
    'profile': require('modules/request/Profile.vue'),
    'report': require('modules/request/Report.vue'),
    'basic-filter': require('components/increment/generic/filter/Basic.vue'),
    'ratings': require('components/increment/generic/rating/DirectRatings.vue'),
    'empty': require('components/increment/generic/empty/EmptyDynamicIcon.vue'),
    'increment-modal': require('components/increment/generic/modal/Modal.vue'),
    'show-image-modal': require('components/increment/generic/modal/Image.vue')
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
            if(input.variable === 'comaker'){
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
            if(parseInt(item.invested) > 0){
              data.disabled = true
            }
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
            if(data.variable === 'comaker'){
              data.validation['flag'] = true
              data.disabled = true
              if(item.comakers !== null){
                data.value = item.comakers[0].account.email
              }else{
                data.value = null
              }
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
      this.selecteditemInvest = item
      $('#createTransferModal').modal('show')
    },
    showProfileModal(item){
      this.selecteditemProfile = item
      this.selecteditemProfile['payload'] = 'request'
      $('#profileModal').modal('show')
    },
    showReportModal(item){
      this.selecteditemReport = item
      $('#createReportModal').modal('show')
    },
    retrieve(sort, filter){
      if(this.user.type === 'USER'){
        filter.column = 'account_id'
        filter.value = this.user.userID
      }
      if(sort !== null){
        this.sort = sort
      }
      if(filter !== null){
        this.filter = filter
      }
      if(sort === null && this.sort !== null){
        sort = this.sort
      }
      if(filter === null && this.filter !== null){
        filter = this.filter
      }
      let key = Object.keys(sort)
      let parameter = {
        limit: 10,
        offset: this.activePage,
        sort: {
          value: sort[key[0]],
          column: key[0]
        },
        value: filter.value + '%',
        column: filter.column,
        type: this.user.type,
        account_id: this.user.userID
      }
      setTimeout(() => {
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
      }, 100)
    },
    bookmark(id){
      let parameter = {
        account_id: this.user.userID,
        request_id: id
      }
      $('#loading').css({display: 'block'})
      this.APIRequest('bookmarks/create', parameter).then(response => {
        this.retrieve(null, null)
      })
    },
    manageGrid(event){
      switch(event){
        case 'th-large': this.listStyle = 'columns'
          break
        case 'list': this.listStyle = 'list'
          break
      }
    },
    showImage(src){
      this.$refs.showImage.setImage(src)
    }
  }

}
</script>
