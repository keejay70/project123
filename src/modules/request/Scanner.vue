<template>
  <div>

      <!-- For scanning qr code -->
    <div class="modal fade right" id="scanner" tabindex="-1" role="dialog" aria-labelledby="deleteHeader"
     aria-hidden="true" data-keyboard="false" data-backdrop="static">
      <div class="modal-dialog modal-side modal-notify modal-primary modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h6 class="modal-title" id="header">Please align the QR Code within the frame to start scanning..</h6>
          </div> 
          <div class="modal-body p-4">
            <qrcode-stream v-if="state === true" @init="onInit" @decode="onDecode"></qrcode-stream>
          </div>
          <div class="modal-footer">
            <button class="btn btn-danger btn-md" data-dismiss="modal" @click="state = false">Cancel</button>
          </div>
        </div>
      </div>
    </div>
     <button type="button" class="btn btn-primary btn-block" @click="redirect('/connection')">View connections/Invite Email</button>
    <button type="button" class="btn btn-primary" style="width: 49%;" data-toggle="modal" data-target="#scanner" @click="toggleScanner()">Scan Qr <i class="fas fa-expand"></i></button>


    <!-- // For generating qr code -->
    <div class="modal fade right" id="scan" tabindex="-1" role="dialog" aria-labelledby="deleteHeader"
     aria-hidden="true" data-keyboard="false" data-backdrop="static">
      <div class="modal-dialog modal-side modal-notify modal-primary modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h6 class="modal-title" id="header">You are now free to scan this code below.</h6>
          </div> 
          <div class="modal-body p-4">
            <QrcodeVue :value="`${user.code}`" :size="200"></QrcodeVue>
          </div>
          <div class="modal-footer">
            <button class="btn btn-danger btn-md" data-dismiss="modal" @click="state = false">Cancel</button>
          </div>
        </div>
      </div>
    </div>
    <button type="button" class="btn btn-primary" style="width: 49%;" data-toggle="modal" data-target="#scan">Generate QR <i class="fas fa-expand"></i></button>
     <!-- For copying link -->
    <button type="button" class="btn btn-primary btn-block" @click="createLink()">Create Link <i class="fas fa-copy"></i></button>
    <br>
    <input type="text" class="form-control search" v-model="link" id="search" placeholder="Search..." v-if="link !== null">
    <button type="button" class="btn btn-primary" @click="generateLink()" v-if="link !== null">Copy</button>
    <button type="button" class="btn btn-danger" @click="link = null" v-if="link !== null">Close</button>
  </div>
</template>
<style lang="scss" scoped> 
  @import "~assets/style/colors.scss";
  .btn{
    margin-top: 12px;
  }
  .modal{
    text-align: center;
  }
</style>
<script>
import QrcodeVue from 'qrcode.vue'
import { QrcodeStream } from 'vue-qrcode-reader'
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import COMMON from 'src/common.js'
export default {
  data(){
    return {
      user: AUTH.user,
      loading: false,
      state: false,
      link: null
    }
  },
  components: { 'qrcode-stream': QrcodeStream, QrcodeVue },
  methods: {
    createLink() {
      this.link = `http://localhost:8001/invitation/${this.user.code}`
    },
    generateLink() {
      this.link = `http://localhost:8001/invitation/${this.user.code}`
      let dummy = document.createElement('textarea')
      document.body.appendChild(dummy)
      dummy.value = this.link
      dummy.select()
      document.execCommand('copy')
      document.body.removeChild(dummy)
    },
    toggleScanner() {
      this.state = true
    },
    async onInit (promise) {
      $('#loading').css({display: 'block'})
      this.loading = true
      try {
        await promise
      } catch (error) {
        const greetings = `Hello ${this.user.username || 'there'}!, `
        if (error.name === 'NotAllowedError') {
          this.qrScannerError = greetings + 'you need to grant camera access permisson.'
        } else if (error.name === 'NotFoundError') {
          this.qrScannerError = greetings + 'there is no camera on this device.'
        } else if (error.name === 'NotReadableError') {
          this.qrScannerError = greetings + 'is the camera already in use?'
        } else if (error.name === 'OverconstrainedError') {
          this.qrScannerError = greetings + 'installed cameras are not suitable.'
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.qrScannerError = greetings + 'Stream API is not supported in this browser.'
        }
      } finally {
        $('#loading').css({display: 'none'})
      }
    },
    onDecode(code) {
      this.qr = false
      ROUTER.push(`/invitation/${code}`)
      $('#scanner').modal('hide')
    },
    redirect(parameter){
      ROUTER.push(parameter)
    }
  }
}
</script>
