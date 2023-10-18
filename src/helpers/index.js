import Alert from './alert'
import Common from './common'
import Validator from './validator'
export default function () {
  const {
    validateInput,
    isFormValid,
    validateKeypressChar,
    validatePasteValue,
    isSubmit,
    resetForm,
    isEmailValid,
    maxValLength,
    minValLength,
    containUpperCase,
    containLowerCase,
    containNumber,
    containSpecialChar,
    twoIdenticalChar,
    initPage
  } = Validator()
  const {
    api,
    notification,
    showDialog,
  } = Alert()
  const {
    currency,
    newDate,
    capitalize,
    exportTableData,
    permissions,
    stringLimit,
    getStatusColor,
    downloadCsv
  } = Common()
  return {
    api,
    notification,
    showDialog,
    validateInput,
    isFormValid,
    validateKeypressChar,
    validatePasteValue,
    isSubmit,
    resetForm,
    isEmailValid,
    maxValLength,
    minValLength,
    containUpperCase,
    containLowerCase,
    containNumber,
    containSpecialChar,
    twoIdenticalChar,
    initPage,
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
