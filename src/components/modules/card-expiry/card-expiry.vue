<template>
  <div style="padding-bottom: 50px">
    <q-banner
      inline-actions
      style="padding-top: 31px; padding-bottom: 30px"
      class="text-black bg-white q-pa-lg"
    >
      <span class="text-bold" style="font-size: 1.2rem"
        >Card Expiry Notification</span
      >
      <template v-slot:action>
        <!-- <q-btn class="q-mr-sm " color="primary" label="Sync" no-caps unelevated /> -->
      </template>
    </q-banner>

    <!-- SKELETON -->
    <!-- <q-card class="my-card q-ma-lg" style="padding-bottom: 50px" v-if="skeletonLoading">
      <q-banner inline-actions class="text-black bg-white q-pa-lg">
        <div style="max-width: 500px">
          <span class="text-bold" style="font-size: 1.2rem"
            >Notification Details</span
          >
        </div>
      </q-banner>   

      <hr />

        <q-card-section>
          <div class="my-card q-mx-lg q-my-sm">
            <span class="text-weight-medium"><q-skeleton type="text" width="200px"/></span>
          </div>
          <div class="row">
            <div class="col-6 q-pl-lg q-mr-md">
                <q-skeleton height="200px" square />
            </div>
            <div class="col-5">
                <q-skeleton height="200px" square />
            </div>
          </div>
        </q-card-section>

        <q-card-section>
          <div class="my-card q-mx-lg q-my-sm">
            <span class="text-weight-medium"><q-skeleton type="text" width="200px"/></span>
          </div>
          <div class="q-mx-lg q-my-sm" style="max-width: 80%">            
            <q-skeleton height="200px" square />
          </div>
        </q-card-section>

        <q-card-section class="q-mx-lg q-my-sm">
          <span class="text-weight-medium"
            ><q-skeleton type="text" width="200px"/>
        </span>         
        
        <q-skeleton type="QInput" width="40%"/>
        </q-card-section>

        <q-card-section class="q-mx-lg q-my-sm">
            <q-skeleton type="QBtn" width="10%"/>
        </q-card-section>
    </q-card> -->
    <!-- SKELETON -->

    <q-card class="my-card q-ma-lg" style="padding-bottom: 150px">
      <q-banner inline-actions class="text-black bg-white q-pa-lg">
        <div style="max-width: 500px">
          <span class="text-bold" style="font-size: 1.2rem"
            >Notification Details</span
          >
        </div>
      </q-banner>

      <hr />

      <form @submit.prevent.stop="onSubmit()">
        <q-card-section>
          <div class="my-card q-mx-lg q-my-sm">
            <div class="row">
              <div class="col-6"><span class="text-weight-medium">Image Header</span></div>
              <div class="col-6 text-center" v-if="showPreviewText"><span class="text-weight-medium">Preview</span></div>
            </div>
            
          </div>

          <div class="row">
            <div class="col-6">
              <div class="my-card q-mx-lg q-my-sm">
                <div
                  class="form-input"
                  @dragover.prevent
                  @drop.prevent
                  @drop="dragFile"
                >
                  <div>
                    <p class="text-center q-mb-none" style="font-size: 0.8rem">
                      Drop your files here
                    </p>
                    <p class="text-center q-mb-sm" style="font-size: 0.8rem">
                      or
                    </p>
                    <label
                      for="file-ip-1"
                      class="q-mx-auto"
                      style="font-size: 0.8rem"
                      >Select File</label
                    >

                    <input
                      type="file"
                      multiple
                      id="file-ip-1"
                      accept="image/png, image/jpeg"
                      data-max-size="2048"
                      v-bind="dataPhoto"
                      @change="showPreview()"
                    />

                    <p
                      class="text-center q-mt-sm text-grey-6"
                      style="font-size: 0.7rem"
                    >
                      Maximum upload size: 10 MB
                    </p>
                  </div>
                </div>
                <p
                  class="q-mb-none q-pt-sm text-grey-6"
                  style="font-size: 0.7rem"
                >
                  Allowed file types: jpeg, png
                </p>
                <p
                  class="q-mb-none text-red-5 text-bold"
                  style="font-size: 0.7rem"
                  v-if="largeFile"
                >
                  Please upload a file not more than 10mb.
                </p>
              </div>
            </div>
            <div class="col-6">
              <div class="preview text-center">
                <img id="file-ip-1-preview" class="q-mx-auto" 
                loading="eager"/>
              </div>
            </div>
          </div>
        </q-card-section>

        <q-card-section>
          <div class="my-card q-mx-lg q-my-sm">
            <span class="text-weight-medium">Content</span>
          </div>
          <div class="q-mx-lg" style="max-width: 80%">
            <q-field
              ref="editorRef"
              v-model="qeditor"
              @update:model-value="onInputEmojis(qeditor, 'qeditor')"
              label-slot
              borderless
              :rules="editorRules"
            >
              <template #control>
                <q-editor
                  style="width: 100%; padding-top: none !important;"
                  @paste="(evt) => onInputImages(evt)"
                  @drop="(evt) => onInputImages(evt)"
                  @focusout="fillIn('editor')"
                  :style="
                    editorRef && editorRef.hasError
                      ? 'border-color: #C10015'
                      : ''
                  "
                  placeholder="Type here..."
                  v-model="qeditor"
                  @update:model-value="onInputEmojis(qeditor, 'qeditor')"
                  :dense="$q.screen.lt.md"
                  :toolbar="[
                    [
                      {
                        label: $q.lang.editor.align,
                        icon: $q.iconSet.editor.align,
                        fixedLabel: true,
                        list: 'only-icons',
                        options: ['left', 'center', 'right', 'justify'],
                      },
                    ],
                    [
                      'bold',
                      'italic',
                      'strike',
                      'underline',
                      'subscript',
                      'superscript',
                    ],
                    ['token', 'hr', 'link', 'custom_btn'],
                    ['print', 'fullscreen'],
                    [
                      {
                        label: $q.lang.editor.formatting,
                        icon: $q.iconSet.editor.formatting,
                        list: 'no-icons',
                        options: [
                          'p',
                          'h1',
                          'h2',
                          'h3',
                          'h4',
                          'h5',
                          'h6',
                          'code',
                        ],
                      },
                      {
                        label: $q.lang.editor.fontSize,
                        icon: $q.iconSet.editor.fontSize,
                        fixedLabel: true,
                        fixedIcon: true,
                        list: 'no-icons',
                        options: [
                          'size-1',
                          'size-2',
                          'size-3',
                          'size-4',
                          'size-5',
                          'size-6',
                          'size-7',
                        ],
                      },
                      {
                        label: $q.lang.editor.defaultFont,
                        icon: $q.iconSet.editor.font,
                        fixedIcon: true,
                        list: 'no-icons',
                        options: [
                          'default_font',
                          'arial',
                          'arial_black',
                          'comic_sans',
                          'courier_new',
                          'impact',
                          'lucida_grande',
                          'times_new_roman',
                          'verdana',
                        ],
                      },
                      'removeFormat',
                    ],
                    ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

                    ['undo', 'redo'],
                    ['viewsource'],
                  ]"
                  :fonts="{
                    arial: 'Arial',
                    arial_black: 'Arial Black',
                    comic_sans: 'Comic Sans MS',
                    courier_new: 'Courier New',
                    impact: 'Impact',
                    lucida_grande: 'Lucida Grande',
                    times_new_roman: 'Times New Roman',
                    verdana: 'Verdana',
                  }"
                />
              </template>
            </q-field>
          </div>
        </q-card-section>

        <q-card-section class="q-mx-lg q-my-sm">
          <span class="text-weight-medium"
            >Show notification before
            <span style="color: #00000080">(days)</span></span
          >
          <q-input
            outlined
            ref="notificationBeforeRef"
            maxlength="4"
            v-model="daysNotification"
            dense
            style="width: 45%; padding-bottom: 5px"
            :rules="notificationDaysRules"
            @keypress="isNumber($event)"
            @focusout="notMoreThan1000()"
            @paste="(evt) => disablePaste(evt)"
            :bg-color="exceededDays ? 'red-3' : ''"
            @update:model-value="
              onInputEmojis(daysNotification, 'daysNotification')
            "
          >
            <template v-slot:hint v-if="exceededDays">
              <span class="text-negative"
                >Number of days should not exceed to 1000.</span
              >
            </template>
            <template v-slot:hint v-else>
              <span class="text-grey-6"
                >Enter number of days before the message appear on user’s screen
                (max 31 days)</span
              >
            </template>
          </q-input>
        </q-card-section>

        <q-card-section class="q-mx-lg q-my-sm">
          <q-btn
            class="q-mr-sm"
            unelevated
            size="md"
            color="primary"
            type="submit"
            label="Update"
            no-caps
            :loading="loading"
            :disable="btnDisable || exceededDays"
          />
        </q-card-section>
      </form>
    </q-card>
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

