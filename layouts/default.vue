<template>
  <n-space vertical size="large">
    <div class="flex flex-row">
      <div
        collapse-mode="transform"
        :collapsed-width="120"
        :width="300"
        show-trigger="bar"
        bordered
        class="bg-primary text-white transition-all duration-300"
        :class="{
          'w-24': collapsed,
          'w-80': !collapsed,
        }"
        @update:collapsed="updateCollapsed"
      >
        <div class="flex flex-col justify-between h-screen p-6">
          <div>
            <div class="flex flex-row items-center gap-4">
              <img :src="websiteIdentity.logo.img" :alt="websiteIdentity.logo.alt" width="50" />
              <div v-if="!collapsed" class="text-2xl font-bold">{{ websiteIdentity.name }}</div>
            </div>
            <n-divider />
            <div class="flex flex-col gap-1">
              <div
                v-for="menuItem in menu"
                :key="menuItem.path"
                class="cursor-pointer py-1 px-2 justify-center items-center"
                :class="{
                  'text-primary bg-white rounded-md font-semibold': active === menuItem.path,
                  'w-fit': collapsed,
                }"
                @click="goto(menuItem.path)"
              >
                <div class="flex flex-row gap-2 items-center">
                  <div v-if="!collapsed" class="flex flex-row gap-2 items-center">
                    <Icon :icon="menuItem.icon" height="28" />
                    <div class="hover:font-semibold text-lg">{{ menuItem.title }}</div>
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
          <div v-if="!collapsed" class="text-xs flex flex-col">
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
      <div class="h-screen flex items-center -ml-5">
        <Icon
          icon="solar:alt-arrow-right-linear"
          height="36"
          class="rounded-full bg-white border-2 border-primary cursor-pointer transition-all duration-500 ease-in-out"
          :class="{
            'scale-x-[-1]': !collapsed,
          }"
          @click="collapseSidebar"
        />
      </div>
      <div class="h-screen p-6">
        <slot />
        Ciao
      </div>
    </div>
  </n-space>
</template>

<script setup>
  import { menu, websiteIdentity } from '~/utils/staticData.js'
  import { Icon } from '@iconify/vue'

  const router = useRouter()
  const route = useRoute()

  const collapsed = ref(false)
  const footer = ref(websiteIdentity.footer)
  const active = ref(route.path)

  const collapseSidebar = () => {
    collapsed.value = !collapsed.value
  }

  const goto = (path) => {
    active.value = path
    router.push(path)
  }

  const updateCollapsed = (value) => {
    collapsed.value = value
  }
</script>
