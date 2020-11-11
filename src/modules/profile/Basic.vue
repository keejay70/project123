<template>
  <div class="incre-row">
    <label class="title"><b>PERSONAL INFORMATION</b></label>
    <div class="incre-row">
      <table class="table borderless">
        <tbody>
<!--           <tr v-if="item.payload === 'request'">
            <td>Total Borrowed</td>
            <td>PHP {{item.total.toFixed(2)}}</td>
          </tr> -->
          <tr>
            <td><i class="fas fa-user-circle"></i>
            <span v-if="item.account.information !== null && item.account.information.first_name !== null">
              <span v-if="item.account.information.first_name !== null">{{item.account.information.first_name}}</span>
              <span v-if="item.account.information.last_name !== null">{{item.account.information.last_name}}</span>
            </span>
            <span v-else>{{item.account.username}}</span>
            </td>
            <td><i class="fas fa-phone-volume"></i>
              <!-- <span v-if="user.type !== 'ADMIN'"><i class="fa fa-check text-primary"></i>Verified</span> -->
              <span>
                <span> {{item.account.information.cellular_number === null ? 'No contact provided.' : item.account.information.cellular_number}}</span>
              </span>
            </td>
          </tr>
          <tr>
           <td><i class="fas fa-envelope"></i>
              <span v-if="item.account.email !== null">{{item.account.email}}</span>
            </td>
            <td><i class="far fa-calendar"></i>
              <span v-if="item.account.information.birth_date !== null">{{item.account.information.birth_date}}</span>
            </td>
          </tr>
          <tr>
            <td><i class="fas fa-user-circle"></i>
              <span v-if="item.account.information.sex !== null">{{item.account.information.sex}}</span>
            </td>
            <td><i class="fas fa-map-marker-alt"></i>
              <span v-if="item.account.information.address !== null">{{item.account.information.address}}</span>
            </td>
            <!-- <td v-if="user.type !== 'ADMIN'"><i class="fa fa-check text-primary"></i>Verified</td>
            <td v-if="user.type === 'ADMIN'">{{item.account.information.cellular_number}}</td> -->
          </tr>
<!--           <tr v-if="user.type === 'ADMIN'">
            <td>Address</td>
            <td>{{item.account.information.address}}</td>
          </tr> -->
          <tr v-if="user.type === 'ADMIN'">
            <td>Gender</td>
            <td style="text-transform:UPPERCASE">{{item.account.information.sex}}</td>
          </tr>
          <tr v-if="user.type === 'ADMIN' && item.account.information.birth_date_human !== null">
            <td>Birth Date</td>
            <td>{{item.account.information.birth_date_human}}</td>
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
    console.log(this.item)
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
