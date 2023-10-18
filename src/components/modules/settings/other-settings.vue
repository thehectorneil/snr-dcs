<template>
  <div style="padding-bottom: 50px">
    <q-banner
      dense
      rounded
      inline-actions
      v-if="storeAlert.show_success"
      class="text-white q-ma-lg toast-success"
    >
      Record updated successfully
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
    <q-banner
      inline-actions
      style="padding-top: 31px; padding-bottom: 30px"
      class="text-black bg-white q-pa-lg"
    >
      <span class="text-bold" style="font-size: 1.2rem">Other Settings</span>
      <template v-slot:action>
        <q-btn
          class="q-mr-sm"
          color="primary"
          type="submit"
          :loading="loading"
          :disable="btnDisable"
          @click="onSubmit"
          label="Update"
          no-caps
          unelevated
        />
      </template>
    </q-banner>

    <q-card class="my-card q-ma-lg" style="padding-bottom: 150px">
      <q-banner inline-actions class="text-black bg-white q-pa-lg">
        <div style="max-width: 500px">
          <span class="text-bold" style="font-size: 1.2rem">VMC Mobile</span>
        </div>
      </q-banner>

      <!-- <hr /> -->

      <form>
        <!-- LOGO -->
        <q-card-section>
          <div class="my-card q-mx-lg q-my-sm">
            <div class="row">
              <div class="col-6">
                <span class="text-weight-medium">Logo</span>
              </div>
              <div
                class="col-6 text-center"
                v-if="vmcLogo != null && vmcLogo != ''"
              >
                <span class="text-weight-medium">Preview</span>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-6">
              <div class="my-card q-mx-lg q-my-sm">
                <div
                  class="form-input"
                  @dragover.prevent
                  @drop.prevent
                  @drop="dragFileVmcLogo"
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
                      @change="showPreview('VMC Logo')"
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
                  Please upload a file not more than 10mbs.
                </p>
              </div>
            </div>
            <div class="col-6">
              <div class="preview text-center">
                <div
                  class="row justify-center items-center"
                  v-if="skeletonLoading"
                >
                  <q-spinner color="primary" size="5em" />
                </div>
                <img id="vmc-logo-preview" class="q-mx-auto" loading="eager" />
              </div>
            </div>
          </div>
        </q-card-section>
        <!-- END LOGO-->

        <!-- Counter QR Code Center Icon -->
        <q-card-section>
          <div class="my-card q-mx-lg q-my-sm">
            <div class="row">
              <div class="col-6">
                <span class="text-weight-medium"
                  >Counter QR Code Center Icon</span
                >
              </div>
              <div
                class="col-6 text-center"
                v-if="counterIcon != null && counterIcon != ''"
              >
                <span class="text-weight-medium">Preview</span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <div class="my-card q-mx-lg q-my-sm">
                <div
                  class="form-input"
                  @dragover.prevent
                  @drop.prevent
                  @drop="dragFileCounterIcon"
                >
                  <div>
                    <p class="text-center q-mb-none" style="font-size: 0.8rem">
                      Drop your files here
                    </p>
                    <p class="text-center q-mb-sm" style="font-size: 0.8rem">
                      or
                    </p>
                    <label
                      for="counter-icon"
                      class="q-mx-auto"
                      style="font-size: 0.8rem"
                      >Select File</label
                    >

                    <input
                      type="file"
                      multiple
                      id="counter-icon"
                      accept="image/png, image/jpeg"
                      data-max-size="2048"
                      v-bind="dataPhoto"
                      @change="showPreview('Counter Icon')"
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
                  Please upload a file not more than 10mbs.
                </p>
              </div>
            </div>
            <div class="col-6">
              <div class="preview text-center">
                <div
                  class="row justify-center items-center"
                  v-if="skeletonLoading"
                >
                  <q-spinner color="primary" size="5em" />
                </div>
                <img
                  id="counter-icon-preview"
                  class="q-mx-auto"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </q-card-section>
        <!-- END Counter QR Code Center Icon -->

        <q-card-section>
          <div class="my-card q-mx-lg q-my-sm">
            <span class="text-weight-medium">Data Privacy Content</span>
          </div>
          <div class="q-mx-lg" style="max-width: 80%">
            <q-field
              ref="dataPrivacyRef"
              v-model="dataPrivacyEditor"
              @update:model-value="
                onInputEmojis(dataPrivacyEditor, 'dataPrivacyEditor')
              "
              label-slot
              borderless
              :rules="dataPrivacyEditorRules"
            >
              <template #control>
                <q-editor
                  style="width: 100%; padding-top: none !important"
                  @paste="(evt) => onInputImages(evt)"
                  @drop="(evt) => onInputImages(evt)"
                  @focusout="fillIn('dataPrivacyEditor')"
                  :style="
                    dataPrivacyRef && dataPrivacyRef.hasError
                      ? 'border-color: #C10015'
                      : ''
                  "
                  placeholder="Type here..."
                  v-model="dataPrivacyEditor"
                  @update:model-value="
                    onInputEmojis(dataPrivacyEditor, 'dataPrivacyEditor')
                  "
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

        <q-card-section>
          <div class="my-card q-mx-lg q-my-sm">
            <span class="text-weight-medium">Terms & Condition Content</span>
          </div>
          <div class="q-mx-lg" style="max-width: 80%">
            <q-field
              ref="termsConditionRef"
              v-model="termsConditionEditor"
              @update:model-value="
                onInputEmojis(termsConditionEditor, 'termsConditionEditor')
              "
              label-slot
              borderless
              :rules="termsConditionEditorRules"
            >
              <template #control>
                <q-editor
                  style="width: 100%; padding-top: none !important"
                  @paste="(evt) => onInputImages(evt)"
                  @drop="(evt) => onInputImages(evt)"
                  @focusout="fillIn('termsConditionEditor')"
                  :style="
                    termsConditionRef && termsConditionRef.hasError
                      ? 'border-color: #C10015'
                      : ''
                  "
                  placeholder="Type here..."
                  v-model="termsConditionEditor"
                  @update:model-value="
                    onInputEmojis(termsConditionEditor, 'termsConditionEditor')
                  "
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
        <hr />
        <q-card-section>
          <div class="my-card q-mx-lg q-my-sm">
            <q-banner
              inline-actions
              class="text-black bg-white q-py-lg q-px-none"
            >
              <div style="max-width: 500px">
                <span class="text-bold" style="font-size: 1.2rem"
                  >DCS Web App</span
                >
              </div>
            </q-banner>
            <div class="row">
              <div class="col-6">
                <span class="text-weight-medium">Logo</span>
              </div>
              <div
                class="col-6 text-center"
                v-if="dcsLogo != null && dcsLogo != ''"
              >
                <span class="text-weight-medium">Preview</span>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-6">
              <div class="my-card q-mx-lg q-my-sm">
                <div
                  class="form-input"
                  @dragover.prevent
                  @drop.prevent
                  @drop="dcsLogoDragFile"
                >
                  <div>
                    <p class="text-center q-mb-none" style="font-size: 0.8rem">
                      Drop your files here
                    </p>
                    <p class="text-center q-mb-sm" style="font-size: 0.8rem">
                      or
                    </p>
                    <label
                      for="dcs-logo"
                      class="q-mx-auto"
                      style="font-size: 0.8rem"
                      >Select File</label
                    >

                    <input
                      type="file"
                      multiple
                      id="dcs-logo"
                      accept="image/png, image/jpeg"
                      data-max-size="2048"
                      v-bind="dataPhoto"
                      @change="showPreview('DCS Logo')"
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
                <div
                  class="row justify-center items-center"
                  v-if="skeletonLoading"
                >
                  <q-spinner color="primary" size="5em" />
                </div>
                <img id="dcs-logo-preview" class="q-mx-auto" loading="eager" />
              </div>
            </div>
          </div>
        </q-card-section>

        <q-card-section>
          <div class="my-card q-mx-lg q-my-sm">
            <div class="row">
              <div class="col-6">
                <span class="text-weight-medium">Header Logo</span>
              </div>
              <div
                class="col-6 text-center"
                v-if="headerLogo != null && headerLogo != ''"
              >
                <span class="text-weight-medium">Preview</span>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-6">
              <div class="my-card q-mx-lg q-my-sm">
                <div
                  class="form-input"
                  @dragover.prevent
                  @drop.prevent
                  @drop="headerLogoDragFile"
                >
                  <div>
                    <p class="text-center q-mb-none" style="font-size: 0.8rem">
                      Drop your files here
                    </p>
                    <p class="text-center q-mb-sm" style="font-size: 0.8rem">
                      or
                    </p>
                    <label
                      for="header-logo"
                      class="q-mx-auto"
                      style="font-size: 0.8rem"
                      >Select File</label
                    >

                    <input
                      type="file"
                      multiple
                      id="header-logo"
                      accept="image/png, image/jpeg"
                      data-max-size="2048"
                      v-bind="dataPhoto"
                      @change="showPreview('header Logo')"
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
                <div
                  class="row justify-center items-center"
                  v-if="skeletonLoading"
                >
                  <q-spinner color="primary" size="5em" />
                </div>
                <img
                  id="header-logo-preview"
                  class="q-mx-auto"
                  loading="eager"
                />
              </div>
            </div>
          </div>
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
import { userAlert } from "src/stores/alerts/alerts";
import { APISettings } from "src/utilities/env";
import BasePromptMsg from '../../../components/reusables/BasePromptMsg.vue'
import Helpers from 'src/helpers'

