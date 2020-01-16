<template>
	<div class="incre-row">
    <div v-for="(item, index) in settings.page" :key="index" class="cw-banner" :style="{'background': item.background}">
      <div class="image" v-if="item.template === 'left'">
        <img :src="item.image" style="margin-bottom: 5px;" width="100%">
      </div>
      <div class="text" :class="item.textColor">
        <span class="title">
          <h1>{{item.title}}</h1>
        </span>
        <span class="description">
          <h4>
            {{item.description}}
          </h4>
        </span>
        <span v-if="item.buttonsFlag === true">
          <button class="btn btn-warning custom-btn" @click="redirect('/login')">Login</button>
          <button class="btn custom-btn" style="color: #000;" @click="redirect('/signup')">Register</button>

          <span v-if="item.appUrl !== null" style="width: 100%; float: left;" >
            <button class="btn custom-btn bg-black" @click="redirect('/' + item.appUrl.iOS)">
              <i class="fab fa-app-store"></i>
              Get on Apps Store Now!
            </button>
          </span>
          <span v-if="item.appUrl !== null" style="width: 100%; float: left;" >
            <button class="btn custom-btn bg-black" @click="redirect('/' + item.appUrl.android)">
              <i class="fab fa-google-play"></i>
              Get on Play Store Now!
            </button>
          </span>
        </span>
      </div>
      <div class="image" v-if="item.template === 'right'">
        <img :src="item.image" style="margin-bottom: 5px;" width="100%">
      </div>
    </div>
	</div>
</template>
<style scoped lang="scss">
@import "~assets/style/colors.scss";
.custom-btn{
  height: 50px !important;
  border-radius: 5px !important;
  width: 200px !important;
  margin-top: 25px;
}

.bg-black{
  background-color: #000;
  margin-top: 10px !important;
}

.cw-banner{
  width: 100%;
  float: left;
  height: 600px;
}
.text{
  width: 45%;
  float: left;
  margin-left: 5%;
  margin-top: 150px;
}
.text .title{
  width: 100%;
  float: left;
}
.title h1{
  font-size: 50px;
}
.text .description{
  margin-top: 25px;
  width: 100%;
  float: left;
  text-align: justify;
}
.image{
  width: 40%;
  margin-right: 5%;
  float: left;
  margin-left: 5%;
  margin-top: 100px;
  display: block;
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

  .title h1{
    font-size: 300%;
  }

  .description h4{
    font-size: 120%;
    font-weight: 300;
    margin-top: 25px;
    margin-bottom: 25px;
  }

  .image{
    display: none;
  }

  .custom-btn{
    width: 100% !important;
    margin-top: 10px !important;
  }
}
</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import SETTINGS from 'src/modules/home/settings.js'
export default {
  mounted(){
  },
  data(){
    return {
      settings: SETTINGS
    }
  },
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    }
  }
}
</script>
