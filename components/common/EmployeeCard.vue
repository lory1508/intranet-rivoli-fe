<template>
  <div
    class="flex flex-col gap-4 max-w-[450px] transition-all duration-300 bg-white hover:scale-105 hover:shadow-lg w-fit h-fit rounded-xl"
    :class="{
      'border-black border-2 ': isHighContrast,
      ' border': !isHighContrast,
    }"
  >
    <div class="flex flex-row items-center gap-4 border-b">
      <NImage
        v-if="employee?.photo"
        :src="employee?.photo"
        :alt="title"
        class="h-24 rounded-tl-xl hover:cursor-pointer"
      />
      <div
        v-else
        class="flex items-center justify-center w-24 h-24 rounded-tl-xl"
        :class="{ 'bg-black ': isHighContrast, 'bg-primary': !isHighContrast }"
      >
        <Icon icon="fluent:person-32-filled" height="50" class="text-white" />
      </div>
      <div
        class="pr-4 font-semibold transition-all duration-300"
        :class="{
          'text-3xl': isLargeFont,
          'text-2xl': !isLargeFont,
          ' text-black': isHighContrast,
          'text-primary': !isHighContrast,
        }"
      >
        {{ title }}
      </div>
    </div>
    <div class="flex flex-col gap-3 px-4">
      <div class="flex flex-row gap-8">
        <div v-if="employee?.phone" class="flex flex-row items-center gap-2">
          <Icon
            icon="fluent:call-48-filled"
            height="36"
            class="w-9 shrink-0"
            :class="{
              'text-black': isHighContrast,
              'text-primary': !isHighContrast,
            }"
          />
          <div
            class="font-semibold transition-all duration-300"
            :class="{ 'text-2xl': isLargeFont, 'text-lg': !isLargeFont }"
          >
            {{ employee?.phone }}
          </div>
        </div>
        <div class="flex flex-row items-center gap-2">
          <Icon
            icon="fluent:location-ripple-24-filled"
            height="36"
            class="w-9 shrink-0"
            :class="{
              'text-black': isHighContrast,
              'text-primary': !isHighContrast,
            }"
          />
          <div
            class="font-semibold transition-all duration-300"
            :class="{ 'text-2xl': isLargeFont, 'text-lg': !isLargeFont }"
          >
            {{ employee?.room }}
          </div>
        </div>
      </div>
      <div>
        <div class="flex flex-row items-center gap-2">
          <Icon
            icon="fluent:mail-48-filled"
            height="36"
            class="w-9 shrink-0"
            :class="{
              'text-black': isHighContrast,
              'text-primary': !isHighContrast,
            }"
          />
          <div
            class="font-semibold transition-all duration-300"
            :class="{ 'text-xl': isLargeFont, 'text-base': !isLargeFont }"
          >
            {{ employee?.email }}
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-1">
        <div
          v-if="employee?.department"
          class="flex flex-row items-center gap-2"
        >
          <div
            class="font-semibold transition-all duration-300"
            :class="{
              'text-xl': isLargeFont,
              'text-base': !isLargeFont,
              'text-black': isHighContrast,
              'text-primary': !isHighContrast,
            }"
          >
            Direzione
          </div>
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
          <div
            class="font-semibold transition-all duration-300"
            :class="{
              'text-xl': isLargeFont,
              'text-base': !isLargeFont,
              'text-black': isHighContrast,
              'text-primary': !isHighContrast,
            }"
          >
            Ufficio
          </div>
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
          <div
            class="font-semibold transition-all duration-300"
            :class="{
              'text-xl': isLargeFont,
              'text-base': !isLargeFont,
              'text-black': isHighContrast,
              'text-primary': !isHighContrast,
            }"
          >
            Servizio
          </div>
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
        class="flex items-center justify-center w-full py-2 transition-all duration-300 rounded-b-lg hover:cursor-pointer bg-opacity-90 hover:bg-opacity-95"
        :class="{
          'bg-black ': isHighContrast,
          'bg-primary': !isHighContrast,
        }"
      >
        <Icon
          icon="fluent:mail-arrow-up-24-filled"
          height="36"
          class="text-white"
        />
      </a>
    </div>
  </div>
</template>

<script setup>
  import { Icon } from "@iconify/vue";
  import { NImage, NTooltip } from "naive-ui";
  import { useAccessibilityStore } from "@/stores/accessibilityStore";
  import { decodeHtmlEntities } from "~/utils";

  const props = defineProps({
    employee: {
      type: Object,
      default: () => {},
    },
  });

  const accessibilityStore = useAccessibilityStore();
  const isLargeFont = computed(() => accessibilityStore.isLargeFont);
  const isHighContrast = computed(() => accessibilityStore.isHighContrast);
  const title = decodeHtmlEntities(props.employee?.name);
</script>
