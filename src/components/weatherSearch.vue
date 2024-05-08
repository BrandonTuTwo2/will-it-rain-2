<script setup lang="ts">
import { ref } from 'vue'
import Search1nput from 'vue-search-input'
import card from './card.vue';
import 'vue-search-input/dist/styles.css'
import Swal from 'sweetalert2';

const searchVal = ref('')
let sixDays: Date[] = [];
const rainy = ref(Array(6).fill(false));

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

        //set it back to false first
        rainy.value.fill(false);

        forecast.forEach((element) => {
            if (Object.hasOwn(element, "rain")) {
                let tempDate = new Date(Date.parse(element.dt_txt));
                let differenceInTime = tempDate.getTime() - sixDays[0].getTime();
                //should return something between 0 and 5
                let differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24));
                //let dateIndex = findDate(tempDate,sixDays);
                rainy.value[differenceInDays] = true;
                console.log(tempDate);
            }
        });

    } else {
        Swal.fire({
            title: 'Error',
            text: 'text field is empty.',
            icon: 'error',
        })
    }
}

const setNextsixDays = () => {
    for (let i = 0; i < 6; i++) {
        let tempToday = new Date();
        let tempDay = tempToday.setDate(tempToday.getDate() + i);

        sixDays.push(new Date(tempDay));
    }
    //console.log(sixDays);
}

setNextsixDays();

</script>

<template>
    <Search1nput v-model="searchVal" :placeholder="'<Your address here> no I won\'t steal it'" />
    <br>
    <button class="button-50" @click="checkWeather()">Check</button>
    <br>
    <br>
    <card :isRainy="rainy[0]" :cardDate="sixDays[0]" />
    <card :isRainy="rainy[1]" :cardDate="sixDays[1]" />
    <card :isRainy="rainy[2]" :cardDate="sixDays[2]" />
    <card :isRainy="rainy[3]" :cardDate="sixDays[3]" />
    <card :isRainy="rainy[4]" :cardDate="sixDays[4]" />
    <card :isRainy="rainy[5]" :cardDate="sixDays[5]" />
</template>

<style scoped>
.button-50 {
    appearance: button;
    background-color: #000;
    background-image: none;
    border: 1px solid #000;
    border-radius: 4px;
    box-shadow: #fff 4px 4px 0 0, #000 4px 4px 0 1px;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    font-family: ITCAvantGardeStd-Bk, Arial, sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    margin: 0 5px 10px 0;
    overflow: visible;
    padding: 12px 40px;
    text-align: center;
    text-transform: none;
    touch-action: manipulation;
    user-select: none;
    -webkit-user-select: none;
    vertical-align: middle;
    white-space: nowrap;
}

.button-50:focus {
    text-decoration: none;
}

.button-50:hover {
    text-decoration: none;
}

.button-50:active {
    box-shadow: rgba(0, 0, 0, .125) 0 3px 5px inset;
    outline: 0;
}

.button-50:not([disabled]):active {
    box-shadow: #fff 2px 2px 0 0, #000 2px 2px 0 1px;
    transform: translate(2px, 2px);
}

@media (min-width: 768px) {
    .button-50 {
        padding: 12px 50px;
    }
}
</style>
