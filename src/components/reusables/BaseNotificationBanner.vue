<template>
    <!-- <q-banner dense rounded inline-actions v-if="storeAlert.show_success" class="text-white q-ma-lg" -->
        
    <q-banner dense rounded inline-actions v-if="show_success" class="text-white q-ma-lg"
            style="background-color: #67AC5B;">
            Successfully added!
            <template v-slot:action>
                <q-btn flat round color="white" icon="close" @click="$emit('close-notification')"/>
            </template>
        </q-banner>
</template>
<script setup>
defineProps({
    show_success: {
        type: Boolean,
        default: false
    }
    // title: String,
    // indicator: {
    //     type: Boolean,
    //     default: false
    // }
})
</script>
