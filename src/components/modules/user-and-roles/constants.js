import { computed } from 'vue'
import moment from 'moment'
// import Helpers from 'src/helpers'
export const tableAttr = computed(() => {
  // const { permissions } = Helpers()
  // const permission = permissions.value
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
      align: 'left',
      label: 'Role',
      name: 'role',
      field: row => row.role,
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
      align: 'left',
      label: 'Creation Date',
      name: 'creation_date',
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
    {
      align: 'center',
      label: 'Actions',
      field: 'actions',
      name: 'actions',
      required: true
    },
  ]
  const actions = [
    {
      icon: 'edit_document',
      type: 'edit',
      color: 'primary'
    },
    {
      icon: 'delete',
      type: 'delete',
      color: 'negative'
    },
  ]
  // if(permission.update) {
  //   actions.push({
  //     icon: 'edit',
  //     type: 'edit',
  //     color: 'primary'
  //   })
  // }
  // if(permission.delete) {
  //   actions.push({
  //     icon: 'delete',
  //     type: 'delete',
  //     color: 'negative'
  //   })
  // }
  // if(actions.length) {
  //   columns.push({
  //     align: 'left',
  //     label: 'Actions',
  //     field: 'actions',
  //     name: 'actions'
  //   })
  // }
  return {
    columns: columns,
    actions: actions
  }
})