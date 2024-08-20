<template>
  <nav>
    <router-link :to="{ name: 'login' }">Login</router-link>
    <router-link :to="{ name: 'signin' }">Registro</router-link>
  </nav>
</template>

<style scoped lang="scss">
@import "../scss/auth.scss";
</style>