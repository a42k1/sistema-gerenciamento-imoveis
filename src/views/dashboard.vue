<template>
  <div class="min-h-screen p-6">
    <div class="flex items-start gap-6 mb-6">
      <div class="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
        <ReceitaTotal />
        <ImoveisAtivos />
        <ReceitaLiquida />
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
import ReceitaLiquida from '@/components/ReceitaLiquida.vue'
import ImoveisRecentes from '@/components/ImoveisRecentes.vue'
</script>
