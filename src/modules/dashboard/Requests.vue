<template>
  <div class="requested-container-item">
    <label class="header"><b>Requested Amount</b></label>
    <label class="content" v-if="data !== null">{{auth.displayAmount(data)}}</label>
    <span style="margin-bottom: 5px;" v-if="user.type !== 'USER'">
      <button class="btn btn-primary" @click="redirect('/requests')">Visit</button>
    </span>
  </div>
</template>
<style scoped>
.requested-container-item{
  width: 100%;
  float: left;
  min-height: 50px;
  overflow-y: hidden;
  border: solid 1px #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
}
.requested-container-item label, .requested-container-item span{
  width: 96%;
  float: left;
  height: 40px;
  line-height: 40px;
  margin-left: 2%;
  margin-right: 2%;
  padding: 0px;
  margin-bottom: 0px;
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
      auth: AUTH
    }
  },
  props: ['data'],
  methods: {
    redirect(url){
      ROUTER.push(url)
    }
  }

}
</script>
