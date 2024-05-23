<template>
  <div
    class="flex py-6 px-4 rounded-md shadow-xl cursor-pointer"
    style="background-color: #50c878"
  >
    <div class="px-4 py-4" @click.stop="removeCity()">
      <i class="fa fa-remove hover:text-weather-secondary" style="font-size: 30px"></i>
    </div>
    <div class="flex flex-col flex-1">
      <h2 class="text-3xl">{{ cityprop.city }}</h2>

      <h3>{{ (cityprop.state, cityprop.country) }}</h3>
    </div>
    <div class="flex flex-col gap-2">
      <p class="text-3xl self-end">
        {{ Math.round(cityprop.weather.main.temp) }}
      </p>
      <div class="flex gap-2">
        <span class="text-xs">
          H:{{ Math.round(cityprop.weather.main.temp_max) }}&deg;
        </span>
        <span class="text-xs">
          L:{{ Math.round(cityprop.weather.main.temp_min) }}&deg;
        </span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps } from "vue";
import { defineEmits } from "vue";

let props = defineProps({
  cityprop: {
    type: Object,
    default: () => {},
  },
});

const emit = defineEmits(["city-removed"]);

function removeCity() {
  let savedCities = JSON.parse(localStorage.getItem("savedCities")) || [];
  savedCities = savedCities.filter((city) => city.id !== props.cityprop.id);
  console.log("after removed cities", savedCities);
  localStorage.setItem("savedCities", JSON.stringify(savedCities));
  console.log(`City with ID ${props.cityprop.id} removed`);
  emit("city-removed", props.cityprop.id);
}
</script>
