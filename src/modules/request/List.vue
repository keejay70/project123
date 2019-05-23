<template>
  <div class="request-list-wrapper">
    <div class="request-list-left-container">
      <div class="rl-container-header">
        <label><b>Requests</b></label>
      </div>
      <div class="rl-container-item">
        <span class="header">
          <label>
            <i class="fas fa-user-circle" style="color: #555; padding-right: 5px;"></i>
            Kennette Canales
          </label>
          <label><i class="fas fa-circle" style="font-size: 8px; color: #555; padding-right: 5px;"></i>May 20, 2019</label>
          <label class="pull-right">
            <i v-bind:class="{'far': stars === 0 || i > stars, 'fas text-warning': i <= stars}" class="fa-star" v-for="i in 5"></i>
          </label>
        </span>
        <span class="body">
          <label>
            I want to use it as my allowance this month.
          </label>
        </span>
        <span class="footer">
          <label class="text-primary action-link"><b>Ref. 112233</b></label>
          <label class="pull-right">Total Borrowred: PHP 12, 000.00</label>
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
.rl-container-item .body,{
  width: 100%;
  float: left;
  min-height: 50px;
  overflow-y: hidden;
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
  data(){
    return {
      user: AUTH.user,
      stars: 3
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
