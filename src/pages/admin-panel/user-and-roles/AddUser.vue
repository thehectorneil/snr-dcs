<template>
  <div class="">

    <q-dialog v-model="resetPasswordModal">
      <q-card class="q-pa-sm">
        <q-card-section class="q-pb-none">
          <p class=" text-h6">Reset Password</p>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <p class="q-ml-sm">Are you sure you want to reset this user password?</p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Cancel" color="grey-4" text-color="grey-6" no-caps unelevated v-close-popup />
          <q-btn label="Yes" color="primary" @click="sendEmail" unelevated no-caps v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="sentEmailModal">
      <q-card class="q-pa-sm">
        <q-card-section class="q-pb-none">
          <p class=" text-h6">Reset Password Successful</p>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <p class="q-ml-sm">A temporary password has been sent to this user email.</p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Okay" color="primary" unelevated no-caps v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="failEmailModal">
      <q-card class="q-pa-sm">
        <q-card-section class="q-pb-none">
          <p class=" text-h6">Reset Password Failed</p>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <p class="q-ml-sm">Something went wrong.</p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Okay" color="primary" v-close-popup unelevated no-caps />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <form @submit.prevent.stop="editUser == true ? saveUpdateUser() : onSubmit()">
      <q-banner inline-actions class="text-black bg-white q-pa-lg">
        <span class="text-bold" style="font-size: 1.2rem">{{ editUser == true ? 'Edit User' : 'Add New User'}}</span>
        <template v-slot:action>
          <q-btn class="q-mr-sm" unelevated size="md" color="grey-4" text-color="grey-9" label="Cancel"
            @click="ToListing()" no-caps />
          <q-btn class="q-mr-sm" unelevated size="md" color="primary" type="submit" label="Save" no-caps
            :loading="saving" :disable="btnDisable" />
        </template>
      </q-banner>

      <q-card class="my-card q-ma-lg">
        <q-banner inline-actions class="text-black bg-white q-pa-lg">
          <div style="max-width: 500px">
            <span class="text-bold" style="font-size: 1.2rem">User Details</span>

          </div>
        </q-banner>

        <q-separator />

        <q-card-section style="padding-bottom: 150px">
          <div class="row q-pt-md">
            <p class="text-bold q-ml-sm">Status</p>
          </div>
          <p class="q-ml-sm text-blue-grey-3">Disabled users will be denied of access in the CMS</p>
          <div class="row">
            <q-radio name="status" v-model="status" val="Active" label="Active" class="q-pr-xl" />
            <q-radio name="status" v-model="status" val="Inactive" label="Inactive" class="q-pr-xl" />
            <q-radio v-if="editUser == true" name="status" v-model="status" val="Disabled" label="Disabled" />
          </div>

          <!-- row 1 -->
          <div class="row q-pl-sm q-pt-lg">
            <div class="col-lg-4 q-pr-lg col-md-6 col-sm-6">

              <div class="row text-bold">User Role</div>
              <q-select ref="userroleRef" outlined v-model="role_id" :rules="clubcityRules" placeholder="Select Role"
                :options="role_list" option-value="id" option-label="role" dense
                @update:model-value="fillIn('userRole')">

                <template v-slot:selected>
                  <template v-if="role_id">
                    {{ role_id.role }}
                  </template>
                  <template v-else> Select Role </template>
                </template>
              </q-select>

            </div>
            <div class="col-lg-4 q-pr-lg col-md-6 col-sm-6">
              <div class="row text-bold">Email</div>
              <q-input ref="emailRef" outlined v-model="email" dense :rules="emailRules" maxlength="50"
                placeholder="Email Address" @update:model-value="onInputEmojis(email, 'email')"
                @paste="(evt) => disablePaste(evt)" @focusout="fillIn('email')" />
            </div>
          </div>

          <!-- row 2 -->

          <div class="row q-pl-sm q-pt-lg">
            <div class="col-lg-4 q-pr-lg col-md-6 col-sm-6">
              <div class="row text-bold">First Name</div>
              <q-input ref="firstnameRef" outlined v-model="firstname" dense :rules="firstnameRules" maxlength="50"
                @update:model-value="onInputEmojis(firstname, 'firstname')" @keypress="isLetter($event)"
                @paste="(evt) => disablePaste(evt)" @focusout="fillIn('firstname')" />
            </div>
            <div class="col-lg-4 q-pr-lg col-md-6 col-sm-6">
              <div class="row text-bold">Last Name</div>
              <q-input ref="lastnameRef" outlined v-model="lastname" dense :rules="lastnameRules" maxlength="50"
                @update:model-value="onInputEmojis(lastname, 'lastname')" @keypress="isLetter($event)"
                @paste="(evt) => disablePaste(evt)" @focusout="fillIn('lastname')" />
            </div>
          </div>

          <!-- row 3 -->
          <div class="row q-pl-sm q-pt-lg">

            <div class="col-lg-4 q-pr-lg col-md-6 col-sm-6">
              <div class="row text-bold">Mobile Number</div>
              <q-input ref="mobileRef" outlined v-model="mobile" dense :rules="mobileRules" maxlength="11"
                @update:model-value="onInputEmojis(mobile, 'mobile')" @keypress="isNumber($event)"
                @focusout="fillIn('mobile')" :bg-color="invalidMobile ? 'red-3' : ''"
                @paste="(evt) => disablePaste(evt)">
                <template v-slot:hint v-if="invalidMobile">
                  <span class="text-negative">Invalid mobile number format. 09XXXXXXXXX</span>
                </template>

              </q-input>
            </div>
            <div class="col-lg-4 q-pr-lg col-md-6 col-sm-6">

              <div class="row text-bold">Club Location</div>
              <q-select ref="clubcityRef" outlined v-model="club_id" :rules="clubcityRules" placeholder="Select Club"
                :options="club_city" option-value="id" option-label="club_name" dense
                @update:model-value="fillIn('clublocation')">
                <template v-slot:selected>
                  <template v-if="club_id">
                    {{ club_id.club_name }}
                  </template>
                  <template v-else> Select Club </template>
                </template>
              </q-select>

            </div>
          </div>
          <div class="row q-pl-sm q-pt-lg">
            <q-btn outline color="primary" v-if="editUser == true" @click="restPassConfirmation">Reset Password</q-btn>
          </div>
        </q-card-section>
      </q-card>
    </form>
  </div>
  
  <BasePromptMsg :Prompt="Prompt" @update:showPrompt="(val) => {Prompt.showPrompt = false; bypassRouteLeave = val}" />
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { authStore } from "src/stores/auth";
import { userAlert } from "src/stores/alerts/alerts";
import { useRouter, onBeforeRouteLeave } from "vue-router";
import { useQuasar } from "quasar";
import { useSelectedUser } from 'src/stores/users'
import { APISettings } from 'src/utilities/env';
import BasePromptMsg from '../../../components/reusables/BasePromptMsg.vue'
import Helpers from 'src/helpers'

