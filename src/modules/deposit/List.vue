<template>
  <div class="ledger-summary-container">
    <div class="summary-container-item" v-for="item, index in data" v-if="data !== null">
      <span class="header">{{item.created_at}}</span>
      <span class="body">
        <label>
          {{item.description}}
        </label>
        <label v-if="item.payload === 'investments'">
          <b class="text-primary action-link">request</b>
        </label>
        <label  v-bind:class="{'text-danger': parseFloat(item.amount) <= 0, 'text-primary': parseFloat(item.amount) > 0}"class="pull-right amount"><b>{{auth.displayAmount(item.amount)}}</b></label>
      </span>
      <span class="footer">
        
      <div>
        <button class="btn btn-primary" @click="showImages(item.id)">Attach File</button>

      </div>

      <div v-if="item.attachments.length > 0">
          <br>
         <img v-for="(image, imageIndex) in item.attachments" :key="imageIndex" :src="config.BACKEND_URL + image.file" height="200" width="200"/>
      </div>

      </span>
    </div>
    <empty v-if="data === null" :title="'Looks like you do not have deposit yet!'" :action="'Deposit now or start requesting money.'"></empty>
    <browse-images-modal></browse-images-modal>
  </div>
</template>
<style scoped>
.ledger-summary-container{
  width: 100%;
  float: left;
  height: auto;
  margin-bottom: 100px;
}

.ledger-summary-container-header{
  width: 100%;
  float: left;
  height: 70px;
  border: solid 1px #ddd;
}
.summary-container-item{
  width: 100%;
  float: left;
  border-radius: 5px;
  min-height: 50px;
  overflow-y: hidden;
  border: solid 1px #ddd;
  margin-top: 10px;
  padding-left: 10px;
}
.summary-container-item .header{
  width: 100%;
  float: left;
  height: 50px;
  line-height: 50px;
  color: #555;
}
.summary-container-item .body{
  width: 100%;
  float: left;
  min-height: 50px;
  overflow-y: hidden;
  padding-right: 10px;
}

.summary-container-item .amount{
}
</style>
<script>
import ROUTER from '../../router'
import AUTH from '../../services/auth'
import CONFIG from '../../config.js'
export default{
  mounted(){
    this.retrieve({column: 'created_at', value: 'desc'})
  },
  data(){
    return {
      user: AUTH.user,
      data: null,
      auth: AUTH,
      newAttachment: {
        activeId: null,
        file: null
      },
      config: CONFIG
    }
  },
  components: {
    'empty': require('components/increment/generic/empty/Empty.vue'),
    'browse-images-modal': require('components/increment/generic/image/BrowseModal.vue')
  },
  methods: {
    redirect(params){
      ROUTER.push(params)
    },
    showImages(id){
      this.newAttachment.activeId = id
      $('#browseImagesModal').modal('show')
    },
    manageImageUrl(url){
      this.newAttachment.file = url
      this.attach(this.newAttachment)
    },
    attach(){
      this.APIRequest('deposit_attachments/update', this.newAttachment).then(response => {
        $('#loading').css({display: 'none'})
        if(response.data !== null){
          this.data = response.data
        }else{
          this.data = null
        }
      })
    },
    retrieve(sort){
      let parameter = {
        condition: [{
          column: 'account_id',
          value: this.user.userID,
          clause: '='
        }],
        sort: {
          created_at: 'desc'
        }
      }
      $('#loading').css({display: 'none'})
      this.APIRequest('deposits/retrieve', parameter).then(response => {
        $('#loading').css({display: 'none'})
        if(response.data.length > 0){
          this.data = response.data
        }else{
          this.data = null
        }
      })
    }
  }
}
</script>
