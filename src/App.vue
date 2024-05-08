<script setup lang="ts">
//import HelloWorld from './components/HelloWorld.vue'
import weatherSearch from './components/weatherSearch.vue';
</script>

<template>
  <h1>Will it Rain?</h1>
  <br>
  <weatherSearch/>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Dosis:wght@200..800&family=Titillium+Web:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700&display=swap');
h1 {
  font-family: "Dosis", sans-serif;
	font-size: 80px;
	margin-bottom: 30px;
  text-align: center;
	width: 100%;
	height: auto;
	background-size: cover;
	background-attachment: fixed;
	position: relative;
	overflow: hidden;
	border-radius: 0 0 85% 85% / 30%;
}
</style>
