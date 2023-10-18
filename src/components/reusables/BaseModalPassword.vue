<template>
  <BaseModal @close="$emit('close')">
    <template #body>
      <div class="row">
        <div class="text-h6 text-bold text-negative">{{ table.statusLabels.title }}</div>
        <div class="text-grey text-caption">{{ table.statusLabels.description }}</div>
        <div class="col-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs q-mt-sm">
          <BaseInput
            label="Password *"
            :type="isPwd ? 'password' : 'text'"
            :outlined="true"
            v-model="table.formPassword.password.value"
            :errors="table.formPassword.password"
            @update:model-value="validateInput(table.formPassword, 'password')">
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </BaseInput>
        </div>
        <div class="col-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs">
          <q-btn
            :disable="!table.formPassword.password.value"
            :color="!table.formPassword.password.value ? 'grey-6' : 'primary'"
            unelevated
            class="full-width"
            no-caps
            :label="table.statusLabels.btn"
            @click="$emit('confirmed')"/>
        </div>
        <div class="col-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs">
          <q-btn
            color="grey"
            unelevated
            outline
            class="full-width"
            no-caps
            label="Cancel"
            @click="table.showStatusConfirm({
              show: false,
              status: '',
              id: '',
              key: ''
            })"/>
        </div>
      </div>
    </template>
  </BaseModal>
</template>
<script setup>
import { ref } from 'vue'
import BaseModal from 'src/components/reusables/BaseModal'
import BaseInput from 'src/components/reusables/BaseInput'
import Helpers from 'src/helpers'
import { tableStore } from 'src/stores/table'
const table = tableStore()
const { validateInput } = Helpers()
const isPwd = ref(true)
</script>