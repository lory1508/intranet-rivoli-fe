<template>
  <!-- <NThemeEditor> -->
  <NConfigProvider :theme-overrides="themeOverrides">
    <NuxtLayout>
      <NuxtRouteAnnouncer />
    </NuxtLayout>
  </NConfigProvider>
  <!-- </NThemeEditor> -->
</template>

<script setup>
  // import { NThemeEditor } from 'naive-ui'
  import { NConfigProvider } from 'naive-ui'

  const themeOverrides = {
    Input: {
      caretColor: '#1857A0FF',
      loadingColor: '#1857A0FF',
    },
    common: {
      primaryColor: '#1857A0FF',
      primaryColorHover: '#3676C1FF',
      primaryColorPressed: '#0D3F7AFF',
      primaryColorSuppl: '#5C95D7FF',
    },
  }

  onMounted(async () => {})
</script>
