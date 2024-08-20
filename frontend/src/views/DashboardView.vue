<template>
  <h1>Dashboard</h1>
  <div class="error" v-if="err.error">
    <h1>Hubo un error al tratar de obtener los datos</h1>
    <p>{{ err.message }}</p>
  </div>
  <div class="container" v-else>
    <h1>Datos del usuario</h1>
    <ul>
      <li>ID: {{ id }}</li>
      <li>Nombre: {{ name }}</li>
      <li>Teléfono: {{ cellphone }}</li>
      <li>CURP: {{ curp }}</li>
      <li>Fecha de nacimiento: {{ born_date }}</li>
      <li>Correo electrónico: {{ email }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import useUsers from '@/stores/users';
import VueCookies from "vue-cookies";
import usersService from '@/services/usersService';

const err = ref({ error: false, message: "" });
const users = useUsers();

let id = ref(0);
let name = ref("");
let cellphone = ref("");
let curp = ref("");
let born_date = ref("");
let email = ref("");

onMounted(async () =>
  usersService.getAllData(
    users.allowCookies ? VueCookies.get("accessToken") : users.accessToken,
    users.allowCookies ? VueCookies.get("refreshToken") : users.refreshToken,
    "users/data",
    (json) => {
      err.value.error = false;
      err.value.message = "";
      let data = json.message;
      id.value = data.id;
      name.value = data.name;
      cellphone.value = data.cellphone;
      curp.value = data.curp;
      born_date.value = data.born_date;
      email.value = data.email;
    },
    (json) => {
      err.value.error = true;
      err.value.message = json.message;
    },
    (err) => {
      err.value.error = true;
      err.value.message = err.message;
    }
  )
);
</script>

<style scoped></style>