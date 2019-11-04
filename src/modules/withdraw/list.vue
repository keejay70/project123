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
      <span class="header"> {{item.created_at}}</span>
      <span class="body">
         <div v-if="item.payload === 'Banco De Oro'">
        <label>
          <img width="110px" src="../../assets/img/bdo.png"/></label> 
          <p><b>{{item.payload_value}}</b></p>
        </label>
        </div>
         <div v-if="item.payload === 'Cebuana Lhuillier'">
        <label>
          <img width="110px" src="../../assets/img/cebuanalhuillier.png"/></label> 
          <p><b>{{item.payload_value}}</b></p>
        </label>
        </div>
         <div v-if="item.payload === 'Palawan Pawnshop'">
        <label>
          <img width="110px" src="../../assets/img/palawanpawnshop.png"/></label> 
          <p><b>{{item.payload_value}}</b></p>
        </label>
        </div>
         <div v-if="item.payload === 'GCASH'">
        <label>
          <img width="110px" src="../../assets/img/gcash.png"/></label> 
          <p><b>{{item.payload_value}}</b></p>
        </label>
        </div>
         <div v-if="item.payload === 'Union Bank'">
        <label>
          <img width="110px" src="../../assets/img/unionbank.png"/></label> 
          <p><b>{{item.payload_value}}</b></p>
        </label>
        </div>
         <div v-if="item.payload === 'M Lhuillier'">
        <label>
          <img width="110px" src="../../assets/img/mlhuillier.png"/></label> 
          <p><b>{{item.payload_value}}</b></p>
        </label>
        </div>

        <label v-if="item.payload === 'investments'">
          <b class="text-primary action-link">request</b>
        </label>
        <label  v-bind:class="{'text-danger': parseFloat(item.amount) <= 0, 'text-primary': parseFloat(item.amount) > 0}"class="pull-right amount"><b>{{auth.displayAmount(item.amount)}}</b></label>
      </span>
      <span class="footer">
      

      </span>
    </div>
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
      $('#loading').css({display: 'none'})
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
