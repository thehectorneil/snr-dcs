<template>
  <div class="row justify-center items-center q-pa-sm">
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
          Hello, {{ storeLogin.first_name }} {{ storeLogin.last_name }}
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

    <div id="app" class="web-camera-container" align="center">
      <!-- <div class="camera-button">
       <button type="button" class="button is-rounded"
         :class="{ 'is-primary': !isCameraOpen, 'is-danger': isCameraOpen }" @click="toggleCamera">
         <span v-if="!isCameraOpen">Open Camera</span>
         <span v-else>Close Camera</span>
       </button>
     </div> -->

      <div
        v-show="isCameraOpen && isLoading"
        class="camera-loading"
        style="margin-bottom: 100px"
      >
        <ul class="loader-circle">
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <!-- capture -->
      <div
        v-if="isCameraOpen"
        v-show="!isLoading"
        class="camera-box"
        :class="{ flash: isShotPhoto }"
        style="position: relative"
      >
        <div class="camera-shutter" :class="{ flash: isShotPhoto }"></div>

        <video
          v-show="!isPhotoTaken"
          :srcObject="camera"
          ref="vid"
          style="width: 100%"
          webkit-playsinline
          playsinline
          autoplay
        ></video>
        <div style="text-align: center">
          <canvas
            v-show="isPhotoTaken"
            id="photoTaken"
            :width="380"
            :height="380"
            ref="canvas"
          ></canvas>
        </div>
        <q-btn
          v-if="isCameraOpen && !isLoading && !isPhotoTaken"
          class="q-mx-md q-mb-sm"
          style="
            height: 50px;
            background-color: #1b3564;
            width: 94%;
            position: absolute;
            bottom: 10px;
            opacity: 0.9;
            border-radius: 28px;
            left: 0;
            right: 0;
          "
          @click="takePhoto()"
        >
          <span style="text-transform: capitalize; color: #ffffff"
            >Capture Image</span
          >
        </q-btn>
      </div>
      <div
        v-if="isPhotoTaken && isCameraOpen"
        align="center"
        class="camera-download"
        style="padding-top: 20px; padding-bottom: 20px"
      >
        <!-- <a id="downloadPhoto" download="my-photo.jpg" class="button" role="button" @click="downloadImage">
         Scan Image
       </a> -->
        <q-btn id="downloadPhoto" color="primary" @click="scanImage">
          Scan Image
        </q-btn>
      </div>
      <!-- <div v-if="isCameraOpen && !isLoading"> -->
      <!-- <button type="button" class="button" @click="takePhoto()">
         <img src="https://img.icons8.com/material-outlined/50/000000/camera--v2.png">
       </button> -->
      <q-btn
        v-if="isCameraOpen && !isLoading && isPhotoTaken"
        style="
          height: 50px;
          margin-top: 0px;
          background-color: #1b3564;
          width: 94%;
          border-radius: 28px;
          margin: auto;
        "
        @click="takePhoto()"
      >
        <span style="text-transform: capitalize; color: #ffffff"
          >Recapture Image
        </span>
      </q-btn>
    </div>
  </div>
  <div class="text-center">
    <q-dialog v-model="NotRecognizedialog">
      <q-card align="center" class="q-pa-sm">
        <q-card-section>
          OCR cannot recognize text on the image. Please try again.
        </q-card-section>

        <q-btn color="primary" block @click="NotRecognizedialog = false"
          >Close</q-btn
        >
      </q-card>
    </q-dialog>
  </div>
  <QrBottons />
  <q-dialog v-model="scanLoadingdialog" :scrim="false" persistent>
    <q-card color="primary">
      <q-card-section>
        Scanning image...
        <q-linear-progress indeterminate class="q-mb-sm" />
        <!-- <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear> -->
      </q-card-section>
    </q-card>
  </q-dialog>

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
            ? 'background-color: #2DCCFF'
            : dataScanned.card_status == 'Cancelled'
            ? 'background-color: #00000073'
            : ''
        "
      >
        <p style="text-align: center; font-size: 18px; color: #fff">
          {{ dataScanned.card_status }}
        </p>
      </div>
      <!-- <form @submit.prevent.stop="customerEntry()"> -->
      <div style="text-align: center">
        <p class="mt-3" style="text-align: center; font-size: 20px">
          Member Info
        </p>
        <img
          style="height: 88px; width: 88px; border-radius: 42px"
          :src="'data:image/png;base64,' + dataScanned.photo"
        />
        <p class="customer-name text-weight-medium">
          {{ dataScanned.first_name }} {{ dataScanned.last_name }}
        </p>
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
              @update:model-value="onInputCompanionMale(maleAdult)"
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

        <p class="companion-label text-weight-medium q-mb-xs q-mt-md">Female</p>
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
      <!-- </form> -->
    </q-card>
  </q-dialog>
</template>
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
<script setup>
import { ref, onBeforeMount, onMounted } from "vue";
import DrawerRight from "src/components/DrawerRight.vue";
import QrBottons from "src/components/QrButtons.vue";
import { useRouter } from "vue-router";
import { userToken } from "src/stores/auth/login";
import { authStore } from "src/stores/auth";
import { useBranchLocation } from "src/stores/location/branch_location";
import { createWorker, PSM, OEM } from "tesseract.js";
import Helpers from "src/helpers";

