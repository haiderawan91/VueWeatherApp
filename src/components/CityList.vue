<template>
  <div v-for="city in savedCities" :key="city.id">
    <CityCard
      :cityprop="city"
      @click="goToCityView(city)"
      @city-removed="updateSavedCities"
    />
  </div>
  <p v-if="savedCities.length === 0">
    Search for locations and add them by clicking the "+" to start tracking.
  </p>
</template>
<script setup>
import CityCard from "../components/CityCard.vue";
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const savedCities = ref([]);
const getCities = async () => {
  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(localStorage.getItem("savedCities"));

    const requests = [];
    savedCities.value.forEach((city) => {
      requests.push(
        //
        axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
          params: {
            lat: city.coords.lat,
            lon: city.coords.lng,
            appid: "39289d0b26336890baee70095ce2a4d8",
            units: "metric",
          },
        })
        //
      );
    });
    const weatherData = await Promise.all(requests);

    weatherData.forEach((value, index) => {
      savedCities.value[index].weather = value.data;
    });
    console.log("final savedCities after api call for card", savedCities.value);
  }
};

await getCities();
const goToCityView = (city) => {
  try {
    router.push({
      name: "cityView",
      params: { city: city.city, state: city.state, country: city.country },
      query: { lat: city.coords.lat, lng: city.coords.lng },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateSavedCities = (cityId) => {
  savedCities.value = savedCities.value.filter((city) => city.id !== cityId);
};
</script>
<style></style>
