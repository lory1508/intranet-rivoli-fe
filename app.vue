<template>
  <!-- <NThemeEditor> -->
  <NConfigProvider :theme-overrides="themeOverrides">
    <NMessageProvider>
      <NuxtLayout>
        <NuxtRouteAnnouncer />
      </NuxtLayout>
    </NMessageProvider>
  </NConfigProvider>
  <!-- </NThemeEditor> -->
</template>

<script setup>
  // import { NThemeEditor } from 'naive-ui'
  import { NConfigProvider, NMessageProvider } from 'naive-ui'
  import { useAuthStore } from '~/stores/auth'

  const auth = useAuthStore()
  auth.loadToken()

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