const {
  api,
  showDialog
} = Helpers()
const storeAlert = userAlert();
const auth = authStore();
const dataPhoto = ref(false);
const files = ref([]);
// const active = ref(false);
const file = ref("");
const termsConditionEditor = ref("");
const dataPrivacyEditor = ref("");
const qeditor = ref("");
// const dragging = ref(false);
const fileSize = ref(10534243);
const showPreviewText = ref(false);
const termsConditionRef = ref(null);
const dataPrivacyRef = ref(null);
// const editorRef = ref(null);
const notificationBeforeRef = ref(null);
const daysNotification = ref(null);
const notificationData = ref({
  notificationId: "2",
  image: "",
  message: "",
  notificationBefore: 0,
  notificationType: "Expiry",
});

const savedNotificationData = ref({
  vmc_logo_image: "",
  dcs_logo_image: "",
  qrcode_center_icon:"",
  dcs_header_logo: "",
  data_privacy_content:"",
  terms_condition_content:"",
});
const headerLogo = ref(null);
const dcsLogo = ref(null);
const counterIcon = ref(null);
const vmcLogo = ref(null);
const btnDisable = ref(true);
const exceededDays = ref(false);
const bypassRouteLeave = ref(false);
const loading = ref(false);
const thefile = ref(null);
const largeFile = ref(false);
const skeletonLoading = ref(false);
const sessionID = ref("")

