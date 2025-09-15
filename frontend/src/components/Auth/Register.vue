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
        <form @submit.prevent="onSubmit">
          <div class="mb-4">
            <label for="email" class="block text-grey-800">Email</label>
            <input
              type="email"
              id="email"
              v-model="email"
              class="mt-2 px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-weather-ring1"
            />
            <span v-if="errors.email" class="text-red-600">{{ errors.email }}</span>
          </div>
          <div class="mb-4">
            <label for="password" class="block text-grey-800">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              class="mt-2 px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-weather-ring1"
            />
            <span v-if="errors.password" class="text-red-600">{{ errors.password }}</span>
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
            />
            <span v-if="errors.confirmPassword" class="text-red-600">{{
              errors.confirmPassword
            }}</span>
          </div>
          <button
            type="submit"
            class="bg-weather-primary text-white px-4 py-2 rounded-lg w-full hover:bg-weather-secondary transition"
          >
            Create account
          </button>
        </form>
        <p class="mt-4 text-center text-gray-600">
          Already have an account? <router-link to="/auth/login" class="text-indigo-600">Log in</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import * as yup from "yup";
import { useField, useForm } from "vee-validate";
import axios from "axios";
import { useRouter } from "vue-router";

let router = useRouter();
// Define the validation schema
const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

// Setup Vee Validate
const { validate, errors } = useForm({
  validationSchema: schema,
});
const { value: email } = useField("email");
const { value: password } = useField("password");
const { value: confirmPassword } = useField("confirmPassword");

const onSubmit = async (values) => {
  const valid = await validate();
  if (valid.valid) {
    try {
      const response = await axios.post("http://localhost:3000/api/Register_user", {
        email: email.value,
        password: password.value,
      },
      {
        withCredentials: true 
      });
      console.log("Registered:", response.data);
      router.push("/home");
    } catch (error) {
      console.error("Registration error:", error);
    }
  }else{
    console.log("invalid");  
  }
  // console.log("Registered:", values);
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
