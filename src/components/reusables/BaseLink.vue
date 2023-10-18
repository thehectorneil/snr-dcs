<template>
<span
  class="text-link"
  @click="$router.push(route)">
  {{ title }}
</span>
</template>
<script setup>
const props = defineProps({
	route: String,
  title: String
})
</script>
<style lang="scss" scoped>
.text-link {
  color: #1B3564;
  cursor: pointer;
  // text-decoration: underline;
}
</style>