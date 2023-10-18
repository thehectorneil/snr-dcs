<template>
   <q-dialog v-model="props.Prompt.showPrompt" persistent>
      <q-card class="q-pa-md">
        <q-card-section class="q-my-md">
          <label class="_label-leave-page">Leave Page?</label>
          <div class="q-mt-md _label-details">
            You are about to leave this page without saving. All changes will be lost. Do you really want to leave without saving?
          </div> 
        </q-card-section>
        <q-card-actions align="right">
          <q-btn class="_btn" label="Cancel" color="grey-4" text-color="grey-7" no-caps unelevated @click="doProceed()"></q-btn>
          <q-btn class="_btn _save-changes" label="Proceed" no-caps unelevated @click="doProceed(true)"></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script setup>
import {ref,watch} from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter()

//props
const props = defineProps(['Prompt']);
const emit = defineEmits()

const doProceed = (value = false) => {
    emit('update:showPrompt', value)
    console.log('value',value, props.Prompt.redirect.name)
    if(value){
      router.replace({name:props.Prompt.redirect.name})
    }
}



</script>

<style scoped>
._label-leave-page{
  font-size: 18px;
  color: #000;
  font-weight: bold;
}
._label-details{
  font-size: 14px;
  color: #000;
}
._btn{
  padding: 0px 30px;
}
._save-changes{
  color: white;
  background-color: #1B3564;
}
</style>