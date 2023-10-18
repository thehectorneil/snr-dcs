<template>
  <q-page>
    <!-- content -->
    <CarouselBanner/>
    <div class="q-pa-md">
      <CarouselDetails/>
    </div>
  </q-page>
</template>


<script setup>
import CarouselBanner from '../../../components/modules/carousel/banner/CarouselBanner.vue'
import CarouselDetails from '../../../components/modules/carousel/form/CarouselDetails.vue'

</script>