import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
import COMMON from 'src/common.js'
var countries = []
var currencies = []
var types = [{
  label: 'Percentage',
  value: 'percentage'
}, {
  label: 'Fixed Amount',
  value: 'fixed_amount'
}]
COMMON.countries.map(item => {
  var object = {
    label: item,
    value: item
  }
  countries.push(object)
})
COMMON.currencies.map(item => {
  var object = {
    label: item.title,
    value: item.value
  }
  currencies.push(object)
})
export default {
  id: 'createCouponsModal',
  size: 'modal-md',
  title: 'Add Coupons',
  background: null,
  inputs: [{
    row: 'full',
    label: 'Coupon Code',
    variable: 'code',
    placeholder: 'Enter code',
    value: null,
    required: true,
    id: 'code',
    type: 'input',
    inputType: 'text',
    validation: {
      size: 1,
      type: 'text'
    }
  }, {
    row: 'full',
    label: 'Currency',
    variable: 'currency',
    value: null,
    required: true,
    id: 'currency',
    type: 'select_specified',
    options: currencies
  }, {
    row: 'full',
    label: 'Country',
    variable: 'country',
    value: null,
    required: true,
    id: 'country',
    type: 'select_specified',
    options: countries
  }, {
    row: 'full',
    label: 'Locality',
    variable: 'locality',
    placeholder: 'Enter locality',
    value: null,
    required: true,
    id: 'locality',
    type: 'input',
    inputType: 'text',
    validation: {
      size: 1,
      type: 'text'
    }
  }, {
    row: 'full',
    label: 'Type',
    variable: 'type',
    value: null,
    required: true,
    id: 'type',
    type: 'select_specified',
    options: types
  }, {
    row: 'full',
    label: 'Amount',
    variable: 'amount',
    placeholder: 'Enter amount',
    value: null,
    required: true,
    id: 'amount',
    type: 'input',
    inputType: 'number',
    validation: {
      size: 1,
      type: 'text'
    }
  }, {
    row: 'full',
    label: 'Limit',
    variable: 'limit',
    placeholder: 'Enter limit',
    value: null,
    required: true,
    id: 'limit',
    type: 'input',
    inputType: 'number',
    validation: {
      size: 1,
      type: 'text'
    }
  }, {
    row: 'full',
    label: 'Start',
    variable: 'start',
    placeholder: 'Enter start',
    value: null,
    required: true,
    id: 'start',
    type: 'input',
    inputType: 'datetime-local',
    validation: {
      size: 1,
      type: 'text'
    }
  }, {
    row: 'full',
    label: 'End',
    variable: 'end',
    placeholder: 'Enter end',
    value: null,
    required: true,
    id: 'end',
    type: 'input',
    inputType: 'datetime-local',
    validation: {
      size: 1,
      type: 'text'
    }
  }],
  route: 'coupons/create',
  button: {
    left: 'Cancel',
    right: 'Submit'
  },
  sort: null,
  params: [{
    variable: 'account_id',
    value: null
  }]
}
