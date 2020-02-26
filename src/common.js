import config from 'src/config.js'
let APP_EMAIL = 'support@payhiram.ph'
export default {
  sidebarMenu: [
    {accountType: 'ALL', accountStatus: 'ALL', description: 'Requests', icon: 'fa fa-arrow-right', path: 'requests', flag: false, subMenu: null},
    // {accountType: 'ALL', accountStatus: 'ALL', description: 'Transfer', icon: 'fa fa-arrow-right', path: 'transfer', flag: false, subMenu: null},
    {accountType: 'ALL', accountStatus: 'ALL', description: 'Dashboard', icon: 'fa fa-tachometer', path: 'dashboard', flag: false, subMenu: null},
    // {accountType: 'INVESTOR', accountStatus: 'ALL', description: 'Invested', icon: 'fa fa-arrow-left', path: 'investments', flag: false, subMenu: null},
    // {accountType: 'ALL', accountStatus: 'ALL', description: 'Payments', icon: 'fa fa-money', path: 'payments', flag: false, subMenu: null},
    {accountType: 'ADMIN', accountStatus: 'ADMIN', description: 'Accounts', icon: 'fas fa-users', path: 'accounts', flag: false, subMenu: null},
    {accountType: 'ADMIN', accountStatus: 'ADMIN', description: 'Deposits', icon: 'fas fa-piggy-bank', path: 'adminDeposits', flag: false, subMenu: null},
    {accountType: 'ADMIN', accountStatus: 'ADMIN', description: 'Withdrawals', icon: 'fas fa-money-check', path: 'adminWithdrawals', flag: false, subMenu: null},
    {accountType: 'ADMIN', accountStatus: 'ADMIN', description: 'System Notifications', icon: 'fas fa-bell', path: 'systemNotification', flag: false, subMenu: null},
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
  APP_EMAIL: APP_EMAIL,
  APP_SITE: 'https://payhiram.ph',
  COMPANY: 'Increment Technologies',
  COMPANY_URL: 'www.increment.ltd',
  COPYRIGHT: 'PAYHIRAM 2019',
  USER_TYPE: [{
    title: 'USER'
  }],
  USER_TYPE_SETTING: false,
  plan: false,
  header: ['status', 'notification'], // 'messenger', '',
  settingsMenu: [
    {title: 'Profile', type: 'profile', allowed: ['cellular_number', 'address', 'sex', 'birth_date']},
    {title: 'Educations', type: 'educations', allowed: []},
    {title: 'Work Experience', type: 'work-experience', allowed: []},
    // {title: 'Idenfication Cards', type: 'identifications', allowed: []},
    // {title: 'Guarantor', type: 'guarantor', allowed: []},
    {title: 'Account', type: 'account', allowed: []},
    // {title: 'Payment Accounts', type: 'payment_method', allowed: []},
    // {title: 'Billing Information', type: 'billing_information', allowed: []},
    // {title: 'Merchant Setting', type: 'merchant', allowed: []},
    {title: 'Notifications', type: 'notification', allowed: []}
  ],
  referral: {
    message: 'to help them in case of emergency.',
    emailMessage: '. You can send cash online and do more on financial fulfillment. It\'s awesome.'
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
  MAXIMUM_DEPOSIT: 500000,
  MAXIMUM_WITHDRAWAL: 500000,
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
  fulfillmentTypesWithValidation: [1, 4],
  fulfillmentTypes: [{
    value: 1,
    label: 'Send',
    description: 'Allow other peer to fulfill your transaction when you want to send money to your family, friends or to businesses.',
    money_type: 'Cash'
  }, {
    value: 2,
    label: 'Withdrawal',
    description: 'Allow other peer to fulfill your withdrawals from Payhiram.',
    money_type: 'Cash'
  }, {
    value: 3,
    label: 'Deposit',
    description: 'Allow other peer to fulfill your deposits to Payhiram.',
    money_type: 'Wallet'
  }, {
    value: 4,
    label: 'Bills and Payments',
    description: 'Don\'t have time and want to pay your bills? Allow other peer to fulfil your bills.',
    money_type: 'Cash'
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
  ],
  notificationSeting: [{
    flag: true
  }, {
    flag: false
  }, {
    flag: true
  }],
  authorize: 'PIN',
  faq: [{
    title: 'What are the services we are offering?',
    description: '<p>We are currently offering four services which are sending, withdrawal, deposit and bills and payments.</p>' +
    '<p><b>Sending</b>, if you want to send cash to your family, friends, relatives or business related transactions.</p>' +
    '<p><b>Withdrawal</b>,  if you want to withdraw cash from your wallet which we have two options; One by creating a <b>Request</b> by making sure that the type is Withdrawal and will be fulfilled by our partners and the other one is by creating a withdrawal request in <b>Dashboard</b>.</p>' +
    '<p><b>Deposit</b>, you may check the FAQ on deposit.</p>' +
    '<p><b>Bills and Payments</b>, if you want to pay your bills and payments and don\'t have time to process it. You can let our partners do that job for you by just going to <b>Requests</b> and create a request with a type of Bills and Payments.</p>'
  }, {
    title: 'How to become one of our Partners?',
    description: 'We carefully check and verify information from our partners and need to follow our policies. If you want to be part you may send an inquiry to <b>' + APP_EMAIL + '</b>.'
  }, {
    title: 'What is the minimum and maximum amount per transaction?',
    description: 'We are currency implementing at least <b>PHP 1,000.00</b> as minimum per transaction and a maximum of <b>PHP 500, 000.00</b> per transaction per day.'
  }, {
    title: 'Do you need bank account from your user?',
    description: 'We are not requiring our users to submit this information, especially credit card and debit card details.'
  }, {
    title: 'How to deposit money to my wallet?',
    description: '<p>We have two types of deposit.</p>' +
    '<p>First is the Normal Deposit which will be processed by our partners. You need to go to <b>Request</b> then create one and make sure that the type is <b>Deposit</b>.</p>' +
    '<p>Second is Direct Deposit which will be processed by PayHiram. Go to <b>Dashboard</b> then create a deposit request and after an email will be sent to your email address containing instructions for deposit.</p>'
  }, {
    title: 'Can I cancel my request?',
    description: '<p>Sadly, you are not allowed to cancel your requests once posted. This is to protect our partners but for other reasons you want to cancel you may send an email to <b>' + APP_EMAIL + '</b>.</p>'
  }]
}
