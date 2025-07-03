<template>
  <div class="flex flex-col items-center justify-center p-2 bg-white border rounded-lg w-96">
    <div class="mb-2 text-xl font-semibold text-primary">Aggiorna la tua foto di profilo</div>
    <NUpload multiple directory-dnd :max="1" accept=".png,.jpg,.jpeg" class="w-80">
      <NUploadDragger>
        <div class="flex justify-center">
          <Icon icon="solar:archive-up-bold-duotone" height="48" />
        </div>
        <NText class="text-base"> Clicca o trascina l'immagine </NText>
        <NP depth="3"> Formati accettati: png, jpg, jpeg </NP>
      </NUploadDragger>
    </NUpload>
    <NButton round secondary :disabled="disabled" class="mt-2" type="success"> Carica foto </NButton>
    <pre class="ml-[700px]">{{ user }}</pre>
  </div>
</template>

<script setup>
  import { NUpload, NButton, NUploadDragger, NText, NP } from 'naive-ui'
  import { Icon } from '@iconify/vue'
  import { useAuthStore } from '~/stores/auth'

  const auth = useAuthStore()

  const disabled = ref(false)
  const user = ref()
  const userData = ref({
    first_name: auth.user?.first_name,
    last_name: auth.user?.last_name,
    birth_place: auth.user?.birth_place,
    birth_date: auth.user?.birth_date,
    department: auth.user?.department,
    service: auth.user?.service,
    office: auth.user?.office,
  })

  onMounted(async () => {
    user.value = await auth.getUser()
  })
</script>