const {
  api,
  showDialog
} = Helpers()

const user = useSelectedUser()
const $q = useQuasar();
const isPwd = ref(true);
const auth = authStore();
const storeAlert = userAlert();
const router = useRouter();
const club_id = ref(null);
const role_id = ref(null);
const status = ref("Active");

const firstname = ref(null);
const lastname = ref(null);
const email = ref(null);
const mobile = ref(null)
const club_city = ref([]);
const role_list = ref([]);

const roleId = ref(null)
const clubId = ref(null)

const firstnameRef = ref(null);
const lastnameRef = ref(null);
const emailRef = ref(null);
const mobileRef = ref(null)
const clubcityRef = ref(null);
const userroleRef = ref(null)

const resetPasswordModal = ref(false)
const sentEmailModal = ref(false)
const failEmailModal = ref(false)

const bypassRouteLeave = ref(false);
const usernameExists = ref(false);
const saving = ref(false);
const btnDisable = ref(true);
const invalidMobile = ref(false)
const editUser = ref(false)

const Prompt = ref({
  showPrompt:false,
  redirect:null,
})

const firstnameRules = ref([
  (val) => !!val || "Please provide input on required information.",
  (val) => val.length >= 1 || "Min 1 character",
  (val) => val.length <= 50 || "Max 50 character",
]);

