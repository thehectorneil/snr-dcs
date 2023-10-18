import { computed } from 'vue'
import moment from 'moment'
// import Helpers from 'src/helpers'
export const tableAttr = computed(() => {
  // const { permissions } = Helpers()
  // const permission = permissions.value
  let columns = [
    {
      align: 'left',
      label: 'Image',
      name: 'image',
      field: row => row.image,
      format: val => `${val}`,
      sortable: false,
      required: true
    },
    {
      align: 'left',
      label: 'Card Title',
      name: 'card_title',
      field: row => row.card_title,
      format: val => `${val}`,
      sortable: false,
      required: true
    },
    {
      align: 'left',
      label: 'Status',
      name: 'switch',
      field: row => row.status,
      format: val => `${val}`,
      sortable: false,
      required: true
    },

    {
      align: 'left',
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
    }
  ]

  return {
    columns: columns,
    actions: actions
  }
})