<template>
  <NSpace vertical size="large">
    <div class="flex flex-row p-2 from-zinc-100 to-zinc-200 bg-gradient-to-b">
      <div class="fixed flex h-full pb-6">
        <div
          class="text-white transition-all duration-300 shadow-lg rounded-2xl from-red-800 to-red-600 bg-gradient-to-b shadow-zinc-300"
          :class="{
            'w-24': collapsed,
            'w-72': !collapsed,
          }"
          @update:collapsed="updateCollapsed"
        >
          <div class="flex flex-col justify-between h-full p-6">
            <div class="flex flex-col h-full overflow-y-scroll grow no-scrollbar">
              <div class="flex flex-row items-center gap-4 hover:cursor-pointer" @click="goto('/')">
                <img :src="websiteIdentity.logo.img" :alt="websiteIdentity.logo.alt" width="50" />
                <div v-if="showLabels" class="flex flex-col">
                  <div class="text-2xl font-bold">{{ websiteIdentity.name }}</div>
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
                    'text-primary bg-white rounded-md font-semibold': active === menuItem.path && !menuItem?.submenu,
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
                              <div class="text-base transition-all duration-300 hover:font-semibold">
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
                        <div class="text-base transition-all duration-300 hover:font-semibold">
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

                <!-- PROFILE -->

                <div
                  v-if="userLoggedIn"
                  class="items-center justify-center px-2 py-1 cursor-pointer"
                  :class="{
                    'text-primary bg-white rounded-md font-semibold': active === '/admin',
                    'w-fit': collapsed,
                  }"
                >
                  <div class="flex flex-row items-center gap-2">
                    <!-- Full Menu -->
                    <div v-if="showLabels" class="flex flex-row items-center w-full gap-2">
                      <div class="flex flex-row items-center w-full gap-2" @click="goto('/admin')">
                        <Icon icon="solar:user-circle-bold-duotone" height="28" />
                        <div class="text-base transition-all duration-300 hover:font-semibold">Profilo</div>
                      </div>
                    </div>

                    <!-- Collapsed Menu -->
                    <NTooltip v-else placement="right" trigger="hover">
                      <template #trigger>
                        <Icon icon="solar:user-circle-bold-duotone" height="28" @click="goto('/admin')" />
                      </template>
                      <div>Profilo</div>
                    </NTooltip>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full mb-4">
              <div v-if="!userLoggedIn">
                <NButton
                  v-if="showLabels"
                  strong
                  ghost
                  round
                  class="w-full"
                  color="#FFF"
                  type="info"
                  size="large"
                  @click="showLoginModal = true"
                >
                  <template #icon>
                    <Icon icon="solar:login-2-bold-duotone" height="60" />
                  </template>
                  Connettiti
                </NButton>
                <NTooltip v-else placement="top" trigger="hover">
                  <template #trigger>
                    <NButton
                      strong
                      ghost
                      round
                      class="w-full"
                      color="#FFF"
                      type="info"
                      size="large"
                      @click="showLoginModal = true"
                    >
                      <template #icon>
                        <Icon icon="solar:login-2-bold-duotone" height="24" />
                      </template>
                    </NButton>
                  </template>
                  <div>Connettiti</div>
                </NTooltip>
              </div>
              <div v-else>
                <div class="mb-2 text-base italic text-center">Ciao {{ user?.name }}</div>
                <NButton
                  v-if="showLabels"
                  ghost
                  round
                  color="#FFF"
                  size="large"
                  class="w-full"
                  @click="showLogoutModal = true"
                >
                  <template #icon>
                    <Icon icon="solar:logout-2-bold-duotone" height="24" />
                  </template>
                  <span> Disconnettiti </span>
                </NButton>
                <NTooltip v-else placement="top" trigger="hover">
                  <template #trigger>
                    <NButton color="#FFF" ghost round size="large" class="w-full" @click="showLogoutModal = true">
                      <template #icon>
                        <Icon icon="solar:logout-2-bold-duotone" height="24" />
                      </template>
                    </NButton>
                  </template>
                  <div>Disconnettiti</div>
                </NTooltip>
              </div>
              <NModal v-model:show="showLoginModal" preset="dialog" title="Login" class="w-96">
                <LoginModal @close="showLoginModal = false" />
              </NModal>
              <NModal v-model:show="showLogoutModal" preset="card" title="Logout" class="w-96">
                <div class="flex flex-col w-full gap-2">
                  <div class="w-full">Sei sicuro di volerti disconnettere?</div>
                  <div class="flex flex-row justify-end w-full gap-2">
                    <NButton secondary round strong type="info" @click="showLogoutModal = false">No</NButton>
                    <NButton secondary round strong type="error" @click="logout">Si</NButton>
                  </div>
                </div>
              </NModal>
            </div>
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
  </NSpace>
</template>

<script setup>
  // components
  import LoginModal from '~/components/common/LoginModal.vue'

  import { menu, websiteIdentity } from '~/utils/staticData/menu.js'
  import { NCollapse, NCollapseItem, NTooltip, NSpace, NDivider, NButton, NModal, useMessage } from 'naive-ui'
  import { Icon } from '@iconify/vue'
  import { useHead } from '#imports'
  import { delay } from '~/utils/index.js'
  import { useAuthStore } from '~/stores/auth'

  const auth = useAuthStore()

  const router = useRouter()
  const route = useRoute()
  const message = useMessage()

  const showLoginModal = ref(false)
  const showLogoutModal = ref(false)
  const userLoggedIn = ref(false)
  const user = ref(null)
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
  auth.loadToken()

  watch(
    () => auth.token,
    async (t) => {
      userLoggedIn.value = !!t
      user.value = await auth.getUser()
    },
    { immediate: true, deep: true }
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

  useHead({
    title: pageTitle,
  })

  const logout = () => {
    auth.logout()
    message.success('Logout effettuato correttamente')
    showLogoutModal.value = false
  }

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
</script>