const {
  api,
  showDialog
} = Helpers()
const auth = authStore();
const dataPhoto = ref(false);
const files = ref([]);
const active = ref(false);
const file = ref("");
const qeditor = ref("");
const dragging = ref(false);
const fileSize = ref(10534243);
const showPreviewText = ref(false);
const editorRef = ref(null);
const notificationBeforeRef = ref(null);
const daysNotification = ref(0);
const notificationData = ref({
  notificationId: "",
  image: "",
  message: "",
  notificationBefore: 0,
  notificationType: "Expiry",
});

const savedNotificationData = ref({
  image: "",
  message: "",
  notificationBefore: null,
});

const btnDisable = ref(true);
const exceededDays = ref(false);
const bypassRouteLeave = ref(false);
const loading = ref(false);
const thefile = ref(null);
const largeFile = ref(false);
const skeletonLoading = ref(false);

const $q = useQuasar();

const Prompt = ref({
  showPrompt:false,
  redirect:null,
})

onMounted(() => {
  getNotification(2);
});

const getNotification = async (x) => {
  skeletonLoading.value = true;

	const response = await api({
    method: 'GET',
    url: `/cms-service/notification/notif?type=Expiry`
    })
    
      console.log(response);
      if (response.ok) {
        if(response.data.data == null){
          notificationData.value.notificationId = ""
        }else{
          notificationData.value.notificationId = 1
        }
        // console.log('success')
        skeletonLoading.value = false;

        qeditor.value = response.data.data.message;
        daysNotification.value = parseInt(
          response.data.data.notification_before
        );
        notificationData.value.image = response.data.data.image;

        btnDisable.value = true;

        setTimeout(() => {
          let image = new Image();
          image.src = response.data.data.image;
          var preview = document.getElementById("file-ip-1-preview");
          preview.src = image.src;
          // console.log(image.src)
          preview.style.display = "block";
        }, 1);        

        showPreviewText.value = true;

        savedNotificationData.value.image = response.data.data.image;
        savedNotificationData.value.message = response.data.data.message;
        savedNotificationData.value.notificationBefore = response.data.data.notification_before;
          
        setTimeout(() => notificationBeforeRef.value.resetValidation(), 1);
      } else {
        skeletonLoading.value = false
      }
	  

}

