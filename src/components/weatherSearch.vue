<script setup lang="ts">
import { ref } from 'vue'

import SearchInput from 'vue-search-input'
import 'vue-search-input/dist/styles.css'

const searchVal = ref('')

const testHI = async () =>{
    const res = await fetch('/api/hello');
    const restTest = await res.json();
    console.log(restTest);
    //hdfd
}

</script>

<template>
    <div class="searchbar my-4">
        <SearchInput v-model="searchVal" :placeholder="'Enter in the address you would like to check for rain'"/>
    </div>
    <button class="btn btn-primary btn-search" @click="testHI()">Check</button>
</template>

<style scoped></style>
