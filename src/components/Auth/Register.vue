<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-weather-primarys bg-cover bg-center relative"
  >
    <h1 class="text-5xl font-bold text-white mb-8 z-10">The Weather App</h1>
    <div
      class="relative bg-white rounded-lg shadow-lg overflow-hidden max-w-sm w-full z-10"
    >
      <div class="px-6 py-8">
        <h2 class="text-center text-2xl font-bold text-grey-800 mb-6">Sign up</h2>
        <form @submit.prevent="register">
          <div class="mb-4">
            <label for="email" class="block text-grey-800">Email</label>
            <input
              type="email"
              id="email"
              v-model="email"
              class="mt-2 px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-weather-ring1"
              required
            />
          </div>
          <div class="mb-4">
            <label for="password" class="block text-grey-800">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              class="mt-2 px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-weather-ring1"
              required
            />
          </div>
          <div class="mb-4">
            <label for="confirm-password" class="block text-grey-800"
              >Confirm Password</label
            >
            <input
              type="password"
              id="confirm-password"
              v-model="confirmPassword"
              class="mt-2 px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-weather-ring1"
              required
            />
          </div>
          <button
            type="submit"
            class="bg-weather-primary text-white px-4 py-2 rounded-lg w-full hover:bg-weather-secondary transition"
          >
            Create account
          </button>
        </form>
        <p class="mt-4 text-center text-gray-600">
          Already have an account? <a href="#" class="text-indigo-600">Log in</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const register = () => {
  if (password.value !== confirmPassword.value) {
    alert("Passwords do not match");
    return;
  }
  console.log("Registered:", { email: email.value, password: password.value });
};
</script>

<style scoped>
.bg-weather-primarys {
  background-image: url("@/assets/background.jpg");
  background-size: auto;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
