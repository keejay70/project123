<template>
  <div class="ledger-summary-container">
    <basic-filter 
      v-bind:category="category" 
      :activeCategoryIndex="0"
      :activeSortingIndex="0"
      @changeSortEvent="retrieve($event.sort, $event.filter)"
      @changeStyle="manageGrid($event)"
      :grid="['list', 'th-large']"></basic-filter>
    <div class="summary-container-item" v-for="item, index in data" v-if="data !== null">
      <span class="header">
        {{item.created_at_human}}
        <i class="fa fa-circle" style="font-size: 11px"></i>
        <label style="text-transform: UPPERCASE">{{item.status}}</label>
      </span>
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
      <div class="attachment-header">
        <button class="btn btn-primary" @click="showImages(item.id)" style="margin-bottom: 10px;">Attach File</button>
      </div>
      <div v-if="item.attachments.length > 0">
          <br>
         <img v-for="(image, imageIndex) in item.attachments" :key="imageIndex" :src="config.BACKEND_URL + image.file" class="attachment-image" @click="viewImage(config.BACKEND_URL + image.file)"/>
      </div>
      </span>
    </div>
    <empty v-if="data === null" :title="'Looks like you do not have deposit yet!'" :action="'Deposit now or start requesting money.'"></empty>
    <browse-images-modal></browse-images-modal>
    <image-viewer :src="selectedImage"></image-viewer>
  </div>
</template>
<style scoped lang="scss">
@import "~assets/style/colors.scss";
.ledger-summary-container{
  width: 60%;
  float: left;
  height: auto;
  margin-bottom: 100px;
  margin-top: 25px;
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

.attachment-header{
  width: 100%;
  float: left;
  border-bottom: solid 1px #eee;
}

.attachment-image{
  width: auto;
  height: 50px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 10px;
}

.attachment-image:hover{
  cursor: pointer;
  border: solid 1px $primary;
}
@media (max-width: 992px){
  .ledger-summary-container{
    width: 100%;
  }
}
</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
export default{
  mounted(){
    this.retrieve({column: 'created_at', value: 'desc'}, {column: 'created_at', value: ''})
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
      config: CONFIG,
      category: [{
        title: 'Sort by',
        sorting: [{
          title: 'Date posted ascending',
          payload: 'created_at',
          payload_value: 'asc'
        }, {
          title: 'Date posted descending',
          payload: 'created_at',
          payload_value: 'desc'
        }, {
          title: 'Amount ascending',
          payload: 'amount',
          payload_value: 'asc'
        }, {
          title: 'Amount descending',
          payload: 'amount',
          payload_value: 'desc'
        }, {
          title: 'Description ascending',
          payload: 'description',
          payload_value: 'asc'
        }, {
          title: 'Description descending',
          payload: 'description',
          payload_value: 'desc'
        }, {
          title: 'Status ascending',
          payload: 'status',
          payload_value: 'asc'
        }, {
          title: 'Status descending',
          payload: 'status',
          payload_value: 'desc'
        }]
      }],
      selectedImage: null,
      filter: null,
      sort: null
    }
  },
  components: {
    'empty': require('components/increment/generic/empty/Empty.vue'),
    'browse-images-modal': require('components/increment/generic/image/BrowseModal.vue'),
    'basic-filter': require('components/increment/generic/filter/Basic.vue'),
    'image-viewer': require('components/increment/generic/modal/Image.vue')
  },
  methods: {
    redirect(params){
      ROUTER.push(params)
    },
    showImages(id){
      this.newAttachment.activeId = id
      $('#browseImagesModal').modal('show')
    },
    viewImage(src){
      this.selectedImage = src
      setTimeout(() => {
        $('#imageView').modal('show')
      })
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
        this.retrieve(this.sort, this.filter)
      })
    },
    retrieve(sort, filter){
      this.filter = filter
      this.sort = sort
      let parameter = {
        condition: [{
          column: 'account_id',
          value: this.user.userID,
          clause: '='
        }, {
          column: filter.column,
          clause: 'like',
          value: filter.value + '%'
        }],
        sort: {
          created_at: 'desc'
        }
      }
      $('#loading').css({display: 'block'})
      this.APIRequest('deposits/retrieve', parameter).then(response => {
        $('#loading').css({display: 'none'})
        if(response.data.length > 0){
          this.data = response.data
        }else{
          this.data = null
        }
      })
    },
    manageGrid(event){
      switch(event){
        case 'th-large': this.listStyle = 'columns'
          break
        case 'list': this.listStyle = 'list'
          break
      }
    }
  }
}
</script>
