<template>
    <div class="">
        <form @submit.prevent.stop="onSubmit()">
            <BaseLayout :headerActions="actionButtons" @header-action="headerAction"
                title="Add New Door Greeter">

                <template v-slot:notif_banner>
                    <BaseNotificationBanner :show_success="showBanner" @close-notification="closeNotification" />
                </template>

                <template v-slot:body>

                    <q-card class="my-card">
                        <q-banner inline-actions class="text-black bg-white q-pa-lg">
                            <div style="max-width: 500px">
                                <span class="text-bold" style="font-size: 1.2rem">Door Greeter Details</span>
                            </div>
                        </q-banner>

                        <q-separator />

                        <q-card-section style="padding-bottom: 150px">
                            <div class="row q-pt-md">
                                <span class="text-bold q-ml-sm">Status</span>
                            </div>
                            <div class="row">
                                <q-radio name="status" v-model="status" val="active" label="Active" class="q-pr-xl" />
                                <q-radio name="status" v-model="status" val="inactive" label="Inactive" disable />
                            </div>

                            <!-- row 1 -->
                            <div class="row q-pl-sm q-pt-lg">
                                <div class="col-lg-4 q-pr-lg col-md-6 col-sm-6">
                                    <div class="row text-bold">First Name</div>
                                    <q-input ref="firstnameRef" outlined v-model="firstname" dense
                                        :rules="firstnameRules" maxlength="50"
                                        @update:model-value="onInputEmojis(firstname, 'firstname')"
                                        @keypress="isLetter($event)" @paste="(evt) => disablePaste(evt)"
                                        @focusout="fillIn('firstname')" />
                                </div>
                                <div class="col-lg-4 q-pr-lg col-md-6 col-sm-6">
                                    <div class="row text-bold">Last Name</div>
                                    <q-input ref="lastnameRef" outlined v-model="lastname" dense :rules="lastnameRules"
                                        maxlength="50" @update:model-value="onInputEmojis(lastname, 'lastname')"
                                        @keypress="isLetter($event)" @paste="(evt) => disablePaste(evt)"
                                        @focusout="fillIn('lastname')" />
                                </div>
                            </div>

                            <!-- row 2 -->
                            <div class="row q-pl-sm q-pt-lg">
                                <div class="col-lg-4 q-pr-lg col-md-6 col-sm-6">
                                    <div class="row text-bold">Email</div>
                                    <q-input ref="emailRef" outlined v-model="email" dense :rules="emailRules"
                                        maxlength="50" placeholder="Email Address"
                                        @update:model-value="onInputEmojis(email, 'email')"
                                        @paste="(evt) => disablePaste(evt)" @focusout="fillIn('email')" />
                                </div>
                                <div class="col-lg-4 q-pr-lg col-md-6 col-sm-6">
                                    <div class="row text-bold">Club Location </div>
                                    <q-select ref="clubcityRef" outlined v-model="club_id" :rules="clubcityRules"
                                        placeholder="Select Club" :options="club_city" option-value="id"
                                        option-label="club_name" dense @update:model-value="fillIn('clublocation')">
                                        <template v-slot:selected>
                                            <template v-if="club_id">
                                                {{ club_id.club_name }}
                                            </template>
                                            <template v-else> Select Club </template>
                                        </template>
                                    </q-select>
                                </div>
                            </div>

                            <!-- row 3 -->
                            <div class="row q-pl-sm q-pt-lg">
                                <div class="col-lg-4 q-pr-lg col-md-6 col-sm-6">
                                    <div class="row text-bold">Mobile Number</div>
                                    <q-input ref="mobileRef" outlined v-model="mobile" dense :rules="mobileRules"
                                        maxlength="11" @update:model-value="onInputEmojis(mobile, 'mobile')"
                                        @keypress="isNumber($event)" @focusout="fillIn('mobile')"
                                        :bg-color="invalidMobile ? 'red-3' : ''" @paste="(evt) => disablePaste(evt)">
                                        <template v-slot:hint v-if="invalidMobile">
                                            <span class="text-negative">Invalid mobile number format. 09XXXXXXXXX</span>
                                        </template>
                                        <template v-slot:hint v-else> 09XXXXXXXXX </template>
                                    </q-input>
                                </div>
                                <div class="col-lg-4 q-pr-lg col-md-6 col-sm-6">
                                    <div class="row text-bold">Username</div>
                                    <q-input ref="usernameRef" outlined v-model="username" dense :rules="usernameRules"
                                        maxlength="15" @update:model-value="onInputEmojis(username, 'username')"
                                        @keypress="isLetterinUsername($event)" :bg-color="usernameExists ? 'red-3' : ''"
                                        @focusout="fillIn('username')" @paste="(evt) => disablePaste(evt)">
                                        <template v-slot:hint v-if="usernameExists">
                                            <span class="text-negative">Username already exists.</span>
                                        </template>
                                    </q-input>
                                </div>
                            </div>

                            <div class="row q-pl-sm q-pt-lg">
                                <div class="col-lg-4 q-pr-lg col-md-6 col-sm-6">
                                    <div class="row text-bold">Password</div>
                                    <q-input ref="passwordRef" outlined v-model="password" dense maxlength="12"
                                        :type="isPwd ? 'password' : 'text'" :rules="passwordRules"
                                        @update:model-value="onInputEmojis(password, 'password')"
                                        @focusout="fillIn('password')" @paste="(evt) => disablePaste(evt)">
                                        <template v-slot:append>
                                            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'"
                                                class="cursor-pointer" @click="isPwd = !isPwd" />
                                        </template>
                                    </q-input>
                                </div>
                                <div class="col-lg-4"></div>
                            </div>
                        </q-card-section>
                    </q-card>


                </template>
            </BaseLayout>
        </form>









        <!-- <form @submit.prevent.stop="onSubmit()"> -->
        <!-- <q-banner inline-actions class="text-black bg-white q-pa-lg">
        <span class="text-bold" style="font-size: 1.2rem">Add New Door Greeter</span>
        <template v-slot:action>
          <q-btn class="q-mr-sm" unelevated size="md" color="grey-4" text-color="grey-9" label="Cancel"
            @click="ToListing()" no-caps />
          <q-btn class="q-mr-sm" unelevated size="md" color="primary" type="submit" label="Save" no-caps
            :loading="saving" :disable="btnDisable || usernameExists" />
        </template>
      </q-banner> -->
        <!-- </form> -->
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
import { APISettings } from 'src/utilities/env';
import BaseLayout from 'src/components/reusables/BaseLayout'
import Helpers from 'src/helpers'
import { tableAttr } from './constants'
import BasePromptMsg from '../../../reusables/BasePromptMsg.vue'

