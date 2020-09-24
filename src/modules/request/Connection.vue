<template>
	<div class="holder">
        <div class="alert alert-success">
      Hi <b>{{user.username}}!</b> You can send connection request to broaden your circle of friends.
    </div>
    <div class="invitation">
      <div class="header text-primary">
        <b>Invite them now!</b>
      </div>
      <span class="alert alert-success" v-if="successMessage !== null">
        {{successMessage}}
      </span>
      <span class="alert alert-danger" v-if="errorMessage !== null">
        {{errorMessage}}
      </span>
      <div class="inputs">
        <input type="email" class="form-control" placeholder="Type email address here..." v-model="email">
        <textarea class="form-control" rows="10" placeholder="Type your message here..." v-model="message"></textarea>
        <button class="btn btn-primary btn-block" @click="send(null)">Send Invitation</button>
      </div>
    </div>
    <div class="form-inline" style="float: right;">
        <!-- <div class="form-group mx-sm-3 mb-2">
            <label for="search" class="sr-only">Search...</label>
            <input type="text" class="form-control search" id="search" placeholder="Search...">
        </div> -->
        <button class="btn btn-primary" @click="request = 'pending', retrieve(request)" v-if="request === 'confirmed'">Show request sent</button>
        <button class="btn btn-primary" @click="request = 'confirmed', retrieve(request)" v-if="request === 'pending'">Show connections</button>
    </div>
    <div class="results row" v-if="data !== null && request === 'confirmed'">
        <div class="connections column item" v-for="(item, index) in data" :key="index">
            <!-- <span class="profile-image-holder">
                <img v-bind:src="config.BACKEND_URL + user.profile.url">
            </span> -->
            <div class="row">
                <div class="column" style="height: 80px;">
                    <i class="fa fa-user-circle-o profile-icon profile"></i>
                </div>
                <div class="column" style="height: 60px; margin-top: 20px;">
                    <h5>{{item.name}}
                    <i class="fas fa-check text-primary profile-status"></i></h5>
                    {{item.address}}
                </div>
                <div class="column" style="height: 60px; margin-top: 20px; margin-left: 40px;">
                    <div class="dropdown show">
                    <i href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="fa fa-ellipsis-v details" aria-hidden="true"></i>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <a class="dropdown-item" @click="remove(item)">Remove</a>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
    <div class="results" v-if="data !== null && request === 'pending'">
      <table class="table table-bordered table-responsive" style="margin-top: 25px;">
        <thead>
          <tr>
            <td><b>Email</b></td>
            <td><b>Action</b></td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in data" :key="index" class="item">
            <td>{{item.address}}</td>
            <td>
                <i class="fa fa-paper-plane-o" aria-hidden="true" @click="send(item)"></i>
                <i class="fa fa-trash-o" aria-hidden="true" @click="remove(item)"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="results" v-if="data === null">
      <empty :title="'Looks like you do not have referrals!'" :action="'Invite your friends now ' + common.referral.message"></empty>
    </div>
	</div>
</template>
<style scoped>
.profile {
    transform: scale(3,3);
    margin: 30px 30px 30px 30px;
}
.details {
    transform: scale(1.3,1.3);
}
.connections {
    margin-left: 40px;
    margin-top: 20px;
}
    .search {
        margin-top: 10px;
    }
	.holder{  
    width: 98%;
    float: left;
    margin-right: 2%;
	  margin-top: 25px;
	  margin-bottom: 50px;
	}
  .results{
    float: left;
    width: 68%;
  }
  .invitation{
    margin-right: 2%;
    float: left;
    width: 30%;
  }
  .item:hover{
    cursor: pointer;
  }
  .invitation .header{
    width: 100%;
    height: 50px;
    float: left;
    line-height: 50px;
    text-align: center;
    margin-top: 25px;
    border: solid 1px #ddd;
    margin-bottom: 10px;
  }
  .inputs input, .inputs textarea, .inputs button{
    margin-top: 10px !important;
  }
  .inputs button, .inputs input{
    height: 50px !important;
  }
  .alert{
    width: 100%;
    float: left;
  }
  @media (max-width: 992px){
    .holder, .results, .invitation{
      width: 100%;
      margin: 0%;
    }
  }
</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
import COMMON from 'src/common.js'
export default {
  mounted(){
    this.retrieve(this.request)
  },
  data(){
    return {
      request: 'pending',
      user: AUTH.user,
      config: CONFIG,
      email: null,
      data: null,
      message: 'I\'d like to invite you to be one of my connections on ' + COMMON.APP_NAME + COMMON.referral.emailMessage,
      successMessage: null,
      errorMessage: null,
      common: COMMON
    }
  },
  components: {
    'empty': require('components/increment/generic/empty/Empty.vue')
  },
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    },
    retrieve(status){
      let parameter = {
        condition: [{
          value: this.user.userID,
          column: 'account_id',
          clause: '='
        }, {
          value: status,
          column: 'status',
          clause: '='
        }]
      }
      $('#loading').css({display: 'block'})
      this.APIRequest('mycircle/retrieve', parameter).then(response => {
        $('#loading').css({display: 'none'})
        if(response.data.length > 0){
          this.data = response.data
        }else{
          this.data = null
        }
      })
      // this.data = [
      //    {address: 'lalainecabelin@gmail.com', id: 0, name: 'Lalaine Garrido'},
      //    {address: 'jessajalandoni@gmail.com', id: 1, name: 'Jessa Jalandoni'},
      //    {address: 'patrickcabiaan@gmail.com', id: 2, name: 'Patrick Cabiaan'}
      // ]
    },
    send(item){
      if(item !== null) {
        this.email = item.address
      }
      if(AUTH.validateEmail(this.email) === true && this.message !== null){
        let parameter = {
          account_id: this.user.userID,
          to_email: this.email,
          content: this.message
        }
        $('#loading').css({display: 'block'})
        this.APIRequest('mycircle/create', parameter).done(response => {
          if(response.data > 0 && response.data !== null){
            this.email = null
            this.message = 'I\'d like to invite you to be one of my connections on ' + COMMON.APP_NAME + COMMON.referral.emailMessage
            this.successMessage = 'Invitation Sent!'
            this.errorMessage = null
            this.retrieve(this.status)
          }else{
            if(response.error.status === 100){
              this.errorMessage = 'Invitation not sent. Try Again!'
            }else{
              this.errorMessage = response.error
            }
            this.errorMessage = 'Invitation not sent. Try Again!'
            $('#loading').css({display: 'none'})
          }
        })
      }else{
        this.successMessage = null
        this.errorMessage = 'Invalid email address. Please check and try again!'
      }
    },
    remove(item) {
      let parameter = {
        condition: [{
          value: item.id,
          column: 'id',
          clause: '='
        }]
      }
      $('#loading').css({display: 'block'})
      this.APIRequest('mycircle/delete', parameter).then(response => {
        $('#loading').css({display: 'none'})
        this.retrieve(this.status)
      })
    }
  }
}
</script>
