<template>
  <div>
    <div class="container">
      <button class="btn btn-primary float-right" @click="redirect('/profile/guarantor')"><i class="fas fa-plus"></i> New Issue Ticket</button>
    </div>
  </div>
</template>
<style scoped>
</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'

export default{
  data(){
    return {
      user: AUTH.user,
      data: null
    }

  },
  components: {
  },
  methods: {
  }
}

</script>
