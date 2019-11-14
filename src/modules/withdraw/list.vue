<template>
  <div class="ledger-summary-container">
    <basic-filter 
      v-bind:category="category" 
      :activeCategoryIndex="0"
      :activeSortingIndex="0"
      @changeSortEvent="retrieve($event.sort, $event.filter)"
      @changeStyle="manageGrid($event)"
      :grid="['list', 'th-large']"></basic-filter>
    <table class="table table-bordered" v-if="data !== null">
      <thead>
        <td>Transfer via</td>
        <td>Details</td>
        <td>Amount</td>
        <td>Charge</td>
        <td>Status</td>
        <td>Date</td>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="index">
          <td>{{item.payload}}</td>
          <td>{{item.payload_value}}</td>
          <td>{{auth.displayAmount(item.amount)}}</td>
          <td>{{auth.displayAmount(item.charge)}}</td>
          <td style="text-transform: UPPERCASE">{{item.status}}</td>
          <td>{{item.created_at_human}}</td>
        </tr>
      </tbody>
    </table>
    <empty v-if="data === null" :title="'Looks like you do not have withdrawals yet!'" :action="'Deposit now or start requesting money.'"></empty>
    <browse-images-modal></browse-images-modal>
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
export default{
  mounted(){
    this.retrieve({created_at: 'desc'}, {column: 'created_at', value: ''})
  },
  data(){
    return {
      auth: AUTH,
      user: AUTH.user,
      data: null,
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
          title: 'Transfer via ascending',
          payload: 'payload',
          payload_value: 'asc'
        }, {
          title: 'Transfer via descending',
          payload: 'payload',
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
          title: 'Charge ascending',
          payload: 'charge',
          payload_value: 'asc'
        }, {
          title: 'Charge descending',
          payload: 'charge',
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
      }]
    }
  },
  components: {
    'empty': require('components/increment/generic/empty/Empty.vue'),
    'browse-images-modal': require('components/increment/generic/image/BrowseModal.vue'),
    'basic-filter': require('components/increment/generic/filter/Basic.vue')
  },
  methods: {
    redirect(params){
      ROUTER.push(params)
    },
    retrieve(sort, filter){
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
        sort: sort
      }
      $('#loading').css({display: 'block'})
      this.APIRequest('withdrawals/retrieve', parameter).then(response => {
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
