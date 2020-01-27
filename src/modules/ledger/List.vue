<template>
  <div class="ledger-summary-container">
    <basic-filter 
      v-bind:category="category" 
      :activeCategoryIndex="0"
      :activeSortingIndex="0"
      @changeSortEvent="retrieve($event.sort, $event.filter)"
      @changeStyle="manageGrid($event)"
      :grid="['list', 'th-large']"
      style="margin-top: 25px;"></basic-filter>
    <div class="summary-container-item" v-for="item, index in data" v-if="data !== null">
      <span class="header">{{item.created_at_human}}</span>
      <span class="body">
        <label>
          {{item.description}}
        </label>
        <label  v-bind:class="{'text-danger': parseFloat(item.amount) <= 0, 'text-primary': parseFloat(item.amount) > 0}"class="pull-right amount"><b>{{auth.displayAmountWithCurrency(item.amount, item.currency)}}</b></label>
      </span>
      <span class="footer" v-if="item.payload !== null">
        <label style="padding: 10px 0px 10px 0px;">
          Transaction ID:
        </label>
        <label style="padding: 10px 10px 10px 0px;" class="text-primary action-link" @click="redirect((item.payload === 'request' ? '/requests/' : '/peer_charge/') + item.payload_value)">
          {{item.payload_value}}
        </label>
      </span>
    </div>
    <empty v-if="data === null" :title="'Looks like your ledger is empty!'" :action="'Deposit now or start requesting money.'"></empty>
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
  min-height: 10px;
  overflow-y: hidden;
  padding-right: 10px;
}

.summary-container-item .amount{
}

@media (max-width: 992px){
  .ledger-summary-container{
    margin-bottom: 200px;
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
      activePage: 0,
      size: 0,
      auth: AUTH,
      category: [{
        title: 'Sort by',
        sorting: [{
          title: 'Date posted ascending',
          payload: 'created_at',
          payload_value: 'asc',
          input_type: 'date'
        }, {
          title: 'Date posted descending',
          payload: 'created_at',
          payload_value: 'desc',
          input_type: 'date'
        }, {
          title: 'Amount ascending',
          payload: 'amount',
          payload_value: 'asc',
          input_type: 'number'
        }, {
          title: 'Amount descending',
          payload: 'amount',
          payload_value: 'desc',
          input_type: 'number'
        }, {
          title: 'Description ascending',
          payload: 'description',
          payload_value: 'asc',
          input_type: 'text'
        }, {
          title: 'Description descending',
          payload: 'description',
          payload_value: 'desc',
          input_type: 'text'
        }]
      }],
      listStyle: null
    }
  },
  components: {
    'empty': require('components/increment/generic/empty/Empty.vue'),
    'ledger-filter': require('modules/ledger/Filter.vue'),
    'basic-filter': require('components/increment/generic/filter/Basic.vue')
  },
  methods: {
    redirect(params){
      ROUTER.push(params)
    },
    retrieve(sort, filter){
      let key = Object.keys(sort)
      let parameter = {
        account_id: this.user.userID,
        offset: 0,
        limit: 50,
        sort: {
          column: key[0],
          value: sort[key[0]]
        },
        value: filter.value + '%',
        column: filter.column
      }
      $('#loading').css({display: 'none'})
      this.APIRequest('ledgers/summary', parameter).then(response => {
        $('#loading').css({display: 'none'})
        if(response.data !== null){
          this.data = response.data
          this.size = this.data.length
        }else{
          this.data = null
          this.size = null
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
