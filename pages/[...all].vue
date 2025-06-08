<template>
  <div class="pt-4">
    <div class="flex flex-col gap-2 p-4 border border-red-200 rounded-lg shadow-lg bg-red-50 w-fit">
      <h1 class="text-xl font-semibold text-red-800">Errore</h1>
      <div>La pagina che stai cercando non esiste, contatta il CED se pensi sia un errore.</div>

      <n-button strong secondary type="error" @click="sendEmail"> Apri un ticket </n-button>
    </div>
  </div>
</template>

<script setup>
  const sendEmail = async () => {
    await navigateTo('mailto:helpdesk@comune.rivoli.to.it', { external: true })
  }
</script>
