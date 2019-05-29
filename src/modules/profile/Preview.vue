<template>
  <div class="profile-preview-wrapper">
    <div class="container"></div>
  </div>
</template>
<style scoped>
.profile-preview-wrapper{
  width: 100%;
  float: left;
  min-height: 400px;
  overflow-y: hidden;
  margin-top: 25px;
  margin-bottom: 100px;
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
      data: null
    }
  },
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    }
  }

}
</script>
