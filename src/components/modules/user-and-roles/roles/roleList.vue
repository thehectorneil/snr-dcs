<template>
<BaseLayout
  :headerActions="tableAttr.headerActions"
  @header-action="headerAction"
  title="Roles">

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
        <BaseTable tableName="Role Lists" :data="data" :columns="tableAttr.columns"
                        :actions="tableAttr.tableActions" :loading="loading" :pagination="paging"
                        @request-data="fetchDataTable" @table-actions="tableActions" />
      </div>
    </div>
  </template>
</BaseLayout>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from 'vue'
import { authStore } from 'src/stores/auth'
import BaseTable from 'src/components/reusables/BaseTable'
import BaseLayout from 'src/components/reusables/BaseLayout'
import BaseInput from 'src/components/reusables/BaseInput'
import { tableAttr } from './constants'
import { useRouter } from 'vue-router'
import { useSelectedRole } from 'src/stores/roles'
import { APISettings } from 'src/utilities/env'
import Helpers from 'src/helpers'

const {
    api
} = Helpers()
const router = useRouter()
const role = useSelectedRole()
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

onMounted(() => {
    fetchDataTable()

    console.log(tableAttr)
})
const ToAddNew = () => {
    role.setRole({
        role_id: 0,
        role_name: '',
        status: ''
    })
    router.push('/admin/roles/add-role')
}
const fetchDataTable = async (page, rowsPerPage, sortBy, descending) => {

    loading.value = true;

    let sortByVal = sortBy
    let descendingVal = descending

    const response = await api({
        method: 'GET',
        url: "/cms-service/role/list",
        param: {
            page: page || paging.value.page,
            limit: rowsPerPage || paging.value.rowsPerPage,
        }
    })

    if (response.ok) {

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
}
/**
 * Table actions catcher
 * Set Labels delete users modal
 */
const tableActions = (args, data) => {

    console.log(args, data)
    if (args.type === 'edit') {

        role.setRole({
            role_id: data.id,
            role_name: data.role,
            status: data.status
        })
        router.push({ name: "Add Role" });
    }
}

const headerAction = (e) => {

// if(e.type === 'cancel'){
//     // if(firstname.value === null &&
//     //     lastname.value === null &&
//     //     email.value === null &&
//     //     club_id.value === null &&
//     //     mobile.value === null &&
//     //     username.value === null &&
//     //     password.value === null){
//     //         bypassRouteLeave.value = true
//     //         router.push({ name: "Door Greeter" });
//     //     }
//     router.push({ name: "Role" });

// }
if(e.type === 'create'){    
        role.setRole({
            role_id: 0,
            role_name: '',
            status: ''
        })
        router.push({ name: "Add Role" });
}

console.log(e.type)

}

</script>

<style>

</style>