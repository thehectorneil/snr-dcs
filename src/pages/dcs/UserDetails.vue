<template>
    <div>
        <div class="row q-pa-md back-separator"> 
            <div class="col" @click="$router.push('/scanner')">
                <img style="height: 12.44px; width: 18.67px" class="q-mr-xs" src="~/src/assets/back.png" />Back
            </div>
        <div class="col scan-top-txt text-right">
        </div>
        </div>
           <div class="q-pa-md ">
            
    <q-list >
      <q-item >
        <q-item-section>
          <q-item-label caption class="text-weight-medium" style="font-size:13px;">First Name</q-item-label>
          <q-item-label class="text-weight-medium"  style="font-size:15px;">{{storeuserDetails.first_name}}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item >
        <q-item-section>
          <q-item-label caption class="text-weight-medium" style="font-size:13px;">Last Name</q-item-label>
          <q-item-label class="text-weight-medium"  style="font-size:15px;"> {{storeuserDetails.last_name}}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item >
        <q-item-section>
          <q-item-label caption class="text-weight-medium" style="font-size:13px;">Mobile</q-item-label>
          <q-item-label class="text-weight-medium"  style="font-size:15px;"> {{storeuserDetails.mobile}}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item >
        <q-item-section>
          <q-item-label caption class="text-weight-medium" style="font-size:13px;">Email</q-item-label>
          <q-item-label class="text-weight-medium"  style="font-size:15px;">{{storeuserDetails.email}}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item >
        <q-item-section>
          <q-item-label caption class="text-weight-medium" style="font-size:13px;">Club Location</q-item-label>
          <q-item-label class="text-weight-medium"  style="font-size:15px;">{{storeuserDetails.location}}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item >
        <q-item-section>
          <q-item-label caption class="text-weight-medium" style="font-size:13px;">Username</q-item-label>
          <q-item-label class="text-weight-medium"  style="font-size:15px;">{{storeuserDetails.username}}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item >
        <q-item-section>
          <q-item-label caption class="text-weight-medium" style="font-size:13px;">Password</q-item-label>
          <q-item-label class="text-weight-medium"  style="font-size:15px;">
          <span
            v-for="(n, index) in storeuserDetails.password"
            :key="index">
            •
          </span>
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
    </div>
</template>
<style scoped>
.back-separator{
    border-top:1px solid #00000033; 
    border-bottom:1px solid #00000033;
}
</style>
<script setup>
import { userToken } from "src/stores/auth/login";
const storeuserDetails = userToken();
import { ref , onMounted} from "vue";
const details = ref('')
onMounted(() => {
console.log(storeuserDetails)
})
</script>