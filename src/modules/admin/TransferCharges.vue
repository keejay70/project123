<template>
  <div class="ledger-summary-container">
    <div class="incre-row">
      <button class="btn btn-primary pull-right" @click="showTransferModal('create')">Add</button>
    </div>
    <basic-filter 
      v-bind:category="category" 
      :activeCategoryIndex="0"
      :activeSortingIndex="0"
      @changeSortEvent="retrieve($event.sort, $event.filter)"
      @changeStyle="manageGrid($event)"
      :grid="['list', 'th-large']"></basic-filter>
    
    <table class="table table-bordered" v-if="data !== null">
      <thead>
        <tr>
          <td>Type</td>
          <td>Minimum Amount</td>
          <td>Max Amount</td>
          <td>Charge</td>
          <td>Date Added</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :ke="index">
          <td>{{item.type}}</td>
          <td>{{item.min_amount}}</td>
          <td>{{item.max_amount}}</td>
          <td>{{item.charge}}</td>
          <td>{{item.created_at}}</td>
        </tr>
      </tbody>
    </table>
    <empty v-if="data === null" :title="'No charges specified!'" :action="'Click add to create.'"></empty>
    <browse-images-modal></browse-images-modal>
    <increment-modal :property="transferModal"></increment-modal>
  </div>
</template>
<style scoped>
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
import transferCharges from 'src/modules/modal/CreateTransferCharges.js'
export default{
  mounted(){
    $('#loading').css({display: 'block'})
    this._retrieve({type: 'asc'}, {column: 'created_at', value: ''})
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
      transferModal: transferCharges,
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
          title: 'Type ascending',
          payload: 'type',
          payload_value: 'asc'
        }, {
          title: 'Type descending',
          payload: 'type',
          payload_value: 'desc'
        }, {
          title: 'Charge ascending',
          payload: 'charge',
          payload_value: 'asc'
        }, {
          title: 'Charge descending',
          payload: 'charge',
          payload_value: 'desc'
        }, {
          title: 'Minimum amount ascending',
          payload: 'min_amount',
          payload_value: 'asc'
        }, {
          title: 'Minimum amount descending',
          payload: 'min_amount',
          payload_value: 'desc'
        }, {
          title: 'Maximum amount ascending',
          payload: 'max_amount',
          payload_value: 'asc'
        }, {
          title: 'Maximum amount descending',
          payload: 'max_amount',
          payload_value: 'desc'
        }]
      }]
    }
  },
  components: {
    'empty': require('components/increment/generic/empty/Empty.vue'),
    'browse-images-modal': require('components/increment/generic/image/BrowseModal.vue'),
    'basic-filter': require('components/increment/generic/filter/Basic.vue'),
    'increment-modal': require('components/increment/generic/modal/Modal.vue')
  },
  methods: {
    redirect(params){
      ROUTER.push(params)
    },
    _retrieve(sort, filter){
      let parameter = {
        condition: [{
          column: filter.column,
          clause: 'like',
          value: filter.value + '%'
        }],
        sort: sort
      }
      this.APIRequest('transfer_charges/retrieve', parameter).then(response => {
        $('#loading').css({display: 'none'})
        if(response.data.length > 0){
          this.data = response.data
        }else{
          this.data = null
        }
      })
    },
    retrieve(sort){
      let parameter = {
        sort: {
          created_at: 'desc'
        }
      }
      $('#loading').css({display: 'block'})
      this.APIRequest('transfer_charges/retrieve', parameter).then(response => {
        $('#loading').css({display: 'none'})
        if(response.data.length > 0){
          this.data = response.data
        }else{
          this.data = null
        }
      })
    },
    showTransferModal(action, item = null){
      switch(action){
        case 'create':
          this.transferModal = {...transferCharges}
          let inputs = this.transferModal.inputs
          inputs.map(input => {
            input.value = null
          })
          break
        case 'update':
          break
      }
      $('#createTransferChargesModal').modal('show')
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
