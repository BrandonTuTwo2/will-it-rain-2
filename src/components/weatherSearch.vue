<script setup lang="ts">
import { ref } from 'vue'

import SearchInput from 'vue-search-input'
import 'vue-search-input/dist/styles.css'

const searchVal = ref('')

const checkWeather = async () => {
    const address = {
        address: searchVal
    }

    const res = await fetch('/api/getForecast', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(searchVal),
    });
    
    const restTest = await res.json();
    const forecast  = JSON.parse(restTest.forecast);
    console.log(forecast);
}

</script>

<template>
    <div class="searchbar my-4">
        <SearchInput v-model="searchVal" :placeholder="'<Your address here> no I won\'t steal it'" />
    </div>
    <button class="btn btn-primary btn-search" @click="checkWeather()">Check</button>
</template>

<style scoped></style>
