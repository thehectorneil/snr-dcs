<template>
<div>
  <Label
    v-if="label"
    :title="label"/>
  <q-radio
    class="radio"
    color="primary"
    :disable="readOnly"
    v-for="(item, index) in data"
    :key="index"
    v-model="radio"
    :val="item.id"
    :label="item.name"
    :class="{'required': error || false}"
    @update:model-value="selected"/>
    <p v-if="error">Please provide input on required information</p>
</div>
</template>
<script setup>
import { onMounted, ref, toRefs } from 'vue'
import Label from './BaseLabel'
const { val } = toRefs(props)
const radio = ref(null)
onMounted(() => {
  radio.value = val.value
})
const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  error: {
    type: Boolean,
    default: false
  },
  val: {
    type: [Number, String],
    default: 1
  },
  data: Array,
  readOnly: Boolean
})
const emit = defineEmits()
const selected = (args) => {
  emit(`update`, args)
}
</script>
<style scoped>
p {
  font-size: 11.5px;
  color: #cb2a3b;
}
.radio {
  margin-top: -20px;
}
</style>