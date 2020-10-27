<template><div>
   
<div class="confirmation-container">
  <div class="alert alert-success" role="alert"  style="text-align:center; font-size:20px;" v-if="acceptSuccessful"> 
            <h5>You are now part of {{firstname}} {{lastname}}'s circle of friends!</h5>
        </div>
        <div class="alert alert-danger" role="alert" style="text-align:center; font-size:5px; color:red" v-if="declinedSuccessful"> 
            <h5>You have declined the invitation</h5>
        </div>
  <div class="col-md-6 col-lg-8 mx-auto confirmation-container rl-container-item">
        <span style="width:100%;float:left;text-align:center;font-size:20px;margin-top:20px" >
                    <img height="150px" width="150px;" style="border-radius: 50%;" v-bind:src="config.BACKEND_URL + profileImage" >
          </span>
          <span style="width:100%;float:left;text-align:center;font-size:20px;margin-bottom:20px;margin-top:20px">
          <b class="text-primary">{{firstname}} {{lastname}}</b>
        </span>
        <div v-if="!isHidden">
          <div class="container">
        <div class="row" >
         
          <div class="col-md-6" style="margin-left:25%;" >
            <button class="btn btn-primary btn-block"  v-on:click="isHidden = !isHidden, acceptSuccessful=!acceptSuccessful">Accept</button>
            </div>
            <div class="col" style="margin-left:-150px"  >
             <button class="btn btn-danger btn-block" v-on:click="isHidden = !isHidden, declinedSuccessful=!declinedSuccessful">Decline</button>
             </div>
                
          </div>
          </div>
          </div>
        <p>Be part of {{firstname}} {{lastname}}'s circle of friends.</p>
    <div class="incre-row">
       <label class="title"><b>Profile Information</b></label>
       <div class="incre-row">
      <table class="table borderless">
        <tbody>
          <tr>
            <td>Email Address</td>
            <td>{{emailAddress}}</td>
          </tr>
          <tr>
            <td>Contact Number</td>
            <td >{{contactNumber}}</td>
          </tr>
          <tr>
            <td>Gender</td>
            <td style="text-transform:UPPERCASE">{{gender}}</td>
          </tr>
          <tr >
            <td>Birth Date</td>
            <td>{{birthdate}}</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</div>
</div>
</div>

</template>
<style>
.confirmation-container,
.holder {
  margin-top: 10%;
}

.confirm-holder {
  margin-top: 1%;
  margin-bottom: 5%;
  text-align: center;
  
}
.btn-block{
  width: 150px;
  margin-bottom: 5%;
}

.rl-container-item{
  width: 100%;
  border-radius: 5px;
  min-height: 50px;
  overflow-y: hidden;
  border: solid 1px #ddd;
  margin-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
}
.rl-container-item .header{
  width: 100%;
  height: 50px;
  line-height: 50px;
  color: #555;
}
.rl-container-item .summary-header{
  width: 100%;
  line-height: 25px;
  font-size: 17px;
  color: #555; 
}
.rl-container-item .footer{
  width: 100%;
  height: 45px;
  line-height: 40px;
}

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
.img{
  width: 50%
}

/* .profile-image-holder img{
  width: 200px;
  height: 2000px;
  border-radius: 5px;
} */
@media (max-width: 992px){
}
</style>
<script>
import COMMON from 'src/common.js'
import AUTH from 'src/services/auth'
import CONFIG from '../../config.js'
import ROUTER from 'src/router'
export default {
  data() {
    return {
      user: AUTH.user,
      config: CONFIG,
      common: COMMON,
      isHidden: false,
      acceptSuccessful: false,
      declinedSuccessful: false,
      firstname: null,
      lastname: null,
      emailAddress: null,
      contactNumber: null,
      gender: null,
      birthdate: null,
      profileImage: null
    }
  },
  mounted() {
    this.retrievedDetails()
  },
  methods: {
    retrievedDetails() {
      let code = this.$route.params.code
      let parameter = {
        condition: [{
          value: code,
          column: 'code',
          clause: '='
        }]
      }
      this.APIRequest('accounts/retrieve', parameter).then(response => {
        $('#loading').css({display: 'none'})
        if(response.data.length > 0){
          this.firstname = response.data[0].account_information.first_name
          this.lastname = response.data[0].account_information.last_name
          this.emailAddress = response.data[0].account_information.address
          this.contactNumber = response.data[0].account_information.cellular_number
          this.gender = response.data[0].account_information.sex
          this.birthdate = response.data[0].account_information.birth_date_human
          this.profileImage = response.data[0].account_profile.url
          console.log(response.data[0].account_profile.url)
          console.log(this.user.profile.url)
        }else{
          this.data = null
        }
      })
    }
  }
}
</script>

