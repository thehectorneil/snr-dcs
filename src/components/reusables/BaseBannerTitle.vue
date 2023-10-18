<template>
  <q-banner>
    <div class="text-subtitle1 text-black text-weight-medium">{{ props.title }}</div>
  </q-banner>
  <q-separator></q-separator>
</template>
<script setup>
const props = defineProps(['title'])
</script>