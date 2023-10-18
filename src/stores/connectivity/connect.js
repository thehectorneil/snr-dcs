import { defineStore } from 'pinia';

export const userConnectivity = defineStore({
    id: 'connected', // name of the key in localstorage

    state: () => ({
        connected: navigator.onLine, 
       
    }),

   // persist: true //use this 'persist: true' when you want to stay the value all throughout the page
})