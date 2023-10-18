<template>
  <div class="error-color">
    {{ msg }}
  </div>
</template>
<script setup>
defineProps({
	msg: String,
  show: Boolean
})
</script>