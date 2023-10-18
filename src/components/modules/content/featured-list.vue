<template>
<BaseLayout title="Featured">
  <template v-slot:body>
    <q-card class="my-card">
        <div class="">
          <BaseTable
            tableName="User List"
            @table-actions="tableActions"
            :data="data"
            :columns="tableAttr.columns"
            :actions="tableAttr.actions"
            :loading="loading"
            :pagination="paging"
            @show-status="changeStatus"
            @request-data="fetchDataTable"
          />
        </div>
    </q-card>
  </template>
  </BaseLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { authStore } from "src/stores/auth";
import { userAlert } from "src/stores/alerts/alerts";
import BaseLayout from 'src/components/reusables/BaseLayout'
import BaseTable from "src/components/reusables/BaseTable";
import { tableAttr } from "./constants";
import { useRouter } from "vue-router";
import { useSelectedUser } from "src/stores/users";
import { APISettings } from "src/utilities/env";
import Helpers from 'src/helpers'
const { api } = Helpers()
const loading = ref(false)
const storeAlert = userAlert();
const users = useSelectedUser();
const router = useRouter();
const data = ref([]);
const paging = ref({
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0,
  sortBy: "id",
  descending: true,
});

const auth = authStore();

onMounted(() => {
  fetchDataTable();
  setTimeout(() => {
    storeAlert.show_success = false;
  }, "5000");
});
const tableActions = (args, data) => {
  users.setUser({
    user_id: data.id,
  });
  router.push({ name: "Feature Add" });
};
const changeStatus = async (args) => {
  console.log(args.value);
  var dataValue;
  if (args.value == "Active") {
    dataValue = "Inactive";
  } else {
    dataValue = "Active";
  }
  loading.value = true
  try {
     const response = await api({
    method: 'POST',
    url: `/cms-service/content/featured/status-update`,
    param: {
      id: args.key,
      status: dataValue,
    }
  })
  if(response.data.code == 200){
      fetchDataTable();
  }
  } catch (error) {
    console.log(error);
      loading.value = false;
  }
};

const fetchDataTable = async (page, rowsPerPage, sortBy, descending) => {
  loading.value = true;

  let sortByVal = sortBy;
  let descendingVal = descending;
  try {
     const response = await api({
    method: 'GET',
    url: `/cms-service/content/featured/list`,
    param: {
      page: page || paging.value.page,
      limit: rowsPerPage || paging.value.rowsPerPage
    }
  })
  if(response.data.code == 200){
    data.value = response.data.data;
    const meta = response.data.meta;
    (paging.value.page = meta.current_page),
    (paging.value.rowsPerPage = meta.per_page);
    paging.value.rowsNumber = meta.total;
    paging.value.sortBy = sortBy;
    paging.value.descending = descending;
  }
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.qtable {
  border: 1px solid black;
}
.toast-success {
  background-color: #67ac5b;
  position: absolute;
  left: 32%;
  right: auto;
  top: 15px;
}

.tr {

height:66px !important;
}

</style>