<template>
	<div class="cw-features" id="services">
    <div class="header">
      <span class="title text-green">
        <h1 class="text-center text-primary">Our Services</h1>
      </span>
    </div>
    <div class="holder">
      <span class="item" v-for="item, index in data" v-if="data !== null">
        <img :src="item.img" style="width: 100%; float: left; height: auto">
        <span class="title text-center text-green">
          <h5 class="text-primary">{{item.title}}</h5>
        </span>
        <h6 class="description text-primary">
          {{item.description}}
        </h6>
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
  margin: 50px 5% 50px 5%;
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
  padding-top: 25px;
  width: 100%;
  float: left;
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
    margin: 25px 5% 50px 5%;
  }
}
</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
export default {
  mounted(){
  },
  data(){
    return {
      data: [{
        title: 'Deposits',
        description: 'Allow our partners to fulfill your deposits to Payhiram.',
        icon: 'fas fa-envelope',
        img: require('assets/img/Deposit.png')
      }, {
        title: 'Withdrawals',
        description: 'Allow our partners to fulfill your withdrawals from Payhiram.',
        icon: 'fas fa-store',
        img: require('assets/img/Withdrawal.png')
      }, {
        title: 'Bills Payment',
        description: 'When you don\'t have time and want to pay your bills, let our partners to fulfil.',
        icon: 'fas fa-id-badge',
        img: require('assets/img/Payments.png')
      }, {
        title: 'Pera Padala',
        description: 'Allow our partners to fulfill your transaction when you want to send money to your family, friends or to businesses.',
        icon: 'fa fa-exchange',
        img: require('assets/img/Sending.png')
      }]
    }
  },
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    }
  }
}
</script>
