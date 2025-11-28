<template>
  <FormularioImoveis :imovel-id="id" />
</template>

<script setup>
import FormularioImoveis from '@/components/FormularioImoveis.vue'

defineProps({
  id: {
    type: String,
    default: null
  }
})
</script>
