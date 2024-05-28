<template>
  <div class="flex flex-col min-h-screen font-Roboto bg-weather-primary">
    <SiteNavigation v-if="showNavigation" />
    <RouterView />
  </div>
</template>
<script setup>
import { RouterView } from "vue-router";
import SiteNavigation from "./components/SiteNavigation.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

// Get the current route
const route = useRoute();

// Conditionally show navigation based on the current route
const showNavigation = computed(() => route.name !== "registerView");
</script>
<style lang="scss" scoped></style>
