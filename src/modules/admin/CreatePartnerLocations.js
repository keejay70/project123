import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
import COMMON from 'src/common.js'
var countries = []
COMMON.countries.map(item => {
  var object = {
    label: item,
    value: item
  }
  countries.push(object)
})
export default {
  id: 'createPartnerLocationModal',
  size: 'modal-md',
  title: 'Add Location',
  background: null,
  inputs: [{
    row: 'full',
    label: 'Country',
    variable: 'country',
    value: null,
    required: true,
    id: 'type',
    type: 'select_specified',
    options: countries
  }, {
    row: 'full',
    label: 'Region',
    variable: 'region',
    placeholder: 'Enter region',
    value: null,
    required: true,
    id: 'region',
    type: 'input',
    inputType: 'text',
    validation: {
      size: 1,
      type: 'text'
    }
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
  }],
  route: 'investor_locations/create',
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
