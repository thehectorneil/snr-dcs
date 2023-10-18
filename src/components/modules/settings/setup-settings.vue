<template>
  <div style="padding-bottom: 50px">
    <form  @submit.prevent.stop="onSubmit()">
      <q-banner inline-actions style="padding-top: 31px; padding-bottom: 30px" class="text-black bg-white q-pa-lg">
        <span class="text-bold" style="font-size:1.2rem">Setup</span>
        <template v-slot:action>
          <q-btn class="q-mr-sm " color="primary" type="submit" :loading="loading" :disable="btnDisable"
           label="Update" no-caps unelevated />
        </template>
      </q-banner>


      <q-card class="my-card q-ma-lg" style="padding-bottom: 150px">

        <q-banner inline-actions class="text-black bg-white q-pa-lg">
          <div style="max-width: 500px">
            <span class="text-bold" style="font-size: 1.2rem">VMC Mobile</span>
          </div>
        </q-banner>

        <q-card-section>
          <div class="my-card q-mx-md q-my-sm">
            <div class="row">
              <div class="col-6">
                <div class="q-pb-md">
                  <span class="text-weight-medium">Session Time Out </span><span class="text-grey"> (minutes)</span>
                  <q-input ref="vmcsessionRef" class="q-pt-sm" outlined v-model="vmc_sessiontimeout" dense
                    maxlength="10" @keypress="isNumber($event)" @paste="(evt) => disablePaste(evt)"
                    :rules="vmcsessionRules" @focusout="fillIn('vmc_sessiontimeout')" />
                </div>
                <div class="q-pb-md">
                  <span class="text-weight-medium">OTP Verification Page Session Expired </span><span class="text-grey">
                    (minutes)</span>
                  <q-input ref="vmcotpRef" class="q-pt-sm" outlined v-model="vmc_otp" dense maxlength="10"
                    @keypress="isNumber($event)" @paste="(evt) => disablePaste(evt)" :rules="vmcotpRules"
                    @focusout="fillIn('vmc_otp')" />
                </div>
                <div class="q-pb-md">
                  <span class="text-weight-medium">QR Code Expiry </span><span class="text-grey"> (minutes)</span>
                  <q-input ref="vmcqrRef" class="q-pt-sm" outlined v-model="vmc_qr" dense maxlength="10"
                    @keypress="isNumber($event)" @paste="(evt) => disablePaste(evt)" :rules="vmcqrRules"
                    @focusout="fillIn('vmc_qr')" />
                </div>
                <div class="q-pb-md">
                  <span class="text-weight-medium">Temporary Password Expiry </span><span class="text-grey">
                    (days)</span>
                  <q-input ref="vmctemppassRef" class="q-pt-sm" outlined v-model="vmc_temp_pass" dense maxlength="10"
                    @keypress="isNumber($event)" @paste="(evt) => disablePaste(evt)" :rules="vmctemppassRules"
                    @focusout="fillIn('vmc_temp_pass')" />
                </div>
                <div class="q-pb-md">
                  <span class="text-weight-medium">Reuse Old Password </span><span class="text-grey"> (count)</span>
                  <q-input ref="vmcreusepassRef" class="q-pt-sm" outlined v-model="vmc_reuse_password" dense
                    maxlength="10" @keypress="isNumber($event)" @paste="(evt) => disablePaste(evt)"
                    :rules="vmcreusepassRules" @focusout="fillIn('vmc_reuse_password')" />
                </div>
              </div>
            </div>
          </div>
        </q-card-section>

        <q-banner inline-actions class="text-black bg-white q-pa-lg">
          
        <hr />
          <div style="max-width: 500px" class="q-pt-lg">
            <span class="text-bold" style="font-size: 1.2rem">DCS Web App</span>
          </div>
        </q-banner>
        <q-card-section>
          <div class="my-card q-mx-md q-my-sm">
            <div class="row">
              <div class="col-6">
                <div class="q-pb-md">
                  <span class="text-weight-medium">Session Time Out </span><span class="text-grey"> (minutes)</span>
                  <q-input ref="dcssessionRef" class="q-pt-sm" outlined v-model="dcs_sessiontimeout" dense
                    maxlength="10" @keypress="isNumber($event)" @paste="(evt) => disablePaste(evt)"
                    :rules="dcssessionRules" @focusout="fillIn('dcs_sessiontimeout')" />
                </div>
              </div>
            </div>
          </div>

        </q-card-section>
      </q-card>

    </form>
  </div>
  <BasePromptMsg :Prompt="Prompt" @update:showPrompt="(val) => {Prompt.showPrompt = false; bypassRouteLeave = val}" />
