<template>
  <div>
    <button class="btn btn-primary pull-right" style="margin-top: 25px;" @click="onClickButton('This is a test!')">Test</button>
    <span class="row" style="margin-top: 200px;">
      <span class="col-lg-6">
        <my-inputs @changeInput="manageData($event)"></my-inputs>

        <h1>Parent: {{data}}</h1>
        <my-display :data="data"></my-display>
      </span>
    </span>
  </div>
</template>
<style scoped lang="scss">
@import "~assets/style/colors.scss";
</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
import COMMON from 'src/common.js'
export default {
  mounted(){
    console.log('mounted', this.data)
    this.data = 'Hello World!'
  },
  data(){
    return {
      data: null
    }
  },
  components: {
    'my-inputs': require('src/modules/test/Inputs.vue'),
    'my-display': require('src/modules/test/Display.vue')
  },
  methods: {
    onClickButton(test){
      this.data = test
      console.log(test)
    },
    manageData(evt){
      console.log(evt)
      this.data = evt
    }
  }
}
</script>
