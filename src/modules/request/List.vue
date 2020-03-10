 <template>
  <div class="request-list-wrapper">
    <div class="request-list-left-container">
      <div class="incre-row" style="margin-bottom: 10px;">
        <label v-if="locations !== null" class="pull-left">
          <button class="btn btn-warning" style="margin-bottom: 5px;">Tag Locations</button>
          <button class="btn btn-primary" v-for="(location, index) in locations.locality" :key="index" style="margin-right: 5px; margin-bottom: 5px;">
            {{location}}
          </button>
        </label>
        <button class="btn btn-primary pull-right" @click="redirect('/createRequest')">Post a request</button>
        <button class="btn btn-primary pull-right" @click="showMyRequest()" style="margin-right: 10px;">View my request</button>
        <!-- <button class="btn btn-primary pull-right" @click="showRequestModal('create')">Post a request</button> -->
      </div>
      <basic-filter 
      v-bind:category="category" 
      :activeCategoryIndex="0"
      :activeSortingIndex="0"
      @changeSortEvent="retrieve($event.sort, $event.filter), resetActivePage()"
      @changeStyle="manageGrid($event)"
      :grid="['list', 'th-large']"></basic-filter>
      <span class="incre-row">
          <basic-pager :pages="parseInt(size / limit) + (size % limit !== 0 ? 1 : 0)" :offset="limit" :active="activePage" :limit="limit"></basic-pager>
      </span>
      
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
          <label class="text-danger" v-if="item.coupon !== null && parseInt(item.account_id) === user.userID">
            <i class="fas fa-circle" style="font-size: 8px; color: #555; padding-right: 5px;"></i>
            <b>{{item.coupon.type === 'percentage' ? item.coupon.amount + '%' : auth.displayAmountWithCurrency(item.coupon.amount, item.coupon.currency)}} Discount</b>
          </label>
          <label class="pull-right" v-if="parseInt(item.account_id) !== user.userID">
            <div class="dropdown" id="dropdownMenuButtonDropdown">
              <i class="fas fa-ellipsis-h text-gray more-options" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-target="dropdownMenuButtonDropdown" style="padding-top: 10px;">
              </i>
              <div class="dropdown-menu dropdown-more-options" aria-labelledby="dropdownMenuButton" >
                <!-- <span class="dropdown-item action-link" @click="showRequestModal('update', item)" v-if="parseInt(item.account_id) === user.userID || (item.comakers !== null && user.userID === parseInt(item.comakers[0].comaker))">Edit</span> -->
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
          <label style="text-align: justify;">
           {{item.reason}}
          </label>
        </span>
        <span class="body" v-if="item.images !== null">
          <img :src="config.BACKEND_URL + imageItem.url" v-for="(imageItem, imageIndex) in item.images" :key="imageIndex" class="request-image" @click="showImage(config.BACKEND_URL + imageItem.url)" :style="{'width': (parseInt(100 / item.images.length) - 1) + '%', 'max-width': (parseInt(100 / item.images.length) - 1) + '%'}">
        </span>
        <span class="footer">
          <label>
            Ratings <ratings :ratings="item.rating" v-if="item.rating !== null"></ratings>
          </label>
          <label v-if="parseInt(item.type) > 100">
            Total Borrowed: {{auth.displayAmount(item.total)}}
          </label>
          <div v-if="parseInt(item.account_id) !== user.userID">
            <button class="btn btn-primary" style="margin-right: 5px;" @click="showInvestmentModal(item)" v-if="parseInt(item.type) > 100 && user.type !== 'USER'">Invest</button>
            <button class="btn btn-primary" style="margin-right: 5px;" @click="showChargeModal(item)" v-if="parseInt(item.type) < 101 && user.type !== 'USER'">Connect</button>
            <!-- <button class="btn btn-warning" style="margin-right: 5px;" @click="bookmark(item.id)">
              <i class="fas fa-star" v-if="item.bookmark === true"></i>
              Bookmark</button> -->
          </div>
        </span>
        
        <label class="mt-3" v-if="parseInt(item.invested) > 0 && parseInt(item.amount) > 0">Percentage of amount invested</label>
        <b-progress :max="parseInt(item.initial_amount)" class="progress-bar bg-warning"  style="margin-bottom: 10px;" v-if="parseInt(item.invested) > 0 && parseInt(item.amount) > 0">
          <b-progress-bar :value="parseFloat(item.initial_amount) - item.amount" :variant="'bg-primary'" :label="parseInt((1 - (item.amount / parseFloat(item.initial_amount))) * 100) + '%'"></b-progress-bar>
        </b-progress>

        <span class="peer-requests" v-if="parseInt(item.account_id) === user.userID && item.peers.peers !== null">
          <div class="peer-header text-primary">
            <b>Peer request list</b>
          </div>
          <div class="peer-item" v-for="(peerItem, peerIndex) in item.peers.peers" :key="peerIndex">
            <span class="incre-row">
              <i class="fas fa-user-circle" style="color: #555; padding-right: 5px;" v-if="peerItem.account.profile === null"></i>
              <img :src="config.BACKEND_URL + peerItem.account.profile.url" height="30px" width="30px;" style="border-radius: 50%;" v-else>
              <label>{{peerItem.account.username}}</label>
              <label class="pull-right">
                <ratings :ratings="peerItem.rating" v-if="peerItem.rating !== null"></ratings>
              </label>
            </span>
            <span class="incre-row">
              <label>Processing fee: <b class="text-primary">{{auth.displayAmountWithCurrency(peerItem.charge, peerItem.currency)}}</b></label>
              <button class="btn btn-primary pull-right" v-if="item.peers.status === false" @click="acceptPeer(peerItem, item)">Accept</button>
              <button class="btn pull-right btn-primary" v-if="item.peers.status === true && item.account_id === user.userID" @click="redirect('/thread/' + item.code)">View thread</button>
              <button class="btn pull-right" v-if="item.peers.status === true && item.account_id === user.userID" style="margin-right: 10px; height: 35px !important;">Approved</button>
            </span>
          </div>
        </span>
      
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
    <show-process-modal  ref="createChargesModal"></show-process-modal>
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
  margin-bottom: 10px;
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

