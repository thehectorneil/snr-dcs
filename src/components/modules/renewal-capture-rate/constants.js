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
      label: 'Status',
      name: 'reportStatus',
      field: row => row.reportStatus,
      format: val => `${val}`,
      sortable: false,
      required: true
    },
    {
      align: 'left',
      label: 'Date and Time of Entry',
      name: 'created_at',      
      field: row => moment(row.created_at).format('ll hh:mm A'),
      format: val => `${val}`,
      sortable: false,
      required: true
    },
    {
      align: 'left',
      label: 'Expiration Date',
      name: 'expiration',
      field: row =>  moment(row.expiration).format('ll'),
      format: val => `${val}`,
      sortable: false,
      required: true
    },
    {
      align: 'left',
      label: 'Renewed',
      name: 'renewed',
      field: row => row.renewed,
      format: val => `${val}`,
      sortable: false,
      required: true
    },
    // {
    //   align: 'center',
    //   label: 'Status',
    //   name: 'status',
    //   field: row => row.status,
    //   format: val => `${val}`,
    //   sortable: false,
    // }
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
    // headerActions.push({
    //   type: 'create',
    //   color: 'primary',
    //   label: 'Add New',
    //   path: '/admin/door-greeters/add'
    // })
  // }
  
  if(permission.create) {
    headerActions.push({
      type: 'create',
      color: 'primary',
      icon: 'download_for_offline',
      label: 'Download Report',
      path: '/admin/door-greeters/add'
    })
  }
  return {
    headerActions: headerActions,
    tableActions: tableActions,
    columns: columns
  }
})