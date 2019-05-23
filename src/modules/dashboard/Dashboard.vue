<template>
  <div class="dashboard-wrapper">
    <div class="dashboard-left-container">
      <div class="dl-container-item bg-primary">
        <label class="header"><b>Account Balance</b></label>
        <label class="content">PHP 10, 000.00</label>
        <span style="margin-bottom: 5px;">
          <button class="btn btn-primary">Withdraw</button>
          <button class="btn btn-warning pull-right" style="margin-top: 4px;">Invest</button>
        </span>
      </div>

      <div class="dl-container-item">
        <label class="header"><b>Requested Amount</b></label>
        <label class="content">PHP 10, 000.00</label>
        <span style="margin-bottom: 5px;">
          <button class="btn btn-primary" @click="redirect('/requests')">Visit</button>
        </span>
      </div>

      <div class="dl-container-item">
        <label class="header"><b>Approved Amount</b></label>
        <label class="content">PHP 10, 000.00</label>
      </div>

      <div class="dl-container-item">
        <label class="header"><b>Available Funds</b></label>
        <label class="content">PHP 10, 000.00</label>
      </div>
    </div>
    <div class="dashboard-right-container">
      <div class="dr-container-header">
        <label><b>Transactions</b></label>
        <button class="btn btn-primary pull-right" style="margin-right:10px; margin-top: 5px;" @click="showRequestModal()">Request</button>
      </div>
      <div class="dr-container-item">
        <span class="header">May 20, 2019</span>
        <span class="body">
          <label>
            You have invested the amount of <b>PHP 2, 000.00</b> for this reference <b class="text-primary action-link">#112233</b>.
          </label>
        </span>
        <span class="footer"></span>
      </div>
    </div>
    <create-request></create-request>
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
}

</style>
<script>
import ROUTER from '../../router'
import AUTH from '../../services/auth'
import CONFIG from '../../config.js'
export default{
  data(){
    return {
      user: AUTH.user
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
    }
  }

}
</script>