</template>
<script setup>
import axios from "axios";
import { useQuasar } from "quasar";
import { ref, onMounted } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import { authStore } from "src/stores/auth";
import { APISettings } from 'src/utilities/env';
import BasePromptMsg from '../../../components/reusables/BasePromptMsg.vue'
import Helpers from 'src/helpers'
const sessionID = ref("")
const {
  api,
  showDialog
} = Helpers()

const vmcsessionRef = ref(null)
const vmcotpRef = ref(null)
const vmcqrRef = ref(null)
const vmctemppassRef = ref(null)
const vmcreusepassRef = ref(null)
const dcssessionRef = ref(null)

const vmc_sessiontimeout = ref(null)
const vmc_otp = ref(null)
const vmc_qr = ref(null)
const vmc_temp_pass = ref(null)
const vmc_reuse_password = ref(null)
const dcs_sessiontimeout = ref(null)

const orig_vmc_sessiontimeout = ref(null)
const orig_vmc_otp = ref(null)
const orig_vmc_qr = ref(null)
const orig_vmc_temp_pass = ref(null)
const orig_vmc_reuse_password = ref(null)
const orig_dcs_sessiontimeout = ref(null)

const btnDisable = ref(true)
const loading = ref(false)
const current_id = ref(null)

const bypassRouteLeave = ref(false)

const Prompt = ref({
  showPrompt:false,
  redirect:null,
})

const auth = authStore()
const $q = useQuasar()

const vmcsessionRules = ref([
  (val) => (!!val && val !== "") || "Please provide input on required information.",
]);
const vmcotpRules = ref([
  (val) => (!!val && val !== "") || "Please provide input on required information.",
]);
const vmcqrRules = ref([
  (val) => (!!val && val !== "") || "Please provide input on required information.",
]);
const vmctemppassRules = ref([
  (val) => (!!val && val !== "") || "Please provide input on required information.",
]);
const vmcreusepassRules = ref([
  (val) => (!!val && val !== "") || "Please provide input on required information.",
]);
const dcssessionRules = ref([
  (val) => (!!val && val !== "") || "Please provide input on required information.",
]);

onMounted(() => {
  getSessionTimeout(1);
});

const isNumber = (evt) => {
  let char = String.fromCharCode(evt.keyCode); // Get the character
  if (/^[0-9]+$/.test(char)) return true;
  // Match with regex
  else evt.preventDefault(); // If not match, don't add to input text
};

const disablePaste = (evt) => {
  evt.preventDefault();
}

const getSessionTimeout = async(x) => {

  const response = await api({
    method: 'GET',
    url: "/cms-service/settings/session-timeout/" + x,
    })

    console.log(response)

      if(response.ok){
      if(response.data.data == null){
        sessionID.value = ""

        dcs_sessiontimeout.value =  null
        vmc_otp.value = null
        vmc_qr.value = null
        vmc_reuse_password.value = null
        vmc_temp_pass.value = null
        vmc_sessiontimeout.value = null

        orig_vmc_sessiontimeout.value = null
        orig_vmc_otp.value = null
        orig_vmc_temp_pass.value = null
        orig_dcs_sessiontimeout.value = null
        orig_vmc_reuse_password.value = null
        orig_vmc_qr.value = null
        
      }else{
        sessionID.value = 1
        console.log(response)
        var res = response.data.data

        dcs_sessiontimeout.value = res.dcs_session_time_out 
        vmc_otp.value = res.otp_expiration 
        vmc_qr.value = res.qr_expiry 
        vmc_reuse_password.value = res.reused_old_pass_count 
        vmc_temp_pass.value = res.temporary_pass_expiration 
        vmc_sessiontimeout.value = res.vmc_session_time_out 


        orig_vmc_sessiontimeout.value = res.vmc_session_time_out 
        orig_vmc_otp.value = res.otp_expiration 
        orig_vmc_temp_pass.value = res.temporary_pass_expiration 
        orig_dcs_sessiontimeout.value = res.dcs_session_time_out 
        orig_vmc_reuse_password.value = res.reused_old_pass_count 
        orig_vmc_qr.value = res.qr_expiry 
      }
    }

	  
}


