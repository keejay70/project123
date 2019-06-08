<template>
  <span>
    <label>
      <div class="dropdown">
        <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
          {{filterBy}}
        </button>
        <div class="dropdown-menu">
          <div class="dropdown-item action-link" @click="filter(item.title, index)" data-toggle="dropdown" v-for="item,  index in filterOptions">{{item.title}}</div>
        </div>
      </div>
    </label>
    <label>
      {{size}} request found
    </label>
    <ul class="pagination pull-right" v-if="parseInt(size) > 10">
      <li class="page-item page-link" @click="first()"><i class="fa fa-step-backward"></i></li>
      <li class="page-item page-link" @click="prev()"><i class="fa fa-angle-left"></i></li>
      <li class="page-item page-link" @click="setOffset(parseInt(offset + limit))">{{parseInt(offset + limit)}}</li>
      <li class="page-item page-link" @click="setOffset(parseInt(offset + (limit * 2)))">{{parseInt(offset + (limit * 2))}}</li>
      <li class="page-item page-link" @click="setOffset(parseInt(offset + (limit * 3)))">{{parseInt(offset + (limit * 3))}}</li>
      <li class="page-item page-link" @click="next()"><i class="fa fa-angle-right"></i></li>
      <li class="page-item page-link" @click="last()"><i class="fa fa-step-forward"></i></li>
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
        title: 'Newest first', sort: {column: 'created_at', value: 'asc'}
      }, {
        title: 'Lowest interest first', sort: {column: 'interest', value: 'asc'}
      }, {
        title: 'Highest interest first', sort: {column: 'interest', value: 'desc'}
      }, {
        title: 'Lowest amount first', sort: {column: 'amount', value: 'asc'}
      }, {
        title: 'Highest amount first', sort: {column: 'amount', value: 'desc'}
      }, {
        title: 'Needed on first', sort: {column: 'needed_on', value: 'asc'}
      }],
      limit: 10,
      activeIndex: null,
      offset: this.$parent.activePage
    }
  },
  props: ['size'],
  methods: {
    filter(params, index){
      this.filterBy = params
      this.activeIndex = index
      this.$parent.retrieve(this.filterOptions[index].sort)
    },
    setOffset(offset){
      this.$parent.activePage = offset
    },
    first(){
      this.$parent.activePage = 0
      this.$parent.retrieve(this.filterOptions[this.activeIndex].sort)
    },
    next(){
      if(this.size > (this.activePage + this.limit)){
        this.$parent.activePage += this.limit
        this.$parent.retrieve(this.filterOptions[this.activeIndex].sort)
      }
    },
    prev(){
      if(this.activePage >= this.limit){
        this.$parent.activePage -= this.limit
        this.$parent.retrieve(this.filterOptions[this.activeIndex].sort)
      }
    },
    last(){
      let offset = (parseInt(this.size / this.limit) * this.limit)
      this.$parent.activePage = offset
      this.$parent.retrieve(this.filterOptions[this.activeIndex].sort)
    }
  }
}
</script>
