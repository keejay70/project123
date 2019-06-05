<template>
  <div class="request-list-wrapper">
    <div class="request-list-left-container">
      <div class="incre-row">
        <button class="btn btn-primary pull-right" @click="showRequestModal()">Post a request</button>
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
                <span class="dropdown-item action-link" @click="showReportModal(item)">Report</span>
              </div>
            </div>
          </label>
        </span>
        <span class="summary-header">
          {{item.created_at_human}}
        </span>
        <span class="summary-header">
          <label class="text-primary">
            <b>PHP {{item.amount}}</b>
          </label>
          <label>
            <i class="fas fa-circle" style="font-size: 8px; color: #555; padding-right: 5px;"></i>{{item.interest}}% interest per Month for {{item.months_payable}} Month(s)
          </label>

          <label>
            <i class="fas fa-circle" style="font-size: 8px; color: #555; padding-right: 5px;"></i>Needed on {{item.needed_on_human}}
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
            Total Borrowed: PHP {{item.total}}
          </label>
          <button class="btn btn-primary pull-right" @click="showInvestmentModal(item)">Invest</button>
          <button class="btn btn-warning pull-right" style="margin-right: 5px;" @click="bookmark(item.id)">Bookmark</button>
        </span>
      </div>
      <empty v-if="data === null" :title="'We just launched and we\'re still growing.'" :action="' Please check back soon, we will have tons of request for you.'" :icon="'far fa-smile'" :iconColor="'text-primary'"></empty>
    </div>
    <div class="request-list-right-container">
    </div>
    <create-request></create-request>
    <invest :item="selecteditem"></invest>
    <profile :item="selecteditem"></profile>
    <report :item="selecteditem"></report>
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
export default{
  mounted(){
    this.retrieve({
      column: 'created_at',
      value: 'asc'
    })
  },
  data(){
    return {
      user: AUTH.user,
      data: null,
      size: null,
      selecteditem: null,
      config: CONFIG,
      activePage: 0
    }
  },
  components: {
    'create-request': require('modules/request/Create.vue'),
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
        limit: 10,
        offset: this.activePage,
        sort: sort
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
