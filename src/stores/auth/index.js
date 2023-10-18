import { defineStore } from 'pinia'
import { ref } from 'vue'
/**
 * Functional Base
 * @param { Boolean } persist will store data in localStorage
 */
export const authStore = defineStore('auth', () => {
  const profile = ref({
    token: '',
    firstName: '',
    lastName: '',
    panelView: '',
    modules: []
  })
  const credentials = ref({
    isRememberMe: false,
    email: '',
    password: ''
  })
  const setProfile = ({...data}) =>  {
    profile.value = data || {}
  }
  const setCredentials = ({...data}) =>  {
    credentials.value.isRememberMe = data.isRememberMe
    credentials.value.email = data.email
    credentials.value.password = data.password
  }

  return {
    profile,
    setProfile,
    credentials,
    setCredentials
  }
}, { persist: true })