const fillIn = (e) => {
  if (e === "vmc_sessiontimeout") {
    vmcsessionRef.value.validate();
  }
  if (e === "vmc_otp") {
    vmcotpRef.value.validate();
  }
  if (e === "vmc_qr") {
    vmcqrRef.value.validate();
  }
  if (e === "vmc_temp_pass") {
    vmctemppassRef.value.validate();
  }
  if (e === "vmc_reuse_password") {
    vmcreusepassRef.value.validate();
  }
  if (e === "dcs_sessiontimeout") {
    dcssessionRef.value.validate();
  }



  if (
    !(
      vmcsessionRef.value.hasError ||
      vmcotpRef.value.hasError ||
      vmcqrRef.value.hasError ||
      vmctemppassRef.value.hasError ||
      vmcreusepassRef.value.hasError ||
      dcssessionRef.value.hasError ||

      vmc_sessiontimeout.value === null ||
      vmc_otp.value === null ||
      vmc_qr.value === null ||
      vmc_temp_pass.value === null ||
      vmc_reuse_password.value === null ||
      dcs_sessiontimeout.value === null
    )
  ) {
    btnDisable.value = false;
  } else {
    btnDisable.value = true;
  }
}

const onSubmit = async() => {
  loading.value = true

  const response = await api({
    method: 'POST',
    url: "/cms-service/settings/session-timeout",
    param: {
          sessionId: sessionID.value,
          dcsTimout: dcs_sessiontimeout.value,
          vmcTimeout: vmc_sessiontimeout.value,
          otpExpiry: vmc_otp.value,
          tempPassExpiry: vmc_temp_pass.value,
          reusedOldPassCount: parseInt(vmc_reuse_password.value),
          qrExpiry: parseInt(vmc_qr.value)
    }
    })

      if(response.ok){
        loading.value = false
        console.log(response)
        btnDisable.value = true

        $q.notify({
          type: "positive",
          message: "Successfully updated!",
          position: "top",
        });

      }
      else {
        loading.value = false
      }
}


const checkChanges = () => {
  var a = parseInt(vmc_sessiontimeout.value) === orig_vmc_sessiontimeout.value;
  var b = vmc_otp.value === orig_vmc_otp.value;
  var c = vmc_temp_pass.value === orig_vmc_temp_pass.value;
  var d = dcs_sessiontimeout.value === orig_dcs_sessiontimeout.value;
  var e = parseInt(vmc_qr.value) === orig_vmc_qr.value;
  var f = parseInt(vmc_reuse_password.value) === orig_vmc_reuse_password.value;
  
console.log(vmc_sessiontimeout.value, vmc_otp.value, vmc_temp_pass.value,dcs_sessiontimeout.value, vmc_qr.value, vmc_reuse_password.value)
console.log(orig_vmc_sessiontimeout.value, orig_vmc_otp.value, orig_vmc_temp_pass.value, orig_dcs_sessiontimeout.value, orig_vmc_qr.value, orig_vmc_reuse_password.value)
  console.log(a, b, c, d, e, f)
  if (a && b && c && d && e && f) {
    return true;
  } else {
    return false;
  }
};

//This is the guard used to block accidental redirection
onBeforeRouteLeave((to, from, next) => {

  if (checkChanges() || bypassRouteLeave.value) {
    next();
  } else {
    Prompt.value = {
      showPrompt:true,
      redirect:to,
    }
  }


  // if (checkChanges()) {
  //   console.log(checkChanges())
  //   next();
  // } else {
  //   if (!bypassRouteLeave.value) {
  //     const dialog = showDialog({
  //       title: `Leave Page?`,
  //       msg: `You are about to leave this page without saving. All changes will be lost. Do you really want to leave without saving?`,
  //       color: 'primary',
  //       isCancel: true,
  //       isOk: true,
  //       okLabel: `Proceed`,
  //       cancelLabel: `Cancel`,
  //     })
  //     if (!dialog) next()
  //     dialog.then(res => { if (res) next() })
  //   }
  // }
})

</script>


<style scoped>

</style>