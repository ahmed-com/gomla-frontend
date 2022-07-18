import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const exampleStore = defineStore("example", ()=>{
    const counter = ref(0); // example state
    const inc = ()=> counter.value++; // example mutations
    const dec = ()=> counter.value--;
    const isOdd = computed(()=> counter.value % 2); // example getter

    return {
        counter,
        inc,
        dec,
        isOdd
    }
})