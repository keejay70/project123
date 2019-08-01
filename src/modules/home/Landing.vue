<template>
	<div class="body">
		<landing-banner></landing-banner>
    <landing-marketplace></landing-marketplace>
    <landing-mc></landing-mc>
	</div>
</template>
<script>
import ROUTER from '../../router'
import AUTH from '../../services/auth'
export default {
  components: {
    'landing-banner': require('modules/home/Landing/Banner.vue'),
    'landing-marketplace': require('modules/home/Landing/Marketplace.vue'),
    'landing-mc': require('modules/home/Landing/MessageAndComment.vue')
  },
  mounted(){
  },
  data(){
    return {
    }
  },
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    }
  }
}
</script>
<style scoped>
.body{
	margin: 0px;
}
</style>
