<template>
  <div class="dashboard-wrapper" v-if="data !== null">
<!--     <button class="btn btn-primary" @click="redirect('/signup/janpalugod1234@gmail.com/LB1Q48DE0MZJ73X529W6IRAPHNGVCSYO')">Test</button>
    <button class="btn btn-primary" @click="redirect('/profile/guarantor')">Test</button> -->
    <div class="dashboard-left-container">
      <ledgers :data="data.ledger.ledger"></ledgers>
      <requests :data="data.ledger.total_requests"></requests>
      <approved :data="data.ledger.approved"></approved>
      <available :data="data.ledger.available"></available>
    </div>
    <div class="dashboard-right-container">
      <div class="dr-container-header">
        <label><b>Ledger Summary</b></label>
        <button class="btn btn-primary pull-right" style="margin-right:10px; margin-top: 5px;" @click="redirect('requests')">View requests</button>

        <button class="btn btn-primary pull-right" style="margin-right:10px; margin-top: 5px;" @click="redirect('investments')" v-if="user.type !== 'USER'">View investments</button>

        <button class="btn btn-primary pull-right" style="margin-right:10px; margin-top: 5px;" v-if="data.ledger.request_status === true" @click="redirect('payments')">Make payment</button>
      </div>
      <summary-ledger :data="data.data"></summary-ledger>
    </div>
  </div>
</template>
<style scoped>
.dashboard-wrapper{
  width: 100%;
  float: left;
  min-height: 400px;
  overflow-y: hidden;
  margin-top: 25px;
  margin-bottom: 100px;
}

.dashboard-left-container{
  float: left;
  width: 25%;
  min-height: 50px;
  overflow-y: hidden;
}
.dl-container-item{
  width: 100%;
  float: left;
  min-height: 50px;
  overflow-y: hidden;
  border: solid 1px #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
}
.dl-container-item label, .dl-container-item span{
  width: 96%;
  float: left;
  height: 40px;
  line-height: 40px;
  margin-left: 2%;
  margin-right: 2%;
  padding: 0px;
  margin-bottom: 0px;
}

.dl-container-item .content{
  font-size: 20px;
  margin-bottom: 0px;
}
.dashboard-right-container{
  float: left;
  width: 73%;
  min-height: 50px;
  overflow-y: hidden;
  margin-left: 2%;
}
.dr-container-header{
  width: 100%;
  float: left;
  height: 50px;
  border-radius: 5px;
  border: solid 1px #ddd;
}
.dr-container-header label{
  line-height: 50px;
  height: 50px;
  float: left;
  padding-left: 10px;
}
.dr-container-item{
  width: 100%;
  float: left;
  border-radius: 5px;
  min-height: 50px;
  overflow-y: hidden;
  border: solid 1px #ddd;
  margin-top: 10px;
  padding-left: 10px;
}
.dr-container-item .header{
  width: 100%;
  float: left;
  height: 50px;
  line-height: 50px;
  color: #555;
}
.dr-container-item .body{
  width: 100%;
  float: left;
  min-height: 50px;
  overflow-y: hidden;
}
@media (max-width: 992px){
  .dashboard-wrapper{
    margin-bottom: 200px;
  }
  .dashboard-right-container, .dashboard-left-container{
    width: 100%;
    margin-left: 0%;
  }

  .dr-container-header button{
    display: none;
  }

}

</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
export default{
  mounted(){
    this.retrieve({column: 'created_at', value: 'desc'})
  },
  data(){
    return {
      user: AUTH.user,
      data: null
    }

  },
  components: {
    'ledgers': require('modules/dashboard/Ledger.vue'),
    'requests': require('modules/dashboard/Requests.vue'),
    'available': require('modules/dashboard/Available.vue'),
    'approved': require('modules/dashboard/Approved.vue'),
    'summary-ledger': require('modules/dashboard/Summary.vue')
  },
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    },
    retrieve(sort){
      let parameter = {
        account_id: this.user.userID,
        offset: 0,
        limit: 5,
        sort: sort
      }
      $('#loading').css({display: 'block'})
      setTimeout(() => {
        this.APIRequest('ledgers/summary', parameter).then(response => {
          $('#loading').css({display: 'none'})
          if(response !== null){
            this.data = response
          }else{
            this.data = null
          }
        })
      }, 1000)
    }
  }
}

</script>
