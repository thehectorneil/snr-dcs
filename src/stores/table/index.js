import { defineStore } from 'pinia'
import { ref } from 'vue'
/**
 * Functional Base
 * @param { Boolean } persist will store data in localStorage
 */
export const table = defineStore('table', () => {
    
  const pagination = ref({
    page: 1,
    rowsPerPage: 10,
    rowsNumber: 0,
    data: [],
    sortBy: 'id',
    descending: true,
  })

  const setPagination = ({...data}) => {
    pagination.value.page = data.current_page
    pagination.value.rowsPerPage = data.per_page
    pagination.value.rowsNumber = data.total
    pagination.value.data = data.data
    // pagination.value.sortBy = data.sortBy
    // pagination.value.descending = data.descending

    console.log(data)
    
  }
  
  return {
    pagination,
    setPagination
  }
})