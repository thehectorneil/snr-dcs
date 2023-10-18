<template>
<div>
  <p class="text-weight-medium">
    {{ title }}
    <span
      v-if="indicator"
      class="text-red-8">
      *
    </span>
  </p>
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
