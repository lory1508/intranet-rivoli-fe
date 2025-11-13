<template>
  <div class="px-3 text-sm transition-all duration-300 rounded-full w-fit" :class="customClasses" @click="goTo">
    {{ tag.name }}
  </div>
</template>

<script setup>
  import { useAccessibilityStore } from '@/stores/accessibilityStore'

  const accessibilityStore = useAccessibilityStore()
  const isLargeFont = computed(() => accessibilityStore.isLargeFont)
  const isHighContrast = computed(() => accessibilityStore.isHighContrast)

  const props = defineProps({
    tag: {
      type: Object,
      default: () => {},
    },
    color: {
      type: String,
      default: 'info',
    },
  })

  const customClasses = computed(() => {
    const classes = ref([])

    if (props.color === 'info' && !isHighContrast.value) {
      classes.value.push('bg-secondaryLight text-secondary')
    } else if (props.color === 'emerald' && !isHighContrast.value) {
      classes.value.push('border border-emerald-200 bg-emerald-50 text-emerald-600')
    } else if (props.color === 'rose' && !isHighContrast.value) {
      classes.value.push('border border-rose-200 bg-rose-50 text-rose-600')
    } else if (props.color === 'amber' && !isHighContrast.value) {
      classes.value.push('border border-amber-200 bg-amber-50 text-amber-600')
    } else if (props.color === 'zinc' && !isHighContrast.value) {
      classes.value.push('border border-zinc-200 bg-zinc-50 text-zinc-600')
    } else if (props.color === 'indigo' && !isHighContrast.value) {
      classes.value.push('border border-zinc-200 bg-zinc-100 text-indigo-600')
    } else if (props.color === 'purple' && !isHighContrast.value) {
      classes.value.push('border border-purple-200 bg-purple-50 text-purple-600')
    } else if (isHighContrast.value) {
      classes.value.push('border border-black bg-black text-white')
    }

    if (props.tag.link) {
      classes.value.push('hover:cursor-pointer hover:shadow')
    }

    if (isLargeFont.value) {
      classes.value.push('text-xl')
    } else {
      classes.value.push('text-base')
    }

    return classes.value.join(' ')
  })

  const goTo = async () => {
    await navigateTo({ path: props.tag.link })
  }
</script>
