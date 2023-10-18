import { computed } from 'vue'
import Helpers from 'src/helpers'
import moment from 'moment'
export const tableAttr = computed(() => {
  const { permissions } = Helpers()
  const permission = permissions.value
  let columns = [
    {
      align: 'left',
      label: 'ID',
      name: 'id',
      field: row => row.id,
      format: val => `${val}`,
      sortable: false,
      required: true
    },
    {
      align: 'left',
      label: 'Full Name',
      name: 'full_name',
      field: row => row.full_name,
      format: val => `${val}`,
      sortable: false,
      required: true
    },
    {
      align: 'left',
      label: 'Date and Time of Entry',
      name: '',
      field: row => moment(row.created_at).format('lll'),
      format: val => `${val}`,
      sortable: false,
      required: true
    },
    {
      align: 'left',
      label: 'Status',
      name: 'reportStatus',
      field: row => row.reportStatus,
      format: val => `${val}`,
      sortable: false,
      required: true
    },
    {
      align: 'left',
      label: 'Volume Shopper',
      name: '',
      field: row => (row.volume_shopper),
      format: val => `${val}`,
      sortable: false,
      required: true
    },
    {
      align: 'left',
      label: 'Card Type',
      name: '',
      field: row => row.card_type,
      format: val => `${val}`,
      sortable: false,
      required: true
    },
    {
      align: 'left',
      label: 'Male Companion',
      name: '',
      field: row => row.male_companion,
      format: val => `${val}`,
      sortable: false,
      required: true
    },
    {
      align: 'left',
      label: 'Female Companion',
      name: '',
      field: row => row.female_companion,
      format: val => `${val}`,
      sortable: false,
      required: true
    },
  ]
  const tableActions = []
  // if(permission.update) {
  //   tableActions.push({
  //     icon: 'edit',
  //     type: 'edit',
  //     color: 'primary',
  //     path: ''
  //   })
  // }
  // if(permission.delete) {
  //   tableActions.push({
  //     icon: 'delete',
  //     type: 'delete',
  //     color: 'negative',
  //     path: ''
  //   })
  // }
  // if(tableActions.length) {
  //   columns.push({
  //     align: 'left',
  //     label: 'Actions',
  //     field: 'actions',
  //     name: 'actions'
  //   })
  // }
  const headerActions = []
  // if(permission.create) {
    headerActions.push({
      type: 'create',
      color: 'primary',
      icon: 'download_for_offline',
      label: 'Download Report',
      path: '/admin/door-greeters/add'
    })
  return {
    headerActions: headerActions,
    tableActions: tableActions,
    columns: columns
  }
})