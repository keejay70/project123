import common from 'src/common.js'
import Steps from 'modules/home/Landing/Steps.vue'
export default {
  page: [{
    property: {
      width: '100%',
      background: common.colors.primary
    },
    title: 'Sending cash in a new and convenient way!',
    description: 'In Payhiram, we have partners to fulfill your cash needed in any locations you want. Start sending today!',
    image: require('assets/img/Dashboard.png'),
    frame: {
      height: '350px',
      width: '550px',
      float: 'right',
      margin: '70px 90px 50px 40px'
    },
    textColor: 'text-white',
    buttonsFlag: true,
    appUrl: {
      android: 'https://play.google.com/store/apps/details?id=com.payhiram',
      ios: null
    }
  }, {
    position: 'second',
    property: {
      background: common.colors.white
    },
    data: [{
      title: 'First, create or post a request',
      description: 'To post a request, click the "Post a Request" button at the upper right and fill-up the required details.',
      icon: 'fal fa-edit'
    }, {
      title: 'Second, use the messenger thread',
      description: 'Once a different user will connect to your request, a messenger thread notification will pop-up. Click the thread notification to contact with your peer using the messenger. You can ask for the ID, Photo, and Signature (only on mobile app) for confirmation of completion to your request.',
      icon: 'fal fa-comments'
    }, {
      title: 'Lastly, transfer of funds and review',
      description: 'If your request has been completed, other peer will transfer the funds. You can rate your peer and review transaction.',
      icon: 'fal fa-exchange'
    }]
  }, {
    property: {
      width: '100%',
      background: common.colors.gray
    },
    textColor: 'text-primary',
    title: 'Join us with fulfillment!',
    FirstDescript: 'Here in Payhiram, we want you to grow and make sure that your investment with your own fulfillment business will be far better!',
    subdescript: 'We are happy to have partner in your location so that you can start fulfilling your users requests!',
    subtitle: 'BE OUR PARTNER NOW!',
    connect: 'Email us on support@payhiram.ph',
    image: require('assets/img/2.png'),
    frame: {
      height: '350px',
      width: '550px',
      float: 'right',
      margin: '50px 90px 50px 40px'
    },
    buttonsFlag: false,
    appUrl: {
      android: 'url here',
      iOS: 'url here'
    }
  }]
}

