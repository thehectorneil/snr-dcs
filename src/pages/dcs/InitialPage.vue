<template>
  <div class="home" style="margin-top: 60px">
    <div style="margin: 0 auto; height: 100vh">
      <div class="row">
        <div class="col" align="center">
          <div
            style="
              display: table-cell;
              vertical-align: middle;
              background-color: #cdcdcd;
              width: 120px;
              height: 120px;
              border-radius: 30px !important;
              color: #9f9f9f;
            "
            class="font-weight-bold"
          >
            Logo
          </div>
        </div>
      </div>
      <q-page-container style="padding: 10px">
        <div class="row q-mt-lg justify-center align-center" align="center">
          <div
            class="col ma-auto col-xs-12 col-md-6 col-sm-8 col-lg-5 col-xl-3"
          >
            <select
              @change="onChange(selected)"
              v-model="selected"
              style="
                border: 1px solid #cdcdcd;
                border-radius: 4px;
                width: 100%;
                font-size: 15px;
              "
              class="pa-4 mb-10 minimal font-weight-medium"
            >
              <option
                value=""
                disabled
                selected
                hidden
                style="color: #000000f5"
              >
                Select Club Location
              </option>
              <option
                v-for="(item, index) in branches"
                :value="item"
                :key="index"
              >
                {{ item.club_name }}
              </option>
            </select>

            <q-btn
              class="continue-btn q-mt-lg text-capitalize"
              x-large
              @click="continueBranch"
              >Continue</q-btn
            >
          </div>
        </div>
      </q-page-container>
    </div>
  </div>
</template>
<style scoped>
select.minimal {
  background-image: linear-gradient(45deg, transparent 50%, black 50%),
    linear-gradient(135deg, black 50%, transparent 50%);
  background-position: calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px), calc(100% - 2.5em) 0.5em;
  background-size: 5px 5px, 5px 5px, 1px 1.5em;
  background-repeat: no-repeat;
}

select.minimal:focus {
  background-repeat: no-repeat;
  outline: 0;
}

select:-moz-focusring {
  color: transparent;
  text-shadow: 0 0 0 #000;
}

.select-field {
  color: black !important;
  font-weight: 600;
}
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  text-indent: 1px;
  text-overflow: "";
  border: 1px solid #333;
  color: #999;
  display: inline-block;
  font-size: 12px;
  height: 39px;
  padding: 0 15px;
  vertical-align: top;
}

select option {
  padding: 7px 15px;
}
.continue-btn {
  width: 100%;
  color: #fff;
  font-size: 15px;
  background-color: #1b3564;
}

.v-field.v-field--appended {
  opacity: 1 !important;
  font-weight: 600 !important;
}

.v-label {
  opacity: 1 !important;
}

.v-btn.v-btn--density-default {
  height: calc(var(--v-btn-height) + 15px);
  opacity: 1 !important;
}
</style>
<script setup>
import axios from "axios";
import { useRouter } from "vue-router";
import { ref, onMounted, onBeforeMount } from "vue";
import { useBranchLocation } from "src/stores/location/branch_location";
import { APISettings } from "src/utilities/env";
import Helpers from "src/helpers";

const { api } = Helpers();
const router = useRouter();
const branches = ref({});
const selected = ref("");
const branchLocation = useBranchLocation();
const currentselection = ref([]);

onMounted(() => {
  // getCurrentLocation();
}),
  onBeforeMount(() => {
    getLocation();
    if (
      branchLocation.id != 0 &&
      branchLocation.club_name != "" &&
      branchLocation.store_location != ""
    ) {
      router.push({ path: "/dcs/login" });
    }
  });
const onChange = (event) => {
  console.log(event);
  branchLocation.id = event.id;
  branchLocation.club_name = event.club_name;
  branchLocation.store_location = event.store_location;
};

const getLocation = async () => {
 
    const response = await api({
        method: 'GET',
        module: 'dcs',
        url: `/dcs-service/store/location`,
    })
     if (response.ok) {
       console.log(response.data.data);
        const test = response.data.data;
        console.log(response.status);
        console.log(test);
        branches.value = test;
        console.log(branches);
        console.log(branches.value);
     }
};

const continueBranch = () => {
  // router.push({ name: 'login' })
  //storing this to pinia
  branchLocation.id = selected.value.id;
  branchLocation.club_name = selected.value.club_name;
  branchLocation.store_location = selected.value.store_location;
  router.push({ path: "/dcs/login" });
  // branchLocation.$reset()
};
</script>

