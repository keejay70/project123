<template>
  <div>
    <div class="summary-container-item" v-for="item, index in data" v-if="data !== null">
      <span class="header">{{item.created_at_human}}</span>
      <span class="body">
        <label>
          {{item.description}}
        </label>
        <label class="pull-right amount" v-bind:class="{'text-danger': parseFloat(item.amount) <= 0, 'text-primary': parseFloat(item.amount) > 0}"><b>PHP {{item.amount.toFixed(2)}}</b></label>
      </span>
      <span class="footer"></span>
    </div>
    <empty v-if="data === null" :title="'Looks like your ledger is empty!'" :action="'Deposit now or start requesting money.'"></empty>
  </div>
</template>
<style scoped>
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
  },
  data(){
    return {
      user: AUTH.user
    }
  },
  props: ['data'],
  components: {
    'empty': require('components/increment/generic/empty/Empty.vue')
  }
}
</script>
