<template>
  <div v-if="icon || title" class="flex flex-row items-center justify-between text-neutralDark">
    <div
      class="flex flex-row gap-2"
      :class="{ 'w-full text-center justify-center': !(buttonTitle && buttonDestination) }"
    >
      <Icon v-if="icon" :icon="icon" height="32" />
      <div v-if="title" class="text-xl font-semibold">{{ title }}</div>
    </div>
    <Button
      v-if="buttonTitle && buttonDestination"
      :title="buttonTitle"
      color="darkGray"
      icon="solar:arrow-right-linear"
      width="w-fit"
      icon-placement="right"
      @clicked="$router.push(buttonDestination)"
    />
  </div>
</template>

<script setup>
  import { Icon } from '@iconify/vue'
  import Button from '~/components/common/Button.vue'

  const props = defineProps({
    icon: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    buttonTitle: {
      type: String,
      default: '',
    },
    buttonDestination: {
      type: String,
      default: '',
    },
  })
</script>
