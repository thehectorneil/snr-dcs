<template>
  <div>
    <div>
      <q-banner
        inline-actions
        style="padding-top: 31px; padding-bottom: 30px"
        class="text-black bg-white q-pa-lg"
      >
        <span class="text-bold" style="font-size: 1.2rem"
          >Edit Featured Image</span
        >

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
            color="grey-5"
            @click="goToList"
            label="Cancel"
            no-caps
            unelevated
          />
          <q-btn
            class="q-mr-sm"
            color="primary"
            @click="onSubmit"
            :loading="saving"
            :disable="isSaveDisable"
            label="Save"
            no-caps
            unelevated
          />
        </template>
      </q-banner>

      <q-card class="my-card q-ma-lg">
        <q-banner inline-actions class="text-black bg-white q-pa-lg">
          <div style="max-width: 500px">
            <span class="text-bold" style="font-size: 1.2rem"
              >User Details</span
            >
          </div>

          <div v-if="isloading">
            <q-card-section class="q-py-none q-mt-md">
              <span class="text-weight-medium"
                ><q-skeleton type="text" width="100px" />
              </span>

              <q-skeleton type="QInput" width="50%" />
            </q-card-section>

            <q-card-section class="q-py-none q-my-md">
              <div class="">
                <span class="text-weight-medium"
                  ><q-skeleton type="text" width="100px"
                /></span>
              </div>
              <div class="" style="max-width: 40%">
                <q-skeleton height="200px" square />
                 <q-skeleton type="QBtn" class="q-mt-sm" width="100%"/>
              </div>
            </q-card-section>

            <q-card-section class="q-py-none">
              <span class="text-weight-medium"
                ><q-skeleton type="text" width="100px" />
              </span>

              <q-skeleton type="QInput" width="65%" />
            </q-card-section>
          </div>

          <div v-else>
            <div class="row">
              <div class="col-6 q-mt-md">
                <span class="text-bold">Card Title</span>
                <q-input
                  outlined
                  dense
                  maxlength="50"
                  type="text"
                  v-model="featuredData.card_title"
                  @update:model-value="onInputEmojis(featuredData.card_title, 'cardTitle')"
                  @paste="(evt) => disablePaste(evt)"
                  ref="cardTitleRef"
                  :rules="cardTitleRules">
                  <!-- test -->
                </q-input>
              </div>
            </div>
            <div class="row">
              <div class="col-4">
                <div class="">
                  <div class="q-mb-sm">
                    <span class="text-bold">Image</span>
                  </div>

                  <img
                    :src="featuredData.image"
                    style="max-height: 100%; max-width: 100%"
                    alt=""
                  />
                  <p
                    class="q-mb-none text-red-5 text-bold"
                    style="font-size: 0.7rem"
                    v-if="largeFile"
                  >
                    Please upload a file not more than 10mb.
                  </p>

                  <div class="form-input">
                    <div>
                      <label
                        for="file-ip-1"
                        class="q-mx-auto"
                        style="font-size: 0.8rem"
                        >Change Image</label
                      >

                      <input
                        type="file"
                        multiple
                        id="file-ip-1"
                        accept="image/png, image/jpeg"
                        data-max-size="2048"
                        @change="showPreview()"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-8 q-mt-md">
                <span class="q-mb-sm text-bold">Link</span>
                <q-input
                ref="linkRef"
                  outlined
                  v-model="featuredData.link"
                  dense
                  maxlength="100"
                  type="text"
                  :rules="linkRules"
                  @update:model-value="onInputEmojis(featuredData.link, 'link')">
                    <!-- test -->
                </q-input>
              </div>
            </div>
          </div>
        </q-banner>

        <q-separator />
      </q-card>
    </div>
  </div>
</template>
<script setup>
import { useQuasar } from "quasar";
import { ref, onMounted, watch } from "vue";
import { authStore } from "src/stores/auth";
import { useRouter, onBeforeRouteLeave  } from "vue-router";
import { useSelectedUser } from "src/stores/users";
import { APISettings } from "src/utilities/env";
import { userAlert } from "src/stores/alerts/alerts";
import Helpers from "src/helpers";

const { api, showDialog } = Helpers();

const storeAlert = userAlert();
const auth = authStore();
const users = useSelectedUser();
const router = useRouter();
const featuredData = ref("");
const largeFile = ref(false);
const isSaveDisable = ref(false);
const fileSize = ref(10534243);
const $q = useQuasar();
const initialData = ref({
  card_title: "",
  image: "",
  link: "",
});
const cardTitleRef = ref(null);
const linkRef = ref(null);

const saving = ref(false);
const bypassRouteLeave = ref(false);
const isloading = ref(true)

