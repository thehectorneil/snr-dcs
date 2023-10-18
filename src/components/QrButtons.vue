<template>
<div v-if="isOffline" class="row justify-center items-center q-pa-sm connectivity-stat">
    <div  style="background-color:#333333; color:#fff;" class="q-mx-auto q-py-sm q-pl-md q-pr-xl">
    <div class="profile-details-wrapper">
  <img class="profile-picture q-mt-sm" src="../assets/no_signal.png">
  <div class="profile-details">
<span style="font-size:16px" class="text-weight-bold">You're offline now. Oops! </span><br>
<span style="font-size:12px"> Internet is diconnected.</span>
  </div>
  </div>
    </div>
     </div>
  <div class="q-mb-md">
    <div class=" row unSelectedScan q-mx-md q-mt-md">
     
      <div class="col q-pt-md" :class="[selectedScan === 'qr'? 'selectedScan':'']">
        <p class="text-center btn-cam-switch" @click="selectScanner('qr')">QR Code</p>
      </div>
      <div class="col q-pt-md" :class="[selectedScan === 'ocr'? 'selectedScan':'']">
          <p class="text-center btn-cam-switch" @click="selectScanner('ocr')"> OCR</p>
      </div>
    </div>
    <div class="row q-mx-md q-mt-md">
      <div class="col q-pt-md " :class="[selectedScan === 'manual'? 'selectedScan':'unSelectedScan']">
        <p class="text-center btn-cam-switch" @click="selectScanner('manual')">Manual Input Membership Card</p>
      </div>
    </div>
  </div>
</template>
<style scoped>
.btn-cam-switch{
    font-size: 15px;
}
.selectedScan{
background-color: #1B3564;
color: #FFFFFFF5;
border-radius: 28px;
}
.unSelectedScan{
background-color: #00000033;
color: #00000073;
border-radius: 28px;
}
.connectivity-stat{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
}
</style>
<script setup>
import {ref , onBeforeMount} from 'vue'
import { useRouter } from 'vue-router';
const isOffline = ref(false);
const router = useRouter();
const selectedScan = ref('qr')
      onBeforeMount(() => {
      var path = window.location.pathname
if(path == '/ocr'){
  selectedScan.value = 'ocr'
}else if(path == '/scanner'){
  selectedScan.value = 'qr'
}
      })
const selectScanner =  (args) =>  {
 if (navigator.onLine) {
  if(args == 'ocr'){
   selectedScan.value = 'ocr'
   router.push({ path: '/ocr' })
  }else if(args == 'manual'){
    selectedScan.value = 'manual'
  router.push({ path: '/manual' })
  }else if(args == 'qr'){
    selectedScan.value = 'qr'
      router.push({ path: '/scanner' })
  }
  console.log('online');
} else {
      isOffline.value = true
      setTimeout(() => {
       isOffline.value = false
    }, "3000")
  console.log('offline');
}
}

</script>
