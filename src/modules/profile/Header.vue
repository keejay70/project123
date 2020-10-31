<template>
  <div class="profile-header-wrapper" v-if="item.account !== null">
    <div class="incre-row text-center">
      <span class="image text-center mt-4" v-if="item.account.profile !== null">
        <img :src="config.BACKEND_URL + item.account.profile.url">
      </span>
      <span class="image text-center" v-else>
        <i class="fa fa-user-circle-o" ></i>
      </span>
    </div>
    <div class="incre-row text-center" style="text-transform: capitalize"><br>
      <div class="text-white" v-if="item.account.information !== null && item.account.information.first_name !== null">
        <span v-if="item.account.information.first_name !== null">{{item.account.information.first_name}}</span>
        <span v-if="item.account.information.last_name !== null">{{item.account.information.last_name}}</span>
      </div>
      <p v-else class="text-white">{{item.account.username}}</p>
      <ratings class="text-white" :ratings="item.rating" v-if="item.rating !== null"></ratings>
      <p class="text-white"><i class="far fa-check-circle" color="primary"></i><i> {{item.status === 'NOT_VERIFIED' ? item.status : 'Verified'}}</i></p>
      <br>
      <!-- <label class="text-white" v-if="item.account.information !== null"><b>{{item.account.information.address}}</b></label> -->

    </div>
  </div>
</template>
<style scoped>
.fa-check-circle {
  color: #00bfff;
}
.fa-user-circle-o {
  color: #ffffff;
}
.profile-header-wrapper{
  width: 100%;
  float: left;
  min-height: 100px;
  overflow-y: hidden;
  background-color: #3F0050;
}
.image{
  width: 100%;
  float: left; 
}
.image img{
  width: 150px;
  height: 150px;
}
.image i{
  font-size: 150px;
  line-height: 200px;
}
.image img{
  border-radius: 50%;
}
.incre-row h2, .incre-row label{
  height: 40px;
  line-height: 40px;
  width: 100%;
  margin-bottom: 0px;
}
.incre-row label i{
  font-size: 24px;
  padding-right: 5px;
  padding-left: 5px;
}
label{
  width: 100%;
  float: left;
  margin: 0px;
  line-height: 40px;
}
@media (max-width: 992px){
}

</style>
<script>
import ROUTER from '../../router'
import AUTH from '../../services/auth'
import CONFIG from '../../config.js'
export default{
  mounted(){
  },
  data(){
    return {
      user: AUTH.user,
      config: CONFIG
    }
  },
  props: ['item'],
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    }
  },
  components: {
    'ratings': require('components/increment/generic/rating/DirectRatings.vue')
  }
}
</script>