const {
    api,
    showDialog
} = Helpers()

const $q = useQuasar();
const isPwd = ref(true);
const auth = authStore();
const storeAlert = userAlert();
const router = useRouter();
const club_id = ref(null);
const status = ref("active");

const firstname = ref(null);
const lastname = ref(null);
const email = ref(null);
const club_city = ref([]);
const mobile = ref(null);
const username = ref(null);
const password = ref(null);

const firstnameRef = ref(null);
const lastnameRef = ref(null);
const emailRef = ref(null);
const clubcityRef = ref(null);
const mobileRef = ref(null);
const usernameRef = ref(null);
const passwordRef = ref(null);
const bypassRouteLeave = ref(false);
const usernameExists = ref(false);
const saving = ref(false);
const btnDisable = ref(true);
const invalidMobile = ref(false)

const Prompt = ref({
  showPrompt:false,
  redirect:null,
})

const actionButtons = ref(tableAttr.value.headerActions)

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

const clubcityRules = ref([(val) => !!val || "Please provide input on required information."]);

const mobileRules = ref([
    (val) => !!val || "Please provide input on required information.",
    (val) => val.length >= 9 || "Min 11 character",
    (val) => !/\s/.test(val) || "Should not contain whitespace.",
]);

const usernameRules = ref([
    (val) => !!val || "Please provide input on required information.",
    (val) => val.length >= 1 || "Min 1 character",
    (val) => val.length <= 50 || "Max 50 character",
    (val) => !/\s/.test(val) || "Should not contain whitespace.",
]);
const passwordRules = ref([
    (val) => !!val || "Please provide input on required information.",
    (val) => val.length >= 8 || "Min 8 character",
    (val) => val.length <= 50 || "Max 50 character",
    (val) => !/\s/.test(val) || "Should not contain whitespace.",
]);

onMounted(() => {
    getCities();
});

const ToListing = () => {
    router.push({ name: "Door Greeter" });
};

