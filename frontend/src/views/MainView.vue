<template>
  <div class="container">
    <nav v-if="menu.showMainMenu">
      <router-link :to="{ name: 'home' }">Home</router-link>
      <router-link :to="{ name: 'auth' }">Autenticación</router-link>
      <a href="" @click.prevent="handleShowCookies">🍪</a>
    </nav>
    <nav v-else>
      <a href="" @click.prevent="logout">Cerrar sesión</a>
    </nav>
    <div class="view">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import useUsers from "@/stores/users";
import useMenu from "@/stores/menu";
import { useRouter } from "vue-router";
import VueCookies from "vue-cookies";

const users = useUsers();
const menu = useMenu();
const router = useRouter();

const logout = () => {
  users.setTokens({ accessToken: "", refreshToken: "" });
  if (users.allowCookies && users.allowCookies === "true") {
    VueCookies.remove("accessToken");
    VueCookies.remove("refreshToken");
  }
  router.push("/");
}

const handleShowCookies = () => {
  localStorage.setItem("showCookies", true);
  users.recalculateShowCookies();
}

</script>

<style scoped lang="scss">
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10%, 90%));

  nav {
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: wrap row;
    background-color: #050505;

    a {
      color: white;
      text-decoration: none;
      margin: 20px;
      font-size: 1.2rem;
      padding: 5px;
      border-radius: 30px;
      transition: all 0.5s ease-in-out;

      &.router-link-active {
        background-color: #fff;
        color: #000;
      }
    }

    a:hover {
      background-color: #fff;
      color: #000;
    }
  }

  .view {
    width: 100vw;
    background-color: #141414;
    color: #fff;
    display: flex;
    justify-content: start;
    align-items: center;
    flex-flow: nowrap column;
  }
}
</style>