const cardTitleRules = ref([
  (val) => !!val || "Please provide input on required information.",
  (val) => val.length >= 1 || "Min 1 character",
  (val) => val.length <= 50 || "Max 50 character",
]);
const linkRules = ref([
  (val) => val.length >= 1 || "Min 1 character",
  (val) => val.length <= 100 || "Max 100 character",
]);
watch(
  [() => featuredData.value.card_title, () => featuredData.value.link],
  () => {
    if (
      featuredData.value.card_title.length == 0 ||
      featuredData.value.link.length == 0
    ) {
      isSaveDisable.value = true;
    } else {
      isSaveDisable.value = false;
    }
  }
);

onMounted(() => {
  getFeatureDetail();
});

const getFeatureDetail = async (args) => {
  const response = await api({
    method: "GET",
    url: `/cms-service/content/featured/${users.userData.user_id}`,
  });

  if (response.ok) {
    isloading.value = false
    initialData.value.card_title = response.data.data.card_title;
    initialData.value.image = response.data.data.image;
    initialData.value.link = response.data.data.link;
    featuredData.value = response.data.data;
    if (
      response.data.data.card_title != "" &&
      response.data.data.image != "" &&
      response.data.data.link != ""
    ) {
      isSaveDisable.value = false;
    } else {
      isSaveDisable.value = true;
    }
  }
};
const goToList = () => {
  router.push({ name: "Featured" });
};
const showPreview = async () => {
  console.log(event);
  const currentFileSize = event.target.files[0].size;
  if (currentFileSize < fileSize.value) {
    largeFile.value = false;
    console.log(event.target.files[0].type);
    if (
      event.target.files[0].type !== "image/jpeg" &&
      event.target.files[0].type !== "image/png"
    ) {
      // image not jpg and png
      $q.notify({
        type: "negative",
        message: "Please upload JPEG and PNG files only.",
      });
    } else {
      await getImage(event.target.files[0]);
    }
  } else {
    largeFile.value = true;
  }
};
const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    // reader.onloadend = (e) => resolve(imageToDataUri(e, 400, 400))
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
const getImage = (file) => {
  return new Promise((resolve, reject) => {
    getBase64(file)
      .then((data) => {
        featuredData.value.image = data;
      })
      .catch(() => {
        this.$q.notify({
          color: "negative",
          message: "Failed to convert file...",
        });
        reject();
      });
  });
};
const onInputEmojis = (string, arg) => {
  var regex = string.replace(/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g, '');
  if(arg == 'link'){
    featuredData.value.link = regex
  }else if(arg == 'cardTitle'){
featuredData.value.card_title = regex
  }
}
const disablePaste = (evt) => {
    evt.preventDefault();
}
const checkBeforeSubmit = () => {
  const onSubmit = () => {
    cardTitleRef.value.validate();
    linkRef.value.validate();
    if (cardTitleRef.value.hasError || linkRef.value.hasError) {
      console.log("there is an error");
    } else {
      onSubmit();
    }
  };
};
const onSubmit = async () => {
  saving.value = true;

  const response = await api({
    method: "POST",
    url: `/cms-service/content/featured/update`,
    data: {
      id: featuredData.value.id,
      card_title: featuredData.value.card_title,
      image: featuredData.value.image,
      link: featuredData.value.link,
    },
  });

  if (response.ok) {
    saving.value = false;
    storeAlert.show_success = true;
    setTimeout(() => {
      storeAlert.show_success = false;
      bypassRouteLeave.value = true;
      router.push({ name: "Featured" });
    }, "3000");
  } else {
    saving.value = false;
  }
};

const checkChanges = () => {
  var a = initialData.value.card_title == featuredData.value.card_title;
  var b = initialData.value.image == featuredData.value.image;
  var c = initialData.value.link == featuredData.value.link;

  if (a && b && c) {
    return true;
  } else {
    return false;
  }
};
const closeNotification = () => {
  storeAlert.show_success = false;
};

//This is the guard used to block accidental redirection
onBeforeRouteLeave((to, from, next) => {
  if (checkChanges()) {
    next();
  } else {
    if (!bypassRouteLeave.value) {
      const dialog = showDialog({
        title: `Leave Page?`,
        msg: `You are about to leave this page without saving. All changes will be lost. Do you really want to leave without saving?`,
        color: 'primary',
        isCancel: true,
        isOk: true,
        okLabel: `Proceed`,
        cancelLabel: `Cancel`,
        })
      if (!dialog) next();
      dialog.then((res) => {
        if (res) next();
      });
    }else{
      next();
    }
  }
});
</script>

<style scoped>
.toast-success {
  background-color: #67ac5b;
  position: absolute;
  left: 32%;
  right: auto;
  top: 15px;
}

.form-input img {
  width: 100%;
  display: none;
  margin-bottom: 30px;
}

.form-input input {
  display: none;
}

.form-input label {
  display: block;
  width: 100%;
  line-height: 40px;
  text-align: center;
  background: #1b3564;
  color: #fff;
  font-size: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
}

.hidden-input {
  opacity: 0;
  overflow: hidden;
  position: absolute;
  width: 1px;
  height: 1px;
}

.file-label {
  font-size: 20px;
  display: block;
  cursor: pointer;
}
</style>