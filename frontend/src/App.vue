<template>
  <div class="flex flex-col min-h-screen font-Roboto bg-weather-primary">
    <SiteNavigation v-if="showNavigation" />

    <RouterView v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :key="$route.path" :is="Component"> </component>
      </transition>
    </RouterView>
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
const showNavigation = computed(() => {
  const excludedRoutes = ["registerView", "loginView"];
  return !excludedRoutes.includes(route.name);
});
</script>

<style>
.fade-enter-active {
  animation: fade-enter 1s ease-out;
}

.fade-leave-active {
  animation: fade-leave 1s ease-in;
}

@keyframes fade-enter {
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fade-leave {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
}
body.transition-active {
  overflow: hidden;
}
</style>