const Prompt = ref({
  showPrompt:false,
  redirect:null,
})

const $q = useQuasar();

onMounted(() => {
  getOtherSettingDetails();
});
const closeNotification = () => {
  storeAlert.show_success = false;
};

const getOtherSettingDetails = async () => {
  skeletonLoading.value = true;
     const response = await api({
    method: 'GET',
    url: `/cms-service/settings/other-settings/1`
    })
    
      console.log(response);
      if (response.ok) {
      if(response.data.data == null){
        sessionID.value = null
        skeletonLoading.value = false;
        vmcLogo.value = "";
        var previewVmcLogo = document.getElementById("vmc-logo-preview");
        var src = "";
        previewVmcLogo.src = src;
        previewVmcLogo.style.display = "block";

        counterIcon.value = "";
        var previewCounterIcon = document.getElementById("counter-icon-preview");
        var src = "";
        previewCounterIcon.src = src;
        previewCounterIcon.style.display = "block";

        termsConditionEditor.value = "";
        dataPrivacyEditor.value = "";

        dcsLogo.value = "";
        var previewDcsLogo = document.getElementById("dcs-logo-preview");
        var src = "";
        previewDcsLogo.src = src;
        previewDcsLogo.style.display = "block";

        headerLogo.value = "";
        var previewHeaderLogo = document.getElementById("header-logo-preview");
        var src = "";
        previewHeaderLogo.src = src;
        previewHeaderLogo.style.display = "block";

        savedNotificationData.value.vmc_logo_image = "",
        savedNotificationData.value.dcs_logo_image = "",
        savedNotificationData.value.qrcode_center_icon = "",
        savedNotificationData.value.dcs_header_logo = "",
        savedNotificationData.value.data_privacy_content  = "",
        savedNotificationData.value.terms_condition_content = ""

      }else{
        sessionID.value = 1

        skeletonLoading.value = false;
        vmcLogo.value = response.data.data.vmc_logo_image;
        var previewVmcLogo = document.getElementById("vmc-logo-preview");
        var src = response.data.data.vmc_logo_image;
        previewVmcLogo.src = src;
        previewVmcLogo.style.display = "block";

        counterIcon.value = response.data.data.qrcode_center_icon;
        var previewCounterIcon = document.getElementById("counter-icon-preview");
        var src = response.data.data.qrcode_center_icon;
        previewCounterIcon.src = src;
        previewCounterIcon.style.display = "block";

        termsConditionEditor.value = response.data.data.terms_condition_content;
        dataPrivacyEditor.value = response.data.data.data_privacy_content;

        dcsLogo.value = response.data.data.dcs_logo_image;
        var previewDcsLogo = document.getElementById("dcs-logo-preview");
        var src = response.data.data.dcs_logo_image;
        previewDcsLogo.src = src;
        previewDcsLogo.style.display = "block";

        headerLogo.value = response.data.data.dcs_header_logo;
        var previewHeaderLogo = document.getElementById("header-logo-preview");
        var src = response.data.data.dcs_header_logo;
        previewHeaderLogo.src = src;
        previewHeaderLogo.style.display = "block";

        savedNotificationData.value.vmc_logo_image = response.data.data.vmc_logo_image,
        savedNotificationData.value.dcs_logo_image = response.data.data.dcs_logo_image,
        savedNotificationData.value.qrcode_center_icon = response.data.data.qrcode_center_icon,
        savedNotificationData.value.dcs_header_logo = response.data.data.dcs_header_logo,
        savedNotificationData.value.data_privacy_content  = response.data.data.data_privacy_content,
        savedNotificationData.value.terms_condition_content = response.data.data.terms_condition_content
      }
        

        if (
          vmcLogo.value != "" &&
          counterIcon.value != "" &&
          termsConditionEditor.value != "" &&
          dataPrivacyEditor.value != "" &&
          dcsLogo.value != "" &&
          headerLogo.value != ""
        ) {
          btnDisable.value = false;
        }
      } else {
         skeletonLoading.value = true;
      }
};

