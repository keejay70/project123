import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
import COMMON from 'src/common.js'
var options = []
COMMON.payments.map(item => {
  var object = {
    label: item.title,
    value: item.title
  }
  options.push(object)
})
export default {
  id: 'createTransferChargesModal',
  size: 'modal-sm',
  title: 'Add Transfer Charges',
  background: null,
  inputs: [{
    row: 'full',
    label: 'Payment type',
    variable: 'type',
    value: null,
    required: true,
    id: 'type',
    type: 'select_specified',
    options: options
  }, {
    row: 'full',
    label: 'Minimum Amount',
    variable: 'min_amount',
    placeholder: 'Enter minimum amount',
    value: null,
    required: true,
    id: 'minAmount',
    type: 'input',
    inputType: 'number',
    validation: {
      size: 1,
      type: 'number'
    }
  }, {
    row: 'full',
    label: 'Maximum Amount',
    variable: 'max_amount',
    placeholder: 'Enter maximum amount',
    value: null,
    required: true,
    id: 'maxAmount',
    type: 'input',
    inputType: 'number',
    validation: {
      size: 1,
      type: 'number'
    }
  }, {
    row: 'full',
    label: 'Charge',
    variable: 'charge',
    placeholder: 'Enter charge',
    value: null,
    required: true,
    id: 'charge',
    type: 'input',
    inputType: 'number',
    validation: {
      size: 1,
      type: 'number'
    }
  }],
  route: 'transfer_charges/create',
  button: {
    left: 'Cancel',
    right: 'Submit'
  },
  sort: {
    column: 'created_at',
    value: 'desc'
  },
  params: []
}
