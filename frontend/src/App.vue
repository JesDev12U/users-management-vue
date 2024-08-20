<template>
  <MainView />
  <CookiesComponent />
</template>

<script setup>
import MainView from "@/views/MainView.vue";
import CookiesComponent from "@/components/CookiesComponent.vue";
import useStore from "@/stores/users";

const users = useStore();

users.verifyShowCookies();
</script>
