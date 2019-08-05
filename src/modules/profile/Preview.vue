<template>
  <div class="profile-preview-wrapper" v-if="item !== null">
    <profile-header :item="item" v-if="item.account !== null"></profile-header>
    <basic :item="item" v-if="item.account !== null"></basic>
    <educations :data="item.educations" v-if="item.educations !== null"></educations>
    <works :data="item.works" v-if="item.works !== null"></works>
    <ids :data="item.cards" v-if="item.cards !== null"></ids>
<!--     <reviews :item="item" v-if="item.account !== null"></reviews> -->
  </div>
</template>
<style scoped>
.profile-preview-wrapper{
  width: 100%;
  float: left;
  min-height: 100px;
  overflow-y: hidden;
}
@media (max-width: 992px){
}

</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
export default{
  mounted(){
  },
  data(){
    return {
      user: AUTH.user,
      data: null
    }
  },
  props: ['item'],
  components: {
    'profile-header': require('modules/profile/Header.vue'),
    'basic': require('modules/profile/Basic.vue'),
    'works': require('modules/profile/Works.vue'),
    'ids': require('modules/profile/Ids.vue'),
    'reviews': require('modules/profile/Reviews.vue'),
    'educations': require('modules/profile/Educations.vue')
  },
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    }
  }

}
</script>
