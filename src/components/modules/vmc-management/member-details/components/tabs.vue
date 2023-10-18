<template>
  <q-tabs
    v-model="tab"
    dense
    align="justify"
  >
    <q-tab
      v-for="(item, index) in data"
      :key="index"
      :ripple="true"
      no-caps
      :class="{'text-primary': item.name === tab}"
      :name="item.name"
      :label="item.name"
      @click="$emit('tab-action', item.param)">
      <q-badge
        v-if="index && item.count"
        floating
        rounded
        color="red"
        class="tab-badge"
        dense
        :label="item.count" />
    </q-tab>
  </q-tabs>
</template>
<script setup>
import { ref } from 'vue'
defineProps({
	data: Array
})
const tab = ref('Linked')
</script>
<style scoped>
.tab-badge{
  top: 1px !important;
  right: -18px !important;
}
</style>