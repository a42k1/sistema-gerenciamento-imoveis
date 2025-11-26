<template>
  <div class="min-h-screen p-6">
    <div class="flex items-start gap-6 mb-6">
      <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
        <ReceitaTotal />
        <ImoveisAtivos />
      </div>
    </div>
    <div>
      <ImoveisRecentes />
    </div>
  </div>
</template>

<script setup>
import ReceitaTotal from '@/components/ReceitaTotal.vue'
import ImoveisAtivos from '@/components/ImoveisAtivos.vue'
import ImoveisRecentes from '@/components/ImoveisRecentes.vue'
</script>
