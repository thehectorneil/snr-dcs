<template>
<q-input
  @update:model-value="inputValue"
  :error="errors.error"
  :dense="dense"
  v-model="input"
  :error-message="errors.msg"
  :filled="filled"
  :outlined="outlined"
  class="base-input"
  :class="{
    'req-error': errors.error,
    'input-shadow': bgColor === 'white'
  }"
  :bg-color="bgColor"
  :readonly="preview"
  :debounce="debounce"
  :label="label"
  :maxlength="max">
  <template v-slot:prepend>
    <slot name="prepend" />
  </template>
  <template v-slot:append>
    <slot name="append" />
  </template>
</q-input>
</template>
<script setup>
import { ref } from 'vue'
const input = ref(null)
const props = defineProps({
  preview: Boolean,
  filled: Boolean,
  outlined: Boolean,
  errors: {
    type: Object,
    default: {
      error: false,
      msg: ''
    }
  },
  max: {
    type: Number,
    default: 255
  },
  dense: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: ''
  },
  bgColor: {
    type: String,
    default: '#ffff'
  },
  debounce: {
    type: Number,
    default: 500
  },
})
const emit = defineEmits()
const inputValue = (args) => {
  emit('update:input', args)
}
</script>
<style scoped>
.base-input {
  padding-bottom: 5px;
}
.input-shadow {
  box-shadow: 0px 1px 4px 0 rgba(0,0,0,0.2);
  padding-bottom: 0px;
}
</style>
