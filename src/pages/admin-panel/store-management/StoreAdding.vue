<template>
    <div class="">
        <form @submit.prevent.stop="onSubmit()">
            <q-banner inline-actions class="text-black bg-white q-pa-lg">
                <span class="text-bold" style="font-size:1.2rem;">Add New Store</span>
                <template v-slot:action>
                    <q-btn class="q-mr-sm" unelevated size="md" color="grey-4" text-color="grey-9" label="Cancel"
                        @click="ToListing()" no-caps />
                    <q-btn class="q-mr-sm" unelevated size="md" color="primary" type="submit" label="Save" no-caps
                        :loading="saving" :disable="(btnDisable || clubcodeExists)" />
                </template>
            </q-banner>


            <q-card class="my-card q-ma-lg">

                <q-banner inline-actions class="text-black bg-white q-pa-lg">
                    <div style="max-width: 500px;">
                        <span class="text-bold" style="font-size:1.2rem;">Store Details</span>

                    </div>
                </q-banner>

                <q-separator />


                <q-card-section style="padding-bottom: 150px;">
                    <div class="row q-pt-md">
                        <span class="text-bold q-ml-sm">Status</span>

                    </div>
                    <div class="row">
                        <q-radio name="status" v-model="status" val="active" label="Active" class="q-pr-xl" />
                        <q-radio name="status" v-model="status" val="inactive" label="Inactive" disable />

                    </div>

                    <div class="row q-pl-sm q-pt-lg">

                        <div class="col-lg-4 q-pr-lg col-md-6 col-sm-6">
                            <div class="row text-bold">Club Code</div>
                            <q-input ref="clubcodeRef" outlined v-model="club_code" dense :rules="clubcodeRules"
                                @paste="disablePaste(evt)" maxlength="10" @keypress="isNumber($event)"
                                @focusout="fillIn('clubcode')" :bg-color="clubcodeExists ? 'red-3' : ''">

                                <template v-slot:hint v-if="clubcodeExists">
                                    <span class="text-negative">Club Code already exists.</span>
                                </template>
                            </q-input>

                        </div>
                        <div class="col-lg-4 q-pr-lg col-md-6 col-sm-6">
                            <div class="row text-bold">Club Name</div>
                            <q-input ref="clubnameRef" outlined v-model="club_name" dense :rules="clubnameRules"
                                @paste="disablePaste(evt)" maxlength="50" @focusout="fillIn('clubname')">
                            </q-input>

                        </div>

                    </div>


                    <div class="row q-pl-sm q-pt-lg">

                        <div class="col-lg-4 q-pr-lg col-md-6 col-sm-6">

                            <div class="row text-bold">Club City</div>
                            <q-select ref="clubcityRef" outlined v-model="club_id" :rules="clubcityRules"
                                :options="club_city" option-value="id" option-label="city_name" dense
                                @update:model-value="fillIn('clublocation')">
                                <template v-slot:selected>
                                    <template v-if="club_id">
                                        {{ club_id.city_name }}
                                    </template>
                                    <template v-else>
                                        City
                                    </template>
                                </template>
                            </q-select>

                        </div>
                        <div class="col-lg-4">

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
import { ref, onMounted } from 'vue'
import { authStore } from 'src/stores/auth'
import { userAlert } from 'src/stores/alerts/alerts'
import { useRouter, onBeforeRouteLeave } from 'vue-router';
import { useQuasar } from 'quasar'
import { APISettings } from 'src/utilities/env';
import BasePromptMsg from '../../../components/reusables/BasePromptMsg.vue'
import Helpers from 'src/helpers'

const {
    api,
    showDialog
} = Helpers()



const $q = useQuasar()

const auth = authStore()
const storeAlert = userAlert()
const router = useRouter()
const club_city = ref([])
const club_id = ref(null)
const status = ref('active')
const club_code = ref(null)
const club_name = ref(null)
const clubcodeRef = ref(null)
const clubnameRef = ref(null)
const clubcityRef = ref(null)
const bypassRouteLeave = ref(false)
const clubcodeExists = ref(false)
const saving = ref(false)
const btnDisable = ref(true)

const Prompt = ref({
  showPrompt:false,
  redirect:null,
})

const clubcodeRules = ref([
    val => !!val || "Please provide input on required information.",
    val => val.length >= 1 || 'Min 1 character',
    val => val.length <= 10 || 'Max 10 character'])

const clubnameRules = ref([
    val => !!val || "Please provide input on required information.",
    val => val.length >= 1 || 'Min 1 character',
    val => val.length <= 50 || 'Max 50 character'])

const clubcityRules = ref([
    val => !!val || "Please provide input on required information."])



onMounted(() => {
    getCities();
});

const ToListing = () => {
    router.push({ name: 'Stores' })
}

const getCities = async () => {

    const response = await api({
        method: 'GET',
        url: "/cms-service/store/city"
    })
    if (response.ok) {
        club_city.value = response.data.data
    }
}


const onSubmit = () => {

    // submitting.value = true;
    clubcodeRef.value.validate()
    clubnameRef.value.validate()
    clubcityRef.value.validate()


    if (clubcodeRef.value.hasError || clubnameRef.value.hasError || clubcityRef.value.hasError) {
        // form has error
        console.log('there is an error')
        // submitting.value = false;
    }
    else {
        saveStore()

    }
}

const saveStore = async () => {

    saving.value = true;

    const response = await api({
        method: 'POST',
        url: `/cms-service/store`,
        param: {
            cityId: club_id.value.id,
            code: club_code.value,
            club_name: club_name.value,
            status: 'Active'
        }
    })

    if (response.ok) {
        bypassRouteLeave.value = true;
        router.push({ name: 'Stores' })
        storeAlert.show_success = true;
    }
}

const isLetterAndNumber = (evt) => {
    let char = String.fromCharCode(evt.keyCode); // Get the character
    if (/^[a-zA-Z0-9]*$/.test(char)) return true; // Match with regex 
    else evt.preventDefault(); // If not match, don't add to input text
}
const isNumber = (evt) => {
    let char = String.fromCharCode(evt.keyCode); // Get the character
    if (/^[0-9]+$/.test(char)) return true;
    // Match with regex
    else evt.preventDefault(); // If not match, don't add to input text
};

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
})


const disablePaste = (evt) => {
    console.log(evt)
    evt.preventDefault();
}


const fillIn = (e) => {

    if (e === 'clubname') { clubnameRef.value.validate() }
    if (e === 'clubcode') {
        clubcodeRef.value.validate()
        checkClubcode()
    }
    if (e === 'clublocation') { }


    console.log(clubcodeRef.value.hasError, clubnameRef.value.hasError, clubcityRef.value.hasError, club_code.value === null, club_name.value === null, club_id.value === null)

    if (!((clubcodeRef.value.hasError || clubnameRef.value.hasError || clubcityRef.value.hasError) || (club_code.value === null || club_name.value === null || club_id.value === null))) {
        console.log(!(clubcodeRef.value.hasError || clubnameRef.value.hasError || clubcityRef.value.hasError))
        // form has error
        // console.log('there is an error')
        // submitting.value = false;
        btnDisable.value = false

    }
    else {
        btnDisable.value = true

    }

}

const checkClubcode = async () => {
    const response = await api({
        method: 'GET',
        url: "/cms-service/validation?code=" + club_code.value
    })
    if (!response.ok) {
        console.log(response)
        clubcodeExists.value = true;
    }
}
</script>

<style>

</style>