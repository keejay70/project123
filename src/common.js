import config from 'src/config.js'
let APP_EMAIL = 'support@payhiram.ph'
export default {
  sidebarMenu: [
    {accountType: 'ALL', showOnAdmin: true, accountStatus: 'ALL', description: 'Requests', icon: 'fa fa-arrow-right', path: 'requests', flag: false, subMenu: null},
    // {accountType: 'ALL', showOnAdmin: true, accountStatus: 'ALL', description: 'Marketplace', icon: 'fas fa-store-alt', path: 'marketplace', flag: false, subMenu: null},
    // {accountType: 'ALL', showOnAdmin: true, accountStatus: 'ALL', description: 'Rentals', icon: 'fas fa-hand-holding-heart', path: 'rentals', flag: false, subMenu: null},
    // {accountType: 'ALL', accountStatus: 'ALL', description: 'Transfer', icon: 'fa fa-arrow-right', path: 'transfer', flag: false, subMenu: null},
    {accountType: 'ALL', showOnAdmin: true, accountStatus: 'ALL', description: 'Dashboard', icon: 'fa fa-tachometer', path: 'dashboard', flag: false, subMenu: null},
    // {accountType: 'MERCHANT', showOnAdmin: true, accountStatus: 'ALL', description: 'My Products', icon: 'fas fa-store-alt', path: 'products', flag: false, subMenu: null},
    // {accountType: 'MERCHANT', showOnAdmin: true, accountStatus: 'ALL', description: 'Rental Requests', icon: 'fas fa-store-alt', path: 'rentalRequests', flag: false, subMenu: null},
    // {accountType: 'MERCHANT', showOnAdmin: true, accountStatus: 'ALL', description: 'Installments Requests', icon: 'fas fa-store-alt', path: 'InstallmentRequests', flag: false, subMenu: null},
    // {accountType: 'INVESTOR', accountStatus: 'ALL', description: 'Invested', icon: 'fa fa-arrow-left', path: 'investments', flag: false, subMenu: null},
    // {accountType: 'ALL', accountStatus: 'ALL', description: 'Payments', icon: 'fa fa-money', path: 'payments', flag: false, subMenu: null},
    {accountType: 'ADMIN', showOnAdmin: true, accountStatus: 'ADMIN', description: 'Coupons', icon: 'fas fa-stamp', path: 'coupons', flag: false, subMenu: null},
    {accountType: 'ADMIN', showOnAdmin: true, accountStatus: 'ADMIN', description: 'Accounts', icon: 'fas fa-users', path: 'accounts', flag: false, subMenu: null},
    {accountType: 'ADMIN', showOnAdmin: true, accountStatus: 'ADMIN', description: 'Deposits', icon: 'fas fa-piggy-bank', path: 'adminDeposits', flag: false, subMenu: null},
    {accountType: 'ADMIN', showOnAdmin: true, accountStatus: 'ADMIN', description: 'Withdrawals', icon: 'fas fa-money-check', path: 'adminWithdrawals', flag: false, subMenu: null},
    {accountType: 'ADMIN', showOnAdmin: true, accountStatus: 'ADMIN', description: 'System Notifications', icon: 'fas fa-bell', path: 'systemNotification', flag: false, subMenu: null},
    {accountType: 'ADMIN', showOnAdmin: true, accountStatus: 'ADMIN', description: 'Transfer Charges', icon: 'fas fa-stamp', path: 'transfer_charges', flag: false, subMenu: null}
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
  COMPANY_URL: 'http://increment.ltd',
  COPYRIGHT: 'PAYHIRAM ' + new Date().getFullYear(),
  USER_TYPE: [{
    title: 'USER'
  }],
  USER_TYPE_SETTING: false,
  plan: false,
  broadcastingFlag: true,
  header: ['status', 'notification'], // 'messenger', '',
  settingsMenu: [
    {title: 'Profile', type: 'profile', allowed: ['cellular_number', 'address', 'sex', 'birth_date']},
    // {title: 'Educations', type: 'educations', allowed: []},
    // {title: 'Work Experience', type: 'work-experience', allowed: []},
    // {title: 'Idenfication Cards', type: 'identifications', allowed: []},
    // {title: 'Guarantor', type: 'guarantor', allowed: []},
    {title: 'Account', type: 'account', allowed: []},
    // {title: 'Payment Accounts', type: 'payment_method', allowed: []},
    // {title: 'Billing Information', type: 'billing_information', allowed: []},
    {title: 'Business Setting', type: 'merchant', allowed: ['prefix']},
    {title: 'Notifications', type: 'notification', allowed: []},
    {title: 'Educational Background', type: 'educations', allowed: []},
    {title: 'Work Experiences', type: 'work-experience', allowed: []},
    {title: 'Identifications', type: 'identifications', allowed: []},
    {title: 'Guarantor', type: 'guarantor', allowed: []}
  ],
  referral: {
    message: 'to help them in case of they want to send cash online.',
    emailMessage: '. You can send cash online and do more on financial fulfillment. It\'s awesome.'
  },
  socialMedia: {
    facebook: 'payhiram'
  },
  payments: [{
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
  fulfillmentTypesBorrow: [{
    value: 101,
    label: 'Loan via Product Fulfilment',
    description: 'Allow other peer to fulfill your transaction when you want to purchase our products from our partners.',
    money_type: 'Wallet'
  }, {
    value: 102,
    label: 'Direct Loan(Wallet)',
    description: 'Allow other peer to fulfill your needed money via wallet.',
    money_type: 'Cash'
  }, {
    value: 103,
    label: 'Direct Loan(Cash)',
    description: 'Allow other peer to fulfill your needed money via cash.',
    money_type: 'Cash'
  }],
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
  }],
  colors: {
    primary: '#005b96',
    secondary: '#ffaa81',
    gray: '#ccc',
    white: '#ffffff',
    warning: '#e0a800',
    danger: '#f7786b',
    textBlue: '#007bff',
    black: '#000'
  },
  ecommerce: {
    inventoryType: 'inventory',
    editProductMenu: [{
      title: 'Inventory',
      flag: true
    }, {
      title: 'Variation',
      flag: false
    }, {
      title: 'Price',
      flag: false
    }, {
      title: 'Installment',
      flag: false
    }, {
      title: 'Comment',
      flag: false
    }, {
      title: 'Location',
      flag: false
    }],
    editProductMenuRental: [{
      title: 'Inventory',
      flag: true
    }, {
      title: 'Variation',
      flag: false
    }, {
      title: 'Price',
      flag: false
    }, {
      title: 'Comment',
      flag: false
    }, {
      title: 'Location',
      flag: false
    }],
    productUnits: null,
    productTitleLimit: 100,
    variations: ['Size', 'Color']
  },
  requirementOptions: [{
    title: '1 Valid ID',
    payload: 'id_1'
  }, {
    title: '2 Valid ID\'s',
    payload: 'id_2'
  }, {
    title: 'Credit Card',
    payload: 'credit_card'
  }],
  rentalCategories: [{
    title: 'Cars',
    payload: 'cars'
  }, {
    title: 'Bikes',
    payload: 'bikes'
  }]
}
