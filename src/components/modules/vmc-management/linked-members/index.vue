<template>
<BaseLayout
  :headerActions="tableAttr.headerActions"
  title="Linked Members">
  <template v-slot:body>
    <div class="row q-pa-lg">
      <div class="col-12 col-sm-5 col-md-5 col-lg-5">
        <BaseInput
          outlined
          dense
          v-model="search"
          label="Search Keyword"
          @update:model-value="fetchLinkedMembers">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </BaseInput>  
      </div>
      <div class="col-12 col-sm-7 col-md-7 col-lg-7 text-right">
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
            <div class="q-mt-md collumn">
              <BaseLabel title="Type" />
              <BaseSelect
                v-model="type"
                :data="typeList"/>
            </div>
            <div class="collumn">
              <BaseLabel title="Card Status" />
              <BaseSelect
                v-model="cardStatus"
                :data="cardStatusList"/>
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
      <div class="row col-12 col-sm-12 col-md-12 col-lg-12">
        <div class="col-12 col-sm-12 col-md-6 col-lg-4">
          <Tabs
            :data="status"
            @tab-action="setLink"/>
        </div>
        <div class="col-12 col-sm-12 col-md-12 col-lg-12 q-mt-md">
          <BaseTable
            tableName="Linked Members"
            :data="data"
            :columns="tableAttr.columns"
            :actions="tableAttr.tableActions"
            :loading="loading"
            :pagination="paging"
            @request-data="fetchLinkedMembers"
            @table-actions="tableAction"
            :visibleColumns="[hideColumn]">
            <template v-slot:notified>
              hdasjdhs
            </template>
          </BaseTable>
        </div>
      </div>
    </div>
  </template>
</BaseLayout>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue'
import BaseLayout from 'src/components/reusables/BaseLayout'
import BaseTable from 'src/components/reusables/BaseTable'
import BaseInput from 'src/components/reusables/BaseInput'
import BaseSelect from 'src/components/reusables/BaseSelect'
import BaseModal from 'src/components/reusables/BaseModal'
import BaseLabel from 'src/components/reusables/BaseLabel'
import Tabs from './components/tabs'
import { tableAttr } from './constants'
import { useRouter } from 'vue-router'
import Helpers from 'src/helpers'
const { api, getStatusColor } = Helpers()
const router = useRouter()
const status = ref([
  { name: 'Linked', param: 'link', count: 0 },
  { name: 'Pending', param: 'pending', count: 0 },
  { name: 'Timed Out', param: 'timeout', count: 0 },
])
const showFilter = ref(false)
const search = ref('')
const type = ref('All')
const cardStatus = ref('All')
const typeList = ref(['All', 'Business', 'Gold'])
const cardStatusList = ref(['All', 'Active', 'Blocked', 'Expired'])
const data = ref([])
const loading = ref(false)
const paging = ref({
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0,
  sortBy: 'id',
  descending: true,
})
const linkParam = ref('link')
const hideColumn = ref(['notified'])
onMounted(() => fetchLinkedMembers() )
const setLink = (param) => {
  tableAttr.value.columns[7].required = param !== 'link' // Will hide the Notified field in table data if tab is linked
  tableAttr.value.columns[8].required = param !== 'link' // Will hide the Notified field in table data if tab is linked
  linkParam.value = param
  paging.value.rowsPerPage = 10
  // reset filter and page when switching tab
  paging.value.page = 1
  type.value = 'All'
  cardStatus.value = 'All'
  fetchLinkedMembers()
}
/**
  Will initially fetch Linked Members
 */
const fetchLinkedMembers = async (page, rowsPerPage, sortBy, descending) => {
  loading.value = true
  const response = await api({
    method: 'GET',
    url: `/cms-service/mrm?${linkParam.value}`,
    param: {
      page: page || paging.value.page,
      limit: rowsPerPage || paging.value.rowsPerPage,
      filter_membership_type: type.value,
      filter_card_status: cardStatus.value,
      search: search.value
    }
  })
  loading.value = false
  data.value = response.data.data.map(item => {
    return {
      id: item.id,
      fullName: item.full_name,
      accountNo: item.account_number,
      cardNo: item.card_number,
      membershipType: item.membership_type,
      cardStatus: getStatusColor(item.card_status),
      status: item.status,
      mobile: item.mobile_number,
      is_special_verification: item.is_special_verification,
      email: item.email,
      notified: item.is_notif
    }
  })
  const count = response.data.count
  const meta = response.data.meta
  status.value[1].count = count.pending // Pending Tab count notification
  status.value[2].count = count.timeout // Time Out Tab count notification
  paging.value.page = meta.current_page,
  paging.value.rowsPerPage = meta.per_page
  paging.value.rowsNumber = meta.total
  paging.value.sortBy = sortBy
  paging.value.descending = descending
}
const tableAction = (params, data) => {
  if(params.type === 'edit') router.push(`/admin/linked-members/details/${data.id}/${data.is_special_verification}`)
}
/**
  Will call the @function fetchLinkedMembers and close the filter dialog
 */
const filterData = () => {
  fetchLinkedMembers()
  showFilter.value = false
}
/**
  Will reset the filter value and call the @function fetchLinkedMembers
 */
const resetFilter = () => {
  type.value = 'All'
  cardStatus.value = 'All'
  fetchLinkedMembers()
}
</script>
