<template>
  <div class="loader" v-if="isLoading">
    <LoaderComponent />
    <p>Esperando respuesta del servidor</p>
  </div>
  <AuthView />
  <div class="form-container">
    <h1>Registro</h1>
    <form>
      <label>Nombre</label>
      <input type="text" v-model="name"
        class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
      <span :class="{ hidden: validName }">Campo requerido</span>
      <label>Teléfono</label>
      <input type="text" v-model="cellphone"
        class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
      <span :class="{ hidden: validCellphone }">Teléfono inválido</span>
      <label>CURP</label>
      <input type="text" v-model="curp"
        class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
      <span :class="{ hidden: validCURP }">CURP inválida</span>
      <label>Fecha de nacimiento</label>
      <input type="date" v-model="bornDate"
        class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
      <span :class="{ hidden: validBornDate }">La fecha debe ser entre 1900 a 2006</span>
      <label>Correo electrónico</label>
      <input type="email" v-model="email"
        class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
      <span :class="{ hidden: validEmail }">Correo inválido</span>
      <label>Contraseña</label>
      <input type="password" v-model="password"
        class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
      <span :class="{ hidden: validPassword }">La contraseña debe ser de al menos 6 caracteres</span>
      <input type="submit" value="Registrar" :disabled="disabledButton" @click.prevent="signin" />
    </form>
  </div>
</template>

<script setup>
import LoaderComponent from "@/components/LoaderComponent.vue";
import syntax from "@/syntax/authSyntax.js";
import { computed, ref, watch } from "vue";
import Swal from "sweetalert2";
import AuthView from "./AuthView.vue";
import AuthService from "@/services/AuthService";

let name = ref('');
let cellphone = ref();
let curp = ref('');
let bornDate = ref('');
let email = ref('');
let password = ref('');
let isLoading = ref(false);

let validName = computed(() => name.value.length !== 0);
let validCellphone = computed(() => syntax.cellphone(cellphone.value));
let validCURP = computed(() => syntax.curp(curp.value));
let validBornDate = computed(() => syntax.bornDate(bornDate.value));
let validEmail = computed(() => syntax.email(email.value));
let validPassword = computed(() => syntax.password(password.value));

watch(name, (newName) => name.value = newName.toUpperCase());
watch(curp, (newCurp) => curp.value = newCurp.toUpperCase().trim());
watch(email, (newEmail) => email.value = newEmail.toLowerCase().trim());
watch(password, (newPassword) => password.value = newPassword.trim());

const disabledButton = computed(() =>
  !validName.value ||
  !validCellphone.value ||
  !validCURP.value ||
  !validBornDate.value ||
  !validEmail.value ||
  !validPassword.value
);

const signin = () =>
  AuthService(
    isLoading,
    "signin",
    {
      name: name.value,
      cellphone: cellphone.value,
      curp: curp.value,
      born_date: bornDate.value,
      email: email.value,
      password: password.value,
    },
    (json) => {
      Swal.fire({
        icon: "success",
        title: json.message
      });
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
@import "../scss/loaderContainer.scss";
</style>