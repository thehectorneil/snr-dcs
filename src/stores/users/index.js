import { defineStore } from 'pinia'
import { ref } from 'vue'
/**
 * Functional Base
 * @param { Boolean } persist will store data in localStorage
 */
export const useSelectedUser = defineStore('user', () => {
  const userData = ref({
    user_id: '',
    status: '',
    email:'',
    full_name:''
  })
  const setUser = ({...data}) =>  {
    console.log(data)
    userData.value = data || userData.value
  }
  return {
    userData,
    setUser,
  }
}, { persist: true })