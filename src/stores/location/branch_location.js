import { defineStore } from 'pinia';

export const useBranchLocation = defineStore({
    id: 'location', // name of the key in localstorage

    state: () => ({
        id: 0, 
        club_name: '',
        store_location: ''
    }),

    // getters: {

    // },

    // actions: {

    // },
    persist: true //use this 'persist: true' when you want to stay the value all throughout the page
})