import { defineStore } from 'pinia';

export const branchNumberOfPeople = defineStore({
    id: 'number_of_people',

    state: () => ({
        number_of_people: 0
    }),
    persist: true
})