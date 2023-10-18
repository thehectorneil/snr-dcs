<template>
  <q-drawer
    side="left"
    show-if-above
    :width="250"
    :breakpoint="500"
    bordered
    class="bg-white">
    <q-scroll-area class="fit">
      <MenuList :data="auth.profile.modules"/>
    </q-scroll-area>
  </q-drawer>
</template>
<script setup>
import { ref } from 'vue'
import MenuList from './menu-list'
import { authStore } from 'src/stores/auth'
const auth = authStore()
const leftDrawerOpen = ref(false)
const toggleLeftDrawer = () => leftDrawerOpen.value = !leftDrawerOpen.value
</script>