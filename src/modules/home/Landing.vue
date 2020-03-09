<template>
	<div class="body">
		<landing-banner></landing-banner>
    <landing-services></landing-services>
    <landing-partner></landing-partner>
    <!-- <landing-steps></landing-steps> -->
	</div>
</template>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
export default {
  components: {
    'landing-banner': require('modules/home/Landing/Banner.vue'),
    'landing-steps': require('modules/home/Landing/Steps.vue'),
    'landing-services': require('modules/home/Landing/Services.vue'),
    'landing-partner': require('modules/home/Landing/Partner.vue')
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
