import { computed } from 'vue'
import Helpers from 'src/helpers'
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
      label: 'Last Name',
      name: 'lastName',
      field: row => row.lastName,
      format: val => `${val}`,
      sortable: false,
      required: true
    },
    {
      align: 'left',
      label: 'First Name',
      name: 'firstName',
      field: row => row.firstName,
      format: val => `${val}`,
      sortable: false,
      required: true
    },
    {
      align: 'left',
      label: 'Date Registered',
      name: 'dateReg',
      field: row => row.dateReg,
      format: val => `${val}`,
      sortable: false,
      required: true
    },
    {
      align: 'center',
      label: 'Status',
      name: 'stats',
      field: row => row.stats,
      format: val => `${val}`,
      sortable: false,
      required: true
    },
    {
      align: 'left',
      label: 'Registration Status',
      name: 'regStatus',
      field: row => row.regStatus,
      format: val => `${val}`,
      sortable: false,
      required: true
    },
    {
      align: 'left',
      label: 'Valid Until',
      name: 'expDate',
      field: row => row.expDate,
      format: val => `${val}`,
      sortable: false,
      required: true
    },
    {
      align: 'center',
      label: 'Volume Shopper',
      name: 'volumeShopper',
      field: row => row.volumeShopper,
      format: val => `${val}`,
      sortable: false,
      required: true
    },
    {
      align: 'center',
      label: 'Member Type',
      name: 'memberType',
      field: row => row.memberType,
      format: val => `${val}`,
      sortable: false,
      required: true
    }
  ]
  const tableActions = []
  const headerActions = []
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