const getCities = async () => {

    const response = await api({
        method: 'GET',
        url: "/dcs-service/store/location",
    })
console.log(response)
    if (response.ok) {
        console.log("List of club cities", response.data.data);
        club_city.value = response.data.data;

    }
}

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
    } else if (userinput === "mobile") {
        mobile.value = regex;
    } else if (userinput === "username") {
        username.value = regex;
    } else if (userinput === "password") {
        password.value = regex;
    } else {
    }
};

const onSubmit = () => {
    // submitting.value = true;
    firstnameRef.value.validate();
    lastnameRef.value.validate();
    emailRef.value.validate();
    clubcityRef.value.validate();
    mobileRef.value.validate();
    usernameRef.value.validate();
    passwordRef.value.validate();

    if (
        firstnameRef.value.hasError ||
        lastnameRef.value.hasError ||
        emailRef.value.hasError ||
        clubcityRef.value.hasError ||
        mobileRef.value.hasError ||
        usernameRef.value.hasError ||
        passwordRef.value.hasError
    ) {
        // form has error
        console.log("there is an error");
        // submitting.value = false;
    } else {
        saveStore();
    }
};

const saveStore = async () => {
    saving.value = true;

    const response = await api({
        method: 'POST',
        url: "/cms-service/user",
        param: {
            username: username.value,
            firstName: firstname.value,
            lastName: lastname.value,
            email: email.value,
            mobileNumber: mobile.value,
            password: password.value,
            store_location_id: club_id.value.id,
            status: "Active",
        }
    })
    if (response.ok) {
        bypassRouteLeave.value = true;
        router.push({ name: "Door Greeter" });
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
        // clubcityRef.value.validate();
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

    // console.log(firstnameRef.value.hasError, lastnameRef.value.hasError, emailRef.value.hasError, clubcityRef.value.hasError, mobileRef.value.hasError, usernameRef.value.hasError, passwordRef.value.hasError)

    if (
        !(
            firstnameRef.value.hasError ||
            lastnameRef.value.hasError ||
            emailRef.value.hasError ||
            clubcityRef.value.hasError ||
            mobileRef.value.hasError ||
            usernameRef.value.hasError ||
            passwordRef.value.hasError ||
            firstname.value === null ||
            lastname.value === null ||
            email.value === null ||
            club_id.value === null ||
            mobile.value === null ||
            username.value === null ||
            password.value === null ||
            invalidMobile.value
        )
    ) {
        btnDisable.value = false;
        updateSaveBtn()
    } else {
        btnDisable.value = true;
        updateSaveBtn()
    }
};

const checkUsername = async () => {

    const response = await api({
        method: 'GET',
        url: "/cms-service/validation?username=" + username.value
    })

    if (!response.ok) {
        usernameExists.value = true;
    }

}

const updateSaveBtn = () => {
    console.log(tableAttr.value.headerActions)
    console.log(btnDisable, usernameExists, (btnDisable || usernameExists))

    var a = []
    var x = tableAttr.value.headerActions.forEach((x) => {
        if(x.type === 'create'){
            x.disable = (btnDisable || usernameExists).value;
            console.log(x)
        }
        a.push(x)    
    })
    console.log(a)
    actionButtons.value = a
}

const disablePaste = (evt) => {
    evt.preventDefault();
}

//This is the guard used to block accidental redirection
onBeforeRouteLeave((to, from, next) => {

    if (bypassRouteLeave.value) {
    next();
  } else {
    Prompt.value = {
      showPrompt:true,
      redirect:to,
    }
  }

    // if (!bypassRouteLeave.value) {
    //     const dialog = showDialog({
    //         title: `Leave Page?`,
    //         msg: `You are about to leave this page without saving. All changes will be lost. Do you really want to leave without saving?`,
    //         color: 'primary',
    //         isCancel: true,
    //         isOk: true,
    //         okLabel: `Proceed`,
    //         cancelLabel: `Cancel`,
    //     })
    //     if (!dialog) next()
    //     dialog.then(res => { if (res) next() })
    // }
    // else{next()}
})

const headerAction = (e) => {

    if(e.type === 'cancel'){
        if(firstname.value === null &&
            lastname.value === null &&
            email.value === null &&
            club_id.value === null &&
            mobile.value === null &&
            username.value === null &&
            password.value === null){
                bypassRouteLeave.value = true
                router.push({ name: "Door Greeter" });
            }
        router.push({ name: "Door Greeter" });

    }
    if(e.type === 'create'){
        saveStore()
    }

    console.log(e.type)

}

</script>

<style>

</style>