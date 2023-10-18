<template>
    <div class="">
        <form @submit.prevent.stop="onSubmit()">
            <q-banner inline-actions class="text-black bg-white q-pa-lg">
                <span class="text-bold" style="font-size: 1.2rem">Add New User Role</span>
                <template v-slot:action>
                    <q-btn class="q-mr-sm" unelevated size="md" color="grey-4" text-color="grey-9" label="Cancel"
                        @click="ToListing()" no-caps />
                    <q-btn class="q-mr-sm" unelevated size="md" color="primary" type="submit" label="Save" no-caps
                        :disable="btnDisable" :loading="loading" />
                </template>
            </q-banner>

            <q-card class="my-card q-ma-lg">
                <q-banner inline-actions class="text-black bg-white q-pa-lg">
                    <div style="max-width: 500px">
                        <span class="text-bold" style="font-size: 1.2rem">User Role Details</span>

                    </div>
                </q-banner>

                <q-separator />

                <q-card-section style="padding-bottom: 150px">
                    <div class="row q-pt-md">
                        <p class="text-bold q-ml-sm">Status</p>
                    </div>
                    <!-- <p class="q-ml-sm text-blue-grey-3" >Disabled users will be denied of access in the CMS</p> -->
                    <div class="row">
                        <q-radio v-for="(stat, i) in status_list" :key="i" name="status" v-model="status"
                            :val="stat.status_name" :label="stat.status_name" class="q-pr-xl"
                            @click="fillIn('role_status')" />
                    </div>


                    <!-- row 2 -->

                    <div class="row q-pl-sm q-pt-lg">
                        <div class="col-lg-4 q-pr-lg col-md-6 col-sm-6">
                            <div class="row text-bold q-pb-md">User Role Name</div>
                            <q-input ref="rolenameRef" outlined v-model="role_name" dense :rules="rolenameRules"
                                maxlength="50" @paste="(evt) => disablePaste(evt)" @focusout="fillIn('role_name')" />

                            <div class="column justify-start q-pt-md">
                                <div class="text-bold">Permission Access</div>
                                <div>
                                    <p class="col-6 text-blue-grey-3">Disabled users will be denied of access in the CMS
                                    </p>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div class="row q-pl-sm q-pt-lg">
                        <div class="col-lg-8 q-pr-lg col-md-7 col-sm-7">
                            <div class="row justify-end">
                                <q-checkbox class="justify-end" @click="selectAllPermission()"
                                    style="font-weight: bold;" v-model="selectAll" label="Select All Permission" />
                            </div>

                            <div class="q-pa-md">


                                <q-list bordered class="rounded-borders">
                                    
                                    
                                    <div v-for="(m, i) in rows" :key="i">

                                    <q-expansion-item  expand-separator :hide-expand-icon="m.action.length == 0 ? false : true">

                                        <template v-slot:header>
                                            <q-item-section class="text-bold">
                                                {{m.module}}
                                            </q-item-section>

                                            <q-item-section>
                                                <div class="text-left">
                                                    <q-checkbox v-for="(permi, x) in m.action" :key="x" size="xs"
                                                        v-model="permi.button_value" :val="permi.button_value" :label="permi.name" />
                                                </div>
                                            </q-item-section>
                                        </template>
                                        
                                        <q-separator />

                                        <q-expansion-item :header-inset-level="1" expand-separator  v-for="(l1, j) in m.submodule" :key="j" :hide-expand-icon="l1.action.length == 0 ? false : true">
                                            
                                            <template v-slot:header>
                                                <q-item-section>
                                                    {{l1.name}}
                                                </q-item-section>

                                                <q-item-section>
                                                    <div class="text-left">
                                                        <q-checkbox v-for="(permi, y) in l1.action" :key="y" size="xs" @click="isAllCheck()"
                                                            v-model="permi.button_value" :val="permi.button_value" :label="permi.name"/>
                                                    </div>
                                                </q-item-section>
                                            </template>

                                            <q-expansion-item dense-toggle hide-expand-icon :header-inset-level="2" :content-inset-level="2" v-for="(l2, k) in l1.sub_submodules" :key="k" >
                                                
                                                <template v-slot:header>
                                                    <q-item-section>
                                                        {{l2.name}}
                                                    </q-item-section>

                                                    <q-item-section class="checker">
                                                        <div class="text-left">
                                                            <q-checkbox v-for="(permi, z) in l2.action" :key="z" size="xs" @click="isAllCheck()"
                                                                v-model="permi.button_value" :val="permi.button_value" :label="permi.name"/>
                                                        </div>
                                                    </q-item-section>
                                                </template>
                                            </q-expansion-item>
                                            
                                    <q-separator />

                                        </q-expansion-item>

                                    </q-expansion-item>
                                    <q-separator />
                                </div>

                                </q-list>
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
import { ref, onMounted } from "vue";
import { authStore } from "src/stores/auth";
import { userAlert } from "src/stores/alerts/alerts";
import { useRouter, onBeforeRouteLeave } from "vue-router";
import { useQuasar } from "quasar";

