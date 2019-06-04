<template>
  <span>
    <label>
      <div class="dropdown">
        <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
          {{filterBy}}
        </button>
        <div class="dropdown-menu">
          <div class="dropdown-item" @click="filter(item.title, index)" data-toggle="dropdown" v-for="item,  index in filterOptions">{{item.title}}</div>
        </div>
      </div>
    </label>
    <label>
      {{data.length}} request found
    </label>
    <ul class="pagination pull-right">
      <li class="page-item page-link"><i class="fa fa-step-backward"></i></li>
      <li class="page-item page-link"><i class="fa fa-angle-left"></i></li>
      <li class="page-item page-link">1</li>
      <li class="page-item page-link">2</li>
      <li class="page-item page-link">3</li>
      <li class="page-item page-link"><i class="fa fa-angle-right"></i></li>
      <li class="page-item page-link"><i class="fa fa-step-forward"></i></li>
    </ul>
  </span>
</template>
<style scoped>
label{
  line-height: 50px;
  height: 50px;
  float: left;
  padding-left: 10px;
  margin-top: 10px;
}

.pagination{
  margin-right: 5px;
  margin-top: 15px;
}

.pagination .page-link{
  padding: 10px !important;
}
@media (max-width: 992px){
  .pagination{
    width: 100%;
    margin: auto;
  }  
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
      user: AUTH.user,
      filterBy: 'Newest first',
      filterOptions: [{
        title: 'Newest first', payload: {created_at: 'asc'}
      }, {
        title: 'Lowest interest first', payload: {interest: 'asc'}
      }, {
        title: 'Highest interest first', payload: {interest: 'desc'}
      }, {
        title: 'Lowest amount first', payload: {amount: 'asc'}
      }, {
        title: 'Highest amount first', payload: {amount: 'desc'}
      }, {
        title: 'Needed on first', payload: {needed_on: 'asc'}
      }]
    }
  },
  props: ['data'],
  methods: {
    filter(params, index){
      this.filterBy = params
    }
  }
}
</script>
