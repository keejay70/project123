<template>
  <div class="profile-holder">
    <span class="header">Work
      <button class="btn btn-primary pull-right" style="margin-right: 10px;" @click="showCreateModal()">Add</button>
    </span>
    <span class="content">
      <!-- Display Here -->
      <span class="display">
        <div class="rl-container-item" v-for="(item, index) in data" :key="index">
          <span class="header">
            <label> 
              {{ item.month_started }}
              {{ item.year_started }}
            </label>
            -
            <label>
              {{ item.month_ended }}
              {{ item.year_ended }}
            </label>
          </span>
          <span class="summary-header">
            <div>
              {{ item.position }}
            </div>
            <div>
              {{ item.company_name }}
            </div>
            <div>
              {{ item.location }}
            </div>

          </span>
        </div>
      </span>
    </span>

    <browse-images-modal :object="user.profile" v-if="user.profile !== null"></browse-images-modal>
    <browse-images-modal :object="newWork" v-if="user.profile === null"></browse-images-modal>
    <create-modal :property="createWorkModal"></create-modal>
  </div>
</template>
<style scoped>
.profile-holder{
  width: 95%;
  float: left;
  margin-left: 5%;
}
.header{
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 24px;
  border-bottom: solid 1px #ddd;
  float: left;
}
.content{
  width: 100%;
  min-height: 50px;
  float: left;
  overflow-y: hidden;
}
.display{
  width: 100%;
  float: left;
  margin-right: 5%;
  min-height: 50px;
  overflow-y: hidden;
}

.custom-block{
  width: 100%;
  float: left;
}
.custom-block input{
  display: none;
}
@media screen and (max-width: 992px){
  .holder{
    width: 96%;
    margin-left: 2%;
    margin-right: 2%;
  }
  .sidebar, .inputs{
    width: 100%;
    margin-right: 0%;
    margin-left: 0%;
  }
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
</style>
<script>
import ROUTER from '../../router'
import AUTH from '../../services/auth'
import axios from 'axios'
import CONFIG from '../../config.js'
import Work from '../modal/CreateWork.js'
export default {
  mounted(){
    this.retrieve()
  },
  data(){
    return {
      user: AUTH.user,
      tokenData: AUTH.tokenData,
      config: CONFIG,
      data: null,
      createWorkModal: Work
    }
  },
  components: {
    'browse-images-modal': require('components/increment/generic/image/BrowseModal.vue'),
    'create-modal': require('components/increment/generic/modal/Modal.vue')
  },
  methods: {
    retrieve(){
      let parameter = {
        condition: [{
          value: this.user.userID,
          column: 'account_id',
          clause: '='
        }],
        sort: {
          year_ended: 'desc'
        }
      }
      this.APIRequest('works/retrieve', parameter).then(response => {
        if(response.data.length > 0){
          this.data = response.data
        }else{
          this.data = null
        }
      })
    },
    showCreateModal(){
      $('#createWorkModal').modal('show')
    },
    showImages(){
      $('#browseImagesModal').modal('show')
    },
    hideImages(){
      $('#browseImagesModal').modal('hide')
    }
  }
}
</script>
