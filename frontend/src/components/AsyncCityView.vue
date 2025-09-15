<template>
  <div class="flex flex-col flex-1 items-center">
    <div v-if="isPreview" class="text-white p-4 bg-weather-secondary w-full text-center">
      <p>Click "+" to track this city.</p>
    </div>
    <!-- overview -->
    <div class="flex flex-col items-center text-white py-12">
      <h1 class="text-4xl mb2">{{ route.params.city }}</h1>
      <p class="text-sm mb-12">
        {{
          new Date(weatherDataf.currentTime).toLocaleDateString("en-us", {
            weekday: "short",
            day: "2-digit",
            month: "long",
          })
        }}
        {{
          new Date(weatherDataf.currentTime).toLocaleTimeString("en-us", {
            timeStyle: "short",
          })
        }}
      </p>
      <p class="text-8xl mb-8">{{ Math.round(weatherDataf.current.temp) }}&deg;</p>

      <p>
        Feels Like
        {{ Math.round(weatherDataf.current.feels_like) }}&deg;
      </p>
      <p class="capitalize">
        {{ weatherDataf.current.weather[0].description }}
      </p>
      <img
        class="w-[150px] h-auto"
        :src="`http://openweathermap.org/img/wn/${weatherDataf.current.weather[0].icon}@2x.png`"
        alt=""
      />
    </div>
    <!-- section 2 -->
    <hr class="border-white border-opacity-10 border w-full" />
    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4">Hourly Weather</h2>
        <div class="flex gap-10 overflow-x-scroll custom-scrollbar">
          <div
            v-for="hourData in weatherDataf.hourly"
            :key="hourData.dt"
            class="flex flex-col gap-4 itens-center"
          >
            <p class="whitespace-nowrap text-md">
              {{
                new Date(hourData.currentTime).toLocaleTimeString("en-us", {
                  hour: "numeric",
                })
              }}
            </p>
            <img
              class="w-auto h-[50px] object-cover"
              :src="`http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`"
              alt=""
            />
            <p>{{ Math.round(hourData.temp) }}&deg;</p>
          </div>
        </div>
      </div>
    </div>
    <hr class="border-white border-opacity-10 border w-full" />
    <!-- weekly -->
    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2><strong>7 Day Forecast</strong></h2>
        <div v-for="day in weatherDataf.daily" :key="day.dt" class="flex items-center" >
        <p class="flex-1">
        {{ 
          new Date(day.dt * 1000).toLocaleDateString("en-us",{weekday:"long",})
         }}
        </p>
        <img class="w-[50px] h-[50px] object-cover" :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`" alt="" />
        <div class="flex gap-2 flex-1 justify-end">
        <p>High: {{ Math.round(day.temp.max) }}&deg;</p>
        <p>|</p>
        <p>Low: {{ Math.round(day.temp.min) }}&deg;</p>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import axios from "axios";
import { useRoute } from "vue-router";
import { computed } from "vue";
const route = useRoute();
const isPreview = computed(() => route.query.preview === "true");
console.log("test", isPreview.value);
const getWeather = async () => {
  const state = route.params.state;
  const city = route.params.city;
  const country = route.params.country;
  const lat = route.query.lat;
  const lng = route.query.lng;
  const preview = route.query.preview;
  try {
    let weatherData = await axios.get(`https://api.openweathermap.org/data/3.0/onecall`, {
      params: {
        lat: lat,
        lon: lng,
        exclude: "part",
        appid: "39289d0b26336890baee70095ce2a4d8",
        units: "metric",
      },
    });
    // console.log("weather api return", weatherData);
    // cal current date & time
    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = weatherData.data.current.dt * 1000 + localOffset;
    weatherData.data.currentTime = utc + 1000 * weatherData.data.timezone_offset;

    // cal hourly weather offset
    weatherData.data.hourly.forEach((hour) => {
      const utc = hour.dt * 1000 + localOffset;
      hour.currentTime = utc + 1000 * weatherData.data.timezone_offset;
    });
    console.log("returning this", weatherData.data);
    return weatherData.data;
  } catch (error) {
    alert(error.message);
  }

  // console.log("weatherData",weatherData);
};

const weatherDataf = await getWeather();
// console.log("final data", weatherDataf);
</script>
<style>
/* Custom scrollbar for WebKit browsers (Chrome, Safari, newer versions of Edge) */
.custom-scrollbar::-webkit-scrollbar {
  height: 12px; /* Height of the scrollbar for horizontal scroll */
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #e3bc9a; /* Color of the scrollbar thumb */
  border-radius: 10px; /* Rounded corners */
}

.custom-scrollbar::-webkit-scrollbar-track {
  background-color: transparent; /* Color of the scrollbar track */
}

/* Custom scrollbar for Firefox */
.custom-scrollbar {
  scrollbar-width: thin; /* "auto" or "thin" */
  scrollbar-color: #e3bc9a transparent; /* Scrollbar thumb and track color */
}

/* For older versions of Firefox */
.custom-scrollbar::-moz-scrollbar {
  height: 12px; /* Height of the scrollbar for horizontal scroll */
}

.custom-scrollbar::-moz-scrollbar-thumb {
  background-color: #e3bc9a; /* Color of the scrollbar thumb */
  border-radius: 10px; /* Rounded corners */
}

.custom-scrollbar::-moz-scrollbar-track {
  background-color: transparent; /* Color of the scrollbar track */
}
</style>
