import { defineStore } from 'pinia';

export const userAlert = defineStore({
    id: 'alert',

    state: () => ({
        show_success: false,
    }),
    persist: true
})