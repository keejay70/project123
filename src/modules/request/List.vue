<template>
  <div class="request-list-wrapper">
    <div class="request-list-left-container">
      <div class="rl-container-header">
        <label><b>Requests</b></label>
      </div>
      <div class="rl-container-item" v-for="item, index in data" v-if="data !== null">
        <span class="header">
          <label>
            <i class="fas fa-user-circle" style="color: #555; padding-right: 5px;"></i>
            {{item.account.username}}
          </label>
          <label><i class="fas fa-circle" style="font-size: 8px; color: #555; padding-right: 5px;"></i>{{item.created_at_human}}</label>
          <label class="pull-right" v-if="item.rating.total > 0">
            <i v-bind:class="{'far': item.rating.avg === 0 || i > item.rating.avg, 'fas text-warning': i <= item.rating.avg}" class="fa-star" v-for="i in 5"></i>
          </label>
        </span>
        <span class="body">
          <label>
            Requested the amount of <b>PHP {{item.amount}}</b> with the interest rate of {{item.interest}}% per month and payable within {{item.months_payable}} Month(s) for the reason of {{item.reason}}.
          </label>
        </span>
        <span class="footer">
          <label class="text-primary action-link" @click="redirect('/request/' + item.code)"><b>Reference #{{item.id}}</b></label>
          <label class="pull-right">Total Borrowed: PHP {{item.total}}</label>
        </span>
      </div>
    </div>
    <div class="request-list-right-container">
    </div>
    <create-request></create-request>
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
  height: 50px;
  border-radius: 5px;
  border: solid 1px #ddd;
}
.rl-container-header label{
  line-height: 50px;
  height: 50px;
  float: left;
  padding-left: 10px;
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
.rl-container-item .header label{
  margin-bottom: 0px;
}
.rl-container-item .body{
  width: 100%;
  float: left;
  min-height: 50px;
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
      stars: 3,
      data: null
    }
  },
  components: {
    'create-request': require('modules/request/Create.vue')
  },
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    },
    showRequestModal(){
      $('#createRequestModal').modal('show')
    },
    retrieve(){
      let parameter = {
        condition: [{
          value: 0,
          column: 'status',
          clause: '='
        }],
        sort: {
          'created_at': 'desc'
        }
      }
      $('#loading').css({display: 'block'})
      this.APIRequest('requests/retrieve', parameter).then(response => {
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
