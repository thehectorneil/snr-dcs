<template>
  <div class="row justify-center items-center">
    <div
      v-if="isOnline"
      style="background-color: #333333; color: #fff"
      class="q-mx-auto q-py-sm q-pl-md q-pr-xl"
    >
      <div class="profile-details-wrapper">
        <img class="profile-picture q-mt-sm" src="~/src/assets/no_signal.png" />
        <div class="profile-details">
          <span style="font-size: 16px" class="text-weight-bold"
            >You're offline now. Oops! </span
          ><br />
          <span style="font-size: 12px"> Internet is diconnected.</span>
        </div>
      </div>
    </div>
  </div>
  <div style="height: auto; width: 100vw">
    <DrawerRight />
    <div style="border-radius: 4px">
      <div style="margin: 0 auto">
        <p
          style="text-align: center; color: #000000f5; font-size: 15px"
          class="text-font-weight-bold staff-name text-capitalize"
        >
          Hello, {{ userDetails.first_name }} {{ userDetails.last_name }}
        </p>
      </div>

      <div align="center" class="row">
        <div
          style="text-align: center"
          class="col ma-auto"
          cols="9"
          sm="4"
          md="3"
          lg="2"
          xl="2"
          align="center"
        >
          <div class="mb-3">
            <p
              class="text-center text-weight-medium text-capitalize"
              style="
                color: #1b3564;
                font-size: 12px;
                text-transform: capitalize;
              "
            >
              <img
                style="height: 14.22px; width: 16px"
                class="q-mr-sm"
                src="~/src/assets/store.png"
              />

              {{ branchLocation.club_name }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="row pa-0" v-if="switchCamera === 1">
      <div class="col pa-0">
        <qrcode-stream :camera="camera" @decode="onDecode" @init="onInit">
        </qrcode-stream>
      </div>
    </div>

    <QrBottons />
  </div>

  <q-dialog v-model="dialog" persistent maximized style="border-radius: 10px">
    <q-card style="border-radius: 10px">
      <div
        class="text-h5"
        :style="
          dataScanned.card_status == 'Active'
            ? ' background-color: #4baf4f;'
            : dataScanned.card_status == 'Blocked'
            ? 'background-color: #FF3838'
            : dataScanned.card_status == 'Expired'
            ? 'background-color: #F29C38'
            : dataScanned.card_status == 'Cancelled'
            ? 'background-color: #00000073'
            : ''
        "
      >
        <p style="text-align: center; font-size: 18px; color: #fff">
          {{ dataScanned.card_status }}
        </p>
      </div>
      <form @submit.prevent.stop="customerEntry()">
        <div style="text-align: center">
          <p class="mt-3" style="text-align: center; font-size: 20px">
            Member Info
          </p>
          <img
            style="height: 88px; width: 88px; border-radius: 42px;"
            :src="'data:image/png;base64,'+dataScanned.photo"
          />
          <p class="customer-name text-weight-medium">{{ dataScanned.first_name }} {{ dataScanned.last_name }}</p>
          <p class="customer-card-no-label text-weight-medium q-mb-none">
            Membership Card Number / Type
          </p>
          <p class="customer-card-no text-weight-medium q-mb-sm">
            {{ dataScanned.card_number }}
          </p>

          <div class="row" align="center" justify="center">
            <div
              class="col col-xs-5 col-sm-3 col-md-2 col-lg-2 col-xl-2"
              style="margin: auto"
            >
              <div
                class="q-pa-md"
                :style="dataScanned.membership_type == 'Gold'?'background-color:#f9a825':'background-color: #CDCDCD'"
                style="
                  border-radius: 4px;
                  text-align: center;
                  color: #fff;">
                {{ dataScanned.membership_type }} Member
              </div>
            </div>
          </div>
          <p class="customer-card-no-label q-mt-md text-weight-medium q-mb-xs">
            Volume Shopper
          </p>
          <p class="customer-card-no text-weight-medium">
            {{ dataScanned.volume_shopper == 0 ? "No" : "Yes" }}
          </p>

          <p class="customer-card-no-label q-mt-md text-weight-medium q-mb-xs">
            Input Number of Companion
          </p>
          <p class="companion-label text-weight-medium q-mb-xs q-mt-md">Male</p>

          <div class="row" align="center" justify="center">
            <div cols="3" sm="1" class="col q-mr-sm" align="right">
              <q-btn
                style="height: 49px; background-color: #00000073"
                color="#0000004D"
                @click="maleAdultCount('minus')"
                ><img style="width: 15px" src="~/src/assets/minus.png"
              /></q-btn>
            </div>
            <div class="col col-xs-5 col-sm-4 col-md-3 col-lg-3 col-xl-2">
              <q-input
                input-class="text-center"
                mask="###"
                v-model="maleAdult"
                outlined
                @update:model-value="onInputCompanion(maleAdult)"
                maxLength="3"
              />
            </div>

            <div cols="3" sm="1" class="col q-ml-sm" align="left">
              <q-btn
                style="height: 49px; background-color: #1b3564"
                color="#1B3564"
                @click="maleAdultCount('add')"
              >
                <q-img style="width: 15px" src="~/src/assets/plus.png"
              /></q-btn>
            </div>
          </div>

          <p class="companion-label text-weight-medium q-mb-xs q-mt-md">
            Female
          </p>
          <div class="row" align="center" justify="center">
            <div cols="3" sm="1" class="col q-mr-sm" align="right">
              <q-btn
                style="height: 49px; background-color: #00000073"
                color="#0000004D"
                @click="femaleCount('minus')"
                ><img style="width: 15px" src="~/src/assets/minus.png"
              /></q-btn>
            </div>
            <div class="col col-xs-5 col-sm-4 col-md-3 col-lg-3 col-xl-2">
              <q-input
                input-class="text-center"
                mask="###"
                v-model="female"
                outlined
                @update:model-value="onInputCompanionFemale(female)"
                maxLength="3"
              />
            </div>

            <div cols="3" sm="1" class="col q-ml-sm" align="left">
              <q-btn
                style="height: 49px; background-color: #1b3564"
                color="#1B3564"
                @click="femaleCount('add')"
              >
                <q-img style="width: 15px" src="~/src/assets/plus.png"
              /></q-btn>
            </div>
          </div>
        </div>

        <div class="row" style="margin: auto">
          <div
            class="col col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-5 q-pa-sm"
            style="margin: auto"
          >
            <q-btn class="continue-btn q-mt-lg" @click="customerEntry()"
              >Submit</q-btn
            >
          </div>
        </div>
      </form>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { useRouter } from "vue-router";
import DrawerRight from "src/components/DrawerRight.vue";
import Helpers from "src/helpers";
import { ref, onBeforeMount } from "vue";
import { QrcodeStream } from "qrcode-reader-vue3";
import QrBottons from "src/components/QrButtons.vue";
import { branchNumberOfPeople } from "src/stores/scanner/scan";
import { useBranchLocation } from "src/stores/location/branch_location";
import { userToken } from "src/stores/auth/login";
import { authStore } from "src/stores/auth";
import { APISettings } from "src/utilities/env";

const { api, showDialog } = Helpers();
const isOnline = ref("");
const router = useRouter();
const auth = authStore();
const drawer = ref();
const dataScanned = ref("");
const dialog = ref(false);
const maleAdult = ref(0);
const female = ref(0);
const selectedScan = ref("qr");
const switchCamera = ref(1);
const camera = ref("auto");
const showScanConfirmation = ref(false);
const numberOfPeople = branchNumberOfPeople();
const storeuserDetails = userToken();
const userDetails = ref({});
const showDrawer = ref(false);
const branchLocation = useBranchLocation();
onBeforeMount(() => {
  if (auth.profile.token == "") {
    router.push({ path: "dcs/login" });
  }
  getUserDetails();
});
const onInit = async (promise) => {
  try {
    await promise;
  } catch (e) {
    console.error(e);
  } finally {
    showScanConfirmation.value = camera.value === "off";
  }
};

const onInputCompanionMale = (arg) => {
  var num = Number(arg);
  if (num < 100) {
    let number = parseInt(num, 10);
    maleAdult.value = number.toString();
  }
  if (num > 100) {
    var val = Math.floor(num / 10);
    maleAdult.value = 0;
  }
};

const onInputCompanionFemale = (arg) => {
  var num = Number(arg);
  if (num < 100) {
    let number = parseInt(num, 10);
    female.value = number.toString();
  }
  if (num > 100) {
    var val = Math.floor(num / 10);
    female.value = 0;
  }
};

const onDecode = async (args) => {
  console.log(args);
  verifyQr(args);
};

const verifyQr = async (param) => {
  console.log(param);
  const obj = JSON.parse(param);
  const response = await api({
    method: "GET",
    module: "dcs",
    url: `/dcs-service/qrocr/verify-qr?mrmId=${obj.mrmId}&hashCode=${obj.hashCode}`,
  });
  console.log(response);
  if (!response.ok) {
    if (response.error.status == 422) {
    const dialog = showDialog({
        title: `Alert`,
        msg: response.error.data.message,
        color: "primary",
        ok: 'Ok',
        })
      if (!dialog) next();
      dialog.then((res) => {
        if (res) next();
      });
    }else{
      next();
    }
  } else {
    dataScanned.value = response.data.data;
    dialog.value = true;
  }
  pause();
  await timeout(500);
  unpause();
};
const pause = () => {
  camera.value = "off";
};
const unpause = () => {
  camera.value = "auto";
};
const timeout = (ms) => {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
};
const popUp = (args) => {
  dialog.value = args;
};
const maleAdultCount = (args) => {
  if (args == "add" && maleAdult.value < 100) {
    maleAdult.value++;
  } else if (args == "minus") {
    if (maleAdult.value != 0) {
      maleAdult.value--;
    }
  }
};
const femaleCount = (args) => {
  if (args == "add" && female.value < 100) {
    female.value++;
  } else if (args == "minus") {
    if (female.value != 0) {
      female.value--;
    }
  }
};
const selectScanner = (args) => {
  selectedScan.value = args;

  console.log(args);
  if (args === "qr") {
    switchCamera.value = 1;
  } else if (args === "ocr") {
    switchCamera.value = 2;
  } else {
    switchCamera.value = 1;
  }
};
const customerEntry = async () => {
  if (navigator.onLine == true) {
      const response = await api({
        method: "POST",
        module: "dcs",
        url: `/dcs-service/qrocr/customer-entrance-record`,
        data: {
          maleCompanion: maleAdult.value,
          femaleCompanion: female.value,
          mrmId: dataScanned.value.mrm_id,
          type: "QR",
        },
      })
        console.log(response.data.data);
        console.log(response.status);
        maleAdult.value = 0;
        female.value = 0;
        dialog.value = false;
  } else if (navigator.onLine == false) {
    isOnline.value = true;
    setTimeout(() => {
      isOnline.value = false;
    }, "3000");
  }
};
const getUserDetails = async () => {
  // try {
    const response = await api({
      method: "GET",
      module: "dcs",
      url: `/dcs-service/user/details`,
    })
    console.log(response)
    if(response.ok){
      console.log(response.data.data);
        userDetails.value = response.data.data;
      storeuserDetails.first_name = userDetails.value.first_name;
      storeuserDetails.last_name = userDetails.value.last_name;
      (storeuserDetails.password = userDetails.value.vpassword),
        (storeuserDetails.email = userDetails.value.email),
        (storeuserDetails.mobile = userDetails.value.mobile_number),
        (storeuserDetails.location = userDetails.value.club_location),
        (storeuserDetails.username = userDetails.value.username);
    }
};
</script>
<style scoped>
.acct-setting {
  font-size: 14px;
  color: #00000073;
}

.continue-btn {
  width: 100%;
  background-color: #1b3564;
  color: #fff;
}

.btn-cam-switch {
  font-size: 15px;
}

.scan-top-txt {
  font-size: 14px;
}

.customer-name {
  color: black;
  font-size: 18px;
  text-align: center;
}

.customer-card-no-label {
  font-size: 14px;
  text-align: center;
  color: #00000073;
}

.customer-card-no {
  font-size: 18px;
  text-align: center;
  color: #090909;
}

:deep(.centered-input input) {
  text-align: center;
}

.btn-cam-switch {
  font-size: 15px;
}

.selectedScan {
  background-color: #00000073;
  color: #fffffff5;
}

.unSelectedScan {
  background-color: #00000033;
  color: #00000073;
}

.q-dialog__inner--maximized > div {
  height: 86%;
  width: 97%;
}

.q-dialog__inner--maximized > div {
  border-radius: 4px !important;
}
.companion-label {
  font-size: 18px;
}
</style>