const lastnameRules = ref([
  (val) => !!val || "Please provide input on required information.",
  (val) => val.length >= 1 || "Min 1 character",
  (val) => val.length <= 50 || "Max 50 character",
]);

const emailRules = ref([
  (val) => !!val || "Please provide input on required information.",
  (val) =>
    /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/.test(
      val
    ) || "Invalid email",
  (val) => val.length >= 1 || "Min 1 character",
  (val) => val.length <= 50 || "Max 50 character",
  (val) => !/\s/.test(val) || "Should not contain whitespace.",
]);

const mobileRules = ref([
  (val) => !!val || "Please provide input on required information.",
  (val) => val.length >= 9 || "Min 11 character",
  (val) => !/\s/.test(val) || "Should not contain whitespace.",
]);

const clubcityRules = ref([(val) => !!val || "Please provide input on required information."]);

onMounted(() => {
  getCities();
  roleList();
  if (user.userData.user_id != '') {
    editUser.value = true
    getUserById();
    checkInputs();
  }

});

const sendEmail = async () => {
  const response = await api({
    method: 'GET',
    url: `/cms-service/validation?email=${email.value}&user_id=${user.userData.user_id}`,
  })

  if (response.ok) {
    sentEmailModal.value = true
  }
  else {
    failEmailModal.value = true
  }
}

const getUserById = async () => {

  const response = await api({
    method: 'GET',
    url: `/cms-service/admin/details?id=${user.userData.user_id}`,
  })

  if (response.ok) {
    //console.log("getBY id", response.data.data);
    status.value = response.data.data.status
    email.value = response.data.data.email
    mobile.value = response.data.data.mobileNumber
    firstname.value = response.data.data.first_name
    lastname.value = response.data.data.last_name

    for (var i = 0; i < club_city.value.length; i++) {
      if (club_city.value[i].id == response.data.data.store_location_id) {
        club_id.value = club_city.value[i]
      }
    }

    for (var i = 0; i < role_list.value.length; i++) {
      if (role_list.value[i].id == response.data.data.role) {
        role_id.value = role_list.value[i]
        //console.log(role_list.value[i])
      }
    }
    checkInputs();
  }

}
const ToListing = () => {
  router.push({ name: "Users" });
};
const roleList = async () => {

  const response = await api({
    method: 'GET',
    url: "/cms-service/role/role-list",
  })

  if (response.ok) {
    console.log("roles", response.data.data);
    role_list.value = response.data.data;
    if (user.userData.user_id != '') {
      editUser.value = true
      getUserById();
    }
  }

}
const getCities = async () => {

  const response = await api({
    method: 'GET',
    url: `/dcs-service/store/location`,
  })

  console.log("List of club cities", response);
  club_city.value = response.data.data;
  roleList();
};

const isNumber = (evt) => {
  let char = String.fromCharCode(evt.keyCode); // Get the character
  if (/^[0-9]+$/.test(char)) return true;
  // Match with regex
  else evt.preventDefault(); // If not match, don't add to input text
};

