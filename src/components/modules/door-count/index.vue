<template>
<BaseLayout
  :headerActions="tableAttr.headerActions"
  @header-action="headerAction"
  title="Door Count">
  <template v-slot:body>
    <div class="row q-pa-lg">      
      <BaseFilterDate @reload="filterByDateRange"/>
      <Filters @reload="filterAll"/>
      <div class="col-12 col-sm-12 col-md-12 col-lg-12 q-mt-md">
        <div class="q-mb-sm text-positive text-weight-medium">Results found: {{ totalCount }}</div>
        <BaseTable
          tableName="Door Count"
          :data="data"
          :columns="tableAttr.columns"
          :actions="tableAttr.tableActions"
          :loading="loading"
          :pagination="paging"
          @request-data="fetchMainTableData" />
      </div>
    </div>
  </template>
</BaseLayout>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import BaseLayout from 'src/components/reusables/BaseLayout'
import BaseFilterDate from 'src/components/reusables/BaseFilterDate'
import Filters from './components/filters'
import BaseTable from 'src/components/reusables/BaseTable'
import { tableAttr } from './constants'
import { useRouter } from 'vue-router'
import Helpers from 'src/helpers'
const cardStatus = ref('All')
const status = ref('All')
const volumeShopper = ref('All')
const dateFrom = ref('')
const dateTo = ref('')
const cardStatusList = ref(['All', 'Active', 'Blocked', 'Expired'])
const statusList = ref(['All', 'Active', 'Blocked', 'Expired'])
const volumeShopperList = ref(['All', 'Yes', 'No'])
const { api, notification, downloadCsv } = Helpers()
const router = useRouter()
const data = ref([])
const loading = ref(false)
const showFilter = ref(false)
const paging = ref({
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0,
  sortBy: 'id',
  descending: true,
})

const filterData = ref({
  status: 'All',
  volume_shopper: 'All',
  card_type: 'All',
})

const totalCount = ref(0)

onMounted(() => fetchMainTableData() )

/**
  Fetch all Data for the Main table
 */
 const fetchMainTableData = async (page, rowsPerPage, sortBy, descending) => {
  const params = {
    page: page || paging.value.page,
    limit: rowsPerPage || paging.value.rowsPerPage
  }
  
  Object.assign(params, getParams())
  loading.value = true
  const response = await api({
    method: 'GET',
    url: `/cms-service/dcs-mangement/reports`,
    param: params
  })
  loading.value = false
  data.value = response.data.data.map(item => {
    return {
      id: item.id,
      full_name: item.full_name,
      reportStatus: item.status,
      volume_shopper:item.volume_shopper,
      card_type: item.card_type,
      male_companion: item.male_companion,
      female_companion: item.female_companion,
      created_at: item.created_at
    }
  })
  const meta = response.data.meta
  paging.value.page = meta.current_page,
  paging.value.rowsPerPage = meta.per_page
  paging.value.rowsNumber = meta.total
  paging.value.sortBy = sortBy
  paging.value.descending = descending
  totalCount.value = meta.total
}

const resetFilter = () => {
  status.value = 'All'
  volumeShopper.value = 'All'
  cardStatus.value = 'All'
}

const filterByDateRange = (from, to) => {
  dateFrom.value = from
  dateTo.value = to
  fetchMainTableData()
}

const filterAll = (form) => {
  console.log(form)
  filterData.value = form
  fetchMainTableData()
}

/**
  Query params set and get for filters of members details
 */
 const getParams = () => {
  const filters = filterData.value
  const params = {
    status: filters.status,
    volume_shopper: filters.volume_shopper,
    card_type: filters.card_type,
    from_date: dateFrom.value,
    to_date: dateTo.value
  }
  /**
    Will delete params key value, if the key value is empty
   */
  if(!dateFrom.value && !dateTo.value) {
    delete params.from_date
    delete params.to_date
  }
  // if(!filters.expDate) delete params.expiration_date
  return params
}

/**
  Will download the member details report
 */
 const headerAction = async (params) => {
  
  if(totalCount.value === 0) {
    notification({ msg: 'Unable to generate a report without records.' })
    return
  }
  const response = await api({
    method: 'GET',
    url: '/cms-service/dcs-mangement/reports?door_count_download',
    loading: true,
    param: getParams()
  })
  console.log(response)
  if(!response.ok) {
    notification({ msg: 'There is a problem with server. Please try again later.' })
    return
  }
  downloadCsv(response.data, 'door_count')
}
</script>
