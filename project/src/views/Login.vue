<template>
  <div class="row-center-align-center">
    <form @submit="handleSubmit($event)">
      <fieldset>
        <legend>LOGIN</legend>
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label" for="username">Username</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input class="input" id="username"
                       type="text"
                       :class="{ 'is-danger': hasUserNameError }"
                       :value="userName"
                       @input="handleUserNameInput($event)">
              </div>
              <div class="help is-danger" v-if="hasUserNameError">
                {{firstUserNameError}}!!!
              </div>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label" for="password">Password</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input class="input" id="password"
                       type="text"
                       :class="{ 'is-danger': hasPasswordError }"
                       :value="password"
                       @input="handlePasswordInput($event)">
              </div>
              <div class="help is-danger" v-if="hasPasswordError">
                {{firstPasswordError}}!!!
              </div>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label" for="phone">Phone</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input class="input" id="phone"
                       type="text"
                       :class="{ 'is-danger': hasPhoneError }"
                       :value="phone"
                       @input="handlePhoneInput($event)">
              </div>
              <div class="help is-danger" v-if="hasPhoneError">
                {{firstPhoneError}}!!!
              </div>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label" for="email">Email</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input class="input" id="email"
                       type="text"
                       :class="{ 'is-danger': hasEmailError }"
                       :value="email"
                       @input="handleEmailInput($event)">
              </div>
              <div class="help is-danger" v-if="hasEmailError">
                {{firstEmailError}}!!!
              </div>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label" for="serial">Serial</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input class="input" id="serial"
                       type="text"
                       :class="{ 'is-danger': hasSerialNumberError }"
                       :value="serialNumber"
                       @input="handleSerialNumberInput($event)">
              </div>
              <div class="help is-danger" v-if="hasSerialNumberError">
                {{firstSerialNumberError}}!!!
              </div>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label" for="price">Price</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input class="input" id="price"
                       type="text"
                       :class="{ 'is-danger': hasPriceError }"
                       :value="price"
                       @input="handlePriceInput($event)">
              </div>
              <div class="help is-danger" v-if="hasPriceError">
                {{firstPriceError}}!!!
              </div>
            </div>
          </div>
        </div>
        <div class="field is-grouped is-grouped-centered">
          <p class="control">
            <button type="submit" class="button is-primary" :disabled="isSubmitDisabled">SUBMIT</button>
          </p>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script>
  import {VALIDATION_TYPE, ERROR_KEY, createError, handleError, validateFloat, validatePhoneNumber, validateInteger, validateEmail} from '../utils/validation'

  const USER_NAME_ERROR = 'USER_NAME_ERROR'
  const USER_NAME_MESSAGES_MAP = {
    [VALIDATION_TYPE.REQUIRED]: 'Необходимо ввести имя пользователя',
    [VALIDATION_TYPE.MAX_LENGTH]: 'Максимальное число символов не должно превышать 5'
  }

  const PASSWORD_ERROR = 'PASSWORD_ERROR'
  const PASSWORD_MESSAGES_MAP = {
    [VALIDATION_TYPE.REQUIRED]: 'Необходимо ввести пароль',
  }

  const PHONE_ERROR = 'PHONE_ERROR'
  const PHONE_MESSAGES_MAP = {
    [VALIDATION_TYPE.NOT_PHONE]: 'Неверный номер телефона',
  }

  const EMAIL_ERROR = 'EMAIL_ERROR'
  const EMAIL_MESSAGES_MAP = {
    [VALIDATION_TYPE.NOT_EMAIL]: 'Неверный адрес email',
  }

  const SERIAL_NUMBER_ERROR = 'SERIAL_NUMBER_ERROR'
  const SERIAL_NUMBER_MESSAGES_MAP = {
    [VALIDATION_TYPE.NOT_INTEGER]: 'Неверный серийный номер',
  }

  const PRICE_ERROR = 'PRICE_ERROR'
  const PRICE_MESSAGES_MAP = {
    [VALIDATION_TYPE.NOT_FLOAT]: 'Необходимо ввести целочисленное значение',
  }

  export default {
    name: 'Login',
    data () {
      return {
        userName: '',
        password: '',
        phone: '',
        email: '',
        serialNumber: '',
        price: '',
        errors: [
          // {
          //   name: 'username',
          //   type: VALIDATION_TYPE.REQUIRED
          // }, {
          //   name: 'username',
          //   type: VALIDATION_TYPE.MAX_LENGTH
          // }, {
          //   name: 'password',
          //   type: VALIDATION_TYPE.REQUIRED
          // }
        ],
      }
    },
    computed: {
      isSubmitDisabled () {
        return Boolean(this.errors.length)
      },
      userNameErrors () {
        return this.errors.filter(err => err[ERROR_KEY.NAME] === USER_NAME_ERROR)
      },
      hasUserNameError () {
        return Boolean(this.userNameErrors.length)
      },
      firstUserNameError () {
        if (this.hasUserNameError) {
          const error = this.userNameErrors[0]
          return USER_NAME_MESSAGES_MAP[error[ERROR_KEY.TYPE]]
        }
        return ''
      },
      passwordErrors () {
        return this.errors.filter(err => err[ERROR_KEY.NAME] === PASSWORD_ERROR)
      },
      hasPasswordError () {
        return Boolean(this.passwordErrors.length)
      },
      firstPasswordError () {
        if (this.hasPasswordError) {
          const error = this.passwordErrors[0]
          return PASSWORD_MESSAGES_MAP[error[ERROR_KEY.TYPE]]
        }
        return ''
      },
      phoneErrors () {
        return this.errors.filter(err => err[ERROR_KEY.NAME] === PHONE_ERROR)
      },
      hasPhoneError () {
        return Boolean(this.phoneErrors.length)
      },
      firstPhoneError () {
        if (this.hasPhoneError) {
          const error = this.phoneErrors[0]
          return PHONE_MESSAGES_MAP[error[ERROR_KEY.TYPE]]
        }
        return ''
      },
      emailErrors () {
        return this.errors.filter(err => err[ERROR_KEY.NAME] === EMAIL_ERROR)
      },
      hasEmailError () {
        return Boolean(this.emailErrors.length)
      },
      firstEmailError () {
        if (this.hasEmailError) {
          const error = this.emailErrors[0]
          return EMAIL_MESSAGES_MAP[error[ERROR_KEY.TYPE]]
        }
        return ''
      },
      serialNumberErrors () {
        return this.errors.filter(err => err[ERROR_KEY.NAME] === SERIAL_NUMBER_ERROR)
      },
      hasSerialNumberError () {
        return Boolean(this.serialNumberErrors.length)
      },
      firstSerialNumberError () {
        if (this.hasSerialNumberError) {
          const error = this.serialNumberErrors[0]
          return SERIAL_NUMBER_MESSAGES_MAP[error[ERROR_KEY.TYPE]]
        }
        return ''
      },
      priceErrors () {
        return this.errors.filter(err => err[ERROR_KEY.NAME] === PRICE_ERROR)
      },
      hasPriceError () {
        return Boolean(this.priceErrors.length)
      },
      firstPriceError () {
        if (this.hasPriceError) {
          const error = this.priceErrors[0]
          return PRICE_MESSAGES_MAP[error[ERROR_KEY.TYPE]]
        }
        return ''
      },
    },
    methods: {
      handleSubmit (e) {
        console.log('handleSubmit')
        e.preventDefault()
        this.forceValidation()
        if (!this.isSubmitDisabled) { // errors.length
          console.log('DONE')
          // serialize JS
          // send data
        }
      },
      forceValidation () {
        this.validateUserName(this.userName)
        this.validatePassword(this.password)
        this.validatePrice(this.price)
        this.validatePhone(this.phone)
        this.validateEmail(this.email)
        this.validateSerialNumber(this.serialNumber)
      },
      handleUserNameInput (e) {
        this.userName = e.target.value
        this.validateUserName(this.userName)
      },
      validateUserName (value) {
        handleError(
          !value,
          this.errors,
          createError(USER_NAME_ERROR, VALIDATION_TYPE.REQUIRED)
        )
        handleError(
          value && value.length > 5,
          this.errors,
          createError(USER_NAME_ERROR, VALIDATION_TYPE.MAX_LENGTH)
        )
      },
      handlePasswordInput (e) {
        this.password = e.target.value
        this.validatePassword(this.password)
      },
      validatePassword (value) {
        handleError(
          !value,
          this.errors,
          createError(PASSWORD_ERROR, VALIDATION_TYPE.REQUIRED)
        )
      },
      handlePriceInput (e) {
        this.price = e.target.value
        this.validatePrice(this.price)
      },
      validatePrice (value) {
        handleError(
          value && !validateFloat(value),
          this.errors,
          createError(PRICE_ERROR, VALIDATION_TYPE.NOT_FLOAT)
        )
      },
      handlePhoneInput (e) {
        this.phone = e.target.value
        this.validatePhone(this.phone)
      },
      validatePhone (value) {
        handleError(
          value && !validatePhoneNumber(value),
          this.errors,
          createError(PHONE_ERROR, VALIDATION_TYPE.NOT_PHONE)
        )
      },
      handleEmailInput (e) {
        this.email = e.target.value
        this.validateEmail(this.email)
      },
      validateEmail (value) {
        handleError(
          value && !validateEmail(value),
          this.errors,
          createError(EMAIL_ERROR, VALIDATION_TYPE.NOT_EMAIL)
        )
      },
      handleSerialNumberInput (e) {
        this.serialNumber = e.target.value
        this.validateSerialNumber(this.serialNumber)
      },
      validateSerialNumber (value) {
        handleError(
          value && !validateInteger(value),
          this.errors,
          createError(SERIAL_NUMBER_ERROR, VALIDATION_TYPE.NOT_INTEGER)
        )
      },
    }
  }
</script>

<style scoped lang="sass">
  @import "~bulma/sass/utilities/initial-variables"

  .row-center-align-center
    display: flex
    flex-direction: row
    justify-content: center
    align-items: center
    width: 100vw
    height: 100vh

  $control-border-width: 1px
  $control-padding-vertical: calc(0.375em - #{$control-border-width})
  $control-padding-horizontal: calc(0.625em - #{$control-border-width})

  fieldset
    border-radius: $radius
    padding-bottom: $control-padding-vertical
    padding-left: $control-padding-horizontal
    padding-right: $control-padding-horizontal
    padding-top: $control-padding-vertical

  .is-danger
    animation: shake .6s linear

  @-webkit-keyframes shake
    0%
      left: -10px
    16%
      left: 9px
    33%
      left: -6px
    50%
      left: 5px
    66%
      left: -2px
    83%
      left: 1px
    100%
      left: 0px
</style>