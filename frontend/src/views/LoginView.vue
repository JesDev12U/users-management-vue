<template>
  <div class="loader" v-if="isLoading">
    <LoaderComponent />
    <p>Esperando respuesta del servidor</p>
  </div>
  <AuthView />
  <div class="form-container">
    <h1>Login</h1>
    <form>
      <label>Correo electrónico</label>
      <input type="email" v-model="email"
        class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
      <span :class="{ hidden: validEmail }">Correo electrónico inválido</span>
      <label>Contraseña</label>
      <input type="password" v-model="password"
        class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
      <span :class="{ hidden: validPassword }">Contraseña inválida</span>
      <input type="submit" value="Iniciar sesión" :disabled="!validEmail || !validPassword" @click.prevent="login" />
    </form>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import syntax from "@/syntax/authSyntax";
import LoaderComponent from "@/components/LoaderComponent.vue";
import Swal from "sweetalert2";
import useUsers from "@/stores/users";
import { useRouter } from "vue-router";
import VueCookies from "vue-cookies";
import AuthView from "./AuthView.vue";
import AuthService from "@/services/AuthService";

const users = useUsers();
const router = useRouter();

let email = ref('');
let password = ref('');
let isLoading = ref(false);

let validEmail = computed(() => syntax.email(email.value));
let validPassword = computed(() => syntax.password(password.value));

watch(email, (newEmail) => email.value = newEmail.toLowerCase().trim());
watch(password, (newPassword) => password.value = newPassword.trim());

const login = () =>
  AuthService(
    isLoading,
    "login",
    {
      email: email.value,
      password: password.value,
    },
    (json) => {
      let accessToken = json.accessToken;
      let refreshToken = json.refreshToken;
      users.setTokens({ accessToken, refreshToken });
      if (localStorage.getItem("cookies") === "true") {
        VueCookies.set("accessToken", accessToken);
        VueCookies.set("refreshToken", refreshToken);
      }

      router.push("/dashboard");
    },
    (json) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: json.message,
      });
    }
  )
</script>

<style scoped lang="scss">
@import "../scss/auth.scss";
</style>