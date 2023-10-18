<!-- <template>
    <div style="padding-bottom: 50px;">
        <q-banner inline-actions style="padding-top: 31px; padding-bottom: 30px" class="text-black bg-white q-pa-lg ">
            <span class="text-bold" style="font-size:1.2rem;">Door Greeters</span>
            <template v-slot:action>
                <q-btn class="q-mr-sm" unelevated color="primary" @click="ToAddNew()" icon="add" label="Add New"
                    no-caps />
            </template>
        </q-banner>
        
        <q-banner dense rounded inline-actions v-if="storeAlert.show_success" class="text-white q-ma-lg"
            style="background-color: #67AC5B;">
            Successfully added!
            <template v-slot:action>
                <q-btn flat round color="white" icon="close" @click="closeNotification()" />
            </template>
        </q-banner>

        <q-card class="my-card q-ma-lg">

            <q-banner inline-actions class="text-black bg-white q-pa-lg">
                <div style="max-width: 500px;">
                    <q-input outlined dense label="Search Keyword">
                        <template v-slot:append>
                            <q-icon name="search" />
                        </template>
                    </q-input>

                </div>
                <template v-slot:action>
                    <q-btn class="q-mr-sm" outline color="primary" icon="filter_list" label="Filters" no-caps />
                </template>
            </q-banner>


            <q-card-section>
                <div class="q-pa-md">
                    <BaseTable
                        tableName="Door Greeters"
                        :data="data"
                        :columns="tableAttr.columns"
                        :actions="tableAttr.actions"
                        :loading="loading"
                        :pagination="paging"
                        @request-data="fetchDataTable" />

                </div>
            </q-card-section>
        </q-card>

    </div>
</template> -->

<template>
    
<BaseLayout
  :headerActions="tableAttr.headerActions"
  @header-action="headerAction"
  title="Door Greeters">

  <template v-slot:notif_banner>
    <BaseNotificationBanner 
    :show_success="showBanner" 
    @close-notification="closeNotification"/>
  </template>

  <template v-slot:body>
    <div class="row q-pa-lg">
      <div class="col-12 col-sm-5 col-md-5 col-lg-5">
        <BaseInput
          outlined
          dense
          label="Search Keyword">
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
          no-caps />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-12 q-mt-md">
        <BaseTable
                        tableName="Door Greeters"
                        :data="data"
                        :columns="tableAttr.columns"
                        :actions="tableAttr.tableActions"
                        :loading="loading"
                        :pagination="paging"
                        @request-data="fetchDataTable" />
      </div>
    </div>
  </template>
</BaseLayout>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from 'vue'
import { authStore } from 'src/stores/auth'
import { userAlert } from 'src/stores/alerts/alerts'
import BaseLayout from 'src/components/reusables/BaseLayout'
import BaseInput from 'src/components/reusables/BaseInput'
import BaseTable from 'src/components/reusables/BaseTable'
import BaseNotificationBanner from 'src/components/reusables/BaseNotificationBanner'
import { tableAttr } from './constants'
import { useRouter } from 'vue-router';
import { APISettings } from 'src/utilities/env'
import Helpers from 'src/helpers'

const {
  api
} = Helpers()

const data = ref([])
const loading = ref(false)
const paging = ref({
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0,
  sortBy: 'id',
  descending: true,
})

const showBanner = ref(true)

const auth = authStore()
const storeAlert = userAlert()
const router = useRouter()

onMounted(() => {
    fetchDataTable()

    console.log(tableAttr)


    showBanner.value = storeAlert.show_success
    setTimeout(() => {
        showBanner.value = false
    }, "5000")
})

const fetchDataTable = async (page, rowsPerPage, sortBy, descending) => {

    loading.value = true;

    let sortByVal = sortBy
    let descendingVal = descending

    const response = await api({
    method: 'GET',
    url: "/cms-service/door-greeter",
	param: {
        door_greeter: '',
        page: page || paging.value.page,
        limit: rowsPerPage || paging.value.rowsPerPage
	}
    })

        console.log(response.data)
        data.value = response.data.data;

        const meta = response.data.meta

        paging.value.page = meta.current_page,
        paging.value.rowsPerPage = meta.per_page
        paging.value.rowsNumber = meta.total
        paging.value.sortBy = sortBy
        paging.value.descending = descending
        loading.value = false
	  
}


const ToAddNew = () => {
    router.push({ name: 'Door Greeters Add' })
}
            
const closeNotification = () => {
    showBanner.value = false
}

const headerAction = (params) => router.push(params.path)

</script>

<style>

</style>;