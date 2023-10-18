import { computed } from 'vue'
// import Helpers from 'src/helpers'
export const tableAttr = computed(() => {
  // const { permissions } = Helpers()
  // const permission = permissions.value
  let columns = [
    {
      align: 'left',
      label: 'Club Code',
      name: 'club_code',
      field: row => row.club_code,
      format: val => `${val}`,
      sortable: false,
      required: true
    },
    {
      align: 'center',
      label: 'Club Name',
      name: 'club_name',
      field: row => row.club_name,
      format: val => `${val}`,
      sortable: false,
      required: true
    },
    {
      align: 'center',
      label: 'Club City',
      name: 'city_name',
      field: row => row.city_name,
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
      icon: 'edit',
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