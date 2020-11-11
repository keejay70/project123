<template>
  <div class="profile-preview-wrapper" v-if="item !== null">
    <profile-header :item="item" v-if="item.account !== null"></profile-header>
    <basic :item="item" v-if="item.account !== null"></basic>
    <educations :data="item.educations" v-if="item.educations !== null"></educations>
    <works :data="item.works" v-if="item.works !== null"></works>
    <ids :data="item.cards" v-if="item.cards !== null"></ids>
    <!-- <payments :data="item.cards" v-if="item.cards !== null"></payments> -->
    <comakers :data="item.comakers" v-if="item.comakers !== null && item.payload === 'request'"></comakers>
    <guarantors :data="item.guarantors" v-if="item.guarantors !== null"></guarantors>
<!--     <reviews :item="item" v-if="item.account !== null"></reviews> -->
    <div class="text-center">
      <button class="btn danger action p-3 text-white">Decline</button>
      <button class="btn success action p-3 text-white">Accept</button>
      <!-- <button class="btn danger action p-3">Remove</button> -->
    </div>
  </div>
</template>
<style scoped>
.action {
  width:40%;
}
.danger {
  background-color: #EB5757;;
}
.success{
  background-color: #22B173;
}
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
    'educations': require('modules/profile/Educations.vue'),
    'payments': require('modules/profile/Payments.vue'),
    'comakers': require('modules/profile/CoMakers.vue'),
    'guarantors': require('modules/profile/Guarantors.vue')
  },
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    }
  }

}
</script>
