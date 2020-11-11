<template>
  <div class="incre-row">
    <label class="title"><b>CO-MAKERS</b></label>
    <div class="incre-row">
      <div class="item" v-for="(item, index) in data" :key="index" @click="select(item)">
        {{item.account.username}}
        <i class="fas fa-check text-primary pull-right" v-if="item.status === 'approved'"></i>
      </div>
      <div v-if="selectedItem !== null">
        <profile-header :item="selectedItem" v-if="selectedItem.account !== null"></profile-header>
        <basic :item="selectedItem" v-if="selectedItem.account !== null"></basic>
        <educations :data="selectedItem.educations" v-if="selectedItem.educations !== null"></educations>
        <works :data="selectedItem.works" v-if="selectedItem.works !== null"></works>
        <ids :data="selectedItem.cards" v-if="selectedItem.cards !== null"></ids>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "~assets/style/colors.scss";
.incre-row .title{
  width: 100%;
  float: left;
  height: 50px;
  line-height: 50px;
  color: #555;
  border-top: solid 1px #ddd;
  border-bottom: solid 1px #ddd;
  margin-bottom: 25px;
}

.incre-row{
  margin-bottom: 25px;
}

.item{
  width: 49%;
  height: 50px;
  margin-right: 1%;
  float: left;
  line-height: 50px;
  border: solid 1px #ddd;
  padding: 0px 10px;
  margin-bottom: 10px;
}
.item:hover{
  text-decoration: underline;
  color: $primary;
  cursor: pointer;
}
.item i{
  line-height: 50px;
}

.borderless td, .borderless th {
    border: none;
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
      config: CONFIG,
      selectedItem: null
    }
  },
  components: {
    'profile-header': require('modules/profile/Header.vue'),
    'basic': require('modules/profile/Basic.vue'),
    'works': require('modules/profile/Works.vue'),
    'ids': require('modules/profile/Ids.vue'),
    'educations': require('modules/profile/Educations.vue')
  },
  props: ['data'],
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    },
    select(item){
      if(this.selectedItem !== null){
        if(this.selectedItem.id !== item.id){
          this.selectedItem = item
        }else{
          this.selectedItem = null
        }
      }else{
        this.selectedItem = item
      }
    }
  }
}
</script>
