<template>
  <div class="col-12 col-sm-3 col-md-3 col-lg-3">
    <BaseInput
      class="date-picker q-ma-xs"
      outlined
      readonly
      dense
      v-model="dateFrom"
      label="From">
      <template v-slot:append>
        <q-icon
          name="close"
          v-if="dateFrom"
          @click="resetDateFrom"
          class="cursor-pointer"/>
        <q-icon
          name="event"
          class="cursor-pointer">
          <q-popup-proxy
            persistent
            cover
            no-refocus no-focus
            transition-show="scale"
            transition-hide="scale">
            <q-date
              :options="disableDatesFrom"
              v-model="dateFrom">
              <div class="row justify-end">
                <q-btn
                  label="OK"
                  color="primary"
                  flat
                  @click="saveDate('from')"
                  :disable="dateFrom === ''"
                  v-close-popup />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </BaseInput>  
  </div>
  <div class="col-12 col-sm-3 col-md-3 col-lg-3">
    <BaseInput
      class="date-picker q-ma-xs"
      outlined
      readonly
      dense
      v-model="dateTo"
      label="To"
      :disable="!isDate">
      <template v-slot:append>
        <q-icon
          name="close"
          v-if="dateTo"
          @click="resetDateFrom"
          class="cursor-pointer"/>
        <q-icon
          name="event"
          class="cursor-pointer">
          <q-popup-proxy
            persistent
            cover
            transition-show="scale"
            transition-hide="scale">
            <q-date
              :options="disableDatesTo"
              v-model="dateTo">
              <div class="row justify-end">
                <q-btn
                  label="OK"
                  color="primary"
                  flat
                  @click="saveDate('to')"
                  v-close-popup />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </BaseInput>  
  </div>
</template>
<script setup>
import { ref } from 'vue'
import BaseInput from 'src/components/reusables/BaseInput'
import BaseModal from 'src/components/reusables/BaseModal'
const emit = defineEmits()
const dateFrom = ref('')
const dateFromInit = ref('')
const dateTo = ref('')
const isDate = ref(false)
/**
  Calendar setter of @const dateFrom and @const dateTo
  will change only for the first pick
 */
const saveDate = (type) => {
  isDate.value = true
  if(type === 'to' && !dateFrom.value) dateFrom.value = dateTo.value
  if(type === 'from' && !dateTo.value) dateTo.value = dateFrom.value
  emit('reload', dateFrom.value, dateTo.value)
}
/**
  Will disabled the dates greater than @const dateTo
  User must not be able to select a date not greater than the To
  If the @const dateFrom select a value it automatically populate the @const dateTo same as @const dateFrom value
 */
const disableDatesFrom = (date) => {
  if(!isDate.value) return true
  return date <= dateFrom.value || date <= dateTo.value
}
/**
  Will disabled the dates less than @const dateFrom
  User must not be able to select a date not less than the From
 */
const disableDatesTo = (date) => {
  return date >= dateTo.value || date >= dateFrom.value
}
/**
  Reset date picker filter
 */
const resetDateFrom = () => {
  isDate.value = false
  dateFrom.value = ''
  dateTo.value = ''
  emit('reload', dateFrom.value, dateTo.value)
}
</script>