<template>
  <NForm ref="formRef" :model="form">
    <NFormItem label="Username">
      <NInput v-model:value="form.username" type="text" />
    </NFormItem>
    <NFormItem label="Password">
      <NInput v-model:value="form.password" type="password" show-password-on="click" @keydown.enter="onSubmit" />
    </NFormItem>
    <NButton secondary round strong type="success" @click="onSubmit"> Login </NButton>
    <div class="mt-2 text-sm text-red-500" v-if="error" v-html="error" />
  </NForm>
</template>

<script setup>
  import { NForm, NFormItem, NInput, NButton, useMessage } from 'naive-ui'
  import { useAuthStore } from '~/stores/auth'

  const emits = defineEmits(['close'])
  const message = useMessage()
  const auth = useAuthStore()
  const error = ref(null)
  const form = ref({
    username: '',
    password: '',
  })

  const onSubmit = async () => {
    error.value = null
    const success = await auth.login(form.value.username, form.value.password)
    if (success) {
      message.success('Login effettuato correttamente')
      emits('close')
    } else {
      message.error('Login fallito')
      error.value = auth.error || 'Login failed'
    }
  }
</script>
