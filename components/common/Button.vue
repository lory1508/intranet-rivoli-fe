<template>
  <div
    strong
    secondary
    class="flex flex-row items-center justify-center gap-2 px-2 py-2 text-base transition-all duration-300 rounded-md cursor-pointer"
    :class="customClasses"
    @click="emits('clicked')"
  >
    <div v-if="icon && iconPlacement === 'left'">
      <Icon :icon="icon" height="30" />
    </div>

    <NTooltip v-if="showTooltip" trigger="hover" class="w-fit">
      <template #trigger>
        <div
          class="truncate transition-all duration-300"
          :class="{ 'text-xl': isLargeFont, 'text-base': !isLargeFont, 'bg-black text-white': isHighContrast }"
        >
          {{ title }}
        </div>
      </template>
      <div
        class="transition-all duration-300"
        :class="{ 'text-xl': isLargeFont, 'text-base': !isLargeFont, 'bg-black text-white': isHighContrast }"
      >
        {{ title }}
      </div>
    </NTooltip>
    <div class="flex flex-row items-center gap-2" v-else>
      <div
        class="transition-all duration-300"
        :class="{ 'text-xl': isLargeFont, 'text-base': !isLargeFont, 'bg-black text-white': isHighContrast }"
      >
        {{ title }}
      </div>
      <div v-if="icon && iconPlacement === 'right'">
        <Icon :icon="icon" height="24" />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { Icon } from '@iconify/vue'
  import { useAccessibilityStore } from '@/stores/accessibilityStore'

  const accessibilityStore = useAccessibilityStore()
  const isLargeFont = computed(() => accessibilityStore.isLargeFont)
  const isHighContrast = computed(() => accessibilityStore.isHighContrast)

  const props = defineProps({
    color: {
      type: String,
      default: 'default',
    },
    icon: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: 'Cerca',
    },
    width: {
      type: String,
      default: 'w-full',
    },
    iconPlacement: {
      type: String,
      default: 'left',
    },
    showTooltip: {
      type: Boolean,
      default: false,
    },
  })

  const emits = defineEmits(['clicked'])

  const customClasses = computed(() => {
    const classes = ref([])
    if (props.color === 'default' && !isHighContrast.value) {
      classes.value.push('text-white hover:bg-accent bg-primary')
    } else if (props.color === 'gray' && !isHighContrast.value) {
      classes.value.push('bg-sections hover:ring-2 hover:ring-primary text-neutralDark')
    } else if (props.color === 'darkGray' && !isHighContrast.value) {
      classes.value.push('bg-neutralDark hover:bg-opacity-80 text-white')
    } else if (isHighContrast.value) {
      classes.value.push('bg-black text-white')
    }

    if (props.width === 'w-full') {
      classes.value.push('w-full')
    } else if (props.width === 'w-fit ') {
      classes.value.push('w-fit px-4')
    }

    return classes.value.join(' ')
  })
</script>
