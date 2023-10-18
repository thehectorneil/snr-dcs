<template>
    <div class="">
        <form @submit.prevent.stop="onSubmit()">
            <q-banner inline-actions class="text-black bg-white q-pa-lg">
                <span class="text-bold" style="font-size:1.2rem;">Add New Store</span>
                <template v-slot:action>
                    <q-btn class="q-mr-sm" unelevated size="md" color="grey-4" text-color="grey-9" label="Cancel"
                        @click="ToListing()" no-caps />
                    <q-btn class="q-mr-sm" unelevated size="md" color="primary" type="submit" label="Save" no-caps />
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
                                maxlength="10" />

                        </div>
                        <div class="col-lg-4 q-pr-lg col-md-6 col-sm-6">
                            <div class="row text-bold">Club Name</div>
                            <q-input ref="clubnameRef" outlined v-model="club_name" dense :rules="clubnameRules"
                                maxlength="50" />

                        </div>

                    </div>

                    <!-- <div class="row q-pt-lg q-pl-sm q-pb-sm col-lg-4 q-pr-lg col-md-6 col-sm-6">
                    <div class=" col-lg-4 text-bold">Club City</div>
                </div> -->


                    <div class="row q-pl-sm q-pt-lg">

                        <div class="col-lg-4 q-pr-lg col-md-6 col-sm-6">

                            <div class="row text-bold">Club City</div>
                            <q-select ref="clubcityRef" outlined v-model="club_id" :rules="clubcityRules"
                                :options="club_city" option-value="id" option-label="city_name" emit-value map-options
                                dense />

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
import { userToken } from '../../stores/auth/login'
import { userAlert } from '../../stores/alerts/alerts'
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

const storeLogin = userToken();
const storeAlert = userAlert();
const router = useRouter()
const club_city = ref([]);
const club_id = ref(null);
const status = ref('active');
const club_code = ref(null);
const club_name = ref(null);
const clubcodeRef = ref(null);
const clubnameRef = ref(null);
const clubcityRef = ref(null);
const bypassRouteLeave = ref(false);

const Prompt = ref({
  showPrompt:false,
  redirect:null,
})

const clubcodeRules = ref([
    val => !!val || "Please provide input on required information.",
    val => val.length >= 1 || 'Min 1 character',
    val => val.length <= 10 || 'Max 10 character',
    val => !(/\s/.test(val)) || 'Should not contain whitespace.',])

const clubnameRules = ref([
    val => !!val || "Please provide input on required information.",
    val => val.length >= 1 || 'Min 1 character',
    val => val.length <= 50 || 'Max 50 character',
    val => !(/\s/.test(val)) || 'Should not contain whitespace.',])

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

        console.log(response.data.data)
        club_city.value = response.data.data;
        console.log(club_city.value)

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

    const response = await api({
        method: 'POST',
        url: "/cms-service/store",
        param: {
            cityId: club_id.value,
            code: club_code.value,
            clubName: club_name.value,
            status: 'Active'
        }
    })

    if (response.ok) {
        bypassRouteLeave.value = true;
        router.push({ name: 'Stores' })
        storeAlert.show_success = true;
    }
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
})
</script>

<style>

</style>