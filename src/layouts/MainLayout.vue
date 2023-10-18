<template>
  <q-layout view="hHh lpR fFf">

            <div class="row justify-center items-center q-pt-sm">
              <v-offline @detected-condition="amIOnline">
    <div :style="onLine == false ? '':'display:none'" style="background-color:#333333; color:#fff;" class="q-mx-auto q-py-sm q-pl-md q-pr-xl">
    <div class="profile-details-wrapper">
  <img class="profile-picture q-mt-sm" src="../assets/no_signal.png">
  <div class="profile-details">
<span style="font-size:16px" class="text-weight-bold">You’re currently offline</span><br>
<span style="font-size:12px"> No internet connection detected.</span>
  </div>
  </div>
    </div>

       <div :style="onLine == true? '':'display:none'" style="background-color:#59B45D; color:#fff;" class="q-mx-auto q-py-sm q-pl-md q-pr-xl">
    <div class="profile-details-wrapper">
  <img class="profile-picture q-mt-sm" src="../assets/signal.png">
  <div class="profile-details">
<span style="font-size:16px" class="text-weight-bold"> You’re online now</span><br>
<span style="font-size:12px"> Hurray! Internet is connected.</span>
  </div>
  </div>

    </div>
  </v-offline>
  </div>
    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>

</template>

<script setup>
import { VOffline } from 'v-offline';
import { useQuasar } from 'quasar'
import { ref } from 'vue'
import { userToken } from '../stores/auth/login'
const onLine = ref();
const amIOnline = (e) => {
     onLine.value = e;
        setTimeout(() => {
       onLine.value = 'setTimeout'
    }, "3000")
  
    };
// const toggleLeftDrawer = ref();
</script>

<style scoped>
.profile-details-wrapper { display: table-row; }
.profile-picture {
  display: table-cell; 
  vertical-align: top; 
  margin-right: 10px;
  height:25.41px;
  
}
.profile-details { display: table-cell; vertical-align: top; }
</style>