<template>
  <div style="padding-bottom: 50px">
    <q-dialog v-model="deleteModal">
      <q-card class="q-pa-sm">
        <q-card-section class="q-pb-none">
          <p class="text-h6">Confirm Delete</p>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <p class="q-ml-sm">Are you sure you want to delete this user?</p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            label="Cancel"
            color="grey-4"
            text-color="grey-6"
            no-caps
            unelevated
            v-close-popup
          />
          <q-btn
            label="Yes"
            color="primary"
            @click="deleteUser"
            unelevated
            no-caps
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-banner
      inline-actions
      style="padding-top: 31px; padding-bottom: 30px"
      class="text-black bg-white q-pa-lg"
    >
      <span class="text-bold" style="font-size: 1.2rem">User</span>

      <q-banner
        dense
        rounded
        inline-actions
        v-if="storeAlert.show_success"
        class="text-white toast-success"
      >
        Successfully updated!
        <template v-slot:action>
          <q-btn
            flat
            round
            color="white"
            icon="close"
            @click="closeNotification()"
          />
        </template>
      </q-banner>
      <template v-slot:action>
        <q-btn
          class="q-mr-sm"
          color="primary"
          @click="ToAddNew()"
          label="Add User"
          no-caps
          unelevated
        />
      </template>
    </q-banner>

    <q-card class="my-card q-ma-lg">
      <q-banner inline-actions class="text-black bg-white q-pa-lg">
        <div style="max-width: 500px">
          <q-input outlined dense label="Search Keyword">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
        <template v-slot:action>
          <q-btn
            class="q-mr-sm"
            outline
            color="primary"
            icon="filter_list"
            label="Filters"
            no-caps
          />
        </template>
      </q-banner>

      <q-card-section>
        <div class="q-pa-md">
          <BaseTable
            tableName="User List"
            @table-actions="tableActions"
            :data="data"
            :columns="tableAttr.columns"
            :actions="tableAttr.actions"
            :loading="loading"
            :pagination="paging"
            @request-data="fetchDataTable"
          />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { authStore } from "src/stores/auth";
import { userAlert } from "src/stores/alerts/alerts";
import BaseTable from "src/components/reusables/BaseTable";
import { tableAttr } from "./constants";
import { useRouter } from "vue-router";
import { useSelectedUser } from "src/stores/users";
import { APISettings } from "src/utilities/env";
import Helpers from "src/helpers";
const { api } = Helpers();
const storeAlert = userAlert();
const users = useSelectedUser();
const router = useRouter();
const data = ref([]);
const deleteModal = ref(false);
const selectedDeleteId = ref("");
const loading = ref(false);
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
  console.log(args, data);
  if (args.type === "edit") {
    users.setUser({
      user_id: data.id,
      full_name: data.full_name,
      status: data.status,
      role: data.role,
      user_email: data.email,
    });
    router.push({ name: "User Add" });
  } else if (args.type === "delete") {
    deleteModal.value = true;
    selectedDeleteId.value = data.id;
    // deleteUser(data.id);
  }
};
const deleteUser = async (id) => {
  const response = await api({
    method: "DELETE",
    url: `/cms-service/admin/delete/${selectedDeleteId.value}`,
  });

  console.log(response);
  storeAlert.show_success = true;
  setTimeout(() => {
    storeAlert.show_success = false;
  }, "3000");
  fetchDataTable();
};
const ToAddNew = () => {
  users.userData.user_id = "";
  router.push({ name: "User Add" });
};
const closeNotification = () => {
  storeAlert.show_success = false;
};
const fetchDataTable = async (page, rowsPerPage, sortBy, descending) => {
  loading.value = true;

  let sortByVal = sortBy;
  let descendingVal = descending;

  const response = await api({
    method: "GET",
    url: `/cms-service/admin/list?admin`,
    param: {
      page: page || paging.value.page,
      limit: rowsPerPage || paging.value.rowsPerPage,
    },
  });
  if (response.ok) {
    loading.value = false;
    data.value = response.data.data;
    const meta = response.data.meta;
    (paging.value.page = meta.current_page),
      (paging.value.rowsPerPage = meta.per_page);
    paging.value.rowsNumber = meta.total;
    paging.value.sortBy = sortBy;
    paging.value.descending = descending;
  } else {
    loading.value = false;
  }
};
</script>

<style scoped>
.toast-success {
  background-color: #67ac5b;
  position: absolute;
  left: 32%;
  right: auto;
  top: 15px;
}
</style>