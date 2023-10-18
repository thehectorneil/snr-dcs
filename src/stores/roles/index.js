import { defineStore } from 'pinia'
import { ref } from 'vue'
/**
 * Functional Base
 * @param { Boolean } persist will store data in localStorage
 */
export const useSelectedRole = defineStore('role', () => {
  const profile = ref({
    role_id: '',
    role_name: '',
    status: ''
  })
  const setRole = ({...data}) =>  {
    console.log(data)
    profile.value = data || profile.value
  }
  return {
    profile,
    setRole,
  }
}, { persist: true })
