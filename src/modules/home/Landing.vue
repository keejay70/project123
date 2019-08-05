<template>
	<div class="body">
		<landing-banner></landing-banner>
    <choose-borrower></choose-borrower>
    <interest></interest>
	</div>
</template>
<script>
import ROUTER from '../../router'
import AUTH from '../../services/auth'
export default {
  components: {
    'landing-banner': require('modules/home/Landing/Banner.vue'),
    'choose-borrower': require('modules/home/Landing/Borrower.vue'),
    'interest': require('modules/home/Landing/Interest.vue')
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
