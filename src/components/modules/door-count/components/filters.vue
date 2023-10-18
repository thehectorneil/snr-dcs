<template>
<div class="col-12 col-sm-6 col-md-6 col-lg-6 text-right">
  <q-btn
    outline
    color="primary"
    icon="filter_list"
    label="Filters"
    @click="showFilter = true"
    no-caps />
  <BaseModal
    class="text-black"
    v-if="showFilter">
    <template v-slot:body>
      <div class="text-subtitle1 text-weight-medium">Filter</div>
      <div class="collumn q-mt-md">
        <BaseLabel title="Status" />
        <BaseSelect
          v-model="form.status"
          :data="statusList"/>
      </div>
      
      <div class="collumn">
        <BaseLabel title="Volume Shopper" />
        <BaseSelect
          v-model="form.volume_shopper"
          :data="volumeShopperList"/>
      </div>

      <div class="collumn">
        <BaseLabel title="Card Type" />
        <BaseSelect
          v-model="form.card_type"
          :data="cardTypeList"/>
      </div>

      <div class="q-mt-lg">
        <q-btn
          outline
          class="q-mr-lg"
          color="primary"
          label="Reset Filter"
          @click="resetFilter"
          no-caps />
      </div>
    </template>
    <template v-slot:action>
      <div class="col-12 col-sm-12 col-md-12 col-lg-12 text-right">
        <q-btn
          flat
          class="q-mr-lg"
          color="primary"
          label="Cancel"
          @click="showFilter = false"
          no-caps />
        <q-btn
          unelevated
          color="primary"
          label="Filter"
          no-caps
          @click="filterData"/>
      </div>
    </template>
  </BaseModal>
</div>
</template>
<script setup>
import { ref } from 'vue'
import BaseInput from 'src/components/reusables/BaseInput'
import BaseSelect from 'src/components/reusables/BaseSelect'
import BaseModal from 'src/components/reusables/BaseModal'
import BaseLabel from 'src/components/reusables/BaseLabel'
const emit = defineEmits()
const showFilter = ref(false)
const form = ref({
  status: 'All',
  volume_shopper: 'All',
  card_type: 'All',
})
const statusList = ref(['All', 'Active', 'Blocked', 'Expired'])
const volumeShopperList = ref(['All', 'Yes', 'No'])
const cardTypeList = ref(['All', 'Business', 'Gold'])
/**
  Will call the @function fetchMembersDetails to update the data in the table and will close the filter modal
 */
const filterData = () => {
  emit('reload', form.value)
  showFilter.value = false
}
/**
  Reset all fields in the filter button
 */
const resetFilter = () => {
  form.value.status = 'All'
  form.value.volume_shopper = 'All'
  form.value.card_type = 'All'
  emit('reload', form.value)
}
</script>