const isLetter = (evt) => {
  let char = String.fromCharCode(evt.keyCode); // Get the character
  if (/^[A-Za-z\ ']+$/.test(char)) return true;
  // Match with regex
  else evt.preventDefault(); // If not match, don't add to input text
};
const isLetterinUsername = (evt) => {
  usernameExists.value = false;
  let char = String.fromCharCode(evt.keyCode); // Get the character
  if (/^[A-Za-z0-9]*$/.test(char)) return true;
  // Match with regex
  else evt.preventDefault(); // If not match, don't add to input text
};

const onInputEmojis = (string, userinput) => {
  var regex = string.replace(
    /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g,
    ""
  );
  if (userinput === "firstname") {
    firstname.value = regex;
  } else if (userinput === "lastname") {
    lastname.value = regex;
  } else if (userinput === "email") {
    email.value = regex;
  } else {
  }
};

const onSubmit = () => {
  // submitting.value = true;
  firstnameRef.value.validate();
  lastnameRef.value.validate();
  emailRef.value.validate();
  clubcityRef.value.validate();
  userroleRef.value.validate();
  mobileRef.value.validate();


  if (
    firstnameRef.value.hasError ||
    lastnameRef.value.hasError ||
    emailRef.value.hasError ||
    clubcityRef.value.hasError ||
    userroleRef.value.hasError ||
    mobileRef.value.hasError
  ) {
    // form has error
    console.log("there is an error");
    // submitting.value = false;
  } else {
    saveNewUser();
  }
};
const saveUpdateUser = async () => {
  saving.value = true;


  const response = await api({
    method: "POST",
    url: "/cms-service/admin/update",
    param: {
      id: user.userData.user_id,
      firstName: firstname.value,
      lastName: lastname.value,
      roleId: role_id.value.id,
      status: status.value,
      store_location_id: club_id.value.id,
      mobileNumber: mobile.value,
      email: email.value
    }
  })

  if (response.ok) {
    bypassRouteLeave.value = true;
    router.push({ name: "Users" });
    storeAlert.show_success = true;
  }
  else { console.log(response.error) }

};
const saveNewUser = async () => {
  saving.value = true;

  const response = await api({
    method: "POST",
    url: "/cms-service/admin",
    param: {
      firstName: firstname.value,
      lastName: lastname.value,
      roleId: role_id.value.id,
      status: status.value,
      store_location_id: club_id.value.id,
      mobileNumber: mobile.value,
      email: email.value
    }
  })

  if (response.ok) {
    saving.value = false;
    bypassRouteLeave.value = true;
    router.push({ name: "Users" });
    storeAlert.show_success = true;
  }
}

const fillIn = (e) => {
  if (e === "firstname") {
    firstnameRef.value.validate();
  }
  if (e === "lastname") {
    lastnameRef.value.validate();
  }
  if (e === "email") {
    emailRef.value.validate();
  }
  if (e === "clublocation") {
    clubcityRef.value.validate();
  }
  if (e === "userRole") {
    userroleRef.value.validate();
  }
  if (e === "mobile") {
    mobileRef.value.validate();
    if (mobile.value) {
      if ((mobile.value.startsWith('09'))) {
        invalidMobile.value = false
      }
      else {
        invalidMobile.value = true
      }
    }
    else { invalidMobile.value = true }
  }
  if (e === "username") {
    usernameRef.value.validate();
    checkUsername();
  }
  if (e === "password") {
    passwordRef.value.validate();
  }
  checkInputs();
  console.log(firstnameRef.value.hasError, lastnameRef.value.hasError, emailRef.value.hasError, clubcityRef.value.hasError, mobileRef.value.hasError, userroleRef.value.hasError)

};
const checkInputs = () => {
  console.log(firstnameRef.value.hasError, lastnameRef.value.hasError, emailRef.value.hasError, clubcityRef.value.hasError, mobileRef.value.hasError, userroleRef.value.hasError, invalidMobile.value, mobile.value,
    club_id.value, role_id.value, email.value, lastname.value, firstname.value
  )
  if (
    firstnameRef.value.hasError == false &&
    lastnameRef.value.hasError == false &&
    emailRef.value.hasError == false &&

    mobileRef.value.hasError == false &&
    firstname.value != null &&
    lastname.value != null &&
    email.value != null &&
    role_id.value != null &&
    club_id.value != null &&
    mobile.value != null &&
    invalidMobile.value != true

  ) {
    btnDisable.value = false;
  } else {
    btnDisable.value = true;
  }
}

const disablePaste = (evt) => {
  evt.preventDefault();
}
const checkChanges = () =>{
  var a = firstname.value == null
  var b = lastname.value == null
  var c = role_id.value == null
  var d = status.value == 'Active'
  var e = club_id.value == null
  var f = mobile.value == null
  var g = email.value == null
   if (a && b && c && d && e && f && g) {
    return true;
  } else {
    return false;
  }
}
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

//   if (checkChanges()) {
//     next();
//   }else{
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
//   }else{
//     next()
//   }
// }


})

const restPassConfirmation = () => {
  resetPasswordModal.value = true
}
</script>

<style>

</style>