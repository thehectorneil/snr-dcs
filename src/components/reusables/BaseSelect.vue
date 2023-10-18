<template>
  <q-select
    :dense="dense"
    map-options
    input-debounce="200"
    option-value="id"
    option-label="name"
    class="base-select"
    :class="{
      'select': !outlined,
      'req-error': errors.error
    }"
    :disable="loading"
    :filled="filled"
    :outlined="outlined"
    :clearable="clearable"
    :multiple="multiple"
    :use-chips="chips"
    :options="data"
    :loading="loading"
    :error="errors.error"
    :error-message="errors.msg"
    v-model="select"
    @update:model-value="selected"
    :bg-color="bgColor" />
    <!-- :label="label" -->
    <!-- use-input -->
</template>
<script setup>
import { boot } from 'quasar/wrappers'
import { ref, toRefs } from 'vue'
const props = defineProps({
  loading: Boolean,
  filled: {
    type: Boolean,
    default: false
  },
  data: {
    type: Array,
    default: []
  },
  chips: {
    type: Boolean,
    default: false
  },
  multiple: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: ''
  },
  clearable: {
    type: Boolean,
    default: false
  },
  outlined: {
    type: Boolean,
    default: true
  },
  bgColor: {
    type: String,
    default: 'white'
  },
  dense: {
    type: Boolean,
    default: true
  },
  errors: {
    type: Object,
    default: {
      error: false,
      msg: ''
    }
  },
})
const { data } = toRefs(props)
const select = ref('')
const emit = defineEmits()
const selected = () => {
  emit('update:selected', select.value)
}
</script>
<style scoped>
/* .select {
  box-shadow: 0px 1px 4px 0 rgba(0,0,0,0.2);
}
.base-select {
  padding-bottom: 0px;
} */
</style>
