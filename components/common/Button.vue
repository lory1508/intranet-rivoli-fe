<template>
  <div
    strong
    secondary
    class="flex flex-row items-center justify-center gap-2 px-2 py-2 text-base transition-all duration-300 rounded-md cursor-pointer"
    :class="{
      'w-full': width === 'w-full',
      'w-fit px-4': width === 'w-fit',
      'text-white hover:bg-accent bg-primary': color === 'default',
      'bg-sections hover:ring-2 hover:ring-primary text-neutralDark': color === 'gray',
    }"
    @click="emits('clicked')"
  >
    <div v-if="icon && iconPlacement === 'left'">
      <Icon :icon="icon" height="30" />
    </div>

    <NTooltip v-if="showTooltip" trigger="hover" class="w-fit">
      <template #trigger>
        <div class="truncate">{{ title }}</div>
      </template>
      <div>
        {{ title }}
      </div>
    </NTooltip>
    <div v-else>
      {{ title }}
    </div>
    <div v-if="icon && iconPlacement === 'right'">
      <Icon :icon="icon" height="24" />
    </div>
  </div>
</template>

<script setup>
  import { Icon } from '@iconify/vue'

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
</script>
