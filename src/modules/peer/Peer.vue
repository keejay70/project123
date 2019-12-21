<template>
  <div class="filter">
    <div class="input-group">
      <select class="btn btn-primary select-btn dropdown" v-model="filterValue">
        <option class="dropdown-title" v-for="(item, index) in options" :value="item" :key="index">
          Transfer as {{item}}
        </option>
      </select>
      <input class="form-control" v-model="searchValue" :placeholder="'Enter amount'">
      <div class="view-container">
        <button class="btn btn-primary"><i class="fas fa-search"></i></button>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "~assets/style/colors.scss";
.filter{
  width: 100%;
  float: left;
  height: 50px;
  margin-top: 25px;
  width: 60%;
}
.form-control{
  height: 40px !important;
}
.input-group{
  margin-bottom: 10px !important;
}
.input-group-addon{
  width: 100px !important;
  background: #22b173 !important;
  color: #fff !important;
}
.input-group-title{
  width: 100px !important;
  background: #028170 !important;
  color: #fff !important;
}
.btn{
  border-radius: 0px !important;
  height: 40px !important;
}
.select-btn{
  border-top-left-radius: 0px !important;
  border-bottom-left-radius: 0px !important;
  border-top-right-radius: 0px !important;
  border-bottom-right-radius: 0px !important;
}
@media (max-width: 650px){
  .dropdown {
      width: 20%;
  }
  .dropdown-title {
    font-size: 10px;
  }
}
.view-option{
    color: $primary;
    font-size: 40px;
    line-height: 20%;
    border: solid 1px #ccc;
    height: 40px;
    padding: 5px;
    font-size: 29px;
    i:hover{
    cursor: pointer;
    color: $secondary;
  }
}
@media (max-width: 992px){
  .view-option{
    display: none;
  }
}
</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
import axios from 'axios'
export default {
  mounted(){
  },
  data(){
    return {
      user: AUTH.user,
      config: CONFIG,
      options: ['Peer', 'Direct'],
      filterValue: 'Peer',
      searchValue: null
    }
  },
  props: [],
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    }
  }
}
</script>
