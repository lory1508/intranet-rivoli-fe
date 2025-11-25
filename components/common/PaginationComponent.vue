<template>
  <div class="flex flex-row items-center justify-center gap-4 py-4">
    <span v-if="currentPage > 1" :class="itemClasses" @click="goToPage(1)">
      «
    </span>
    <span
      v-if="currentPage > 1"
      :class="itemClasses"
      @click="goToPage(currentPage - 1)"
    >
      ‹
    </span>
    <span v-if="currentPage > 2" >...</span>
    <!-- <Icon
      v-if="currentPage > 1"
      icon="solar:double-alt-arrow-left-line-duotone"
      width="32"
      :class="itemClasses"
      @click="goToPage(1)"
    />
    <Icon
      v-if="currentPage > 1"
      icon="solar:alt-arrow-left-linear"
      width="32"
      :class="itemClasses"
      @click="goToPage(currentPage - 1)"
    />
    <Icon v-if="currentPage > 2" icon="solar:menu-dots-bold" width="28" /> -->
    <div
      v-for="i in pagesToShow"
      :key="`page_${i}`"
      class="flex items-center justify-center w-8 h-8 text-lg font-semibold border border-black sharp-shadow-sm"
      :class="[itemClasses, currentPage === i ? 'bg-red-600' : '']"
      @click="goToPage(i)"
    >
      {{ i }}
    </div>
    <!-- <Icon
      v-if="totalPages - currentPage > 1"
      icon="solar:menu-dots-bold"
      width="28"
    />
    <Icon
      v-if="currentPage < totalPages"
      icon="solar:alt-arrow-right-linear"
      width="32"
      :class="itemClasses"
      @click="goToPage(currentPage + 1)"
    />
    <Icon
      v-if="currentPage < totalPages"
      icon="solar:double-alt-arrow-right-line-duotone"
      width="32"
      :class="itemClasses"
      @click="goToPage(totalPages)"
    /> -->
    <span v-if="totalPages - currentPage > 1" >...</span>
    <span
      v-if="currentPage < totalPages"
      :class="itemClasses"
      @click="goToPage(currentPage + 1)"
    >
      ›
    </span>
    <span
      v-if="currentPage < totalPages"
      :class="itemClasses"
      @click="goToPage(totalPages)"
    >
      »
    </span>
    <select
      v-model="itemsPerPage"
      class="h-8 px-2 border border-black sharp-shadow-sm"
      @change="goToPage(1)"
    >
      <option
        v-for="i in perPageOptions"
        :key="`option_${i}`"
        :value="i"
        class="font-semibold"
      >
        {{ i }} per pagina
      </option>
    </select>
  </div>
</template>

<script setup>
  import { Icon } from "@iconify/vue/dist/iconify.js";

  const props = defineProps({
    total: {
      type: Number,
      default: 10,
    },
    perPage: {
      type: Number,
      default: 10,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    perPageOptions: {
      type: Array,
      default: [10, 20, 30],
    },
  });
  const emit = defineEmits(["pageChange"]);
  const itemClasses =
    "transition-all bg-white w-8 h-8 flex items-center justify-center text-xl font-semibold cursor-pointer border border-black sharp-shadow-sm from-neutral-300 hover:bg-amber-300";

  const itemsPerPage = ref(props.perPage);
  const totalPages = computed(() => Math.ceil(props.total / props.perPage));
  const pagesToShow = computed(() => {
    const start = Math.max(1, props.currentPage - 1);
    const end = Math.min(totalPages.value, start + 2);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  });

  const goToPage = (page) => {
    emit("pageChange", page, itemsPerPage.value);
  };
</script>