import { useSelectedRole } from 'src/stores/roles'
import Helpers from 'src/helpers'
import BasePromptMsg from '../../../components/reusables/BasePromptMsg.vue'
import { APISettings } from 'src/utilities/env';

const {
    api,
    showDialog
} = Helpers()


const router = useRouter();
const $q = useQuasar();
const auth = authStore();
const role = useSelectedRole()
const rolenameRef = ref(null)
const role_name = ref(null)
const status = ref('Active')
const orig_role_name = ref(null)
const orig_status = ref(null)
const orig_modules = ref(null)
const bypassRouteLeave = ref(false)
const btnDisable = ref(true)
const loading = ref(false)
const status_list = ref([
    { status_name: 'Active' },
    { status_name: 'Inactive' }
])

const selectAll = ref(false)

const chosenIndex = ref(-1)

const newRows = ref([])

const expanded = ref(false)
const checkerEmpty = ref(true)

const Prompt = ref({
  showPrompt:false,
  redirect:null,
})

onMounted(() => {
    if (role.profile.role_id != 0) {
        role_name.value = role.profile.role_name
        orig_role_name.value = role.profile.role_name
        status.value = role.profile.status
        orig_status.value = role.profile.status
    }

    getModuleList()
    // initialIsAllCheck()
});

const getIndex = (i) => {
    chosenIndex.value = i
    console.log(i)
}

const getModuleList = async () => {
    bypassRouteLeave.value = true

    var role_id = role.profile.role_id

    if(role_id !== 0){ //update role

        const response = await api({
            method: 'GET',
            url: '/cms-service/role/'+role_id
        })

        if (response.ok) {
            console.log(response)
            rows.value = response.data.data.modules
            orig_modules.value = JSON.stringify(response.data.data.modules)
            isAllCheck()
        }

    }

    else{ // add role

        const response = await api({
            method: 'GET',
            url: '/cms-service/role/module/lists'
        })

        if (response.ok) {
            // console.log(response)
            rows.value = response.data.data
            isAllCheck()
        }

    }

}


const rolenameRules = ref([
    (val) => !!val || "Please provide input on required information."
]);

const ToListing = () => {
    console.log(status.value, role_name.value)
    if (status.value === null && role_name.value === null) {
        bypassRouteLeave.value = true
    }
    router.push({ name: "Roles" });
};


const onSubmit = () => {    
    saveRole();
};

const disablePaste = (evt) => {
    evt.preventDefault();
}

const checkingBox = () => {

    newRows.value = JSON.parse(JSON.stringify(rows.value))
    console.log(JSON.parse(JSON.stringify(rows.value)))
    
}

const saveRole = async () => {

    loading.value = true

    // var api_url = role.profile.role_id == 0 ? '/cms-service/role' : '/cms-service/role/update'

    console.log(JSON.parse(JSON.stringify(rows.value)));
    var rowval = JSON.parse(JSON.stringify(rows.value))
    console.log('role ID',role.profile.role_id)

    var role_id = role.profile.role_id
    if(role_id == 0) {
        const response = await api({
            method: 'POST',
            url: '/cms-service/role',
            param: {
                id: role_id,
                name: role_name.value,
                status: status.value,
                modules: JSON.stringify(rowval)
            }
        })
        if (response.ok) {
        loading.value = false
        console.log(response)
        btnDisable.value = true

        console.log(role.profile.role_id)
        var text = (role.profile.role_id === 0 ? "Successfully added!" : "Successfully updated!")

        $q.notify({
            type: "positive",
            message: text,    
            position: "top",
        });
        bypassRouteLeave.value = true
        router.push({ name: "Roles" });
    }

    else { 
        $q.notify({
            type: "negative",
            message: "Sorry, there are some errors.",    
            position: "top",
        });
        console.log(response.error) 
        loading.value = false
    }
    }
    else {
        const response = await api({
            method: 'POST',
            url: '/cms-service/role',
            param: {
                roleId: role_id,
                name: role_name.value,
                status: status.value,
                modules: JSON.stringify(rowval)
            }
        })
        if (response.ok) {
        loading.value = false
        console.log(response)
        btnDisable.value = true

        console.log(role.profile.role_id)
        var text = (role.profile.role_id === 0 ? "Successfully added!" : "Successfully updated!")

        $q.notify({
            type: "positive",
            message: text,    
            position: "top",
        });
        bypassRouteLeave.value = true
        router.push({ name: "Roles" });
    }

    else { 
        $q.notify({
            type: "negative",
            message: "Sorry, there are some errors.",    
            position: "top",
        });
        console.log(response.error) 
        loading.value = false
    }
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
    // else { next() }
})

