<template>
  <div class="ledger-summary-container">
    <basic-filter 
      v-bind:category="category" 
      :activeCategoryIndex="0"
      :activeSortingIndex="0"
      @changeSortEvent="retrieve($event.sort, $event.filter)"
      @changeStyle="manageGrid($event)"
      :grid="['list', 'th-large']"></basic-filter>
    <table class="table table-bordered"  v-if="data !== null">
      <thead>
        <td>Username</td>
        <td>Deposit #</td>
        <td>Via</td>
        <td>Amount</td>
        <td>Status</td>
        <td v-if="user.type === 'ADMIN'">Actions</td>
      </thead>
      <tbody>
        <tr v-for="item, index in data">
          <td>{{item.account.username}}</td>
          <td>{{item.deposit_slip}}</td>
          <td>{{item.bank}}</td>
          <td>{{auth.displayAmountWithCurrency(item.amount, item.currency)}}</td>
          <td>{{item.status}}</td>
          <td v-if="user.type === 'ADMIN'">
            <button class="btn btn-danger" style="margin-bottom: 10px;" @click="approve(item)" v-if="item.status === 'pending'">Approve</button>
          </td>
        </tr>
      </tbody>
    </table>
    <empty v-if="data === null" :title="'No deposit yet!'" :action="'Keep growing.'"></empty>
    <browse-images-modal></browse-images-modal>
    <image-viewer :src="selectedImage"></image-viewer>
    <authenticate-otp ref="authenticateOTP"></authenticate-otp>
  </div>
</template>
<style scoped lang="scss">
@import "~assets/style/colors.scss";
.ledger-summary-container{
  width: 100%;
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
  min-height: 10px;
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
    this.retrieve({created_at: 'desc'}, {column: 'created_at', value: ''})
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
      sort: null,
      selectedItem: null
    }
  },
  components: {
    'empty': require('components/increment/generic/empty/Empty.vue'),
    'browse-images-modal': require('components/increment/generic/image/BrowseModal.vue'),
    'basic-filter': require('components/increment/generic/filter/Basic.vue'),
    'image-viewer': require('components/increment/generic/modal/Image.vue'),
    'authenticate-otp': require('modules/transfer/Otp.vue')
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
      if(sort !== null){
        this.sort = sort
      }
      if(filter !== null){
        this.filter = filter
      }
      if(sort === null && this.sort !== null){
        sort = this.sort
      }
      if(filter === null && this.filter !== null){
        filter = this.filter
      }
      let parameter = {
        condition: [{
          column: filter.column,
          value: filter.value + '%',
          clause: 'like'
        }],
        sort: sort
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
    },
    approve(item){
      this.selectedItem = item
      if(item.status === 'pending'){
        this.$refs.authenticateOTP.show()
      }
    },
    successOTP(){
      this.selectedItem['from'] = this.user.userID
      $('#loading').css({display: 'block'})
      this.APIRequest('ledgers/create_on_deposit', this.selectedItem).then(response => {
        $('#loading').css({display: 'none'})
        this.retrieve(null, null)
      })
    }
  }
}
</script>
