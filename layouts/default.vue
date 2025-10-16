<template>
  <NSpace
    vertical
    size="large"
    class="transition-all duration-300"
    :class="{
      'text-xl': isLargeFont,
      'bg-white text-black': isHighContrast,
      'bg-gradient-to-br from-neutral-200 to-neutral-300': !isHighContrast,
    }"
  >
    <NModal v-model:show="showA11yModal">
      <NCard
        style="width: 600px"
        title="Impostazioni accessibilità"
        :bordered="true"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <div class="flex flex-row justify-between w-full gap-12 text-lg text-black">
          <div class="flex flex-col gap-1">
            <NButton
              strong
              secondary
              size="large"
              round
              class="transition-all duration-300 hover:ring-2 ring-black"
              @click="toggleLargeFont"
            >
              <div class="flex flex-row items-center gap-2">
                <Icon icon="fluent:text-font-20-filled" height="28" class="text-black" />
                <div class="text-lg text-black">Dimensione testo</div>
              </div>
            </NButton>
            <span>Aumenta la dimensione del testo</span>
          </div>
          <div class="flex flex-col gap-1">
            <NButton
              strong
              secondary
              size="large"
              round
              class="transition-all duration-300 hover:ring-2 ring-black"
              @click="toggleHighContrast"
            >
              <div class="flex flex-row items-center gap-2">
                <Icon icon="fluent-mdl2:contrast" height="28" class="text-black" />
                <div class="text-lg text-black">Alto contrasto</div>
              </div>
            </NButton>
            <span> Attiva l'alto contrasto per una migliore leggibilità </span>
          </div>
        </div>
        <template #footer> <Button title="Chiudi" color="darkGray" @clicked="showA11yModal = false" /> </template>
      </NCard>
    </NModal>

    <div class="flex flex-row p-2">
      <div class="fixed flex w-2/12 h-full pb-6">
        <!-- <div class="fixed flex h-full pb-6 z-top"> -->
        <div
          class="text-white transition-all duration-300 rounded-2xl"
          :class="{
            'w-24': collapsed,
            'w-72': !collapsed,
            'bg-black text-white': isHighContrast,
            'bg-primary shadow-zinc-300 shadow-lg': !isHighContrast,
          }"
          @update:collapsed="updateCollapsed"
        >
          <div class="flex flex-col justify-between h-full p-6">
            <div class="flex flex-col h-full overflow-y-scroll grow no-scrollbar">
              <div class="flex flex-row items-center gap-4 hover:cursor-pointer" @click="goto('/')">
                <img :src="websiteIdentity.logo.img" :alt="websiteIdentity.logo.alt" width="50" />
                <div v-if="showLabels" class="flex flex-col">
                  <div class="text-2xl font-bold">
                    {{ websiteIdentity.name }}
                  </div>
                  <div class="pt-2 font-semibold">Rivoli, {{ formattedToday }}</div>
                </div>
              </div>
              <NDivider />
              <div class="flex flex-col gap-1">
                <!-- MENU -->
                <div
                  v-for="menuItem in menu"
                  :key="menuItem.path"
                  class="items-center justify-center px-2 py-1 cursor-pointer"
                  :class="{
                    'text-primary bg-white rounded-md font-semibold':
                      active === menuItem.path && !menuItem?.submenu && !isHighContrast,
                    'text-black bg-white rounded-md font-semibold':
                      active === menuItem.path && !menuItem?.submenu && isHighContrast,
                    'w-fit': collapsed,
                  }"
                >
                  <div class="flex flex-row items-center gap-2">
                    <!-- Full Menu -->
                    <div v-if="showLabels" class="flex flex-row items-center w-full gap-2">
                      <NCollapse
                        v-if="menuItem.submenu"
                        arrow-placement="right"
                        class="w-full"
                        :accordion="true"
                        :expanded-names="subMenusCollapsed"
                      >
                        <template #arrow>
                          <Icon
                            icon="solar:alt-arrow-right-bold"
                            class="text-white"
                            height="24"
                            @click="expandMenu(menuItem.title)"
                          />
                        </template>
                        <NCollapseItem :name="menuItem.title">
                          <template #header>
                            <div
                              class="flex flex-row items-center w-full gap-2 text-white"
                              @click="expandMenu(menuItem.title)"
                            >
                              <Icon :icon="menuItem.icon" height="28" />
                              <div
                                class="text-base transition-all duration-300 hover:font-semibold"
                                :class="{ 'text-xl': isLargeFont, 'bg-black text-white': isHighContrast }"
                              >
                                {{ menuItem.title }}
                              </div>
                            </div>
                          </template>
                          <div class="flex flex-col gap-1 hover:cursor-default">
                            <div v-for="subMenuItem in menuItem.submenu" :key="subMenuItem.path" class="w-full">
                              <div
                                class="pl-2 transition-all duration-300 hover:cursor-pointer hover:font-semibold"
                                :class="{
                                  'text-primary bg-white rounded-md font-semibold': active === subMenuItem.path,
                                  'text-white': active !== subMenuItem.path,
                                  'text-xl': isLargeFont,
                                  'bg-black text-white': isHighContrast,
                                }"
                                @click="goto(subMenuItem.path)"
                              >
                                {{ subMenuItem.title }}
                              </div>
                            </div>
                          </div>
                        </NCollapseItem>
                      </NCollapse>
                      <div v-else class="flex flex-row items-center w-full gap-2" @click="goto(menuItem.path)">
                        <Icon :icon="menuItem.icon" height="28" />
                        <div
                          class="text-base transition-all duration-300 hover:font-semibold"
                          :class="{ 'text-xl': isLargeFont }"
                        >
                          {{ menuItem.title }}
                        </div>
                      </div>
                    </div>

                    <!-- Collapsed Menu -->
                    <NTooltip v-else placement="right" trigger="hover">
                      <template #trigger>
                        <Icon :icon="menuItem.icon" height="28" @click="goto(menuItem.path)" />
                      </template>
                      <div>
                        {{ menuItem.title }}
                      </div>
                    </NTooltip>
                  </div>
                </div>
              </div>
            </div>
            <Button
              color="white"
              icon="solar:accessibility-linear"
              class="w-full mb-8"
              title="Accessibilità"
              :show-labels="showLabels"
              show-tooltip
              @click="showA11yModal = true"
            />
            <div v-if="showLabels" class="flex flex-col text-xs h-fit">
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
            class="fixed z-50 transition-all duration-500 ease-in-out bg-white border-2 rounded-full cursor-pointer"
            :class="{
              'scale-x-[-1]': !collapsed,
              'text-primary border-primary': !isHighContrast,
              'text-black border-black': isHighContrast,
            }"
            @click="collapseSidebar"
          />
        </div>
        <div class="w-full h-full px-2 pb-4 ml-10">
          <NuxtPage />
          <NBackTop />
        </div>
      </div>
    </div>
  </NSpace>