const selectAllPermission = () => {
    expanded.value = !expanded.value
    console.log(expanded.value)
        var newRows = []
        var stringtobool = rows.value.forEach((x) => {
            var newModule = []
            x.submodule.forEach((y) => {
                y.action.forEach((z) => {
                    Object.keys(z).forEach((item) => {
                        if(item === 'button_value'){
                            if(selectAll.value === true){
                                z[item] = true   
                            }      
                            else{
                                z[item] = false
                            }              
                        }                        
                    })
                })

                if(y.sub_submodules) {
                    y.sub_submodules.forEach((a) => {
                        a.action.forEach((b) => {                            
                            Object.keys(b).forEach((item) => {
                                if(item === 'button_value'){
                            if(selectAll.value === true){
                                b[item] = true   
                            }      
                            else{
                                b[item] = false 
                            }                        
                                }                        
                            })
                        })
                    })
                }
            })
            newRows.push(x)
        })
        rows.value = newRows
        isAllCheck()
}


const isAllCheck = () => {
    
        var isCheckedAll = []
        var stringtobool = rows.value.forEach((x) => {
            var newModule = []
            x.submodule.forEach((y) => {
                y.action.forEach((z) => {
                    Object.keys(z).forEach((item) => {
                        if(item === 'button_value'){
                            isCheckedAll.push(z[item])          
                        }                        
                    })
                })

                if(y.sub_submodules) {
                    y.sub_submodules.forEach((a) => {
                        a.action.forEach((b) => {                            
                            Object.keys(b).forEach((item) => {
                                if(item === 'button_value'){
                                    isCheckedAll.push(b[item])  
                                }                        
                            })
                        })
                    })
                }
            })
        })        
        // console.log(isCheckedAll)
        const found = isCheckedAll.some(element => element === false);
        // console.log(!found);
        selectAll.value = !found ? true : false
        // noRoleChosen.value = !found ? true : false

        const foundtrue = isCheckedAll.some(element => element === true);

        console.log('found true', foundtrue ? true : false)

        console.log(selectAll.value)

        checkerEmpty.value = !foundtrue
        console.log('empty checker',checkerEmpty.value)

        fillIn('modules')
}

const columns = ref([
    {
        name: 'name',
        required: true,
        label: 'Module Name',
        align: 'left',
        field: row => row.name,
        format: val => `${val}`,
        sortable: true
    },
    { name: 'actions', align: 'left', label: 'Permission Access', field: 'actions' }
])

const rows = ref([])

const fillIn = (e) => {
    if (e === "role_name") {
        rolenameRef.value.validate();
    }
    if (e === "role_status") {
        // vmcotpRef.value.validate();
        console.log(status.value)
    }


    var rowval = JSON.parse(JSON.stringify(rows.value))
    console.log(rolenameRef.value.hasError || role_name.value === null || checkerEmpty.value || (status.value === orig_status.value && role_name.value === orig_role_name.value && orig_modules.value === JSON.stringify(rowval)))
    if (rolenameRef.value.hasError || role_name.value === null || checkerEmpty.value || (status.value === orig_status.value && role_name.value === orig_role_name.value && orig_modules.value === JSON.stringify(rowval))) {

        btnDisable.value = true; //disabled btn
        bypassRouteLeave.value = false
    } else {
        btnDisable.value = false;
        bypassRouteLeave.value = true
    }
}

</script>

<style scoped>
.checker{
    margin-left: -45px
}
</style>