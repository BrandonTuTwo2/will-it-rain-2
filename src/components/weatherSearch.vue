<script setup lang="ts">
import { ref } from 'vue'
import Search1nput from 'vue-search-input'
import card from './card.vue';
import 'vue-search-input/dist/styles.css'

const searchVal = ref('')
const today = new Date();
let fiveDays: Date[] = [];
let rainy: boolean[] = Array(6).fill(false);
const rainBG = "https://images.pexels.com/photos/1028600/pexels-photo-1028600.jpeg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb";
const sunnyBG = "https://images.pexels.com/photos/1169084/pexels-photo-1169084.jpeg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb";
console.log(today)
const checkWeather = async () => {
    if (searchVal.value.trim() !== "") {
        const res = await fetch('/api/getForecast', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(searchVal.value.trim()),
        });

        const restTest = await res.json();
        const forecast = JSON.parse(restTest.forecast);
        console.log(forecast);
        forecast.forEach((element) => {
            if(Object.hasOwn(element,"rain")){
                console.log("RAIN IS AFOOT");
                let tempDate = new Date(Date.parse(element.dt_txt));
                if(tempDate.getDay() === fiveDays[0].getDay() && tempDate.getMonth() === fiveDays[0].getMonth()){
                    rainy[1] = true;
                    console.log("Comparision true");
                }
                console.log(tempDate);
            }
        });
        
    } else {
        console.log("uh oh its empty")
    }
}

const setNextFiveDays = () => {
    for (let i = 0; i < 5; i++) {
        let tempToday = new Date();
        let tempDay = tempToday.setDate(tempToday.getDate() + (i + 1));
        
        fiveDays.push(new Date(tempDay));
    }

    console.log(fiveDays);
}

setNextFiveDays();

</script>

<template>
    <Search1nput v-model="searchVal" :placeholder="'<Your address here> no I won\'t steal it'" />
    <br>
    <button class="btn btn-primary btn-search" @click="checkWeather()">Check</button>
    <br>
    <br>
    <card :isRainy="rainy[0]" :cardDate="today"/>
    <card :isRainy="rainy[1]" :cardDate="fiveDays[0]"/>
    <card :isRainy="rainy[2]" :cardDate="fiveDays[1]"/>
    <card :isRainy="rainy[3]" :cardDate="fiveDays[2]"/>
    <card :isRainy="rainy[4]" :cardDate="fiveDays[3]"/>
    <card :isRainy="rainy[5]" :cardDate="fiveDays[4]"/>
</template>

<style scoped>
</style>
