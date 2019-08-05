<template>
  <div class="profile-holder">
    <span class="header">Identification</span>
    <span class="content">
      <span class="inputs">
        <div class="form-group" style="margin-top: 25px;">
          <label for="address">Select ID Type</label>
          <select class="form-control" v-model="selected">
            <option v-for="option in config.identifications" v-bind:value="option.value">{{ option.text }}</option>
          </select>
          <button class="btn btn-primary" style="margin-top: 10px;" @click="showImages()">Add Image</button>
        </div>
      </span>
    </span>
    <span class="content" v-for="(item, index) in data" :key="index">
      <span class="title">{{item.title}}</span>
      <span class="images">
        <img :src="config.BACKEND_URL + img.payload_value" v-for="(img, imgIndex) in item.content" :key="imgIndex" @click="showImage(config.BACKEND_URL + img.payload_value)">
      </span>
    </span>
    <browse-images-modal></browse-images-modal>
    <show-image-modal ref="showImage"></show-image-modal>
  </div>
</template>
<style scoped lang="scss">
@import "~assets/style/colors.scss";
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
.subheader{
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  text-align: center;
  border-bottom: solid 1px #ddd;
  float: left;
}
.content{
  width: 100%;
  min-height: 50px;
  float: left;
  overflow-y: hidden;
}
.inputs{
  width: 65%;
  float: left;
  margin-right: 5%;
  min-height: 50px;
  overflow-y: hidden;
}

.content .title{
  width: 100%;
  float: left;
  height: 40px;
  line-height: 40px;
  text-transform: capitalize;
}

.images img{
  max-width: 200px;
  float: left;
  max-height: 200px;
}
.images img:hover{
  cursor: pointer;
  border: solid 1px $secondary;
}

@media screen and (max-width: 992px){
  .holder{
    width: 96%;
    margin-left: 2%;
    margin-right: 2%;
  }
  .inputs{
    width: 100%;
    margin-right: 0%;
    margin-left: 0%;
  }
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
      config: CONFIG,
      data: null,
      selected: CONFIG.identifications[0].value
    }
  },
  components: {
    'browse-images-modal': require('components/increment/generic/image/BrowseModal.vue'),
    'show-image-modal': require('components/increment/generic/modal/Image.vue')
  },
  methods: {
    retrieve(){
      let parameter = {
        account_id: this.user.userID
      }
      this.APIRequest('account_cards/retrieve', parameter).then(response => {
        if(response.data.length > 0){
          this.data = response.data
        }else{
          this.data = null
        }
      })
    },
    update(url, id){
      let parameter = {
        id: id,
        payload_value: url
      }
      if(this.validate()){
        this.APIRequest('account_cards/update', parameter).then(response => {
          if(response.data === true){
            this.retrieve()
          }
        })
      }
    },
    create(url){
      let parameter = {
        account_id: this.user.userID,
        payload: this.selected,
        payload_value: url
      }
      this.APIRequest('account_cards/create', parameter).then(response => {
        if(response.data > 0){
          this.retrieve()
        }
      })
    },
    showImages(){
      $('#browseImagesModal').modal('show')
    },
    showImage(src){
      this.$refs.showImage.setImage(src)
    },
    manageImageUrl(url){
      this.create(url)
    }
  }
}
</script>
