<template>
  <div class="incre-row">
    <label class="title"><b>Identification Cards</b></label>
    <div class="incre-row">
      <div class="item" v-for="(item, index) in data" :key="index">
        {{item.title}}
        <i class="fas fa-check text-primary pull-right" v-if="item.verified === true"></i>
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
  width: 50%;
  height: 50px;
  float: left;
  line-height: 50px;
  border: solid 1px #ddd;
  padding: 0px 10px;
  text-transform: capitalize;
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
