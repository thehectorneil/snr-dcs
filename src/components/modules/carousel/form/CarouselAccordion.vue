<template>
  <q-card class="_card-details" bordered flat>
    <BaseBannerTitle title="Banner"/>
    <div class="q-pa-md">
      <q-list bordered>
        <q-expansion-item
          v-for="(item,i) in slider_datalist"
          :key="i"
          :label="`Slider ${i+1}`"
          header-class="_list-header-gray"
        >
          <q-card>
            <q-card-section>
              <div class="q-mb-md text-bold">Image</div>
            <div class="_img-item q-pb-md">
              <!-- have image-->
              <div v-if="item.image">
                <q-img
                  fit
                  :src="item.image"
                />
              </div>
              <!-- END --- Have image-->
              <!-- image is blank -->
              <div v-else>
                <div class="_img-blank">
                  <q-file
                  v-model="temp_img"
                  filled 
                  class="_btn-upload-img"
                  @update:model-value="changeImage(i)"
                  dark
                  dense
                  :display-value="0"
                >
                <template v-slot:default>
                  <div class="_file-input-con">
                    <div class="_lbl-file-input">Select File</div>
                  </div>
                </template>
                </q-file>
                <div class="q-pt-sm">Maximum upload size 10 MB</div>
                </div>
                <div class="q-mt-sm">
                  Please upload a rectangle image, preferably 1280x640
                </div>
              </div>
              <!-- END --- image is blank -->
              <!-- Has Error on Upload -->
              <div v-if="isError" class="q-mt-sm _lbl-error">
                  {{ error_msg }}
              </div>
            </div>
            <!-- BUTTON --- CHANGE IMAGE -->
            <!-- Button will show if {item.image} has value -->
            <div class="_btn-item q-mb-md" v-if="item.image">
              <q-file
                v-model="temp_img"
                class="_btn-change-img"
                filled 
                @update:model-value="changeImage(i)"
                dark
                dense
                :display-value="0"
              >
              <template v-slot:default>
                <div class="_file-input-con">
                  <div class="_lbl-file-input">Change Image</div>
                </div>
              </template>
              </q-file>
            </div>
            <!-- END --- BUTTON --- CHANGE IMAGE -->
            <!-- INPUT --- LINK -->
            <div class="q-mb-md text-bold">Link</div>
            <q-input outlined v-model="item.link" :maxlength="100" :rules="link_rules" dense/>
            <!-- END --- INPUT --- LINK -->
            <!-- BUTTON --- DELETE SLIDE -->
            <div v-if="i != 0" class="_btn-item q-my-md">
              <q-btn class="_btn-delete-slide" label="Delete Slide" flat no-caps @click="deleteSlide(i)"/>
            </div>
            <!-- END --- BUTTON --- DELETE SLIDE -->
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-separator />
      </q-list>
      <div class="q-pt-lg">
        <div v-if="slider_datalist_length < 5" class="_btn-add-con q-mb-md">
          <q-btn class="_btn-add-slide" icon="add" label="Add New Slide" no-caps @click="addNewSlide()"/>
        </div>
      </div>
    </div>
  </q-card>
</template>

<script setup>
//components
import BaseBannerTitle from '../../../reusables/BaseBannerTitle.vue'
//vue or quasar plugins
import {ref,computed, watch, onMounted } from 'vue'
import { useQuasar } from 'quasar'

//imports
const $q = useQuasar()
const emit = defineEmits()

//props
const props = defineProps(['banner_list']);
//component data
let slider_datalist = ref(props.banner_list)
const temp_img = ref()
const slider_datalist_length = computed(() => slider_datalist.value.length)
const link_rules = [
  (val) => val.length >= 1 || "Min 1 character",
  (val) => val.length <= 100 || "Max 100 character",
];
const isError = ref(false);
const error_msg = ref('');


onMounted(()=>{
  const banner_list = props.banner_list
  const banner_length = banner_list.length
  if((3 - banner_length) > 0){
    const slide_length = 3 - banner_length;
    for(let i  = 0; i < slide_length; i++){
      addNewSlide()
    }
  }
})

// watch works directly on a ref
watch(slider_datalist, async () => {
  emit('update:banner', slider_datalist.value)
},{deep: true})

//READS IMAGES
const changeImage = async (index)=>{
  console.log('handleUpload is triggered');
  const file_size = (Math.round(temp_img.value.size/1024)/1000).toFixed(2)
  const file_type = temp_img.value.type;
  const isValid = await validateImage(file_type,file_size);
  if(isValid){
    // render image
    let reader = new FileReader()
    reader.onload = e => {
      slider_datalist.value[index].image = e.target.result;
    };
    await reader.readAsDataURL(temp_img.value);
    // temp_img.value = ''
  }
}
/*
  adds new slide image
  **limit to 5
*/
function addNewSlide(){
 if(slider_datalist.value.length+1 <= 5 ){
    let slide_no = slider_datalist.value.length+1
    let data = {
      id:slide_no,
      image:'',
      link: ``
    }
    slider_datalist.value.push(data)
 }
}
/*
  delete selected slide
*/
function deleteSlide(i){
  $q.dialog({
        title: 'Confirm',
        message: 'Are you sure you want to delete this slide',
        cancel: true,
        persistent: true
      }).onOk(() => {
        slider_datalist.value.splice(i,1)
    })
}
/* validate uploaded image */
function validateImage(file_type,file_size){
  const max_size = 10; //10MB
  const accepted_type = ['image/png','image/jpeg']

  isError.value = false;
  error_msg.value = ''
  
  if(!accepted_type.includes(file_type)){
      //invalid file type
      $q.notify({
      type:'negative',
      textColor:'white',
      position:'bottom',
      message:'Please upload JPEG and PNG files only.',
      timeout: 2500
    })
    return false
  }
  if(file_size > max_size){
    //file size exceeds
    isError.value = true
    error_msg.value = 'Image file size is too large.'
    return false
  }
  return true
} 

</script>

<style>
._list-header-gray{
    background: #F2F2F5 !important;
}

</style>
<style scoped>
._img-item,._btn-item{
  max-width: 640px;
}
._img-blank{
  height: 250px;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='5' ry='5' stroke='%23333' stroke-width='4' stroke-dasharray='5%2c 15' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
  border-radius: 5px;
  display: grid;
  justify-content: center;
  align-content: center;
  text-align: center;
}
._btn-upload-img,._btn-change-img,._btn-add-slide{
  width: 100%;
  background-color: #1B3564 !important;
  color: #fff;
  cursor: pointer;
}

._btn-delete-slide{
  background: #DFDFE1;
  color: #919192;
}
._btn-add-con{
  width: 50%;
  margin: auto;
}
._file-input-con{
  font-size: 14px;
  color: #fff;
  position: absolute;
  width: 100%;
  height: 100%;
  display: grid;
  margin-left: auto;
  margin-right: auto;
  justify-items: center;
  align-items: center;
}
._lbl-error{
  color: #ff002f;
  font-weight: bold;
}




</style>
