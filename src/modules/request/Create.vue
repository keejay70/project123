<template>
  <div class="profile-holder">
    <span class="content">
      <span class="inputs">
        <div class="alert alert-danger" role="alert" style="margin-top: 25px;">
          Hi <b>{{user.username}}!</b> Investors are excited to fulfil your request! Just a gentle reminder that you can't change any information of the request once posted.
        </div>
        <div class="form-group">
          <label for="address" style="width: 100%;">Select type of fulfilment <b class="text-danger">*</b></label>
          <div class="card" v-for="(item, index) in common.fulfillmentTypes" :key="index" :class="{'bg-primary': request.type == item.value}" @click="request.type = item.value, request.money_type = item.money_type">
            <div class="card-body">
              <label class="card-title"><b>{{item.label}}</b></label>
              <p class="card-text" style="text-align: justify; font-size: 13px;"><i>{{item.description}}</i></p>
            </div>
          </div>
        </div>
        <div>
          <label for="address" style="width: 100%;">I need <b class="text-danger">*</b></label>
          <button class="btn btn-primary" v-if="request.money_type === 'Cash'" style="width: 25% !important; height: 75px !important;">Cash</button>
          <button class="btn btn-primary" v-else style="width: 25% !important; height: 75px !important;" >E-Money</button>
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Select Currency</label>
          <select class="form-control form-control-custom" v-model="request.currency">
            <option v-for="(item, index) in common.currencies" :key="index" :value="item.value" class="form-control">{{item.title}} - {{item.value}}</option>
          </select>
        </div>
        <div v-if="request.type < 101">
          <div class="form-group" style="margin-top: 25px;">
            <label for="address">Amount <b class="text-danger">*</b></label>
            <input type="number" class="form-control form-control-custom" placeholder="Type Amount" v-model="request.amount" @keypress="checkBalance()">
          </div>
          <div class="form-group" style="margin-top: 25px;">
            <label for="address" style="width: 100%; float: left;">Location <b class="text-danger">*</b></label>
            <vue-google-autocomplete
              ref="address"
              id="map"
              classname="form-control"
              placeholder="Please type meetup address"
              v-on:placechanged="getAddressData"
              style="height: 45px !important;"
              v-on:inputChange="onClearVueGoogle()"
            >
            </vue-google-autocomplete>
            <!-- <button class="btn btn-primary btn-custom pull-right" style="width: 15%!important;" @click="showMap()"> 
              Add location
            </button> -->
          </div>
          <div class="form-group" style="margin-top: 25px; width: 100%; float: left;">
            <label for="address">Needed on <b class="text-danger">*</b></label>
            <input type="date" class="form-control form-control-custom" placeholder="Type Amount" id="datePicker" v-model="request.needed_on">
          </div>

          <div class="form-group" style="margin-bottom: 100px;">
            <label for="address">Details <b class="text-danger">*</b></label>
            <textarea class="form-control" placeholder="Add more details here" v-model="request.reason" rows="10">
            </textarea>
          </div>
        </div>
        <div v-else style="float: left; width: 100%;">
          <div class="form-group" style="margin-top: 25px;">
            <label for="address">I want to borrow the amount of <b class="text-danger">*</b></label>
            <input type="number" class="form-control form-control-custom" placeholder="Type Amount" v-model="request.amount">
          </div>

          <div class="form-group">
            <label for="address">I will pay the interest of <b class="text-danger">*</b></label>
            <select class="form-control form-control-custom" v-model="request.interest">
              <option v-for="(item, index) in common.interest.max" :value="item" v-if="item >= common.interest.min">{{item}} % per month</option>
            </select>
          </div>

          <div class="form-group">
            <label for="address">I will pay within <b class="text-danger">*</b></label>
            <select class="form-control form-control-custom" v-model="request.months_payable">
              <option v-for="(item, index) in 12" :value="item">{{item}} {{item > 1 ? 'Months' : 'Month'}}</option>
            </select>
          </div>

          <div class="form-group">
            <label for="address">I will pay <b class="text-danger">*</b></label>
            <select class="form-control form-control-custom" v-model="request.billing_per_month">
              <option v-for="(item, index) in billingOptions" :value="item.value">{{item.label}}</option>
            </select>
          </div>

          <div class="form-group" style="margin-top: 25px;">
            <label for="address">I need this on <b class="text-danger">*</b></label>
            <input type="date" class="form-control form-control-custom" id="datePicker" v-model="request.needed_on">
          </div>

          <div class="form-group">
            <label for="address">Details <b class="text-danger">*</b></label>
            <textarea class="form-control" placeholder="Type details here" v-model="request.reason" rows="10">
            </textarea>
          </div>

          <div class="form-group">
            <button class="btn btn-primary btn-custom" style="margin-top: 5px;" @click="showImages()">Add images (Optional)</button>
          </div>
          <div v-if="request.images.length > 0">
            <img :src="config.BACKEND_URL + item.url" v-for="(item, index) in request.images" :key="index" class="request-image">
          </div>

          <div class="form-group" style="margin-bottom: 100px; float: left; width: 100%;">
            <label for="address" style="float: left; width: 100%;">Comaker (Optional)</label>
            <input type="email" class="form-control form-control-custom" v-model="request.comaker"
            placeholder="Type email address">
          </div>
        </div>
      </span>

      <span class="sidebar">
        <span class="sidebar-header" style="margin-top: 25px;"><b>Summary</b></span>
        <span class="incre-row" v-if="errorMessage !== null">
          <label class="text-danger" style="width: 100%;"><b>Opps!</b> {{errorMessage}}</label>
        </span>
        <span  class="incre-row" style="line-height: 45px;">
          <label class="pull-left">Your current balance</label>
          <label class="pull-right text-primary"><b>{{auth.displayAmountWithCurrency(auth.user.ledger.amount, auth.user.ledger.currency)}}</b></label>
        </span>
        <span  class="incre-row" style="line-height: 45px;">
          <label class="pull-left">Amount</label>
          <label class="pull-right"><b>{{auth.displayAmountWithCurrency(request.amount, request.currency)}}</b></label>
        </span>
        <div v-if="request.type > 100">
          <span style="line-height: 45px;" class="incre-row">
            <label class="pull-left">Interest</label>
            <label class="pull-right">{{request.interest}}% per month</label>
          </span>
          <span style="line-height: 45px;" class="incre-row">
            <label class="pull-left">Billing cycle</label>
            <label class="pull-right">{{billingOptions[request.billing_per_month].label}}</label>
          </span>
          <span style="line-height: 45px;" class="incre-row" v-if="request.billing_per_month === 0">
            <label class="pull-left">Charge per billing</label>
            <label class="pull-right">{{auth.displayAmountWithCurrency((request.interest / 100) * request.amount, request.currency)}}</label>
          </span>
          <span style="line-height: 45px;" class="incre-row" v-if="request.billing_per_month === 1">
            <label class="pull-left">Charge per billing</label>
            <label class="pull-right">{{auth.displayAmountWithCurrency(((request.interest / 100) * request.amount) / 2, request.currency)}}</label>
          </span>
          <span style="line-height: 45px;" class="incre-row" v-if="request.billing_per_month === 2">
            <label class="pull-left">Charge per billing</label>
            <label class="pull-right">{{auth.displayAmountWithCurrency(((request.interest / 100) * request.amount) / 4, request.currency)}}</label>
          </span>
          <span style="line-height: 45px; border-top: solid 1px #ddd;" class="incre-row">
            <label class="pull-left">Total</label>
            <label class="pull-right"><b>{{auth.displayAmountWithCurrency(parseInt(request.amount), request.currency)}}</b></label>
          </span>
        </div>
        <div v-else>
          <span style="line-height: 45px;" class="incre-row">
            <label class="pull-left incre-row">Charges will vary to the processor</label>
          </span>
          <span style="line-height: 45px; border-top: solid 1px #ddd;" class="incre-row">
            <label class="pull-left">Total</label>
            <label class="pull-right"><b>{{auth.displayAmountWithCurrency(parseInt(request.amount), request.currency)}}</b></label>
          </span>
        </div>
        <button class="btn btn-primary pull-right btn-custom" style="margin-bottom: 100px; width: 100%!important;" @click="post()">Post</button>
      </span>
    </span>
    <browse-images-modal></browse-images-modal>
    <browse-map-modal></browse-map-modal>
  </div>
