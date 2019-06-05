<template>
  <div class="request-list-wrapper">
    <div class="request-list-left-container">
<!--       <div class="rl-container-header">
        <request-filter :size="size"></request-filter>
      </div> -->
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
            <ratings :ratings="item.rating"></ratings>
          </label>
          <label>
            Total Borrowed: PHP {{item.total}}
          </label>
        </span>
      </div>
      <empty v-if="data === null" :title="'You don\'t have investments right now'" :action="'Go to requested and start investing to our users'" :icon="'far fa-smile'" :iconColor="'text-primary'"></empty>
    </div>
    <div class="request-list-right-container">
    </div>
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
    'empty': require('components/increment/generic/empty/EmptyDynamicIcon.vue')
  },
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
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
