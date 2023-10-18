<template>
  <q-btn-dropdown
    flat
    round
    no-caps
    :label="title"
    :icon="icon"
    :color="theme">
    <q-list>
      <q-item
        tag="label"
        v-ripple
        v-for="(item, index) in data"
        :key="index"
        @click="$emit('action', item)">
        <q-item-label class="q-mt-xs">{{ item.name }}</q-item-label>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>
<script setup>
import { ref, computed, toRefs } from 'vue'
const props = defineProps({
	data: Array,
	title: String,
  theme: String,
  icon: String
})
</script>
