import moment from 'moment'
import { computed } from 'vue'
import { exportFile } from 'quasar'
import { authStore } from 'src/stores/auth'
import { useRoute } from 'vue-router'
export default function () {
  const currency = (amount) => {
    let formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'PHP'
    })
    return formatter.format(parseFloat(amount))
  }
  const downloadCsv = (data = null, name) => {
    console.log(name)
    const fileURL = window.URL.createObjectURL(new Blob([data]))
    const fileLink = document.createElement('a')
    fileLink.href = fileURL
    fileLink.setAttribute('download', name+'_'+moment().format('MMDDYYYY')+'.csv')
    document.body.appendChild(fileLink)
    fileLink.click()
  }
  /**
   * Date converter and formatter
   * Please visit this link for more formats
   * https://momentjs.com/
   * @param {*} date 
   * @param {*} format 
   * @returns date string
  */
  const newDate = (date = '',  format = 'MMM D, YYYY h:mm A') => {
    const isTimeStamp = new Date(date).getTime() > 0
    const newDate = moment(isTimeStamp
      ? new Date(date)
      : new Date(parseInt(date))).format(format)
    return newDate === 'Invalid date' ? '-' : newDate
  }

  const capitalize = (string) => {
    const name = string.toLowerCase()
    return name.charAt(0).toUpperCase() + name.slice(1)
  }

  const exportTableData = (columns, data) => {
    // naive encoding to csv format
    const content = [columns.map(col => wrapCsvValue(col.label))].concat(
      data.map(row => columns.map(col => wrapCsvValue(
        typeof col.field === 'function'
          ? col.field(row)
          : row[ col.field === void 0 ? col.name : col.field ],
        col.format,
        row
      )).join(','))
    ).join('\r\n')
  
    const status = exportFile('users.csv', content, 'text/csv')
    if (!status) {
      $q.notify({
        message: 'Browser denied file download...',
        color: 'negative',
        icon: 'warning'
      })
    }
  }
  const wrapCsvValue = (val, formatFn, row) => {
    let formatted = formatFn !== void 0
      ? formatFn(val, row)
      : val
    formatted = formatted === void 0 || formatted === null
      ? ''
      : String(formatted)
    formatted = formatted.split('"').join('""')
    return `"${formatted}"`
  }
  /**
   * User Module permissions setter
   * Get the modules and sub modules from @AuthStore
   * Module level 3
   * @const { Object } permission
   * Sample Return
   * @permission = {
   *  create: true,
   *  read: true,
   *  update: true,
   *  delete: true
   * }
   */
  const permissions = computed(() => {
    const auth = authStore()
    const route = useRoute()
    const permission = {}
    let module = []
    if (!auth.profile.modules) return permission
    auth.profile.modules.filter(parent => {
      parent.submodule.filter(child => {
        if(child.sub_module_name === route.name) module = child.action
        if(child.hasOwnProperty('module')) {
          child.module.filter(grandChild => {
            if(grandChild.sub_module_name === route.name) module = grandChild.action
          })
        }
      })
    })
    module.map(item => {
      let key = item.name.toLowerCase()
      Object.assign(permission, {
        [key]: item.value
      })
    })
    return permission
  })
  const stringLimit = (string, length, charLimit = 50) => {
    charLimit = !length ? charLimit : length
    if (string.length >= charLimit) {
      return string.slice(0, charLimit) + ' ....'
    }
    return string
  }
  const getStatusColor = (param, type = 'card status') => {
    if(type === 'card status') {
      const status = param === 'Active'
        ? 'positive'
        : param === 'Expired'
          ? 'orange'
          : param === 'Blocked'
          ? 'negative'
          : 'grey'
      return param === null
        ? '--|grey'
        : `${param}|${status}`
    }
    const status = param === 'Linked'
        ? 'positive'
        : param === 'pending'
          ? 'orange'
          : param === 'active'
           ? 'positive'
           : param === 'inactive'
            ? 'grey'
            : param === 'Time Out'
              ? 'grey'
              :'orange'
    return param === null
        ? '--|grey'
        : `${param}|${status}`
  }
  return {
    currency,
    newDate,
    capitalize,
    exportTableData,
    permissions,
    stringLimit,
    getStatusColor,
    downloadCsv
  }
}
