<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input
        v-model="search"
        @input="getResults"
        type="text"
        placeholder="Search Area"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]"
      />
      <ul
        v-if="searchResults.length || serverError || searchError"
        class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]"
      >
        <p v-show="serverError">An error occured, try again.</p>
        <p style="color: red" v-if="searchError">No results match your query.</p>
        <li
          v-for="place in searchResults"
          :key="place.id"
          class="py-4 px-4 cursor-pointer"
          @click="previewCity(place)"
          @mouseover=""
        >
          {{ place.properties.full_address }}
        </li>
      </ul>
    </div>
    <div class="flex flex-col gap-4">
      <Suspense>
        <CityList />
        <template #fallback>
          <p>Loading...</p>
        </template>
      </Suspense>
    </div>
  </main>
</template>
<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import CityList from "@/components/CityList.vue";

const search = ref("");
const searchResults = ref([]);
const acc_token =
  "pk.eyJ1IjoiaGFpZGVyYXdhbjkxIiwiYSI6ImNsdzduZTk1aTF5bW0yanB5NDc1ejBnanoifQ.RP6jspTxqOA7nHAib_7oTQ";
const queryTimeout = ref(null);
const searchError = ref(false);
const router = useRouter();
const serverError = ref(false);
const previewCity = (place) => {
  console.log("preview func start");
  let [
    city = "N/A",
    state = "N/A",
    country = "N/A",
  ] = place.properties.full_address.split(",");

  // if (country === undefined) {
  //   country = "N/A";
  // }
  // console.log(city, state, country);
  router.push({
    name: "cityView",
    params: {
      state: state.replaceAll(" ", ""),
      city: city.replaceAll(" ", ""),
      country: country.replaceAll(" ", ""),
    },
    query: {
      lat: place.properties.coordinates.latitude,
      lng: place.properties.coordinates.longitude,
      preview: true,
    },
  });
};
const getResults = () => {
  if (search.value == "") {
    searchResults.value = "";
    searchError.value = false;
  } else {
    clearTimeout(queryTimeout.value);
    queryTimeout.value = setTimeout(async () => {
      if (search.value !== "") {
        console.log(search.value);
        try {
          const results = await axios.get(
            `https://api.mapbox.com/search/geocode/v6/forward?q=${search.value}&access_token=${acc_token}`
          );
          searchResults.value = results.data.features;
          if (searchResults.value.length == 0) {
            searchError.value = true;
            console.log("should be  true:", searchError.value);
          }
          return;
        } catch (error) {
          serverError.value = true;
        }
      } else {
        searchResults.value = null;
      }
    }, 600);
  }
};
</script>
<style>
li:hover {
  background-color: #008080; /* Change this to the desired hover color */
}
li {
  transition: background-color 0.3s ease;
}
</style>
