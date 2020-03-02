<template>
	<div class="cw-features">
    <div class="header">
      <span class="title text-green">
        <h1 class="text-center text-primary">Our Services</h1>
      </span>
      <span class="description">
        <img :src="require('assets/img/Dashboard.png')" class="img-header">
      </span>
    </div>
    <div class="holder">

      <span class="item" v-for="item, index in data" v-if="data !== null">
        <span class="icon text-primary text-center">
          <i :class="item.icon"></i>
        </span>
        <span class="title text-center text-green">
          <h5 class="text-primary">{{item.title}}</h5>
        </span>
        <span class="description">
          {{item.description}}
        </span>
      </span>
    </div>
	</div>
</template>
<style scoped lang="scss">
@import "~assets/style/colors.scss";
.text-primary{
  color: $primary !important;
}
.cw-features{
  width: 100%;
  float: left;
  min-height: 100vh;
  background: #fff;
  overflow-y: hidden;
}
.header{
  width: 90%;
  float: left;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 50px;
}
.holder{
  width: 90%;
  float: left;
  margin: 50px 5% 0 5%;
}
.item{
  width: 21%;
  float: left; 
  margin-right: 2%;
  min-height: 350px;
  margin-left: 2%;
}
.item span{
  width: 100%;
  float: left;
}
.item .icon{
  font-size: 50px;
}
.item .title{
  margin-top: 25px;
}

.item .description{
  text-align: justify;
  margin-top: 25px;
}

.img-header{
  width: 90%;
  float: left;
  height: auto;
  margin-left: 5%;
}

@media screen and (max-width: 992px){
  .holder, .item{
    width: 90%;
    margin: 25px 5% 0 5%;
  }
}
</style>
<script>
import ROUTER from '../../../router'
import AUTH from '../../../services/auth'
export default {
  mounted(){
  },
  data(){
    return {
      data: [
        {title: 'Deposits', description: 'Allow our partners to fulfill your deposits to Payhiram.', icon: 'fas fa-envelope'},
        {title: 'Withdrawals', description: 'Allow our partners to fulfill your withdrawals from Payhiram.', icon: 'fas fa-store'},
        {title: 'Bills Payment', description: 'When you don\'t have time and want to pay your bills, let our partners to fulfil your bills.', icon: 'fas fa-id-badge'},
        {title: 'Pera Padala', description: 'Allow other partners to fulfill your transaction when you want to send money to your family, friends or to businesses.', icon: 'fa fa-exchange'}
      ]
    }
  },
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    }
  }
}
</script>
