 <template>
  <div class="request-list-wrapper">
    <div class="request-list-left-container">
      <div class="incre-row">
        <button class="btn btn-primary pull-right" @click="showRequestModal('create')">Post a request</button>
      </div>
      <basic-filter 
      v-bind:category="category" 
      :activeCategoryIndex="0"
      :activeSortingIndex="0"
      @changeSortEvent="retrieve($event.sort, $event.filter)"
      @changeStyle="manageGrid($event)"
      :grid="['list', 'th-large']"></basic-filter>
      <div class="rl-container-item" v-for="(item, index) in data" :key="index" @click="redirect('/requests/' + item.request.code)">
        <span class="header">
          <label class="action-link text-primary">
            <i class="fas fa-user-circle" style="color: #555; padding-right: 5px;" v-if="item.request.account.profile === null"></i>
            <img :src="config.BACKEND_URL + item.request.account.profile.url" height="30px" width="30px;" style="border-radius: 50%;" v-else>
            {{item.request.account.username}}
          </label>
          <label>
            <i class="fas fa-circle" style="font-size: 8px; color: #555; padding-right: 5px;"></i>{{item.request.account.information.address}}
          </label>
          <label class="pull-right">
            <div class="dropdown" id="dropdownMenuButtonDropdown">
              <i class="fas fa-ellipsis-h text-gray more-options" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-target="dropdownMenuButtonDropdown">
              </i>
              <div class="dropdown-menu dropdown-more-options" aria-labelledby="dropdownMenuButton" >
                <span class="dropdown-item action-link" @click="showReportModal(item.id)">Remove</span>
              </div>
            </div>
          </label>
        </span>
        <span class="summary-header">
          <label>
            {{item.request.created_at_human}}
          </label>
          <label class="text-primary">
            <i class="fas fa-circle" style="font-size: 8px; color: #555; padding-right: 5px;"></i>
            <b>{{auth.displayAmount(item.request.amount)}}</b>
          </label>
          <label>
            <i class="fas fa-circle" style="font-size: 8px; color: #555; padding-right: 5px;"></i>
            {{item.request.interest}}% interest per Month for {{item.request.months_payable}} 
            <label v-if="parseInt(item.request.months_payable) > 1">Months</label>
            <label v-else>Month</label>
          </label>
        </span>
        <span class="summary-header">
          <label>
            Pay {{item.request.billing_per_month_human}}
          </label>
          <label>
            <i class="fas fa-circle" style="font-size: 8px; color: #555; padding-right: 5px;"></i>
            Needed on {{item.request.needed_on_human}}
          </label>
        </span>
        <span class="body">
          <label>
           {{item.request.reason}}
          </label>
        </span>
        <span class="footer">
          <label>
            <ratings :ratings="item.request.rating" v-if="item.request.rating !== null"></ratings>
          </label>
          <label>
            Total Borrowed: {{auth.displayAmount(item.request.total)}}
          </label>
         <!--  <button class="btn btn-primary" style="margin-right: 5px;" @click="showInvestmentModal(item)">Invest</button>
          <button class="btn btn-warning" style="margin-right: 5px;" @click="bookmark(item.id)">Bookmark</button> -->
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

.rl-container-item:hover{
  cursor: pointer;
  background: $warning !important;
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
export default{
  mounted(){
    $('#loading').css({display: 'block'})
    this.retrieve({created_at: 'desc'}, {column: 'created_at', value: ''})
  },
  data(){
    return {
      user: AUTH.user,
      auth: AUTH,
      data: null,
      config: CONFIG,
      activePage: 0,
      category: [{
        title: 'Sort by',
        sorting: [{
          title: 'Date created ascending',
          payload: 'created_at',
          payload_value: 'asc'
        }, {
          title: 'Date created descending',
          payload: 'created_at',
          payload_value: 'desc'
        }]
      }],
      listStyle: null,
      filter: null,
      sort: null
    }
  },
  components: {
    'invest': require('modules/transfer/Invest.vue'),
    'profile': require('modules/request/Profile.vue'),
    'report': require('modules/request/Report.vue'),
    'basic-filter': require('components/increment/generic/filter/Basic.vue'),
    'ratings': require('components/increment/generic/rating/DirectRatings.vue'),
    'empty': require('components/increment/generic/empty/EmptyDynamicIcon.vue'),
    'increment-modal': require('components/increment/generic/modal/Modal.vue')
  },
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
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
      if(sort === null || filter === null){
        sort = this.sort
        filter = this.filter
      }
      let key = Object.keys(sort)
      let parameter = {
        sort: sort,
        condition: [{
          value: filter.value + '%',
          column: filter.column,
          clause: 'like'
        }, {
          value: this.user.userID,
          column: 'account_id',
          clause: '='
        }]
      }
      setTimeout(() => {
        this.APIRequest('bookmarks/retrieve', parameter).then(response => {
          $('#loading').css({display: 'none'})
          if(response.data !== null){
            this.data = response.data
          }else{
            this.data = null
          }
        })
      }, 100)
    },
    remove(id){
      $('#loading').css({display: 'block'})
      let parameter = {
        id: id
      }
      this.APIRequest('bookmarks/delete', parameter).then(response => {
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
    }
  }

}
</script>
