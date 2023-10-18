<template>
<div class="row">
  <div class="col-12 col-sm-12 col-md-8 col-lg-8">
    <q-img  src="~/src/assets/snr-home-logo.png" />
  </div>
  <div class="col-12 col-sm-12 col-md-4 col-lg-4 self-center">
    <div class="login-wrapper">
      <div class="col-12 col-sm-12 col-md-12 col-lg-12 q-mt-md text-center">
        <q-avatar
          rounded
          color="grey-9"
          size="100px"
          font-size="15px"
          text-color="white">
          LOGO
        </q-avatar>
      </div>
      <div class="col-12 col-sm-12 col-md-8 col-lg-8 q-mt-lg">
        <BaseInlineError
          v-if="errorMsg"
          :msg="errorMsg"/>
        <BaseInput
          class="q-mt-md"
          label="Email Address"
          :outlined="true"
          v-model="form.email.value"
          :errors="form.email"
          :max="form.email.max"
          @update:model-value="validateInput(form, 'email')"
          @blur="form.email.value = validatePasteValue(form.email.value), validateInput(form, 'email')">
        </BaseInput>
        <BaseInput
          label="Password"
          :outlined="true"
          :type="isPwd ? 'password' : 'text'"
          v-model="form.password.value"
          :errors="form.password"
          :max="form.password.max"
          @update:model-value="validateInput(form, 'password')"
          @blur="form.password.value = validatePasteValue(form.password.value), validateInput(form, 'password')">
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </BaseInput>
      </div> 
      <div class="col-12 col-sm-12 col-md-12 col-lg-12 q-mt-xs">
        <q-checkbox
          right-label
          v-model="form.isRememberMe.value"
          color="primary"
          label="Remember Me"/>
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-12 q-mt-lg">
        <q-btn
          :disable="!isSubmit(form)"
          :color="!isSubmit(form) ? 'grey-6' : 'primary'"
          unelevated
          class="full-width"
          no-caps
          label="Login"
          :loading="loading"
          @click="submit"/>
      </div>
      <div class="col-6 col-sm-6 col-md-6 col-lg-6 q-mt-xs text-center q-mt-lg">
        <BaseLink title="Forgot Password?" />
      </div>
    </div>
  </div>
</div>
</template>
<script setup>
import { computed, onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseInput from 'src/components/reusables/BaseInput'
import BaseLink from 'src/components/reusables/BaseLink'
import BaseInlineError from 'src/components/reusables/BaseInlineError'
import Helpers from 'src/helpers'
import Dummy from 'src/helpers/dummy'
import { authStore } from 'src/stores/auth'
const auth = authStore()
const router = useRouter()
const { api, validateInput, isFormValid, validatePasteValue, isSubmit } = Helpers()
const { modules } = Dummy()
const isPwd = ref(true)
const image = ref(require('src/assets/snr-home-logo.png'))
const errorMsg = ref('')
const loading = ref(false)
const form = ref({
  email: {
    value: '',
    email: true,
    required: true,
    max: 50
  },
  password: {
    value: '',
    required: true,
    max: 50
  },
  isRememberMe: { value: false }
})

onBeforeMount(() => {
  if (process.env.NODE_ENV === 'development') {
    form.value.email.value = 'jocumen@yondu.com'
    form.value.password.value = 'MbVHgRf3'
  }
  if (auth.credentials.isRememberMe) {
    form.value.email.value = auth.credentials.email
    form.value.password.value = auth.credentials.password
    form.value.isRememberMe.value = auth.credentials.isRememberMe
  }
  if (auth.profile.token) router.push({ path: '/admin/linked-members' })
})
const submit = async () => {
  if (!isFormValid(form.value)) return
  loading.value = true
  const response = await api({
    method: 'POST',
    url: '/cms-service/user/login',
    data: {
      email: form.value.email.value,
      password: form.value.password.value
    }
  })
  loading.value = false
  if (!response.ok) {
    const errMsg = response.error.data.error_parameters
    errorMsg.value = `${errMsg.title}: ${errMsg.message}`
    return
  }
  const result = response.data.data
  auth.setProfile({
    token: result.token,
    firstName: result.first_name,
    lastName: result.last_name,
    modules: modules
  })
  auth.setCredentials({
    isRememberMe: form.value.isRememberMe.value,
    email: form.value.email.value,
    password: form.value.password.value
  })
  router.push({ path: '/admin/linked-members' })
}
</script>
<style lang="scss" scoped>
.login-wrapper {
  width: 80%;
  margin: auto;
}
.error-color {
  border: 1px solid #e15141b3;
  border-radius: 5px;
  color: #e15141b3;
  background-color: #E151411A;
  margin: auto;
  padding: 10px;
}
</style>