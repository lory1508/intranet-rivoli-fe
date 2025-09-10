<template>
  <div
    class="flex flex-col gap-4 max-w-[400px] transition-all duration-300 bg-white border hover:scale-105 hover:shadow-lg w-fit h-fit rounded-xl"
  >
    <div class="flex flex-row items-center gap-4 border-b">
      <NImage
        v-if="employee?.photo"
        :src="employee?.photo"
        :alt="employee?.name"
        class="h-24 rounded-tl-xl hover:cursor-pointer"
      />
      <div v-else class="flex items-center justify-center w-24 h-24 rounded-tl-xl bg-primary">
        <Icon icon="fluent:person-32-filled" height="50" class="text-white" />
      </div>
      <div class="pr-4 text-2xl font-semibold text-primary">{{ employee?.name }}</div>
    </div>
    <div class="flex flex-col gap-3 px-4">
      <div class="flex flex-row gap-8">
        <div class="flex flex-row items-center gap-2">
          <Icon icon="fluent:call-48-filled" height="36" class="text-primary" />
          <div class="text-lg font-semibold">{{ employee?.phone }}</div>
        </div>
        <div class="flex flex-row items-center gap-2">
          <Icon icon="fluent:location-ripple-24-filled" height="36" class="text-primary" />
          <div class="text-lg font-semibold">{{ employee?.room }}</div>
        </div>
      </div>
      <div>
        <div class="flex flex-row items-center gap-2">
          <Icon icon="fluent:mail-48-filled" height="36" class="text-primary" />
          <div class="text-base font-semibold">{{ employee?.email }}</div>
        </div>
      </div>
      <div class="flex flex-col gap-1">
        <div v-if="employee?.department" class="flex flex-row items-center gap-2">
          <div class="text-base font-semibold text-primary">Direzione</div>
          <NTooltip trigger="hover">
            <template #trigger>
              <div class="truncate max-w-64">{{ employee?.department }}</div>
            </template>
            <div>
              {{ employee?.department }}
            </div>
          </NTooltip>
        </div>
        <div v-if="employee?.office" class="flex flex-row items-center gap-2">
          <div class="text-base font-semibold text-primary">Ufficio</div>
          <NTooltip trigger="hover">
            <template #trigger>
              <div class="truncate max-w-64">{{ employee?.office }}</div>
            </template>
            <div>
              {{ employee?.office }}
            </div>
          </NTooltip>
        </div>
        <div v-if="employee?.service" class="flex flex-row items-center gap-2">
          <div class="text-base font-semibold text-primary">Servizio</div>
          <NTooltip trigger="hover">
            <template #trigger>
              <div class="truncate max-w-64">{{ employee?.service }}</div>
            </template>
            <div>
              {{ employee?.service }}
            </div>
          </NTooltip>
        </div>
      </div>
    </div>
    <div class="flex flex-row">
      <a
        :href="`mailto:${employee?.email}`"
        class="flex items-center justify-center w-full py-2 transition-all duration-300 bg-primary rounded-b-xl hover:cursor-pointer bg-opacity-90 hover:bg-opacity-95"
      >
        <Icon icon="fluent:mail-arrow-up-24-filled" height="36" class="text-white" />
      </a>
    </div>
  </div>
</template>

<script setup>
  import { Icon } from '@iconify/vue'
  import { NImage, NTooltip } from 'naive-ui'

  const props = defineProps({
    employee: {
      type: Object,
      default: () => {},
    },
  })
</script>
