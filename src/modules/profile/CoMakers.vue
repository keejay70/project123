<template>
  <div class="incre-row">
    <label class="title"><b>Co-Makers</b></label>
    <div class="incre-row">
      <div class="item" v-for="(item, index) in data" :key="index">
        {{item.account.username}}
        <i class="fas fa-check text-primary pull-right" v-if="item.status === 'approved'"></i>
      </div>
    </div>
  </div>
</template>
<style scoped>
.incre-row .title{
  width: 100%;
  float: left;
  height: 50px;
  line-height: 50px;
  color: #555;
  border-top: solid 1px #ddd;
  border-bottom: solid 1px #ddd;
  margin-bottom: 25px;
}

.incre-row{
  margin-bottom: 25px;
}

.item{
  width: 49%;
  height: 50px;
  margin-right: 1%;
  float: left;
  line-height: 50px;
  border: solid 1px #ddd;
  padding: 0px 10px;
  margin-bottom: 10px;
}
.item i{
  line-height: 50px;
}

.borderless td, .borderless th {
    border: none;
}
@media (max-width: 992px){
}

</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
export default{
  mounted(){
  },
  data(){
    return {
      user: AUTH.user,
      config: CONFIG
    }
  },
  props: ['data'],
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    }
  }
}
</script>
