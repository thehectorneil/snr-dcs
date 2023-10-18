import { defineStore } from 'pinia'
import { ref } from 'vue'
/**
 * Functional Base
 * @param { Boolean } persist will store data in localStorage
 */
export const commonStore = defineStore('common', () => {
  const dialog = ref(false)
  const setDialog = (bool = false) => {
    dialog.value = bool
  }
  return {
    dialog,
    setDialog
  }
})
