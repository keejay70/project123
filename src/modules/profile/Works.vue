<template>
  <div class="incre-row">
    <label class="title"><b>Work Experiences</b></label>
    <div class="incre-row">
      <div class="rl-container-item" v-for="(item, index) in data" :key="index">
        <span class="header">
          <label class="cards-label"> 
            {{ item.month_started }}
            {{ item.year_started }}
          </label>
          -
          <label class="cards-label" v-if="item.month_ended && item.year_ended !== null">
            {{ item.month_ended }}
            {{ item.year_ended }}
          </label>
          <label class="cards-label" v-else>
            Present
          </label>
          <label class="pull-right">
            <div class="dropdown" id="dropdownMenuButtonDropdown">
            <i class="fas fa-ellipsis-h text-gray more-options" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-target="dropdownMenuButtonDropdown">
            </i>
            <div class="dropdown-menu dropdown-more-options" aria-labelledby="dropdownMenuButton" >
              <span class="dropdown-item action-link dropdown-label">Settings</span>
              <span class="dropdown-item action-link" @click="showModal('update', item)">Edit</span>
              <span class="dropdown-item action-link" @click="removeWork(item.id)">Remove</span>
            </div>
          </div>
          </label>
        </span>
        <span class="summary-header">
          <div style="line-height: 160%; vertical-align: middle;">
            <i class="fas fa-sitemap" style="font-size: 15px;"></i>
            <span style="position: relative; display: inline-block; left: 5px; font-size: 14px; font-weight: 600; color: #000">
              {{ item.position }}
            </span>
          </div>
          <div style="line-height: 160%; vertical-align: middle;">
            <i class="fas fa-building"></i>
            <span style="position: relative; display: inline-block; left: 5px; font-size: 14px;"> 
              {{ item.company_name }}
            </span>
          </div>
          <div style="line-height: 160%; vertical-align: middle;">
            <i class="fas fa-map-marker-alt" style="font-size: 21px;"></i>
            <span style="position: relative; display: inline-block; left: 5px; font-size: 14px;">
              {{ item.location }}
            </span>
          </div>
          <div style="line-height: 160%;">
            <label style="margin: 5px 0 0 0; color: #000;">About Work:</label>
            <div style="font-size: 14px;">
              <div v-if="item.work_description.length <= 400">
                {{ item.work_description }}
              </div>
              <div v-else style="word-break: break-all; font-color: 555;">
                {{ showDescription === true &&  showDescriptionIndex === index ? item.work_description : item.work_description.substring(0, 400) }}
                <a :class="showDescription === true &&  showDescriptionIndex === index ? 'see-more clicked' : 'see-more'" @click="setShowDescription(index)">
                  {{ showDescription === true &&  showDescriptionIndex === index ? '<<<' : '>>>'}}
                </a>
              </div>
              <!-- <div v-if="item.work_description.length >= 400" title="See more" style="margin: 5px 47%">
                <a :class="showDescription === true && showDescriptionIndex === index ? 'arrow-icon open' : 'arrow-icon'" @click="setShowDescription(index)">
                  <span class="left-bar"></span>
                  <span class="right-bar"></span>
                </a>
              </div> -->
              <!-- <label v-else>
                <span v-if="item.flag === false"> {{ item.work_description.substring(0, 400)}} <strong class="text-danger" @click="item.flag = true"> TEST </strong></span>
                <span v-if="item.flag === true"> {{ item.work_description }} <strong class="text-danger" @click="item.flag = false"> TEST </strong></span>
              </label> -->
            </div>
          </div>
        </span>
      </div>
    </div>
  </div>
</template>
<style scoped>
.incre-row .title{
  width: 100%;
  float: left;
  height: 50px;
  line-height: 50px;
  color: #555;
  border-top: solid 1px #ddd;
  border-bottom: solid 1px #ddd;
}

.borderless td, .borderless th {
    border: none;
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
.rl-container-item .summary-header{
  width: 100%;
  float: left;
  line-height: 25px;
  font-size: 17px;
  color: #555; 
}
.rl-container-item .footer{
  width: 100%;
  float: left;
  height: 45px;
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
  props: ['data'],
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    }
  }
}
</script>
