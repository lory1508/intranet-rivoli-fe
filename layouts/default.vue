<template>
  <n-space vertical size="large">
    <div class="flex flex-row from-zinc-100 to-zinc-200 bg-gradient-to-b">
      <div
        collapse-mode="transform"
        show-trigger="bar"
        bordered
        class="fixed text-white transition-all duration-300 shadow-lg from-red-800 to-red-600 bg-gradient-to-b shadow-zinc-800"
        :class="{
          'w-24': collapsed,
          'w-72': !collapsed,
        }"
        @update:collapsed="updateCollapsed"
      >
        <div class="flex flex-col justify-between h-screen p-6">
          <div>
            <div class="flex flex-row items-center gap-4">
              <img :src="websiteIdentity.logo.img" :alt="websiteIdentity.logo.alt" width="50" />
              <div class="flex flex-col">
                <div v-if="!collapsed" class="text-2xl font-bold">{{ websiteIdentity.name }}</div>
                <div class="pt-2 font-semibold">Rivoli, {{ formattedToday }}</div>
              </div>
            </div>
            <n-divider />
            <div class="flex flex-col gap-1">
              <div
                v-for="menuItem in menu"
                :key="menuItem.path"
                class="items-center justify-center px-2 py-1 cursor-pointer"
                :class="{
                  'text-primary bg-white rounded-md font-semibold': active === menuItem.path,
                  'w-fit': collapsed,
                }"
                @click="goto(menuItem.path)"
              >
                <div class="flex flex-row items-center gap-2">
                  <div v-if="!collapsed" class="flex flex-row items-center gap-2">
                    <Icon :icon="menuItem.icon" height="28" />
                    <div class="text-base hover:font-semibold">{{ menuItem.title }}</div>
                  </div>
                  <n-tooltip v-else placement="right" trigger="hover">
                    <template #trigger>
                      <Icon :icon="menuItem.icon" height="28" />
                    </template>
                    <div>
                      {{ menuItem.title }}
                    </div>
                  </n-tooltip>
                </div>
              </div>
            </div>
          </div>
          <div v-if="!collapsed" class="flex flex-col text-xs">
            <div class="flex flex-wrap">
              {{ footer.title }}
              {{ footer.address }}
            </div>
            <div>{{ footer.phone.label }} {{ footer.phone.number }}</div>
            <div>{{ footer.fax.label }} {{ footer.fax.number }}</div>
            <div>{{ footer.cf.label }} {{ footer.cf.number }}</div>
            <div class="flex flex-row gap-1">{{ footer.title }} - {{ footer.author }}</div>
          </div>
        </div>
      </div>
      <div
        class="flex flex-row w-full"
        :class="{
          'ml-24': collapsed,
          'ml-72': !collapsed,
        }"
      >
        <div class="flex items-center h-screen -ml-5">
          <Icon
            icon="solar:alt-arrow-right-linear"
            height="36"
            class="fixed z-50 transition-all duration-500 ease-in-out border-2 rounded-full cursor-pointer bg-neutralLight border-primary"
            :class="{
              'scale-x-[-1]': !collapsed,
            }"
            @click="collapseSidebar"
          />
        </div>
        <div class="w-full h-full px-2 pb-4 ml-10">
          <NuxtPage />
        </div>
      </div>
    </div>
  </n-space>
</template>

<script setup>
  import { menu, websiteIdentity } from '~/utils/staticData/menu.js'
  import { Icon } from '@iconify/vue'

  const router = useRouter()
  const route = useRoute()

  const collapsed = ref(false)
  const footer = ref(websiteIdentity.footer)
  const active = ref(route.path)
  const formattedToday = ref(new Date().toLocaleDateString('it-IT'))

  watch(
    () => route.path,
    () => {
      active.value = route.path
    }
  )

  const collapseSidebar = () => {
    collapsed.value = !collapsed.value
  }

  const goto = (path) => {
    router.push(path)
  }

  const updateCollapsed = (value) => {
    collapsed.value = value
  }
</script>
