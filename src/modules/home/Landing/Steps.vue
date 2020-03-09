<template>
  <div class="cw-snetwork">
    <div class="text text-primary text-center">
      <h1>IT'S TOO EASY! JUST FOLLOW THESE THREE STEPS!</h1>
    </div>
    <div class="card-holder">
      <div class="card" v-for="item, index in data" v-if="data !== null">
        <span style="width: 100%; text-align: center; margin-top: 50px; margin-bottom: 50px;">
          <i :class="item.icon" class="icons text-primary"></i>
        </span>
        
        <div class="card-body">
          <h5 class="card-title text-primary">{{item.title}}</h5>
          <p class="card-text">{{item.description}}</p>
          <button class="btn btn-primary">{{index + 1}}</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "~assets/style/colors.scss";
.cw-snetwork{
  width: 100%;
  float: left;
  min-height: 100vh;
  overflow-y: hidden;
}

.text{
  width: 90%;
  float: left;
  margin-right: 10%;
  margin-top: 50px;
  min-height: 50px;
  margin-left: 5%;
  margin-right: 5%;
}

.text-primary{
  color: $primary !important;
}

.text .title{
  width: 100%;
  float: left;
}

.title h1{
  font-size: 40px;
}

.text .description{
  margin-top: 25px;
  width: 100%;
  float: left;
  text-align: justify;
}

.image{
  width: 40%;
  margin-left: 10%;
  float: left;
  margin-top: 150px;
  display: block;
}
.card-holder{
  width: 90%;
  float: left;
  margin-left: 5%;
  margin-right: 5%;
}
.card{
  width: 30%;
  float: left;
  margin-right: 3%;
  margin-top: 50px;
}
.card-body{
  text-align: justify;
}

.icons{
  font-size: 100px;
}

@media screen and (max-width: 992px){
  .text{
    width: 90%;
    margin-left: 5%;
    margin-right: 5%;
    margin-top: 50px;
  }

  .title{
    text-align: center;
  }

  .card{
    width: 100%;
    margin-left: 0%;
    margin-right: 0%;
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
        title: 'First, create or post a request',
        description: 'To post a request, click the "Post a Request" button at the upper right and fill-up the required details.',
        icon: 'fas fa-edit'
      }, {
        title: 'Second, use the messenger thread',
        description: 'Once a different user will connect to your request, a messenger thread notification will pop-up. Click the thread notification to contact with your peer using the messenger. You can ask for the ID, Photo, and Signature (only on mobile app) for confirmation of completion to your request.',
        icon: 'fas fa-comments'
      }, {
        title: 'Lastly, transfer of funds and review',
        description: 'If your request has been completed, other peer will transfer the funds. You can rate your peer and review transaction.',
        icon: 'fa fa-exchange'
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
