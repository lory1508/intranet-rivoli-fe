<template>
  <div v-if="alert.show" class="relative">
    <span
      class="absolute z-50 w-3 h-3 rounded-full animate-ping bg-amber-400"
    />
    <div
      class="relative flex flex-row items-center gap-2 p-4 border-2 rounded-lg border-amber-400 text-zinc-800"
      :class="{
        'bg-white border-2 border-zinc-800 ': isHighContrast,
        ' bg-amber-50 shadow-zinc-300 shadow-md': !isHighContrast,
      }"
    >
      <Icon icon="hugeicons:alert-02" height="36" class="w-28 text-amber-600" />
      <p
        class="font-semibold"
        :class="{ 'text-2xl': isLargeFont, 'text-base': !isLargeFont }"
      >
        {{ alert.text }}
      </p>
    </div>
  </div>
</template>

<script setup>
  import { useAccessibilityStore } from "@/stores/accessibilityStore";
  import { Icon } from "@iconify/vue";

  const props = defineProps({
    alert: {
      type: Object,
      default: () => {},
    },
  });

  const accessibilityStore = useAccessibilityStore();
  const isLargeFont = computed(() => accessibilityStore.isLargeFont);
  const isHighContrast = computed(() => accessibilityStore.isHighContrast);
</script>
