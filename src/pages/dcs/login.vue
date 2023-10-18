<template>
  <div>
    <div class="full-width row justify-center items-center">
      <div
        class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5"
        style="height: 500px"
      >
        <div class="row q-pa-xl justify-center items-center">
          <img src="~/src/assets/home-logo.png" height="100" alt="" />
        </div>

        <form @submit.prevent.stop="onSubmit('dcs')">
          <div class="row q-pa-sm justify-center items-center">
            <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
              <q-input
                ref="usernameRef"
                outlined
                v-model="username"
                @update:model-value="onInputUserName(username)"
                label="Username"
                maxlength="50"
                :rules="usernameRules"
              />
            </div>
          </div>

          <div class="row q-pa-sm justify-center items-center">
            <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
              <q-input
                ref="passwordRef"
                outlined
                v-model="password"
                @update:model-value="onInputPassword(password)"
                label="Password"
                maxlength="50"
                :type="isPwd ? 'password' : 'text'"
                :rules="passwordRules"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </div>
          </div>

          <div
            class="row q-pa-sm justify-center items-center"
            v-if="invalid_input"
          >
            <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
              <div class="row justify-center">
                <span
                  style="color: #f44336"
                  class="text-weight-bold text-subtitle2"
                  >Login failed: Invalid username, password or store
                  location.</span
                >
              </div>
            </div>
          </div>

          <div class="row q-pa-sm justify-center items-center">
            <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
              <q-btn
                class="full-width"
                size="lg"
                label="Log in"
                no-caps
                type="submit"
                color="primary"
                text-color="white"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useQuasar } from "quasar";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { userToken } from "src/stores/auth/login";
import { authStore } from "src/stores/auth";
import { APISettings } from "src/utilities/env";
import Helpers from "src/helpers";

export default {
  setup() {
    onMounted(() => {
      console.log("sample");
      if (storeLogin.remember && $q.platform.is.desktop) {
        router.push({ path: "/admin" });
      } else {
        console.log(storeLogin.remember);
      }
    });
    const { api } = Helpers();
    const $q = useQuasar();
    const router = useRouter();
    const storeLogin = userToken();
    const auth = authStore();
    const isPwd = ref(true);
    const username = ref(null);
    const usernameRef = ref(null);
    const password = ref(null);
    const passwordRef = ref(null);
    const valid = ref(true);
    const invalid_input = ref(false);
    const remember = ref(false);
    const submitting = ref(false);
    return {
      isPwd,
      username,
      usernameRef,
      password,
      passwordRef,
      valid,
      invalid_input,
      storeLogin,
      remember,
      submitting,

      usernameRules: [
        (val) => !!val || "Please provide input on required information.",
        (val) => val.length >= 1 || "Min 1 character",
        (val) => val.length <= 50 || "Max 50 character",
        (val) => !/\s/.test(val) || "Should not contain whitespace.",
      ],
      passwordRules: [
        (val) => !!val || "Please provide input on required information.",
        (val) => val.length >= 8 || "Min 8 character",
        (val) => val.length <= 50 || "Max 50 character",
        (val) => !/\s/.test(val) || "Should not contain whitespace.",
      ],

      onSubmit(x) {
        submitting.value = true;
        usernameRef.value.validate();
        passwordRef.value.validate();

        if (usernameRef.value.hasError || passwordRef.value.hasError) {
          // form has error
          console.log("there is an error");
          submitting.value = false;
        } else {
          this.clickButton(x);
        }
      },

      onInputUserName(string) {
        var regex = string.replace(
          /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g,
          ""
        );
        username.value = regex;
        console.log(string);
        if (usernameRef.value.hasError) {
          // form has error
          console.log("there is an error");
        }
      },
      onInputPassword(string) {
        var regex = string.replace(
          /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g,
          ""
        );
        password.value = regex;
        console.log(password);
        console.log(passwordRef.value.validate());
      },

      async clickButton(x) {
        console.log(username.value, password.value);
        let self = this;
        // try {
          const response = await api({
            method: "POST",
            module: 'dcs',
            url: `/dcs-service/user/login`,
            param: {
              username: username.value,
              password: password.value,
              store_location_id: 1, //1 is valid from pinia
            },
          });
          console.log(response)
          submitting.value = false;
          invalid_input.value = false;
          if (response.ok) {
            const result = response.data.data;
          auth.setProfile({
            token: result.token,
            firstName: result.first_name,
            lastName: result.last_name,
            remember: remember.value ? true : false,
          });
            router.push({ path: "/scanner" });
          }else{
          invalid_input.value = true;
          username.value = null;
          password.value = null;
          submitting.value = false;
          }
        // } catch (e) {
 
         
        // }
      },
    };
  },
};
</script>

<style>
</style>