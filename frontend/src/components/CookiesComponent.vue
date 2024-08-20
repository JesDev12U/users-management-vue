<template>
  <div v-if="users.showCookies === 'true'">
    <section
      class="fixed max-w-md p-4 mx-auto bg-white border border-gray-200 dark:bg-gray-800 left-12 bottom-16 dark:border-gray-700 rounded-2xl">
      <h2 class="font-semibold text-gray-800 dark:text-white">🍪 ¡Usamos Cookies para funcionar!</h2>
      <p class="mt-4 text-sm text-gray-600 dark:text-gray-300">Usamos las cookies para una mejor experiencia en la
        autenticacion en la plataforma</p>
      <p class="mt-3 text-sm text-gray-600 dark:text-gray-300">Puede volver a abrir esta ventana pulsando el botón 🍪
      </p>
      <div class="grid grid-cols-2 gap-4 mt-4 shrink-0">
        <button @click.prevent="users.acceptCookies"
          class=" text-xs bg-gray-900 font-medium rounded-lg hover:bg-gray-700 text-white px-4 py-2.5 duration-300 transition-colors focus:outline-none">
          Aceptar
        </button>
        <button @click.prevent="users.rejectCookies"
          class=" text-xs border text-gray-800 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 font-medium rounded-lg px-4 py-2.5 duration-300 transition-colors focus:outline-none">
          Rechazar
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
import useStore from "@/stores/users";
const users = useStore();
</script>