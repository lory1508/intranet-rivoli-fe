<template>
  <div
    class="flex flex-row items-center justify-between transition-all duration-300 border-b-2 border-opacity-25 hover:scale-110 w-80 hover:bg-primary hover:bg-opacity-10 gap-x-4 h-fit max-w-96 border-primary"
  >
    <div class="flex flex-row items-center gap-2">
      <div class="w-10 h-10">
        <Icon
          :icon="ICON_FILE_TYPE[props.type]"
          height="36"
          class="flex text-primary"
        />
      </div>
      <div
        class="flex flex-col justify-start gap-1 overflow-hidden text-ellipsis w-52"
      >
        <NTooltip trigger="hover">
          <template #trigger>
            <div class="flex justify-start w-48 font-semibold truncate">
              {{ title }}
            </div>
          </template>
          <div class="font-semibold">{{ title }}</div>
        </NTooltip>
        <div class="font-mono">{{ size }}KB</div>
      </div>
    </div>
    <div
      class="flex items-center justify-center h-full py-1 transition-all duration-300 rounded-md w-fit bg-primary bg-opacity-90 hover:cursor-pointer hover:bg-opacity-95"
      @click="goToAttachment"
    >
      <Icon
        icon="material-symbols:download-rounded"
        height="36"
        class="h-full text-white"
      />
    </div>
  </div>
</template>

<script setup>
  import { Icon } from "@iconify/vue";
  import { ICON_FILE_TYPE } from "~/utils/staticData/constants";

  const props = defineProps({
    title: {
      type: String,
      default: "",
    },
    url: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "",
    },
    categories: {
      type: Array,
      default: () => [],
    },
    tags: {
      type: Array,
      default: () => [],
    },
  });
  const config = useRuntimeConfig();

  const goToAttachment = async () => {
    await navigateTo(`${config.public.strapi.url}${props.url}`, {
      external: true,
      open: { target: "_blank" },
    });
  };
</script>
