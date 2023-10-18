/* eslint-disable */
export default function () {
  const checkInputRequirements = ({ ...item }) => {
    const min = item.min || 0
    const max = item.max || 0
    const value = item.value || ''
    const regExPaste = item.regExPaste || ''
    const email = item.email || false
    const required = item.required || false
    const isObject = item.value.constructor === Object
    const isArray = item.value.constructor === Array
    let input = { error: false, msg: '' }
    if (!value && required) {
      input.error = true
      input.msg = 'Please provide input on required information.'
    } else if (value && min && value.length < min) {
      input.error = true
      input.msg = `Must be minimum of ${min} character(s) long`
    } else if (value && regExPaste && !regExPaste.test(value)) {
      input.error = true
      input.msg = 'Invalid character is inputted!'
    } else if (value && email && !isEmailValid(value)) {
      input.error = true
      input.msg = 'The email format is incorrect.'
    } else if (value && max && value.length > max) {
      input.error = true
      input.msg = `Must be maximum of ${max} character(s) long`
    } else if (isObject && required && !value.id) {
      input.error = true
      input.msg = 'Please provide input on required information.'
    } else if (isArray && required && !value.length) {
      input.error = true
      input.msg = 'Please provide input on required information.'
    }
    return input
  }

  const validateInput = ({ ...form }, field) => {
    Object.keys(form).forEach(index => {
      const item = form[index]
      if (index === field) Object.assign(item, checkInputRequirements(item))
    })
  }

  const isFormValid = (form) => {
    let valid = true
    Object.keys(form).forEach(index => {
      let item = form[index]
      validateInput(form, index)
      if(item.error) valid = false
    })
    return valid
  }

  const isSubmit = (form) => {
    let valid = true
    Object.keys(form).forEach(index => {
      let item = form[index]
      const min = item.min || 0
      const max = item.max || 0
      const value = item.value || ''
      const regExPaste = item.regExPaste || ''
      const email = item.email || false
      const required = item.required || false
      const isObject = item.value.constructor === Object
      const isArray = item.value.constructor === Array
      if (!value && required) {
        valid = false
      } else if (value && min && value.length < min) {
        valid = false
      } else if (value && regExPaste && !regExPaste.test(value)) {
        valid = false
      } else if (value && email && !isEmailValid(value)) {
        valid = false
      } else if (value && max && value.length > max) {
        valid = false
      } else if (isObject && required && !value.id) {
        valid = false
      } else if (isArray && required && !value.length) {
        valid = false
      }
    })
    return valid
  }

  const isEmailValid = (val) => /^([a-zA-Z0-9](.[a-zA-Z0-9._-]*[a-zA-Z0-9]))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val)

  /**
   * Will check input value via @keypress or @paste
   * Will fire event prevent default if the length condition is true @param length
   * @param { * } event
   * @param { string } regEx value
   */
  const validateKeypressChar = (event, regEx) => {
    if (!regEx) return
    let key = window.event ? event.keyCode : event.which
    key = String.fromCharCode(key)
    const newRegEx = new RegExp(regEx)
    console.log(newRegEx.test(key))
    if (!newRegEx.test(key)) event.preventDefault()
  }
  const resetForm = ({ ...form }) => {
    Object.keys(form).forEach(index => {
      form[index].value = ''
      form[index].error = false
      form[index].msg = ''
    })
    return form
  }
  const initPage = (args) => {
    return (1, args.rowsPerPage, args.sortBy, args.descending)
  }
  return {
    validateInput,
    isFormValid,
    validateKeypressChar,
    isSubmit,
    resetForm,
    isEmailValid,
    maxValLength: (val, len) => (val || '').length <= len,
    minValLength: (val, len) => (val || '').length >= len,
    containUpperCase: (val) => /(?=.*[A-Z])/.test(val),
    containLowerCase: (val) => /(?=.*[a-z])/.test(val),
    containNumber: (val) => /(?=.*[0-9])/.test(val),
    containSpecialChar: (val) => /[-!@$#%^&*()_+|~=`{}\[\]:";'<>?,.\\/]/.test(val),
    twoIdenticalChar: (val) => /^(([a-zA-Z0-9-!@$#%^&*()_+|~=`{}\[\]:";'<>?,.\\/])\2?(?!\2))+$/.test(val),
    initPage,
    validatePasteValue: (value) => value.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '')
  }
}
