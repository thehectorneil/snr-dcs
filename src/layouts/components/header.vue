<template>
  <q-header
    elevated
    class="bg-white q-pa-sm">
    <q-toolbar>
      <q-avatar
        rounded
        color="primary"
        text-color="white">
        L
      </q-avatar>
      <span class="title text-bold q-ml-md">LOGO NAME</span>
      <q-space />
      <div class="text-grey q-pb-xs">
        <BaseMenu
          icon="account_circle"
          theme="primary"
          :title="`${auth.profile.firstName} ${auth.profile.lastName}`"
          :data="menuList"
          @action="headerAction"/>
      </div>
    </q-toolbar>
  </q-header>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authStore } from 'src/stores/auth'
import Helpers from 'src/helpers'
import BaseMenu from 'src/components/reusables/BaseMenu'
const router = useRouter()
const auth = authStore()
const { api, notification } = Helpers()
const menuList = ref([
  { id: 1, name: 'Change Password' },
  { id: 2, name: 'Logout' }
])
const headerAction = async (params) => {
  if (params.id === 1) {
    router.push('/admin/change-password')
    return
  }
  const response = await api({
    method: 'POST',
    url: '/cms-service/user/logout',
  })
  if (response.ok) {
    notification({
      type: 'positive',
      msg: 'Successfully Logged Out.'
    })
    router.push('/admin/login')
  }
}
</script>
<style scoped>
.title {
  color: #1B3564 !important;
}
</style>