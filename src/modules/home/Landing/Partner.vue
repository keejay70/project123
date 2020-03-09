<template>
  <div class="cw-banner" id="partner">
    <div class="text text-white">
      <span class="title">
        <h1>Be one of our Partners!</h1>
      </span>
      <span class="description">
        <h4>
          Being one of our Partners, you will be the one who will fulfill the financial requests of our users in marketplace. And enjoy earning money now!
        </h4>
        <br>
        <h4>
          To become one, send us an email with your registered email address to {{common.APP_EMAIL}}.
        </h4>
      </span>
    </div>
    <img :src="require('assets/img/Partners.png')" class="image">
  </div>
</template>
<style scoped lang="scss">
@import "~assets/style/colors.scss";
.cw-banner{
  width: 100%;
  float: left;
  background: $secondary;
  height: 100vh;
}
.text{
  width: 50%;
  float: left;
  position: relative;
  z-index: 1000;
  margin-left: 50%;
  margin-top: 200px;
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
  width: 90%;
  margin-right: 10%;
  float: left;
  text-align: justify;
}
.image{
  max-width: 100%;
  max-height: 100%;
  position: absolute;
  left: 0;
  z-index: 0;
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

  .image{
    position: relative;
    max-height: 100%;
    width: inherit;
  }
}

</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import COMMON from 'src/common.js'
export default {
  mounted(){
  },
  data(){
    return {
      common: COMMON
    }
  },
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    }
  }
}
</script>
