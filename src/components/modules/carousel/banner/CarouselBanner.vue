<template>
   <q-banner inline-actions style="padding-top: 31px; padding-bottom: 30px" class="text-black bg-white q-pa-lg ">
      <span class="text-bold" style="font-size:1.2rem;">Carousel</span>
      <template v-slot:action>
          <q-btn class="q-mr-sm" unelevated color="primary" label="Update" no-caps @click="updateCarousel" :disable="props.disable"/>
      </template>
    </q-banner>
</template>

<script setup>
// import Helpers from 'src/helpers'
// const { permissions } = Helpers()
// const permission = permissions.value
const emit = defineEmits();
const props = defineProps(['disable']);

function updateCarousel(){
  emit('update:banner', 1)
}
</script>
