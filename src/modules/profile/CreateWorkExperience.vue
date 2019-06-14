<template>
  <div class="profile-holder">
    <span class="header">Work
      <button class="btn btn-primary pull-right" style="margin-right: 10px;" @click="showCreateModal()">Add</button>
    </span>
    <span class="content">
      <!-- Display Here -->
      <span class="display">
        <div class="rl-container-item" v-for="item, index in data" v-if="data !== null">
          <span class="header">
            <label class="action-link text-primary">
              <i class="fas fa-user-circle" style="color: #555; padding-right: 5px;" v-if="item.account.profile === null"></i>
              <img :src="config.BACKEND_URL + item.account.profile.url" height="30px" width="30px;" style="border-radius: 50%;" v-else>
              {{item.account.username}}
            </label>
            <label>
              <i class="fas fa-circle" style="font-size: 8px; color: #555; padding-right: 5px;"></i>Cebu City
            </label>
          </span>
        </div>
      </span>

      <span class="sidebar">
        <span class="sidebar-header" style="margin-top: 25px;">Profile Picture</span>
        <span class="image" v-if="user.profile !== null">
          <img :src="config.BACKEND_URL + user.profile.url" height="auto" width="100%" >
        </span>
        <span class="image" v-else>
          <i class="fa fa-user-circle-o" ></i>
        </span>
        <button class="btn btn-primary custom-block" style="margin-top: 5px;" @click="showImages()">Select from images
        </button>
      </span>
    </span>
    <browse-images-modal :object="user.profile" v-if="user.profile !== null"></browse-images-modal>
    <browse-images-modal :object="newWork" v-if="user.profile === null"></browse-images-modal>
    <create-modal></create-modal>
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
  width: 65%;
  float: left;
  margin-right: 5%;
  min-height: 50px;
  overflow-y: hidden;
}
.sidebar{
  width: 30%;
  float: left;
  min-height: 50px;
  overflow-y: hidden;
}
.sidebar-header{
  height: 40px;
  line-height: 40px;
  width: 100%;
  float: left;
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
  border-radius: 5px;
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
export default {
  mounted(){
    this.retrieve()
  },
  data(){
    return {
      user: AUTH.user,
      tokenData: AUTH.tokenData,
      config: CONFIG,
      data: null
    }
  },
  components: {
    'browse-images-modal': require('components/increment/generic/image/BrowseModal.vue'),
    'create-modal': require('modules/profile/WorkModal.vue')
  },
  methods: {
    retrieve(){
      let parameter = {
        condition: [{
          value: this.user.userID,
          column: 'account_id',
          clause: '='
        }]
      }
      this.APIRequest('works/retrieve', parameter).then(response => {
        if(response.data.length > 0){
          this.data = response.data[0]
        }else{
          this.data = null
        }
      })
    },
    showCreateModal(){
      $('#createWorkModal').modal('show')
    },
    update(){
      if(this.validate()){
        this.APIRequest('works/update', this.data).then(response => {
          if(response.data === true){
            this.retrieve()
          }
        })
      }
    },
    submit(){
      this.newWork.account_id = this.user.userID
      this.APIRequest('works/create', this.newWork).then(response => {
      })
    },
    validate(){
      let i = this.data
      if(i.first_name !== null && i.last_name !== null && i.sex !== null){
        return true
      }
      return false
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
