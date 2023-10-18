<template>
<div class="q-pb-md">
  <div
    class="bg-white q-pa-lg row col-12 col-sm-12 col-md-12 col-lg-12">
    <div class="row col-6 col-sm-6 col-md-6 col-lg-6">
      <q-btn
        v-if="isBackBtn"
        flat
        icon="keyboard_backspace"
        @click="$router.go(-1)"/>
      <div class="title">{{title}}</div>
    </div>
    <div
      v-if="!isHeaderActions"
      class="col-6 col-sm-6 col-md-6 col-lg-6 text-right">
      <q-btn
        v-for="(item, index) in headerActions"
        :key="index"
        @click="$emit('header-action', item)"
        class="q-ml-xs"        
        no-caps
        :icon="item.icon"
        :color="item.color"
        :disable="item.disable"
        :label="item.label"
        unelevated />
    </div>
    <slot v-else name="header-actions" />
  </div>
  <q-card class="my-card q-ma-lg">
  <slot name="notif_banner" />
    <slot name="body" />
  </q-card>
</div>
</template>
<script setup>
const props = defineProps({
  title: String,
  headerActions: Array,
  isBackBtn: Boolean,
  isHeaderActions: {
    type: Boolean,
    default: false
  }
})
</script>
<style scoped>
.title {
  font-size: 18px;
  color: black;
  font-weight: bold;
  margin-top: 5px;
}
</style>