</template>
<style scoped lang="scss">
@import "~assets/style/colors.scss";
.bg-primary{
  background-color: $primary !important;
}
.profile-holder{
  width: 100%;
  float: left;
}
.header{
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 24px;
  border-bottom: solid 1px #ddd;
  float: left;
}
.content{
  width: 100%;
  min-height: 50px;
  float: left;
  overflow-y: hidden;
}
.inputs{
  width: 65%;
  float: left;
  min-height: 50px;
  overflow-y: hidden;
}
.sidebar{
  width: 25%;
  margin-left: 2%;
  float: left;
  min-height: 50px;
  overflow-y: hidden;
  position: fixed;
}
.sidebar-header{
  height: 40px;
  line-height: 40px;
  width: 100%;
  float: left;
}
.sidebar .image{
  width: 100%;
  float: left;
  min-height: 200px;
  overflow-y: hidden;
  text-align: center;
}
.image i{
  font-size: 150px;
  line-height: 200px;
}
.image img{
  border-radius: 5px;
}
.custom-block{
  width: 100%;
  float: left;
}
.custom-block input{
  display: none;
}

.form-control-custom{
  height: 45px !important;
}

.btn-custom{
  height: 45px !important;
}
.card{
  min-height: 220px !important;
  margin-bottom: 10px;
  width: 24%;
  margin-right: 1%;
  float: left;
}
.card:hover{
  cursor: pointer;
}

.request-image{
  width: 24%;
  float: left;
  margin-right: 1%;
  max-height: 200px;
  max-width: 24%;
  margin-bottom: 10px;
}


