import { defineStore } from 'pinia';

export const userToken = defineStore({
    id: 'userDetails',

    state: () => ({
        token: '',
        first_name: '',
        last_name: '',
        mobile:'',
        password:'',
        club_location:'',
        username:'',
        remember: '',
        panel_view: '',
    }),

    // getters: {

    // },

    // actions: {

    // }
    persist: true
})