import { defineStore } from "pinia";
import { ref } from "vue";
import { GroupMessage } from "../types/GroupMessage.type";

let count: number = 0;

const coinFlip: ()=> boolean = ()=> !!Math.round(Math.random());

const getRandomMessage = (): GroupMessage => ({
    id: ++count + '',
    content: `the content of id: ${count}`,
    attachment: coinFlip() ? 'https://picsum.photos/350/165?random' : null
})

export const useMessages = defineStore('useMessage',()=>{
    const messages = ref<GroupMessage[]>([]);
    const addMessage = ()=> messages.value.push(getRandomMessage());

    return {
        messages,
        addMessage
    }
})