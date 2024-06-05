<template>
  <header class="sticky top-0 bg-weather-primary shadow-lg">
    <nav class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6">
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-3">
          <i class="fa-solid fa-sun text-2xl"></i>
          <p class="text-2xl">Weather</p>
        </div>
      </RouterLink>
      <div class="flex gap-3 flex-1 justify-end">
        <div class="download-tooltip">
          <i
            class="fa-solid fa-download text-xl hover:text-weather-secondary duration-200 cursor-pointer"
          ></i>
          <span class="tooltip-text">Download Weather Data PDF</span>
        </div>
        <i
          @click="toggleModal"
          class="fa-solid fa-circle-info text-xl hover:text-weather-secondary duration-200 cursor-pointer"
        ></i>
        <i
          class="fa-solid fa-plus text-xl hover:text-weather-secondary duration-200 cursor-pointer"
          @click="addCity()"
          v-if="route.query.preview"
        ></i>
      </div>
      <i
        v-if="isLoggedin"
        @click="logout"
        class="fa-solid fa-sign-out text-xl hover:text-weather-secondary duration-200 cursor-pointer ml-auto"
      ></i>
      <BaseModal :modalActive="modalActive" @close-modal="toggleModal">
        <div class="text-black">
          <h1 class="text-2xl mb-1">About:</h1>
          <p class="mb-4">
            The Local Weather allows you to track the current and future weather of cities
            of your choosing.
          </p>
          <h2 class="text-2xl">How it works:</h2>
          <ol class="list-decimal list-inside mb-4">
            <li>Search for your city by entering the name into the search bar.</li>
            <li>
              Select a city within the results, this will take you to the current weather
              for your selection.
            </li>
            <li>
              Track the city by clicking on the "+" icon in the top right. This will save
              the city to view at a later time on the home page.
            </li>
          </ol>

          <h2 class="text-2xl">Removing a city</h2>
          <p>
            If you no longer wish to track a city, simply select the city within the home
            page. At the bottom of the page, there will be am option to delete the city.
          </p>
        </div>
      </BaseModal>
    </nav>
  </header>
</template>
<style>
.download-tooltip {
  position: relative;
  display: inline-block;
}

.download-tooltip .fa-download {
  font-size: 1.5rem;
  cursor: pointer;
}

.download-tooltip .tooltip-text {
  visibility: hidden;
  width: max-content;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 10px;
  position: absolute;
  z-index: 1;
  top: calc(100% + 5px);
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s;
}

.download-tooltip:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}
</style>
<script setup>
import BaseModal from "./BaseModal.vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { ref, onMounted, onBeforeMount } from "vue";
import { uid } from "uid";
import { useAuthStore } from "@/store/store";
import { storeToRefs } from "pinia";

const savedCities = ref([]);
const isLoggedin = ref(false);
const modalActive = ref(false);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};
let router = useRouter();
let route = useRoute();
const authStore = useAuthStore();
const logout = () => {
  localStorage.removeItem("authStore");
  isLoggedin.value = false;
  authStore.clear();
  router.push("/auth/login");
};
const addCity = () => {
  if (localStorage.getItem("savedCities")) {
    console.log("localstorage exists");
    savedCities.value = JSON.parse(localStorage.getItem("savedCities"));
  } else {
    console.log("no city in local storage");
  }
  const locationObj = {
    id: uid(),
    state: route.params.state,
    country: route.params.country,
    city: route.params.city,
    coords: {
      lat: route.query.lat,
      lng: route.query.lng,
    },
  };
  savedCities.value.push(locationObj);
  console.log("saved cities ref", savedCities.value);
  localStorage.setItem("savedCities", JSON.stringify(savedCities.value));

  let query = Object.assign({}, route.query);
  delete query.preview;
  router.replace({ query });
  console.log("localstorage", localStorage.getItem("savedCities"));
};

onBeforeMount(() => {
  const authStore = useAuthStore();
  const { userData } = storeToRefs(authStore);
  console.log("userData from store:", userData.value["email"]);
  if (userData.value["email"]) {
    isLoggedin.value = true;
  } else {
    isLoggedin.value = false;
    router.push("/auth/login");
  }
});
</script>
