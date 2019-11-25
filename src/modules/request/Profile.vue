<template>
  <div class="modal fade" id="profileModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-md" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-primary" id="exampleModalLabel">Profile</h5>
          <button type="button" class="close" @click="hideModal()" aria-label="Close">
            <span aria-hidden="true" class="text-primary">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <preview :item="item"></preview>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
export default {
  data(){
    return {
      user: AUTH.user,
      config: CONFIG
    }
  },
  props: ['item'],
  components: {
    'preview': require('modules/profile/Preview.vue')
  },
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    },
    hideModal(){
      $('#profileModal').modal('hide')
    },
    submit(){
      this.newRequest.account_id = this.user.userID
      $('#loading').css({display: 'block'})
      this.APIRequest('requests/create', this.newRequest).then(response => {
        $('#loading').css({display: 'none'})
        this.hideModal()
      })
    }
  }
}
</script>
