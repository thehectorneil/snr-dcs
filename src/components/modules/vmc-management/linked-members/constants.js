import { computed } from 'vue'
import Helpers from 'src/helpers'
export const tableAttr = computed(() => {
  const { permissions } = Helpers()
  const permission = permissions.value
  let columns = [
    {
      align: 'left',
      label: 'Full Name',
      name: 'fullName',
      field: row => row.fullName,
      format: val => `${val}`,
      sortable: false,
      required: true
    },
    {
      align: 'left',
      label: 'Account Number',
      name: 'accountNo',
      field: row => row.accountNo,
      format: val => `${val}`,
      sortable: false,
      required: true
    },
    {
      align: 'left',
      label: 'Card Number',
      name: 'cardNo',
      field: row => row.cardNo,
      format: val => `${val}`,
      sortable: false,
      required: true
    },
    {
      align: 'left',
      label: 'Type',
      name: 'membershipType',
      field: row => row.membershipType,
      format: val => `${val}`,
      sortable: false,
      required: true
    },
    {
      align: 'center',
      label: 'Card Status',
      name: 'cardStatus',
      field: row => row.cardStatus,
      format: val => `${val}`,
      sortable: false,
      required: true
    },
    {
      align: 'left',
      label: 'Mobile Number',
      name: 'mobile',
      field: row => row.mobile,
      format: val => `${val}`,
      sortable: false,
      required: true
    },
    {
      align: 'left',
      label: 'Email',
      name: 'email',
      field: row => row.email,
      format: val => `${val}`,
      sortable: false,
      required: true
    },
    {
      align: 'center',
      label: 'Special Verification',
      name: 'is_special_verification',
      field: row => row.is_special_verification,
      format: val => `${val}`,
      sortable: false,
      required: false
    },
    {
      align: 'left',
      label: 'Notified',
      name: 'notified',
      field: row => row.notified,
      format: val => `${val}`,
      sortable: false,
      required: false
    },
    {
      align: 'center',
      label: 'Status',
      name: 'status',
      field: row => row.status,
      format: val => `${val}`,
      sortable: false,
      required: true
    }
  ]
  const tableActions = []
  if(permission.update) {
    tableActions.push({
      icon: 'edit_document',
      type: 'edit',
      color: 'primary',
      path: ''
    })
  }
  if(permission.delete) {
    tableActions.push({
      icon: 'delete',
      type: 'delete',
      color: 'negative',
      path: ''
    })
  }
  if(tableActions.length) {
    columns.push({
      align: 'left',
      label: 'Actions',
      field: 'actions',
      name: 'actions',
      required: true
    })
  }
  const headerActions = []
  // if(permission.create) {
  //   headerActions.push({
  //     type: 'create',
  //     color: 'primary',
  //     label: 'Add New',
  //     path: '/admin/door-greeters/add'
  //   })
  // }
  return {
    headerActions: headerActions,
    tableActions: tableActions,
    columns: columns
  }
})