<template>
  <div class="profile-holder">
    <span class="header">Guarantors</span>
    <span class="content">
      <span class="inputs">
        <div class="form-group" style="margin-top: 25px;">
          <div v-if="error !== null">
            <label class="text-danger"><b>Opps!</b> {{error}}</label>
          </div>
          <label for="address">Email Address</label>
          <input type="text" class="form-control" placeholder="Enter Email Address" v-model="newGuarantor.email">
        </div>
        <button class="btn btn-primary" style="margin-bottom: 25px;" @click="add()">Submit</button>
      </span>
      <span class="sidebar">
      </span>
    </span>
    <table class="table table-bordered table-responsive" v-if="data !== null">
      <thead>
        <tr>
          <td>Email</td>
          <td>Status</td>
          <td>Date</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data">
          <td>{{item.email}}</td>
          <td>{{item.status}}</td>
          <td>{{item.created_at}}</td>
          <td>
            <i class="fas fa-check text-primary action-link" title="Approve" v-if="user.userID === parseInt(item.receiver)" @click="update(item, 'approved')"></i>
            <i class="fas fa-close text-warning action-link" title="Decline" v-if="user.userID === parseInt(item.receiver)" @click="update(item, 'declined')"></i>
            <i class="fas fa-trash text-danger action-link"  title="Delete" v-if="user.userID === parseInt(item.sender)" @click="remove(item.id)"></i>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style scoped>
.profile-holder{
  width: 95%;
  float: left;
  margin-left: 5%;
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
  margin-right: 5%;
  min-height: 50px;
  overflow-y: hidden;
}
.sidebar{
  width: 30%;
  float: left;
  min-height: 50px;
  overflow-y: hidden;
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
}
</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import axios from 'axios'
import CONFIG from 'src/config.js'
export default {
  mounted(){
    $('#loading').css({display: 'block'})
    this.retrieve()
  },
  data(){
    return {
      user: AUTH.user,
      tokenData: AUTH.tokenData,
      config: CONFIG,
      data: null,
      error: null,
      newGuarantor: {
        email: null,
        account_id: null
      }
    }
  },
  methods: {
    retrieve(){
      let parameter = {
        account_id: this.user.userID
      }
      this.APIRequest('guarantors/retrieve', parameter).then(response => {
        $('#loading').css({display: 'none'})
        if(response.data.length > 0){
          this.data = response.data
        }else{
          this.data = null
        }
      })
    },
    add(){
      this.newGuarantor.account_id = this.user.userID
      this.APIRequest('guarantors/create', this.newGuarantor).then(response => {
        if(response.data !== null){
          this.retrieve()
          this.error = null
          this.newGuarantor.account_id = null
          this.newGuarantor.email = null
        }else{
          this.error = response.error
        }
      })
    },
    update(item, status){
      let parameter = {
        id: item.id,
        status: status
      }
      this.APIRequest('guarantors/update', parameter).then(response => {
        $('#loading').css({display: 'block'})
        this.retrieve()
      })
    },
    remove(id){
      let parameter = {
        id: id
      }
      this.APIRequest('guarantors/delete', parameter).then(response => {
        $('#loading').css({display: 'block'})
        this.retrieve()
      })
    }
  }
}
</script>
