
export default{
  routes: [{
    path: '/signup',
    name: 'signup',
    component: resolve => require(['components/increment/basic/Signup.vue'], resolve),
    meta: {
      tokenRequired: false
    }
  }, {
    path: '/signup/:email/:code',
    name: 'signup',
    component: resolve => require(['components/increment/basic/Signup.vue'], resolve),
    meta: {
      tokenRequired: false
    }
  }, {
    path: '/signup_partner',
    name: 'signupPartner',
    component: resolve => require(['components/increment/basic/SignupPartner.vue'], resolve),
    meta: {
      tokenRequired: false
    }
  }, {
    path: '/verification/:email',
    name: 'verification',
    component: resolve => require(['components/increment/basic/Verification.vue'], resolve),
    meta: {
      tokenRequired: false
    }
  }, {
    path: '/login_verification/:username/:code',
    name: 'loginVerification',
    component: resolve => require(['components/increment/basic/LoginByVerification.vue'], resolve),
    meta: {
      tokenRequired: false
    }
  }, {
    path: '/login',
    name: 'loginAccount',
    component: resolve => require(['components/increment/basic/LogIn.vue'], resolve),
    meta: {
      tokenRequired: false
    }
  }, {
    path: '/home',
    name: 'landing',
    component: resolve => require(['modules/home/Landing.vue'], resolve),
    meta: {
      tokenRequired: false
    }
  }, {
    path: '/request_reset_password',
    name: 'requestResetPassword',
    component: resolve => require(['components/increment/basic/RequestResetPassword.vue'], resolve),
    meta: {
      tokenRequired: false
    }
  }, {
    path: '/reset_password/:username/:code',
    name: 'resetPassword',
    component: resolve => require(['components/increment/basic/ResetPassword.vue'], resolve),
    meta: {
      tokenRequired: false
    }
  }, {
    path: '/dashboard',
    name: 'dashboard',
    component: resolve => require(['modules/dashboard/Dashboard.vue'], resolve),
    meta: {
      tokenRequired: true
    }
  }, {
    path: '/profile/:parameter?',
    name: 'profile',
    component: resolve => require(['components/increment/settings/Update.vue'], resolve),
    meta: {
      tokenRequired: true
    }
  }, {
    path: '/messenger/:username?',
    name: 'messenger',
    component: resolve => require(['components/increment/messengervue/Messenger.vue'], resolve),
    meta: {
      tokenRequired: true
    }
  }, {
    path: '/requests/:code?',
    name: 'requests',
    component: resolve => require(['modules/request/List.vue'], resolve),
    meta: {
      tokenRequired: true
    }
  }, {
    path: '/history/',
    name: 'history',
    component: resolve => require(['modules/history/List.vue'], resolve),
    meta: {
      tokenRequired: true
    }
  }, {
    path: '/ledgers/',
    name: 'ledgers',
    component: resolve => require(['modules/ledger/List.vue'], resolve),
    meta: {
      tokenRequired: true
    }
  }, {
    path: '/investments/',
    name: 'investments',
    component: resolve => require(['modules/investment/Investments.vue'], resolve),
    meta: {
      tokenRequired: true
    }
  }, {
    path: '/payments/',
    name: 'payments',
    component: resolve => require(['modules/payment/List.vue'], resolve),
    meta: {
      tokenRequired: true
    }
  }, {
    path: '/adminDeposits/',
    name: 'adminDeposits',
    component: resolve => require(['modules/admin/Deposits.vue'], resolve),
    meta: {
      tokenRequired: true
    }
  }, {
    path: '/adminWithdrawals/',
    name: 'adminWithdrawals',
    component: resolve => require(['modules/admin/Withdrawals.vue'], resolve),
    meta: {
      tokenRequired: true
    }
  }, {
    path: '/withdrawals/',
    name: 'withdrawals',
    component: resolve => require(['modules/withdraw/List.vue'], resolve),
    meta: {
      tokenRequired: true
    }
  }, {
    path: '/referrals/',
    name: 'referrals',
    component: resolve => require(['components/increment/generic/referral/Referrals.vue'], resolve),
    meta: {
      tokenRequired: true
    }
  }, {
    path: '/transfer_charges/',
    name: 'transferCharges',
    component: resolve => require(['modules/admin/TransferCharges.vue'], resolve),
    meta: {
      tokenRequired: true
    }
  }, {
    path: '/bookmarks/',
    name: 'bookmarks',
    component: resolve => require(['modules/bookmark/List.vue'], resolve),
    meta: {
      tokenRequired: true
    }
  }, {
    path: '/accounts/',
    name: 'accounts',
    component: resolve => require(['modules/admin/Accounts.vue'], resolve),
    meta: {
      tokenRequired: true
    }
  }, {
    path: '/transfer/',
    name: 'transfer',
    component: resolve => require(['modules/peer/Peer.vue'], resolve),
    meta: {
      tokenRequired: true
    }
  }, {
    path: '/createRequest',
    name: 'createRequest',
    component: resolve => require(['modules/request/Create.vue'], resolve),
    meta: {
      tokenRequired: true
    }
  }, {
    path: '/createRequestBorrow',
    name: 'createRequestBorrow',
    component: resolve => require(['modules/request/CreateBorrow.vue'], resolve),
    meta: {
      tokenRequired: true
    }
  }, {
    path: '/thread/:code?',
    name: 'thread',
    component: resolve => require(['components/increment/messengervue/Payhiram.vue'], resolve),
    meta: {
      tokenRequired: true
    }
  }, {
    path: '/paymentConfirmation/:email/:userCode/:depositCode',
    name: 'paymentConfirmation',
    component: resolve => require(['modules/deposit/PaymentConfirmation.vue'], resolve),
    meta: {
      tokenRequired: false
    }
  }, {
    path: '/systemNotification/',
    name: 'systemNotification',
    component: resolve => require(['components/increment/generic/system/NotificationList.vue'], resolve),
    meta: {
      tokenRequired: true
    }
  }, {
    path: '/test',
    name: 'test',
    component: resolve => require(['modules/test/Test.vue'], resolve),
    meta: {
      tokenRequired: false
    }
  }, {
    path: '/faq',
    name: 'faq',
    component: resolve => require(['modules/docs/FAQ.vue'], resolve),
    meta: {
      tokenRequired: false
    }
  }, {
    path: '/coupons',
    name: 'coupons',
    component: resolve => require(['modules/admin/Coupons.vue'], resolve),
    meta: {
      tokenRequired: true
    }
  }, {
    path: '/products',
    name: 'products',
    component: resolve => require(['components/increment/imarketvue/product/Products.vue'], resolve),
    meta: {
      tokenRequired: true
    }
  },
  {
    path: '/product/edit/:code',
    name: 'product',
    component: resolve => require(['components/increment/imarketvue/product/EditProduct.vue'], resolve),
    meta: {
      tokenRequired: true
    }
  },
  {
    path: '/marketplace',
    name: 'marketplace',
    component: resolve => require(['components/increment/imarketvue/marketplace/Marketplace.vue'], resolve),
    meta: {
      tokenRequired: true
    }
  },
  {
    path: '/marketplace/product/:code/:status?',
    name: 'marketplaceProduct',
    component: resolve => require(['components/increment/imarketvue/marketplace/Product.vue'], resolve),
    meta: {
      tokenRequired: true
    }
  }
  ]
}
