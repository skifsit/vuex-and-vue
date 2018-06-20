const VALIDATION_TYPE = {
  REQUIRED: 'REQUIRED',
  MAX_LENGTH: 'MAX_LENGTH',
  NOT_FLOAT: 'NOT_FLOAT',
  NOT_INTEGER: 'NOT_INTEGER',
  NOT_EMAIL: 'NOT_EMAIL',
  NOT_PHONE: 'NOT_PHONE',
}

const ERROR_KEY ={
  NAME: 'name',
  TYPE: 'type'
}

function createError (name, type) {
  return{
    [ERROR_KEY.NAME]: name,
    [ERROR_KEY.TYPE]: type,
  }
}

function handleError (invalid, errors, error) {
  let index = errors.findIndex(err =>
    err[ERROR_KEY.NAME] === error[ERROR_KEY.NAME] &&
    err[ERROR_KEY.TYPE] === error[ERROR_KEY.TYPE])
  let notFound = index === -1
  let found = !notFound
  if (invalid) {
    if (notFound) {
      errors.unshift(error)
    }
  } else {
    if (found) {
      errors.splice(index, 1)
    }
  }
}

const integerRegExp = /^$|^[+-]?\d+$/
function validateInteger (value) {
  integerRegExp.lastIndex = 0
  return integerRegExp.test(value)
}

const floatRegExp = /^$|^[+-]?\d+(\.\d+)?$/
function validateFloat (value) {
  floatRegExp.lastIndex = 0
  return floatRegExp.test(value)
}

const phoneNumberRegExp = /^\+?[0-9]{7,15}$/
function validatePhoneNumber (value) {
  phoneNumberRegExp.lastIndex = 0
  return phoneNumberRegExp.test(value)
}

const emailRegExp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
function validateEmail (value) {
  emailRegExp.lastIndex = 0
  return emailRegExp.test(value)
}

export {VALIDATION_TYPE, ERROR_KEY, createError, handleError, validateInteger, validateFloat, validatePhoneNumber, validateEmail}