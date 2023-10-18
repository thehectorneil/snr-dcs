import { computed } from 'vue'
import Helpers from 'src/helpers'
export const tableAttr = computed(() => {
  const { permissions } = Helpers()
  const permission = permissions.value
  
  const headerActions = []

  headerActions.push({
    type: 'cancel',
    color: 'grey-2 text-black',
    label: 'Cancel',
    path: '/admin/door-greeter',
    disable: false
  })

//   if(permission.create) {
    headerActions.push({
      type: 'create',
      color: 'primary',
      label: 'Save',
      path: '/admin/door-greeters/add',
      disable: true
    })
//   }


  return {
    headerActions: headerActions
  }
})