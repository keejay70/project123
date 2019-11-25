<template>
  <div class="incre-row">
    <label class="title"><b>Basic</b></label>
    <div class="incre-row">
      <table class="table borderless">
        <tbody>
          <tr v-if="item.payload === 'request'">
            <td>Total Borrowed</td>
            <td>PHP {{item.total.toFixed(2)}}</td>
          </tr>
          <tr>
            <td>Ratings</td>
            <td>
              <ratings :ratings="item.rating" v-if="item.rating !== null"></ratings>
            </td>
          </tr>
          <tr>
            <td>Email Address</td>
            <td><i class="fa fa-check text-primary"></i>{{item.status === 'NOT_VERIFIED' ? item.status : 'Verified'}}</td>
          </tr>
          <tr>
            <td>Contact Number</td>
            <td v-if="user.type !== 'ADMIN'"><i class="fa fa-check text-primary"></i>Verified</td>
            <td v-if="user.type === 'ADMIN'">{{item.account.information.cellular_number}}</td>
          </tr>
<!--           <tr v-if="user.type === 'ADMIN'">
            <td>Address</td>
            <td>{{item.account.information.address}}</td>
          </tr> -->
          <tr v-if="user.type === 'ADMIN'">
            <td>Gender</td>
            <td style="text-transform:UPPERCASE">{{item.account.information.sex}}</td>
          </tr>
          <tr v-if="user.type === 'ADMIN'">
            <td>Birth Date</td>
            <td>{{item.account.information.birth_date}}</td>
          </tr>
        </tbody>
      </table>
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
  components: {
    'ratings': require('components/increment/generic/rating/DirectRatings.vue')
  },
  props: ['item'],
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    }
  }
}
</script>
