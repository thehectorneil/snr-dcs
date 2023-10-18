<template>
<div>
  <div class="text-weight-regular q-mb-xs">
    {{ title }}
    <span
      v-if="indicator"
      class="text-red-8">
      *
    </span>
  </div>
</div>
</template>
<script setup>
defineProps({
	title: String,
  indicator: {
    type: Boolean,
    default: false
  }
})
</script>
