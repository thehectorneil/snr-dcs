<template>
    <div style="padding-bottom: 50px;">
        <q-banner inline-actions style="padding-top: 31px; padding-bottom: 30px" class="text-black bg-white q-pa-lg ">
            <span class="text-bold" style="font-size:1.2rem;">Stores</span>
            <template v-slot:action>
                <q-btn class="q-mr-sm" unelevated @click="ToAddNew()" color="primary" icon="add" label="Add New"
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
                        tableName="Club"
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
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from 'vue'
import { authStore } from 'src/stores/auth'
import BaseTable from 'src/components/reusables/BaseTable'
import { tableAttr } from './constants'
import { useRouter } from 'vue-router'
import { userAlert } from 'src/stores/alerts/alerts'
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

const auth = authStore()
const router = useRouter()
const storeAlert = userAlert()

onMounted(() => {
    fetchDataTable()

    console.log(tableAttr)

    setTimeout(() => {
        storeAlert.show_success = false
    }, "5000")
    
})

const fetchDataTable = async (page, rowsPerPage, sortBy, descending) => {

    loading.value = true;

    let sortByVal = sortBy
    let descendingVal = descending

    const response = await api({
    method: 'GET',
    url: "/cms-service/store/list"
    })
    

    console.log(response.data)
    data.value = response.data.data;

    const meta = response.data.meta

    paging.value.page = meta.current_page,
    paging.value.rowsPerPage = meta.per_page
    paging.value.rowsNumber = meta.total
    paging.value.sortBy = sortBy
    paging.value.descending = descending
        
    loading.value = false;
    
}


const ToAddNew = () => {
    router.push({ name: 'Store Add' })

}
const closeNotification = () => {
    storeAlert.show_success = false
}

</script>

<style>

</style>;