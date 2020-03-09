<template>
  <div>
    <input type="text"  class="form-control" placeholder="Enter message" @keyup="typing()" v-model="data"/>
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
  },
  data(){
    return {
      data: null
    }
  },
  components: {
  },
  methods: {
    typing(){
      this.$emit('changeInput', this.data)
    }
  }
}
</script>