@media screen and (max-width: 992px){
  .holder{
    width: 96%;
    margin-left: 2%;
    margin-right: 2%;
  }
  .sidebar, .inputs{
    width: 100%;
    margin-right: 0%;
    margin-left: 0%;
  }
  .sidebar{
    position: relative;
  }
  .card{
    width: 49%;
  }
}
</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import axios from 'axios'
import CONFIG from 'src/config.js'
import COMMON from 'src/common.js'
import VueGoogleAutocomplete from 'vue-google-autocomplete'
export default {
  mounted(){
    this.today = new Date()
    let day = this.today.getDate()
    let month = this.today.getMonth() + 1
    let year = this.today.getFullYear()
    if(day < 10){
      day = '0' + day
    }
    if(month < 10){
      month = '0' + month
    }
    this.today = year + '-' + month + '-' + day
    document.getElementById('datePicker').setAttribute('min', this.today)
  },
  data(){
    return {
      user: AUTH.user,
      auth: AUTH,
      tokenData: AUTH.tokenData,
      config: CONFIG,
      errorMessage: null,
      common: COMMON,
      searchLocation: '',
      today: null,
      request: {
        account_id: AUTH.user.userID,
        money_type: 'Cash',
        currency: 'PHP',
        type: 1,
        amount: 0,
        interest: COMMON.interest.min,
        months_payable: 1,
        needed_on: null,
        billing_per_month: 0,
        reason: null,
        location: {
          route: null,
          locality: null,
          region: null,
          country: null,
          latitude: 0,
          longitude: 0
        },
        images: [],
        comaker: null
      },
      billingOptions: [
        {value: 0, label: 'Every end of the month'},
        {value: 1, label: 'Twice a month'},
        {value: 2, label: 'Every end of the week'}
      ]
    }
  },
  props: ['allowed'],
  components: {
    'browse-images-modal': require('components/increment/generic/image/BrowseModal.vue'),
    'browse-map-modal': require('components/increment/generic/modal/Map.vue'),
    VueGoogleAutocomplete
  },
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    },
    addComaker(){
      //
    },
    post(){
      this.checkBalance()
      if(this.errorMessage !== null){
        return
      }
      if(parseInt(this.request.amount) < COMMON.MINIMUM_WITHDRAWAL){
        this.errorMessage = 'Minimum transaction is ' + AUTH.displayAmount(COMMON.MINIMUM_WITHDRAWAL)
        return
      }
      if(this.request.reason === null || this.request.reason === ''){
        this.errorMessage = 'Details is required.'
        return
      }
      if(this.request.needed_on === null || this.request.needed_on === ''){
        this.errorMessage = 'Needed on is required.'
        return
      }
      if(this.request.type < 101){
        if(this.request.location.route === null || this.searchLocation === ''){
          this.errorMessage = 'Location is required.'
          return
        }
      }else{
        // lending
        if(this.request.months_payable === null){
          this.errorMessage = 'Months payable is required.'
          return
        }
        if(this.request.interest === null){
          this.errorMessage = 'Interest is required.'
          return
        }
        if(this.request.billing_per_month === null){
          this.errorMessage = 'Billing per month is required.'
          return
        }
        if(this.request.comaker !== null && this.request.comaker !== '' && AUTH.validateEmail(this.request.comaker) === false){
          this.errorMessage = 'Invalid email address.'
          return
        }
      }
      $('#loading').css({display: 'block'})
      this.APIRequest('requests/create', this.request).then(response => {
        $('#loading').css({display: 'none'})
        if(response.data !== null){
          this.redirect('/requests/' + response.data)
        }
      })
    },
    showImages(){
      $('#browseImagesModal').modal('show')
    },
    showMap(){
      $('#selectLocationModal').modal('show')
    },
    getAddressData(addressData, placeResultData, id) {
      if(addressData.route === null || addressData.route === ''){
        this.searchLocation = null
        return
      }
      if(addressData.locality === null || addressData.locality === ''){
        this.searchLocation = null
        return
      }
      if(addressData.country === null || addressData.country === ''){
        this.searchLocation = null
        return
      }
      this.request.location = {
        route: addressData.route,
        locality: addressData.locality,
        region: addressData.administrative_area_level_1,
        country: addressData.country,
        latitude: addressData.latitude,
        longitude: addressData.longitude
      }
      let location = this.request.location
      this.searchLocation = location.route
    },
    onClearVueGoogle(){
      this.searchLocation = this.$refs.address.autocompleteText
    },
    manageImageUrl(url){
      let object = {
        url: url
      }
      this.request.images.push(object)
    },
    verifyBalance(){
      if(parseInt(this.request.amount) > AUTH.user.ledger.amount){
        this.errorMessage = 'Insufficient balance!'
      }else{
        this.errorMessage = null
      }
    },
    checkBalance(){
      if(this.request.type < 101){
        switch(this.request.type){
          case 1:
            this.verifyBalance()
            break
          case 2:
            this.verifyBalance()
            break
          case 3:
            this.errorMessage = null
            break
        }
      }
    }
  }
}
</script>