const triggerNegative = () => {
  $q.notify({
    type: "negative",
    message: "Please upload a file not more than 10MB.",
  });
};

const termsConditionEditorRules = ref([
  (val) =>
    (!!val && val !== "") || "Please provide input on required information.",
]);
const dataPrivacyEditorRules = ref([
  (val) =>
    (!!val && val !== "") || "Please provide input on required information.",
]);

const dragFile = async (e) => {
  var files = [...e.dataTransfer.files];
  var data = [...files];
  thefile.value = data[0];
  const currentFileSize = data[0].size;
  // console.log(data[0].type);

  if (currentFileSize < fileSize.value) {
    largeFile.value = false;
    // console.log(data[0].type !== "image/png", data[0].type !== "image/jpeg");

    if (data[0].type !== "image/jpeg" && data[0].type !== "image/png") {
      // image not jpg and png

      $q.notify({
        type: "negative",
        message: "Please upload JPEG and PNG files only.",
        position: "top",
      });
    } else {
      showPreviewText.value = true;
      // console.log(data[0].size)
      var src = URL.createObjectURL(data[0]);
      var preview = document.getElementById("vmc-logo-preview");
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

const headerLogoDragFile = async (e) => {
  var files = [...e.dataTransfer.files];
  var data = [...files];
  headerLogo.value = data[0];
  const currentFileSize = data[0].size;
  // console.log(data[0].type);

  if (currentFileSize < fileSize.value) {
    largeFile.value = false;
    // console.log(data[0].type !== "image/png", data[0].type !== "image/jpeg");

    if (data[0].type !== "image/jpeg" && data[0].type !== "image/png") {
      // image not jpg and png

      $q.notify({
        type: "negative",
        message: "Please upload JPEG and PNG files only.",
        position: "top",
      });
    } else {
      showPreviewText.value = true;
      // console.log(data[0].size)
      var src = URL.createObjectURL(data[0]);
      var preview = document.getElementById("header-logo-preview");
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
const dcsLogoDragFile = async (e) => {
  var files = [...e.dataTransfer.files];
  var data = [...files];
  dcsLogo.value = data[0];
  const currentFileSize = data[0].size;
  // console.log(data[0].type);

  if (currentFileSize < fileSize.value) {
    largeFile.value = false;
    // console.log(data[0].type !== "image/png", data[0].type !== "image/jpeg");

    if (data[0].type !== "image/jpeg" && data[0].type !== "image/png") {
      // image not jpg and png

      $q.notify({
        type: "negative",
        message: "Please upload JPEG and PNG files only.",
        position: "top",
      });
    } else {
      showPreviewText.value = true;
      // console.log(data[0].size)
      var src = URL.createObjectURL(data[0]);
      var preview = document.getElementById("dcs-logo-preview");
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
const dragFileCounterIcon = async (e) => {
  var files = [...e.dataTransfer.files];
  var data = [...files];
  counterIcon.value = data[0];
  const currentFileSize = data[0].size;
  // console.log(data[0].type);

  if (currentFileSize < fileSize.value) {
    largeFile.value = false;
    // console.log(data[0].type !== "image/png", data[0].type !== "image/jpeg");

    if (data[0].type !== "image/jpeg" && data[0].type !== "image/png") {
      // image not jpg and png

      $q.notify({
        type: "negative",
        message: "Please upload JPEG and PNG files only.",
        position: "top",
      });
    } else {
      showPreviewText.value = true;
      // console.log(data[0].size)
      var src = URL.createObjectURL(data[0]);
      var preview = document.getElementById("counter-icon-preview");
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
const dragFileVmcLogo = async (e) => {
  var files = [...e.dataTransfer.files];
  var data = [...files];
  vmcLogo.value = data[0];
  const currentFileSize = data[0].size;
  // console.log(data[0].type);

  if (currentFileSize < fileSize.value) {
    largeFile.value = false;
    // console.log(data[0].type !== "image/png", data[0].type !== "image/jpeg");

    if (data[0].type !== "image/jpeg" && data[0].type !== "image/png") {
      // image not jpg and png

      $q.notify({
        type: "negative",
        message: "Please upload JPEG and PNG files only.",
        position: "top",
      });
    } else {
      showPreviewText.value = true;
      // console.log(data[0].size)
      var src = URL.createObjectURL(data[0]);
      var preview = document.getElementById("vmc-logo-preview");
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
const showPreview = async (x) => {
  if (x == "VMC Logo") {
    vmcLogo.value = event.target.files[0];
  } else if (x == "Counter Icon") {
    counterIcon.value = event.target.files[0];
  } else if (x == "DCS Logo") {
    dcsLogo.value = event.target.files[0];
  } else if (x == "header Logo") {
    headerLogo.value = event.target.files[0];
  }
  thefile.value = event.target.files[0];
  showPreviewText.value = true;
  const currentFileSize = event.target.files[0].size;
  // console.log(event.target.files[0]);

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
      });

      showPreviewText.value = false;
    } else {
      showPreviewText.value = true;

      var src = URL.createObjectURL(event.target.files[0]);
      var preview;
      if (x == "VMC Logo") {
        preview = document.getElementById("vmc-logo-preview");
      } else if (x == "Counter Icon") {
        preview = document.getElementById("counter-icon-preview");
      } else if (x == "DCS Logo") {
        preview = document.getElementById("dcs-logo-preview");
      } else if (x == "header Logo") {
        preview = document.getElementById("header-logo-preview");
      }
      preview.src = src;
      preview.style.display = "block";

      await getImage(event.target.files[0], x);
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

const getImage = (file, x) => {
  // returning a Promise
  // console.log(file);
  return new Promise((resolve, reject) => {
    getBase64(file)
      .then((data) => {
        if (x == "VMC Logo") {
          vmcLogo.value = data;
        } else if (x == "Counter Icon") {
          counterIcon.value = data;
        } else if (x == "DCS Logo") {
          dcsLogo.value = data;
        } else if (x == "header Logo") {
          headerLogo.value = data;
        }
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

  dataPrivacyRef.value.validate();
  termsConditionRef.value.validate();

  if (dataPrivacyRef.value.hasError || termsConditionRef.value.hasError) {
    loading.value = false;
  } else {
 const response = await api({
    method: 'POST',
    url: `/cms-service/settings/other-settings`,
      data: {
        otherSettingsId: sessionID.value,
        vmc_logo_image: vmcLogo.value,
        dcs_logo_image: dcsLogo.value,
        qrcode_center_icon: counterIcon.value,
        dcs_header_logo: headerLogo.value,
        data_privacy_content: dataPrivacyEditor.value,
        terms_condition_content: termsConditionEditor.value,
        },
    })
        console.log(response);
        if (response.ok) {
          storeAlert.show_success = true;
          loading.value = false;

          //   qeditor.value = "";
          //   daysNotification.value = null;

          btnDisable.value = true;
          //   exceededDays.value = true;
          notificationData.value.image = null;
          showPreviewText.value = false;
          largeFile.value = false;

          setTimeout(() => {
            storeAlert.show_success = false;
          }, "5000");
        }
        else{
          loading.value = false;
        }
  }
};

// const triggerSuccessUpdate = () => {
//      $q.notify({
//        icon: '',
//         type: "positive",
//         message: "Record updated successfully",
//         position: 'top'
//       });
// };

const disablePaste = (evt) => {
  evt.preventDefault();
};

const fillIn = (e) => {
  if (e === "dataPrivacyEditor") {
    dataPrivacyRef.value.validate();

    if (dataPrivacyEditor.value == "</br>") {
      dataPrivacyRef.value = true;
    }
    if (!dataPrivacyRef.value.hasError || dataPrivacyRef.value === null) {
      btnDisable.value = false;
    } else {
      btnDisable.value = true;
    }
  } else if (e === "termsConditionEditor") {
    if (termsConditionEditor.value == "</br>") {
      termsConditionRef.value = true;
    }
    if (!termsConditionRef.value.hasError || termsConditionRef.value === null) {
      btnDisable.value = false;
    } else {
      btnDisable.value = true;
    }
  }

  if (!dataPrivacyRef.value.hasError || dataPrivacyRef.value === null) {
    btnDisable.value = false;
  } else {
    btnDisable.value = true;
  }
};

const checkChanges = () => {
console.log('a', vmcLogo.value)
console.log('b', savedNotificationData.value?.vmc_logo_image)
  var a = vmcLogo.value === savedNotificationData.value?.vmc_logo_image;
  var b = dcsLogo.value ===  savedNotificationData.value?.dcs_logo_image;
  var c = counterIcon.value === savedNotificationData?.value.qrcode_center_icon;
  var d = headerLogo.value ===  savedNotificationData?.value.dcs_header_logo;
  var e = dataPrivacyEditor.value === savedNotificationData?.value.data_privacy_content;
  var f = termsConditionEditor.value === savedNotificationData?.value.terms_condition_content;

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
  if (userinput === "dataPrivacyEditor") {
    dataPrivacyEditor.value = regex;
    //alert(dataPrivacyEditor.value )
  } else if (userinput === "termsConditionEditor") {
    termsConditionEditor.value = regex;
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
.q-notification {
  width: 100vw;
  max-width: 100vw;
  margin: 0;
  border-radius: 0;
}
.q-notifications__list {
  margin: 0;
}
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
#header-logo-preview {
  width: 50%;
}
#counter-icon-preview {
  width: 50%;
}
#vmc-logo-preview {
  width: 50%;
}
#dcs-logo-preview {
  width: 50%;
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
.toast-success {
  background-color: #67ac5b;
  position: absolute;
  left: 32%;
  right: auto;
}
</style>