.peer-requests{
  width: 100%;
  float: left;
  min-height: 10px;
  overflow-y: hidden;
}

.peer-header{
  line-height: 50px;
}

.peer-item{
  width: 100%;
  float: left;
  min-height: 10px;
  overflow-y: hidden;
  border-top: solid 1px $gray;
  line-height: 50px;
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
    if(this.$route.params.code){
      setTimeout(() => {
        this.retrieve({created_at: 'desc'}, {column: 'code', value: this.$route.params.code})
      }, 500)
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
      size: 0,
      limit: 10,
      pulling: null,
      locations: null,
      size2: null,
      newPulling: {
        requestId: null
      },
      selecteditemInvest: null,
      selecteditemProfile: null,
      selecteditemReport: null,
      config: CONFIG,
      activePage: 1,
      requestModal: REQUEST,
      category: [{
        title: 'Sort by',
        sorting: [{
          title: 'Date posted descending',
          payload: 'created_at',
          payload_value: 'desc',
          input_type: 'date'
        }, {
          title: 'Date posted ascending',
          payload: 'created_at',
          payload_value: 'asc',
          input_type: 'date'
        }, {
          title: 'Amount ascending',
          payload: 'amount',
          payload_value: 'asc',
          input_type: 'number'
        }, {
          title: 'Amount descending',
          payload: 'amount',
          payload_value: 'desc',
          input_type: 'number'
        }, {
          title: 'Needed on ascending',
          payload: 'needed_on',
          payload_value: 'asc',
          input_type: 'date'
        }, {
          title: 'Needed on descending',
          payload: 'needed_on',
          payload_value: 'desc',
          input_type: 'date'
        }]
      }],
      listStyle: null,
      sort: null,
      filter: null
    }
  },
  watch: {
    '$route' (to, from) {
      if(this.$route.params.code){
        setTimeout(() => {
          this.retrieve({created_at: 'desc'}, {column: 'code', value: this.$route.params.code})
        }, 500)
      }else{
        this.retrieve({created_at: 'desc'}, {column: 'created_at', value: ''})
      }
      return to
    }
  },
  components: {
    'invest': require('modules/transfer/Invest.vue'),
    'profile': require('modules/request/Profile.vue'),
    'report': require('modules/request/Report.vue'),
    'basic-filter': require('components/increment/generic/filter/Basic.vue'),
    'basic-pager': require('components/increment/generic/pager/Pager.vue'),
    'ratings': require('components/increment/generic/rating/DirectRatings.vue'),
    'empty': require('components/increment/generic/empty/EmptyDynamicIcon.vue'),
    'increment-modal': require('components/increment/generic/modal/Modal.vue'),
    'show-image-modal': require('components/increment/generic/modal/Image.vue'),
    'show-process-modal': require('modules/request/ProcessModal.vue')
  },
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    },
    resetActivePage(){
      this.activePage = 1
    },
    show(item){
      if(this.showId === item.id){
        this.showId = null
      }else{
        this.showId = item.id
      }
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
      if(this.user.type === 'USER'){
        return
      }
      this.selecteditemProfile = item
      this.selecteditemProfile['payload'] = 'request'
      $('#profileModal').modal('show')
    },
    showReportModal(item){
      this.selecteditemReport = item
      $('#createReportModal').modal('show')
    },
    showMyRequest(){
      this.retrieve({created_at: 'desc'}, {column: 'account_id', value: this.user.userID})
    },
    retrieve(sort, filter){
      // if(this.user.type === 'USER'){
      //   filter.column = 'account_id'
      //   filter.value = this.user.userID
      // }
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
        limit: this.limit,
        offset: (this.activePage - 1) * this.limit,
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
        $('#loading').css({display: 'block'})
        this.APIRequest('requests/retrieve', parameter).then(response => {
          AUTH.user.ledger.amount = response.ledger
          $('#loading').css({display: 'none'})
          if(response.data !== null){
            this.data = response.data
            this.size = parseInt(response.size)
            this.locations = response.locations
          }else{
            this.data = null
            this.size = 0
            this.locations = null
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
    },
    showChargeModal(item){
      if(this.user.type === 'USER'){
        return
      }
      this.$refs.createChargesModal.show(item)
    },
    acceptPeer(peerItem, item){
      let parameter = {
        id: peerItem.id,
        status: 'approved'
      }
      $('#loading').css({display: 'block'})
      this.APIRequest('request_peers/update', parameter).then(response => {
        if(response.data){
          let messengerParams = {
            member: peerItem.account_id,
            title: item.code,
            payload: item.id,
            creator: this.user.userID
          }
          this.APIRequest('custom_messenger_groups/create', messengerParams).then(response => {
            $('#loading').css({display: 'none'})
            if(response.data > 0){
              this.redirect('/thread/' + item.code)
            }
          })
        }else{
          $('#loading').css({display: 'none'})
        }
      })
    }
  }

}
</script>
