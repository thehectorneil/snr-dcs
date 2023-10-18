<template>
  <div v-if="isOffline" class="row justify-center items-center q-pa-sm connectivity-stat">
    <div style="background-color:#333333; color:#fff;" class="q-mx-auto q-py-sm q-pl-md q-pr-xl">
      <div class="profile-details-wrapper">
        <img class="profile-picture q-mt-sm" src="../assets/no_signal.png">
        <div class="profile-details">
          <span style="font-size:16px" class="text-weight-bold">You're offline now. Oops! </span><br>
          <span style="font-size:12px"> Internet is diconnected.</span>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div class="row q-px-lg q-mb-md" style="border-bottom: 1px solid #00000033;border-top: 1px solid #00000033;">
      <div class="col">
        <div style="
            text-align: center;
            width: 100px;
            color: #00000073;
            border-radius: 4px;
          " class="q-py-sm text-weight-medium">
          <img src="../assets/logo-small.png" alt="" height="32" width="65">
        </div>
      </div>
      <div class="col scan-top-txt text-right q-py-md">
        <img style="width: 24px; height: 24px" src="../assets/account-circle.png" @click="showDrawer = !showDrawer" />
      </div>
    </div>
    <q-drawer side="right" v-model="showDrawer" hide-if-above bordered :width="271" :breakpoint="500"
      class="bg-white-3">
      <q-scroll-area class="fit">
        <div @click="showDrawer = !showDrawer" class="row q-py-md q-pl-md" style="color: gray; border: .5px solid #0000001A;
  border-radius-top: 25px;">
          <div class="col acct-setting text-weight-medium">Account Settings</div>

        </div>
        <div class="q-pa-sm" style="max-width: 350px">
          <q-list>
            <q-item clickable v-ripple class="q-py-none q-px-lg">
              <q-item-section @click="toUserDetails()">Account Details</q-item-section>
              <q-item-section avatar>
                <img style="height: 9.42px; width: 7px;" src="../assets/right-arrow.png" />
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div class="row pa-2" style="">
          <div class="col ma-auto  col-xs-12 col-md-12 col-sm-12 col-lg-12 col-xl-12"
            style="padding:5px; position:absolute; bottom: 5px;">
            <q-btn @click="logout" flat
              style="text-align:left; width:100%; color:#00000073; background-color: #0000001A;  text-transform: capitalize !important;">
              <span class="absolute-left-logout ">Logout</span>
              <img class="absolute-left-img"
                style="height: 16px; width: 16px;margin-left: 10px; text-transform: capitalize !important;"
                src="../assets/log-out.png" />
            </q-btn>
          </div>
        </div>
      </q-scroll-area>
    </q-drawer>

    <q-dialog v-model="confirmLogout" :scrim="false" persistent>
      <q-card color="primary" class="q-pa-sm">
        <q-card-section class="text-weight-medium text-center">
          Are you sure you want to log out your account?

        </q-card-section>
        <q-card-actions align="center">
          <q-btn class="gray" @click="yes">Yes</q-btn>
          <q-btn class="blue" @click="cancel">Cancel</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<style scoped>
.absolute-left-logout {
  top: 6px;
  bottom: 0;
  left: 14px;
  position: absolute;
}

.absolute-left-img {
  top: 10px;
  right: 13px;
  bottom: 0;
  position: absolute;
}

.blue {
  background-color: #1B3564;
  color: #fff;
}

.gray {
  background-color: #00000073;
  color: #fff;
}

.connectivity-stat {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
</style>
<script setup>
import { APISettings } from '../utilities/env';
import axios from "axios";
import { userToken } from "../stores/auth/login";
import { authStore } from 'src/stores/auth';
import { useRouter } from 'vue-router';
import { ref } from "vue";
import Helpers from 'src/helpers'

const { api } = Helpers()
const auth = authStore();
const storeLogin = userToken();
const router = useRouter();
const showDrawer = ref(false);
const isOffline = ref(false);
const confirmLogout = ref(false);
const logout = () => {
  confirmLogout.value = true;
};
const cancel = () => {
  confirmLogout.value = false;
  showDrawer.value = false;
};
const yes = async () => {

  const response = await api({
    method: 'POST',
    url: "/dcs-service/user/logout"
  })
  
    if (response.ok) {
      router.push({ path: '/dcs/login' })
    }
};
const toUserDetails = () => {
  if (navigator.onLine) {
    router.push({ path: '/user-details' })
  } else {
    showDrawer.value = false
    isOffline.value = true
    setTimeout(() => {
      isOffline.value = false
    }, "3000")

  }
};
</script>
 
