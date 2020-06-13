<template>
  <div class="ledger-summary-container">
    <div class="inputs" v-if="withdrawal !== null || installment !== null || rental !== null">
      <div><label><b>Pending transactions</b></label></div>

      <div class="summary-container-item" v-for="item, index in withdrawal" v-if="withdrawal !== null" @click="setActiveIndex(index)" :key="'withdrawal' + index">
        <span class="header" style="padding-top: 10px;">
          <span style="width: 100%; float: left;">
            <label>Withdraw via {{item.bank}}</label>
            <label class="pull-right text-primary" style="padding-right: 10px;"><b>{{auth.displayAmountWithCurrency(item.amount + item.charge, item.currency)}}</b></label>
          </span>
          <span style="width: 100%; float: left; padding-bottom: 10px;">
            <label>
              {{item.created_at_human}}
            </label>
          </span>
        </span>
        <table class="table table-borderless text-center" v-if="activeIndex === index">
          <tr>
            <td>Transaction amount</td>
          </tr>
          <tr>
            <td class="text-gray">{{auth.displayAmountWithCurrency(item.amount, item.currency)}}</td>
          </tr>
          <tr>
            <td>Transaction charge</td>
          </tr>
          <tr>
            <td class="text-gray">{{auth.displayAmountWithCurrency(item.charge, item.currency)}}</td>
          </tr>
          <tr>
            <td>Account name</td>
          </tr>
          <tr>
            <td class="text-gray">{{item.account_name}}</td>
          </tr>
          <tr>
            <td>Account number</td>
          </tr>
          <tr>
            <td class="text-gray">{{item.account_number}}</td>
          </tr>
          <tr>
            <td>Transaction ID</td>
          </tr>
          <tr>
            <td class="text-gray">{{item.code}}</td>
          </tr>
          <tr>
            <td class="text-primary">Processing of the withdrawal will take up to 7 working days!</td>
          </tr>
        </table>
      </div>

      <div class="summary-container-item" v-for="item, index in installment"  v-if="installment !== null" :key="'installment' + index">
        <span class="header" style="padding-top: 10px;">
          <span style="width: 100%; float: left;">
            <b>Installment request</b>
          </span>
          <span class="badge text-uppercase" :class="{'badge-danger': item.status === 'pending'}">{{item.status}} </span>
          <span style="width: 100%; float: left;">
            <product-list-view :data="item.product"></product-list-view>
            <installment-label :data="item.installment" v-if="item.installment !== null"></installment-label>
            <b>From {{item.product.merchant.name}}</b>
          </span>
          <span style="width: 100%; float: left; padding-bottom: 10px;">
            <label>
              {{item.created_at_human}}
            </label>
          </span>
        </span>
      </div>


       <div class="summary-container-item" v-for="item, index in rental"  v-if="rental !== null" :key="'rental' + index">
        <span class="header" style="padding-top: 10px;">
          <span style="width: 100%; float: left;">
            <b>Booking request</b>
          </span>
          <span class="badge text-uppercase" :class="{'badge-danger': item.status === 'pending'}">{{item.status}} </span>
          <span style="width: 100%; float: left;">
            <product-list-view :data="item.product"></product-list-view>
            <b>From {{item.product.merchant.name}}</b>
          </span>
          <span style="width: 100%; float: left; padding-bottom: 10px;">
            <label>
              Transaction date on {{item.start_human}} - {{item.end_human}}
            </label>
          </span>
        </span>
      </div>



    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "~assets/style/colors.scss";
.ledger-summary-container{
  width: 100%;
  float: left;
  height: auto;
}

.summary-container-item{
  width: 100%;
  float: left;
  min-height: 50px;
  overflow-y: hidden;
  border: solid 1px #ddd;
  padding-left: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
}

.summary-container-item:hover{
  cursor: pointer;
  border: solid 1px $primary;
}
.summary-container-item .header{
  width: 100%;
  float: left;
}

.text-gray{
  color: $gray;
}
.summary-container-item .body{
  width: 100%;
  float: left;
  min-height: 50px;
  overflow-y: hidden;
  padding-right: 10px;
}
.inputs{
  width: 100%;
  float: left;
  min-height: 50px;
  overflow-y: hidden;
}

.sidebar{
  width: 35%;
  float: left;
  min-height: 50px;

  overflow-y: hidden;
}

.form-control-custom, td{
  height: 45px !important;
}

.btn-custom{
  height: 45px !important;
}

@media (max-width: 992px){
  .ledger-summary-container{
    width: 100%;
  }
  .sidebar, .inputs{
    width: 100%;
    margin-right: 0%;
    margin-left: 0%;
  }
}
</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
import COMMON from 'src/common.js'
export default{
  mounted(){
  },
  data(){
    return {
      auth: AUTH,
      user: AUTH.user,
      activeIndex: null
    }
  },
  props: ['withdrawal', 'installment', 'rental'],
  components: {
    'installment-label': require('components/increment/imarketvue/installment/label.vue'),
    'product-list-view': require('components/increment/imarketvue/product/ProductListView.vue')
  },
  methods: {
    redirect(params){
      ROUTER.push(params)
    },
    setActiveIndex(index){
      if(index === this.activeIndex){
        this.activeIndex = null
      }else{
        this.activeIndex = index
      }
    }
  }
}
</script>