const auth = authStore();
const dataScanned = ref("");
const dialog = ref(false);
const maleAdult = ref(0);
const female = ref(0);
const customerAccountID = ref("");
const branchLocation = useBranchLocation();
const storeLogin = userToken();
const userDetails = ref({});
const router = useRouter();
const isOnline = ref("");
const isCameraOpen = ref(false);
const isPhotoTaken = ref(false);
const isShotPhoto = ref(false);
const isLoading = ref(false);
const { api } = Helpers();

const NotRecognizedialog = ref(false);
const scanLoadingdialog = ref(false);

const camera = ref(null);
const canvas = ref(null);
const vid = ref(null);

const worker = createWorker({
  logger: (m) => console.log(m),
});

onBeforeMount(() => {
  if (auth.profile.token == "") {
    router.push({ path: "dcs/login" });
  }
});

onMounted(() => {
  isCameraOpen.value = true;
  createCameraElement();
});

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

const customerEntry = async () => {
  if (navigator.onLine == true) {
    try {
        const response = await api({
    method: 'POST',
    module: 'dcs',
    url: `/dcs-service/qrocr/customer-entrance-record`,
      data: {
          maleCompanion: maleAdult.value,
          femaleCompanion: female.value,
          mrmId: dataScanned.value.mrm_id,
          type: "OCR",
        },
      }).then((response) => {
        console.log(response.data.data);
        console.log(response.status);
        maleAdult.value = 0;
        female.value = 0;
        dialog.value = false;
        router.push({ path: "/scanner" });
      });
    } catch (e) {
      console.log(e);
    }
  } else if (navigator.onLine == false) {
    isOnline.value = true;
    setTimeout(() => {
      isOnline.value = false;
    }, "3000");
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

const createCameraElement = () => {
  isLoading.value = true;

  const constraints = {
    audio: false,
    // video: true,
    video: {
      facingMode: { exact: "environment" },
    },
  };

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      isLoading.value = false;
      camera.value = stream;
    })
    .catch((error) => {
      isLoading.value = false;
      alert("May the browser didn't support or there is some errors.");
      console.log(error);
    });
};

const stopCameraStream = () => {
  const tracks = camera.value.getTracks();

  tracks.forEach((track) => {
    track.stop();
  });
};

const takePhoto = () => {
  if (!isPhotoTaken.value) {
    isShotPhoto.value = true;

    const FLASH_TIMEOUT = 50;

    setTimeout(() => {
      isShotPhoto.value = false;
    }, FLASH_TIMEOUT);
  }

  isPhotoTaken.value = !isPhotoTaken.value;

  const context = canvas.value.getContext("2d");
  console.log(context);
  console.log(camera.value);
  console.log(vid.value);
  context.drawImage(vid.value, 0, 0, 450, 337.5);
  // this.downloadImage(context.drawImage(this.$refs.camera, 0, 0, 450, 337.5));
};

const scanImage = async () => {
  scanLoadingdialog.value = true;
  // const download = document.getElementById("downloadPhoto");
  const canvas = document
    .getElementById("photoTaken")
    .toDataURL("image/jpeg")
    .replace("image/jpeg", "image/octet-stream");
  // download.setAttribute("href", canvas);

  // console.log(canvas);
  customerAccountID.value = await recognize(canvas);

  scanLoadingdialog.value = false;
  if (customerAccountID.value.length === 16) {
    //alert(customerAccountID.value)
    customerInfo();
  } else {
    NotRecognizedialog.value = true;
  }
};
const customerInfo = async () => {
    scanLoadingdialog.value = false;
    const response = await api({
    method: 'GET',
    module: 'dcs',
    url: `/dcs-service/qrocr/verify-ocr?cardNumber=${customerAccountID.value}`,
      })
      
      console.log(response);
if(response.ok){
   dataScanned.value = response.data.data;
   dialog.value = true;
}
else if(!response.ok){
  if(response.error.status == 422){
     alert("Record does not match.");
  }
}
};
const recognize = async (canvas) => {
  const img = canvas;
  await worker.load();
  await worker.loadLanguage("eng");
  await worker.initialize("eng", OEM.LSTM_ONLY);
  await worker.setParameters({
    tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
  });
  const {
    data: { text },
  } = await worker.recognize(img);
  console.log(text.indexOf("|"));

  var i = text.indexOf("|");
  var sample = text.split("|")[1];
  var id = sample.split("\n")[0];
  //alert(text.substring(1, i).replace(/\D/g, ""));
  // const afterLastSlash = text.substring(text.lastIndexOf("|") + 0);
  // const afterLastS = text.substring(text.lastIndexOf("|") + 1);
  // const afterLast = text.substring(text.lastIndexOf("|") + 2);

  // var x = text.substring(1, i).replace(/\D/g, "");
  id = id.replace(/\s/g, "");
  id = id.substring(0, 16);

  //var y = afterLastSlash.substring(1, i).replace(/\D/g, "");

  // this.dialog = true;
  // this.cleantext(text);
  // alert(text)
  // alert(y)
  scanLoadingdialog.value = false;
  return id;
};
</script>