</template>

<script setup>
  // components

  import { menu, websiteIdentity } from '~/utils/staticData/menu.js'
  import { NCollapse, NCollapseItem, NTooltip, NSpace, NDivider, NBackTop, NSwitch, NButton } from 'naive-ui'
  import { Icon } from '@iconify/vue'
  import { useAccessibilityStore } from '@/stores/accessibilityStore'
  import { useHead } from '#imports'
  import { delay } from '~/utils/index.js'
  import Button from '~/components/common/Button.vue'

  const router = useRouter()
  const route = useRoute()

  // A11y
  const accessibilityStore = useAccessibilityStore()
  const isLargeFont = computed(() => accessibilityStore.isLargeFont)
  const isHighContrast = computed(() => accessibilityStore.isHighContrast)
  const largeFont = ref(isLargeFont.value)
  const highContrast = ref(isHighContrast.value)

  const showA11yModal = ref(false)

  const subMenusCollapsed = ref([])
  const collapsed = ref(false)
  const showLabels = ref(true)
  const footer = ref(websiteIdentity.footer)
  const active = ref(route.path)
  const formattedToday = ref(new Date().toLocaleDateString('it-IT'))
  const pageTitle = computed(() =>
    route.path
      .split('/')
      .at(-1)
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ')
  )

  watch(
    () => route.path,
    () => {
      active.value = route.path
      const tmpPath = route.path.split('/').splice(1)
      const menuItem = menu.find((item) => item.path === `/${tmpPath[0]}`)
      if (menuItem?.submenu) {
        subMenusCollapsed.value.push(menuItem.title)
      }
    }
  )

  watch(
    () => largeFont.value,
    () => {
      accessibilityStore.toggleFontSize()
    }
  )

  watch(
    () => highContrast.value,
    () => {
      accessibilityStore.toggleContrast()
    }
  )

  const toggleLargeFont = () => {
    accessibilityStore.toggleFontSize()
  }
  const toggleHighContrast = async () => {
    accessibilityStore.toggleContrast()
  }

  useHead({
    title: pageTitle,
  })

  const collapseSidebar = async () => {
    collapsed.value = !collapsed.value
    if (!collapsed.value) {
      await delay(200)
    }
    showLabels.value = !showLabels.value
  }

  const expandMenu = (title) => {
    if (subMenusCollapsed.value.includes(title)) {
      subMenusCollapsed.value = subMenusCollapsed.value.filter((item) => item !== title)
    } else {
      subMenusCollapsed.value.push(title)
    }
  }

  const goto = (path) => {
    subMenusCollapsed.value = []
    router.push(path)
  }

  const updateCollapsed = (value) => {
    collapsed.value = value
  }

  // Toggle accessibility features

  onMounted(() => {
    accessibilityStore.initializePreferences()
  })
</script>