const triggerNegative = () => {
  $q.notify({
    type: "negative",
    message: "Please upload a file not more than 10MB.",
    position: "top"
  });
};

const editorRules = ref([
  (val) => (!!val && val !== "") || "Please provide input on required information.",
]);
// const notificationDaysRules = ref([
//   (val) => !!val || "Please provide input on required information.",
// ]);


const dragFile = async (e) => {
  // q-editorn
  var files = [...e.dataTransfer.files];
  var data = [...files];
  thefile.value = data[0];
  const currentFileSize = data[0].size;
  // console.log(data[0].type);
  
  //once the image is changed, the update button will enable
  if(notificationData.value.notificationId !== ""){btnDisable.value = false; exceededDays.value = false;}

  if (currentFileSize < fileSize.value) {
    largeFile.value = false;
    // console.log(data[0].type !== "image/png", data[0].type !== "image/jpeg");

    if (data[0].type !== "image/jpeg" && data[0].type !== "image/png") {
      // image not jpg and png

      $q.notify({
        type: "negative",
        message: "Please upload JPEG and PNG files only.",
        position: "top"
      });
    } else {
      showPreviewText.value = true;
      // console.log(data[0].size)
      var src = URL.createObjectURL(data[0]);
      var preview = document.getElementById("file-ip-1-preview");
      preview.src = src;
      // console.log(preview.res)
      preview.style.display = "block";
      //  var files = [...e.dataTransfer.files]

      // await getImage(event.target.files[0])

      await getImage(data[0]);
    }
  } else {
    // console.log("large file");
    // triggerNegative();
    largeFile.value = true;
  }
};
const showPreview = async () => {
  thefile.value = event.target.files[0];
  showPreviewText.value = true;
  const currentFileSize = event.target.files[0].size;
  // console.log(event.target.files[0]);
  
  //once the image is changed, the update button will enable
  if(notificationData.value.notificationId !== ""){btnDisable.value = false; exceededDays.value = false;}

  // console.log(imageBase64)

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
        position: "top"
      });

      showPreviewText.value = false;
    } else {
      showPreviewText.value = true;

      var src = URL.createObjectURL(event.target.files[0]);
      var preview = document.getElementById("file-ip-1-preview");
      preview.src = src;
      preview.style.display = "block";

      await getImage(event.target.files[0]);
    }

    // if (event.target.files.length > 0) {

    // }
  } else {
    showPreviewText.value = false;
    // console.log("large file");
    // triggerNegative();
    largeFile.value = true;
  }
};

