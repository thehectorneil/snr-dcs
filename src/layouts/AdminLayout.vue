<template>
<q-layout view="hHh Lpr fFf">
  <Header v-if="isLoggin"/>
  <Navigation v-if="isLoggin"/>
  <q-page-container>
    <q-page class="bg-grey-3">
      <router-view />
    </q-page>
  </q-page-container>
</q-layout>
</template>
<script setup>
  import { computed, watch } from 'vue'
  import Header from './components/header'
  import Navigation from './components/navigation'
  import Dialog from 'src/components/reusables/BaseModal'
  import { commonStore } from 'src/stores/common'
  import { authStore } from 'src/stores/auth'
  import Helpers from 'src/helpers'
  const { showDialog } = Helpers()
  const common = commonStore()
  const auth = authStore()
  watch(() => common.dialog, async (val) => {
    if(val) {
    await showDialog({
      title: `Confirm`,
      msg: `Your permission access has been updated. We will log off your account to apply the changes.`,
      color: 'primary',
      okLabel: 'OK'
    })
    common.setDialog(false)
    }
  })
  const isLoggin = computed(() => { return auth.profile.token })
</script>
