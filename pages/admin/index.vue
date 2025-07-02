<template>
  <div class="flex items-center justify-center w-full h-full">
    <NForm class="p-4 bg-white border w-96 rounded-xl">
      <NFormItem label="Username">
        <NInput v-model:value="form.username" />
      </NFormItem>
      <NFormItem label="Password">
        <NInput v-model:value="form.password" />
      </NFormItem>
      <NButton secondary round strong type="success"> Login </NButton>
    </NForm>
  </div>
</template>

<script setup>
  import { NForm, NFormItem, NInput, NButton } from 'naive-ui'

  const form = ref({
    username: '',
    password: '',
  })
</script>
