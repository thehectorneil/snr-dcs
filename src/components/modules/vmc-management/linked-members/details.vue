<template>
<BaseLayout
  :isBackBtn="true"
  title="View Linked Members">
  <template #notif_banner>
  <BaseBannerTitle title="User Details"/>
  </template>
  <template #body>
    <BaseLoading
      type="page"
      row="1"
      col="12"
      v-if="loading" />
    <div
      v-if="!loading"
      class="row q-pa-lg text-black">
      <div class="col-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs">
        <BaseLabel title="Card Status" />
        <q-chip
          :color="status.split('|')[1]"
          class="text-white">
          {{ status.split('|')[0] }}
        </q-chip>
      </div>
      <div class="col-12 col-sm-5 col-md-5 col-lg-5 q-pa-xs q-mt-md">
        <BaseLabel title="Full Name" />
        <BaseInput
          outlined
          :disable="true"
          dense
          v-model="fullName">
        </BaseInput>  
      </div>
      <div class="col-12 col-sm-5 col-md-5 col-lg-5 q-pa-xs q-mt-md">
        <BaseLabel title="Account Number" />
        <BaseInput
          outlined
          :disable="true"
          dense
          v-model="accountNo">
        </BaseInput>  
      </div>
      <div class="col-12 col-sm-5 col-md-5 col-lg-5 q-pa-xs">
        <BaseLabel title="Card Number" />
        <BaseInput
          outlined
          :disable="true"
          dense
          v-model="cardNo">
        </BaseInput>  
      </div>
      <div class="col-12 col-sm-5 col-md-5 col-lg-5 q-pa-xs">
        <BaseLabel title="Type" />
        <BaseInput
          outlined
          :disable="true"
          dense
          v-model="type">
        </BaseInput>  
      </div>
      <div class="col-12 col-sm-5 col-md-5 col-lg-5 q-pa-xs">
        <BaseLabel title="Mobile Number" />
        <BaseInput
          outlined
          :disable="true"
          dense
          v-model="mobile">
        </BaseInput>  
      </div>
      <div class="col-12 col-sm-5 col-md-5 col-lg-5 q-pa-xs">
        <BaseLabel title="Email" />
        <BaseInput
          outlined
          :disable="true"
          dense
          v-model="email">
        </BaseInput>  
      </div>
    
      <div class="col-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs">
        <q-btn
          v-if="status.split('|')[0] === 'Pending'"
          :loading="loadingNotif"
          :disable="route.params.status === 'No'"
          :color="route.params.status === 'No' ? 'grey' : 'primary'"
          unelevated
          no-caps
          outline
          @click="sendEmailNotif"
          label="Send Email Notification"/>
      </div>
    </div>
  </template>
</BaseLayout>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import BaseLayout from 'src/components/reusables/BaseLayout'
import BaseInput from 'src/components/reusables/BaseInput'
import BaseModal from 'src/components/reusables/BaseModal'
import BaseBannerTitle from 'src/components/reusables/BaseBannerTitle'
import BaseLabel from 'src/components/reusables/BaseLabel'
import BaseLoading from 'src/components/reusables/BaseLoading'
import { useRoute, useRouter } from 'vue-router'
import Helpers from 'src/helpers'
const { api, getStatusColor, notification } = Helpers()
const route = useRoute()
const router = useRouter()
const status = ref('')
const fullName = ref('')
const accountNo = ref('')
const cardNo = ref('')
const type = ref('')
const mobile = ref('')
const email = ref('')
const loading = ref(false)
onMounted(() => memberDetails() )
/**
  Will fetch members details by @params id
 */
const memberDetails = async () => {
  loading.value = true
  const response = await api({
    method: 'GET',
    url: `/cms-service/mrm/${route.params.id}`
  })
  loading.value = false
  const data = response.data.data
  status.value = getStatusColor(data.link_status, 'status')
  fullName.value = `${data.first_name} ${data.last_name}`
  accountNo.value = data.membership_account_number
  cardNo.value = data.card_number
  type.value = data.membership_type
  mobile.value = data.mobile_phone
  email.value = data.email
}
/**
  Will send email notification if the @status is pending
 */
const sendEmailNotif = async() => {
  const response = await api({
    method: 'POST',
    loading: true,
    url: `/cms-service/notification/sendEmailNotif`,
    data: { email: email.value,
            id: route.params.id}
  })
  if(!response.ok) {
    notification({ msg: 'There is a problem sending the email notification.' })
    return
  }
  notification({
    type: 'positive',
    msg: 'Email has been sent successfully!'
  })
  router.push('/admin/linked-members')
}
</script>
