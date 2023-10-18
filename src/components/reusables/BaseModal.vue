<template>
<q-dialog
  v-model="toggle"
  transition-show="slide-up"
  transition-hide="slide-down"
  persistent>
  <q-card
    :style="{
      'width': '100%',
      'max-width': maxWidth
    }"
    class="card q-pa-md">
    <q-card-section>
      <slot name="body" />
    </q-card-section>
    <q-card-actions>
      <slot name="action" />
    </q-card-actions>
  </q-card>
</q-dialog>
</template>
<script setup>
import { ref } from 'vue'
const toggle = ref(true)
defineProps({
  maxWidth: {
    type: String,
    default: '40%'
  }
})
</script>