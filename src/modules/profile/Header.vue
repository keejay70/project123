<template>
  <div class="profile-header-wrapper">
    <div class="incre-row text-center">
      <span class="image" v-if="user.profile !== null">
        <img :src="config.BACKEND_URL + user.profile.url" height="auto" width="100%" >
      </span>
      <span class="image" v-else>
        <i class="fa fa-user-circle-o" ></i>
      </span>
    </div>
    <div class="incre-row text-center">
      <h2 class="text-primary">Kennette Canales</h2>
      <label>Cebu City</label>
    </div>
  </div>
</template>
<style scoped>
.profile-header-wrapper{
  width: 100%;
  float: left;
  min-height: 100px;
  overflow-y: hidden;
}
.sidebar .image{
  width: 100%;
  float: left;
  min-height: 200px;
  overflow-y: hidden;
  text-align: center;
}
.image i{
  font-size: 150px;
  line-height: 200px;
}
.image img{
  border-radius: 50%;
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
      user: AUTH.user
    }
  },
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    }
  }
}
</script>
