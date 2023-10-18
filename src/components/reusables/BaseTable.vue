<template>
  <!-- <q-card
    flat
    class="q-pa-md"> -->
    <q-table
      flat
      color="primary"
      row-key="id"
      binary-state-sort
      :no-data-label="noData"
      :loading="loading"
      :rows="data"
      :columns="columns"
      v-model:pagination="paging"
      v-model:selected="selected"
      :selection="multiple"
      :rows-per-page-options="limitList"
      :table-header-style="{backgroundColor: '#f2f2f3'}"
      bordered
      @request="onRequest"
      :visible-columns="visibleColumns">
      <!-- :selection="multiple" -->
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
      <template v-slot:notified>
        <slot name="notified" />
      </template>
      <!-- Table body membership-type -->
      <template #body-cell-cardStatus="props">
        <q-td class="text-center">
          <q-chip
            :color="props.value.split('|')[1]"
            :label="props.value.split('|')[0]"
            class="text-white" />
        </q-td>
      </template>
      <!-- Table body membership-type -->
      <template #body-cell-status="props">
        <q-td class="text-center">
          <q-chip size="md" v-if="props.value.toLowerCase() === 'linked'" class="bg-green-7 text-white">
            {{props.value}}
          </q-chip>
          <q-chip size="md" v-if="props.value.toLowerCase() === 'pending'" class="bg-orange-6 text-white">
            {{props.value}}
          </q-chip>
          <q-chip size="md" v-if="props.value.toLowerCase() === 'timed out'" class="bg-grey-7 text-white">
            {{props.value}}
          </q-chip>
          <q-chip size="md" v-if="props.value.toLowerCase() === 'active'" class="bg-green-7 text-white">
            {{props.value}}
          </q-chip>
          <q-chip size="md" v-if="props.value.toLowerCase() === 'inactive'" class="bg-grey-7 text-white">
            {{props.value}}
          </q-chip>
          <q-chip size="md" v-if="props.value.toLowerCase() === 'disabled'" class="bg-orange-6 text-white">
            {{props.value}}
          </q-chip>
        </q-td>
      </template>

      
      <!-- Table body Report Status only: it is not in chip design -->
      <template #body-cell-reportStatus="props">
        <q-td class="text-left">

          <span v-if="props.value.toLowerCase() === 'active'" class="text-black">{{props.value}}</span>
          <span v-if="props.value.toLowerCase() === 'blocked'" class="text-black">{{props.value}}</span>
          <span v-if="props.value.toLowerCase() === 'expired'" class="text-black">{{props.value}}</span>

        </q-td>
      </template>

      <!-- Table body switch -->
      <template #body-cell-switch="props">
        <q-td class="text-left">
          <q-toggle
            color="positive"
            :label="props.value"
            :model-value="props.value"
            :true-value="`Active`"
            :false-value="`Inactive`"
            @update:model-value="changeStatus(props)"/>
        </q-td>
      </template>
      <!-- Table body imgae -->
      <template #body-cell-image="props">
        <q-td class="text-left">
          <img :src="props.value" alt="" height="40" width="50">
        </q-td>
      </template>
      <!-- Table body actions buttons -->
      <template #body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            v-for="(action, index) in actions"
            :key="index"
            @click.stop="$emit('table-actions', action, props.row)"
            color="grey"
            size="md"
            padding="xs"
            class="q-ma-xs"
            dense round flat
            :icon="action.icon">
          </q-btn>
        </q-td>
      </template>
    </q-table>
    <q-btn
      v-if="selected.length"
      unelevated
      color="negative"
      no-caps
      size="md"
      :label="`Delete ${tableName}(s)`" />
  <!-- </q-card> -->
</template>
<script setup>
import { ref, toRefs, computed } from 'vue'
const props = defineProps({
	loading: Boolean,
  notified: Boolean,
	multiple: {
    type: String,
    default: 'none' // multiple
  },
	tableName: {
    type: String,
    default: 'Table'
  },
	columns: {
    type: Array,
    default: () => []
  },
	data: {
    type: Array,
    default: () => []
  },
	actions: {
    type: Array,
    default: () => []
  },
	visibleColumns: {
    type: Array,
    default: () => []
  },
	noData: {
    type: String,
    default: 'No records found.'
  },
  pagination: {
    type: Object,
    default: {}
  },
  limitList: {
    type: Array,
    default: () => [10, 25, 50]
  }
})
const selected = ref([])
const { pagination } = toRefs(props)
const paging = computed(() => pagination.value)
const emit = defineEmits()
const onRequest = (args) => {
  const { page, rowsPerPage, sortBy, descending } = args.pagination
  emit('request-data', page, rowsPerPage, sortBy, descending)
}
const changeStatus = (args) => {
  emit('show-status', args)
}
</script>
<style>
.q-table th {
  color: #000000 !important;
  font-size: 10pt !important;
}
</style>