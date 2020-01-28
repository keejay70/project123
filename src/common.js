import config from 'src/config.js'
export default {
  sidebarMenu: [
    {accountType: 'ALL', accountStatus: 'ALL', description: 'Requests', icon: 'fa fa-arrow-right', path: 'requests', flag: false, subMenu: null},
    // {accountType: 'ALL', accountStatus: 'ALL', description: 'Transfer', icon: 'fa fa-arrow-right', path: 'transfer', flag: false, subMenu: null},
    {accountType: 'ALL', accountStatus: 'ALL', description: 'Dashboard', icon: 'fa fa-tachometer', path: 'dashboard', flag: false, subMenu: null},
    // {accountType: 'INVESTOR', accountStatus: 'ALL', description: 'Invested', icon: 'fa fa-arrow-left', path: 'investments', flag: false, subMenu: null},
    // {accountType: 'ALL', accountStatus: 'ALL', description: 'Payments', icon: 'fa fa-money', path: 'payments', flag: false, subMenu: null},
    {accountType: 'ADMIN', accountStatus: 'ADMIN', description: 'Accounts', icon: 'fas fa-users', path: 'accounts', flag: false, subMenu: null},
    {accountType: 'ADMIN', accountStatus: 'ADMIN', description: 'Deposits', icon: 'fas fa-piggy-bank', path: 'deposits', flag: false, subMenu: null},
    {accountType: 'ALL', accountStatus: 'ALL', description: 'Withdrawals', icon: 'fas fa-money-check', path: 'withdrawals', flag: false, subMenu: null},
    {accountType: 'ADMIN', accountStatus: 'ADMIN', description: 'Transfer Charges', icon: 'fas fa-stamp', path: 'transfer_charges', flag: false, subMenu: null}
  ],
  profileMenu: [
  // {
  //   title: 'My Bookmarks',
  //   icon: 'fa fa-star',
  //   route: '/bookmarks'
  // },
    {
      title: 'My Profile',
      icon: 'fa fa-cog',
      route: '/profile'
    }, {
      title: 'Invite Friends',
      icon: 'fa fa-users',
      route: '/referrals'
    }],
  APP_NAME: 'PAYHIRAM',
  APP_NAME_HTML: 'PAYHIRAM',
  APP_EMAIL: 'support@payhiram.ph',
  APP_SITE: 'https://payhiram.ph',
  COMPANY: 'Increment Technologies',
  COMPANY_URL: 'www.increment.ltd',
  COPYRIGHT: 'PAYHIRAM 2019',
  USER_TYPE: [{
    title: 'USER'
  }],
  plan: false,
  header: ['status', 'notification'], // 'messenger', '',
  settingsMenu: [
    {title: 'Profile', type: 'profile', allowed: ['cellular_number', 'address', 'sex', 'birth_date']},
    {title: 'Educations', type: 'educations', allowed: []},
    {title: 'Work Experience', type: 'work-experience', allowed: []},
    // {title: 'Idenfication Cards', type: 'identifications', allowed: []},
    // {title: 'Guarantor', type: 'guarantor', allowed: []},
    {title: 'Account', type: 'account', allowed: []},
    {title: 'Payment Accounts', type: 'payment_method', allowed: []},
    // {title: 'Billing Information', type: 'billing_information', allowed: []},
    // {title: 'Merchant Setting', type: 'merchant', allowed: []},
    {title: 'Notifications', type: 'notification', allowed: []}
  ],
  referral: {
    message: 'to help them in case of emergency.',
    emailMessage: '.They help me to manage my investments and allow me to borrow money and approved instantly by other investors. It\'s awesome.'
  },
  socialMedia: {
    facebook: 'payhiram'
  },
  payments: [{
    title: 'Banco de Oro',
    logo: require('src/assets/img/bdo.png')
  }, {
    title: 'UnionBank of the Philippines',
    logo: require('src/assets/img/unionbank.png')
  }, {
    title: 'Chinabank Corporation',
    logo: require('src/assets/img/unionbank.png')
  }],
  MINIMUM_WITHDRAWAL: 1000,
  MINIMUM_DEPOSIT: 1000,
  pusher: {
    channel: 'payhiram',
    notifications: 'Notifications',
    messages: 'Message',
    messageGroup: 'MessageGroup',
    typing: 'typing'
  },
  interest: {
    max: 30,
    min: 1
  },
  charges: {
    minimum: 20,
    maximum: 100
  },
  fulfillmentTypes: [{
    value: 1,
    label: 'Send',
    description: 'Allow other peer to process your transaction when you want to send money to your family, friends or to businesses.',
    money_type: 'Cash'
  }, {
    value: 2,
    label: 'Withdrawal',
    description: 'Allow other peer to process your withdrawals.',
    money_type: 'Cash'
  }, {
    value: 3,
    label: 'Deposit',
    description: 'Allow other peer to process your deposits.',
    money_type: 'Wallet'
  }
  // {
  //   value: 101,
  //   label: 'Lending',
  //   description: 'In case of emergency, let other peer fulfil your need.',
  //   money_type: 'Wallet'
  // }, {
  //   value: 102,
  //   label: 'Installments',
  //   description: 'What something but can not afford to? Let other peer get that something.',
  //   money_type: 'Wallet'
  // }
  ],
  currencies: [{
    title: 'Philippine Peso',
    value: 'PHP'
  }],
  payhiramCharges: {
    percentage: 20
  },
  messagesHeader: {
    path: 'thread'
  },
  GUIDE: [{
    title: 'Welcome to PayHiram!',
    subtitle: 'Sending cash in a new and convenient way! In Payhiram, we have partners to fulfill your cash needed in any locations you want. Start sending today!',
    image: require('src/assets/img/logo.png'),
    icon: null
  }, {
    title: 'First, create or post a request',
    subtitle: 'To post a request, click the "Post a Request" button at the upper right and fill-up the required details',
    image: null,
    icon: 'fal fa-edit'
  }, {
    title: 'Second, use the messenger thread',
    subtitle: 'Once a different user will connect to your request, a messenger thread notification will pop-up. Click the thread notification to contact with your peer using the messenger. You can ask for the ID, Photo, and Signature (only on mobile app) for confirmation of completion to your request',
    image: null,
    icon: 'fal fa-comments'
  }, {
    title: 'Lastly, transfer of funds and review',
    subtitle: 'If your request has been completed, other peer will transfer the funds. You can rate your peer and review transaction.',
    image: null,
    icon: 'fal fa-exchange'
  }, {
    title: 'Congratulations!',
    subtitle: 'You\'re good to go! Enjoy your stay!',
    image: null,
    icon: 'fa-check'
  }],
  identifications: [
    {text: 'Driver\'s License', value: 'driver_license'},
    {text: 'Valid Passport', value: 'passport'},
    {text: 'Unified Multi-Purpose ID Card', value: 'umpid'},
    {text: 'PhilHealth ID', value: 'philhealth'},
    {text: 'Postal ID', value: 'postal'},
    {text: 'Voter\'s ID', value: 'voter'},
    {text: 'PRC License', value: 'prc'},
    {text: 'Senior Citizen ID', value: 'scid'},
    {text: 'OFW ID', value: 'ofwid'}
  ],
  countries: [
    'Philippines'
  ]
}
