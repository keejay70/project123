<template>
  <span class="filter">
    <label>
      <div class="dropdown">
        <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
          {{filterBy}}
        </button>
        <div class="dropdown-menu">
          <div class="dropdown-item" @click="filter('Newest first')" data-toggle="dropdown">Newest first</div>
          <div class="dropdown-item" @click="filter('Lowest interest first')" data-toggle="dropdown">Lowest interest first</div>
          <div class="dropdown-item" @click="filter('Highest interest first')" data-toggle="dropdown">Highest interest first</div>
          <div class="dropdown-item" @click="filter('Lowest amount first')" data-toggle="dropdown">Lowest amount first</div>
          <div class="dropdown-item" @click="filter('Highest amount first')" data-toggle="dropdown">Highest amount first</div>
          <div class="dropdown-item" @click="filter('Needed on first')" data-toggle="dropdown">Needed on first</div>
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
.filter label{
  line-height: 50px;
  height: 50px;
  float: left;
  padding-left: 10px;
  margin-top: 10px;
}

.filter .pagination{
  margin-right: 5px;
  margin-top: 15px;
}

.filter .pagination .page-link{
  padding: 10px !important;
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
      filterBy: 'Newest first'
    }
  },
  props: ['data'],
  methods: {
    filter(params){
      this.filterBy = params
    }
  }
}
</script>
