<template>
  <CarouselBanner @update:banner="updateCarousel" :disable="disable_update" />
  <div class="q-pa-md">
    <q-card class="_card-details" bordered flat>
      <BaseBannerTitle title="Carousel Details"/>
      <div class="q-pa-lg">
      <div class="q-mb-md">
        <div class="q-mb-sm text-bold">Title</div>
        <q-input 
          outlined 
          v-model="datalist.title" 
          :maxlength="50" 
          dense
          :rules="rules.title"
        />
      </div>
      <div class="q-my-md">
        <div class="q-mb-sm text-bold">Slide Duration <span class="_text-sub">(Seconds)</span></div>
        <q-input 
          outlined 
          v-model="datalist.slide_duration" 
          :maxlength="4" 
          dense
          @keypress="isNumber($event)"
          @focusout="validateSlideDuration()"
          @paste="(evt) => disablePaste(evt)"
          @update:model-value="
            onInputEmojis(datalist.slide_duration, 'slide_duration')
          "
          />
      </div>
      </div>
    </q-card>
    <div v-if="is_loading" class="_loading">
      <q-circular-progress
        indeterminate
        rounded
        size="30px"
        class="q-ma-md _color-loading"
      />
    </div>
    <CarouselAccordion 
      v-else
      :banner_list ="banner_list"
      @update:banner="getBannerDetails"
    />
  </div>
  <BasePromptMsg :Prompt="Prompt" @update:showPrompt="(val) => {Prompt.showPrompt = false; saved_changes = val}" />
</template>

<script setup>
import {ref,onMounted,watch,computed} from 'vue'
import { onBeforeRouteLeave } from "vue-router";
import { useQuasar, Dialog  } from 'quasar'
import BaseBannerTitle from '../../../reusables/BaseBannerTitle.vue'
import CarouselAccordion from './CarouselAccordion.vue'
import CarouselBanner from '../banner/CarouselBanner.vue'
import BasePromptMsg from '../../../reusables/BasePromptMsg.vue'

import Helpers from 'src/helpers'
const { api } = Helpers()
const $q = useQuasar()

const rules = {
  title:[
    (val) => val.length >= 1 || "Min 1 character",
  ]
}

const datalist = ref([]);
const banner_list = ref([])
const is_loading = ref(true);
const disable_update = ref(true)
const saved_changes = ref(true);
const Prompt = ref({
  showPrompt:false,
  redirect:null,
})

onMounted(async () => {
 await getData();
 is_loading.value = false

})

onBeforeRouteLeave((to, from, next) => {
  if (saved_changes.value) {
    next();
  } else {
    Prompt.value = {
      showPrompt:true,
      redirect:to,
    }
  }
})

// Computed
const get_slide_duration = computed(() => {return datalist.value.slide_duration})
const get_title = computed(() => {return datalist.value.title})
// watch works directly on a ref
watch(get_slide_duration, async (val) => {
    saved_changes.value = (is_loading.value) ? true : false;
    console.log(saved_changes.value)
    disable_update.value = (!val) ? true : false;
    if(val == 0){
      datalist.value.slide_duration = 1
    }

})
watch(get_title, async (val) => {
  saved_changes.value = (is_loading.value) ? true : false;
  disable_update.value = (!val) ? true : false;
})

// props
function getBannerDetails(data){
  /*
    checks for empty image or link
    ** if true, disables update button
  */
  saved_changes.value = false;
  console.log(data,'datalist')
  var filter_data = data.filter((x) =>{
      return (!x.image || !x.link)
  })
  disable_update.value = (filter_data.length > 0) ? true : false;
}

// methods

/*
  validations
*/
const onInputEmojis = (string, userinput) => {
  var regex = string.replace(
    /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g,
    ""
  );
  if (userinput === "slide_duration") {
    datalist.value.slide_duration = regex;
  }
};

const disablePaste = (evt) => {
  evt.preventDefault();
}
const isNumber= async (evt)=>{
  evt = (evt) ? evt : window.event;
  let charCode = (evt.which) ? evt.which : evt.keyCode;
  if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46 && charCode !== 0) {
    evt.preventDefault();
  }else {
    await validateSlideDuration()
    return true;
  }
}

const validateSlideDuration = ()=>{
  const slide_duration = Number(datalist.value.slide_duration)
  console.log(slide_duration)
  if(slide_duration > 1000){
    datalist.value.slide_duration = 1000
  }
}


// api calls
const getData = async ()=>{
  const response = await api({
    method: 'GET',
    url: `/cms-service/content/carousel/1`,
  })
  if(response.ok && response.data.data){
    datalist.value = response.data.data
    banner_list.value = response.data.data.banner ? response.data.data.banner : []
  }
}

async function updateCarousel(val){
  let formData = new FormData()
  const carouselId = datalist.value.id ? datalist.value.id : ""
  formData.append('carouselId', carouselId);
  formData.append('title',datalist.value.title);
  formData.append('slide_duration',datalist.value.slide_duration);
  
  for(let i=0; i<banner_list.value.length; i++){
    formData.append(`image[${i}]`,banner_list.value[i].image);
    formData.append(`link[${i}]`,banner_list.value[i].link);
  }
  
  const response = await api({
    method: 'POST',
    url: `/cms-service/content/carousel`,
    data:formData
  })
  if(response.ok){
    saved_changes.value = true;
    $q.notify({
      color:'green',
      textColor:'white',
      position:'top-right',
      message:'Carousel updated successfully!',
      timeout: 4500
    })
  }
}

</script>

<style scoped>
._card-details{
  min-height: 280px;
  margin: 20px 0px;
}
._text-sub{
  color: #00000080;
  font-size: 12px;
  margin-left: 5px;
}
._loading{
  display: grid;
  justify-content: center;
  align-items: center;
}
._color-loading{
  color: var(--q-primary) !important;
}
</style>
