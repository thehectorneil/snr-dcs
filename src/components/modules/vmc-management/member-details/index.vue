<template>
<BaseLayout
  :headerActions="tableAttr.headerActions"
  @header-action="headerAction"
  title="Member Details">
  <template v-slot:body>
    <div class="row q-pa-lg">
      <BaseFilterDate @reload="filterByDateRange"/>
      <Filters @reload="filterAll"/>
      <div class="col-12 col-sm-12 col-md-12 col-lg-12">
        <div class="q-mb-sm text-positive text-weight-medium">Results found: {{ totalCount }}</div>
        <BaseTable
          tableName="Member Details"
          :data="data"
          :columns="tableAttr.columns"
          :actions="tableAttr.tableActions"
          :loading="loading"
          :pagination="paging"
          @request-data="fetchMembersDetails" />
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
const { api, notification, downloadCsv } = Helpers()
const router = useRouter()
const dateFrom = ref('')
const dateTo = ref('')
const filterData = ref({
  status: 'All',
  regStatus: 'All',
  cardType: 'All',
  volumeShopper: 'All',
  expDate: '',
})
const data = ref([])
const totalCount = ref(0)
const loading = ref(false)
const paging = ref({
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0,
  sortBy: 'id',
  descending: true,
})
onMounted(() => {
  fetchMembersDetails()
})
/**
  Fetch all Members Details
 */
const fetchMembersDetails = async (page, rowsPerPage, sortBy, descending) => {
  const params = {
    page: page || paging.value.page,
    limit: rowsPerPage || paging.value.rowsPerPage
  }
  Object.assign(params, getParams())
  loading.value = true
  const response = await api({
    method: 'GET',
    url: `/cms-service/mrm`,
    param: params
  })
  loading.value = false
  data.value = response.data.data.map(item => {
    return {
      id: item.id,
      firstName: item.first_name,
      lastName: item.last_name,
      dateReg: item.date_registered,
      stats: item.card_status,
      regStatus: item.status,
      expDate: item.expiration_date,
      volumeShopper: item.volume_shopper,
      memberType: item.membership_type
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
const filterByDateRange = (from, to) => {
  dateFrom.value = from
  dateTo.value = to
  fetchMembersDetails()
}
const filterAll = (form) => {
  filterData.value = form
  fetchMembersDetails()
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
    url: '/cms-service/mrm?download',
    loading: true,
    param: getParams()
  })
  if(!response.ok) {
    notification({ msg: 'There is a problem with server. Please try again later.' })
    return
  }
  downloadCsv(response.data, 'member_details_report')
}
/**
  Query params set and get for filters of members details
 */
const getParams = () => {
  const filters = filterData.value
  const params = {
    filter_card_status: filters.status,
    filter_reg_status: filters.regStatus,
    filter_membership_type: filters.cardType,
    filter_volume_shopper: filters.volumeShopper,
    filter_expiration_date: filters.expDate,
    filter_from_date: dateFrom.value,
    filter_end_date: dateTo.value
  }
  /**
    Will delete params key value, if the key value is empty
   */
  if(!dateFrom.value && !dateTo.value) {
    delete params.filter_from_date
    delete params.filter_end_date
  }
  if(!filters.expDate) delete params.filter_expiration_date
  return params
}
</script>