const getImage = (file) => {
  // returning a Promise
  // console.log(file);
  return new Promise((resolve, reject) => {
    getBase64(file)
      .then((data) => {
        // data is base64
        // console.log('base64', data)
        notificationData.value.image = data;
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

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    // reader.onloadend = (e) => resolve(imageToDataUri(e, 400, 400))
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const onSubmit = async () => {
  loading.value = true;

  // submitting.value = true;
  editorRef.value.validate();
  notificationBeforeRef.value.validate();

  // console.log(daysNotification.value);

  if (editorRef.value.hasError || notificationBeforeRef.value.hasError) {
    // form has error
    // console.log("there is an error");
    // submitting.value = false;
    loading.value = false;
  } else {
    notificationData.value.message = qeditor.value;
    notificationData.value.notificationBefore = parseInt(
    daysNotification.value
    );
    // console.log(notificationData.value);

    const response = await api({
    method: 'POST',
    url: `/cms-service/notification`,
    data: {
          notificationId: notificationData.value.notificationId,
          image: notificationData.value.image,
          message: notificationData.value.message,
          notificationBefore: notificationData.value.notificationBefore,
          notificationType: notificationData.value.notificationType
    }
    })
        console.log(response)
        if (response.ok) {
          triggerSuccessUpdate();
          loading.value = false;

          btnDisable.value = true;
          // notificationData.value.image = null;
          showPreviewText.value = false;

          // console.log(notificationData.value.image)
          // var src = URL.createObjectURL(notificationData.value.image);
          // var preview = document.getElementById("file-ip-1-preview");
          // preview.src = src;
          // preview.style.display = "block";

          largeFile.value = false;

          getNotification(2);
        }
        else{
        loading.value = false;

        }
  }
};

const triggerSuccessUpdate = () => {
  $q.notify({
    type: "positive",
    message: "Successfully updated!",
    position: "top",
  });
};

const disablePaste = (evt) => {
  evt.preventDefault();
}

const notMoreThan1000 = () => {
  // console.log(daysNotification.value)
  if (parseInt(daysNotification.value) >= 1001) {
    exceededDays.value = true;
  } else {
    btnDisable.value = false;
    exceededDays.value = false;
  }
};

const fillIn = (e) => {
  if (e === "editor") {
    editorRef.value.validate();
  }

  // console.log(editorRef.value.validate())

  if (!editorRef.value.hasError || editorRef.value === null) {
    btnDisable.value = false;
  } else {
    btnDisable.value = true;
  }
};

const checkChanges = () => {
  var a = notificationData.value.image === savedNotificationData.value.image;
  var b = qeditor.value === savedNotificationData.value.message;
  var c =
    daysNotification.value === savedNotificationData.value.notificationBefore;

  if (a && b && c) {
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
  //   next();
  // } else {
  //   if (!bypassRouteLeave.value) {
  //     const dialog = showDialog({
  //     title: `Leave Page?`,
  //     msg: `You are about to leave this page without saving. All changes will be lost. Do you really want to leave without saving?`,
  //     color: 'primary',
  //     isCancel: true,
  //     isOk: true,
  //     okLabel: `Proceed`,
  //     cancelLabel: `Cancel`,
  //     })
  //     if (!dialog) next()
  //     dialog.then(res => { if (res) next() })
  //   }
  // }
})

const isNumber = (evt) => {
  let char = String.fromCharCode(evt.keyCode); // Get the character
  if (/^[0-9]+$/.test(char)) return true;
  // Match with regex
  else evt.preventDefault(); // If not match, don't add to input text
};

const onInputEmojis = (string, userinput) => {
  var regex = string.replace(
    /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g,
    ""
  );
  if (userinput === "daysNotification") {
    daysNotification.value = regex;
  } else if (userinput === "qeditor") {
    qeditor.value = regex;
  } else {
  }
};

const onInputImages = (event) => {
  console.log(event);
  if (event.type === "paste") {
    // console.log((event.originalEvent || event).clipboardData.getData('text/plain').length === 0)
    if (
      (event.originalEvent || event).clipboardData.getData("text/plain")
        .length === 0
    ) {
      event.preventDefault();
      // console.log(event)
    }
  } else if (event.type === "drop") {
    console.log(event.dataTransfer.getData("text/plain"));
    // console.log((event.originalEvent || event).clipboardData.getData('text/plain').length === 0)
    if (event.dataTransfer.getData("text/plain").startsWith("http")) {
      event.preventDefault();
      // console.log(event)
    }
  }
};
</script>


<style scoped>
.blue {
  color: #fff;
  background-color: #1b3564 !important;
}

.banner-label {
  font-size: 15px;
}

.center {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-input {
  /* width: 350px; */
  padding: 20px;
  border: 2px dashed #0000004d;
}

.form-input img {
  width: 100%;
  display: none;
  margin-bottom: 30px;
}

.form-input input {
  display: none;
}

#file-ip-1-preview {
  /* height: 40px; */
  width: 50%;
}

.form-input label {
  display: block;
  width: 30%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: #1b3564;
  color: #fff;
  font-size: 10px;
  font-family: "Open Sans", sans-serif;

  border-radius: 5px;
  cursor: pointer;
}

.main {
  display: flex;
  flex-grow: 1;
  align-items: center;
  height: 100vh;
  justify-content: center;
  text-align: center;
}

.dropzone-container {
  padding: 4rem;
  background: #f7fafc;
  border: 1px solid #e2e8f0;
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

.preview-container {
  display: flex;
  margin-top: 2rem;
}
</style>