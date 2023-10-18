import { computed } from 'vue'
import moment from 'moment'
import Helpers from 'src/helpers'
export const tableAttr = computed(() => {
  const { permissions } = Helpers()
  const permission = permissions.value

  let columns = [
    {
      align: 'left',
      label: 'User Role',
      name: 'role',
      field: row => row.role,
      format: val => `${val}`,
      sortable: false,
      required: true
    },
    {
      align: 'center',
      label: 'Creation Date',
      name: 'created_at',
      field: row => moment(row.creation_date).format('ll'),
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
    },

    // {
    //   align: 'center',
    //   label: 'Actions',
    //   field: 'actions',
    //   name: 'actions'
    // },
  ]


  console.log('sss',permission)

  const tableActions = []
  if(permission.update) {
    tableActions.push({
      icon: 'edit',
      type: 'edit',
      color: 'primary'
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
      align: 'center',
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
      path: '/admin/roles/add-role'
    })
  }
  return {
    headerActions: headerActions,
    tableActions: tableActions,
    columns: columns
  }
})