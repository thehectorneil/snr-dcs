import { computed } from 'vue'
import Helpers from 'src/helpers'
export const tableAttr = computed(() => {
  const { permissions } = Helpers()
  const permission = permissions.value
  let columns = [
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
      align: 'center',
      label: 'User Name',
      name: 'username',
      field: row => row.username,
      format: val => `${val}`,
      sortable: false,
      required: true
    },
    {
      align: 'center',
      label: 'Club Location',
      name: 'club_location',
      field: row => row.club_location,
      format: val => `${val}`,
      sortable: false,
      required: true
    },
    {
      align: 'center',
      label: 'Mobile Number',
      name: 'mobile',
      field: row => row.mobile,
      format: val => `${val}`,
      sortable: false,
      required: true
    },
    {
      align: 'center',
      label: 'Email',
      name: 'email',
      field: row => row.email,
      format: val => `${val}`,
      sortable: false,
      required: true
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
      icon: 'edit',
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
  if(permission.create) {
    headerActions.push({
      type: 'create',
      color: 'primary',
      label: 'Add New',
      path: '/admin/door-greeters/add'
    })
  }

  return {
    headerActions: headerActions,
    tableActions: tableActions,
    columns: columns
  }
})