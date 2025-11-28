<template>
  <!-- Imóveis ativos no dashboard -->
  <div class="card card-compact bg-base-100 shadow-sm p-4">
    <div class="flex justify-between items-start">
      <div>
        <div class="text-sm font-medium text-base-content/70">Imóveis Ativos</div>
        <div class="text-2xl font-bold">{{ activeCount }}</div>
        <div class="text-sm text-base-content/60">Imóveis disponíveis e prontos para negócio</div>
      </div>
      <div class="text-3xl text-base-content/30"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const activeCountRef = ref(0)

// Carrega a quantidade de imóveis ativos e atualiza a referência `activeCountRef`.
const loadActiveCount = () => {
  try {
    const imoveis = JSON.parse(localStorage.getItem('imoveis') || '[]')
    // Conta apenas os imóveis que NÃO estão 'Alugado' e NEM 'Em Manutenção'.
    // Um status vazio ou diferente (ex: 'Disponível') é considerado ativo.
    activeCountRef.value = imoveis.filter(i => { 
      const s = (i.status || '').toString().toLowerCase();
      return s !== 'alugado' && s !== 'em manutenção';
    }).length
  } catch (e) {
    activeCountRef.value = 0
  }
}

// Ao montar, carrega a contagem e registra listeners para manter o valor sincronizado.
onMounted(() => {
  loadActiveCount()
  window.addEventListener('storage', loadActiveCount)
  window.addEventListener('focus', loadActiveCount)
})

// Ao desmontar, remove os listeners para evitar memory leaks.
onUnmounted(() => {
  window.removeEventListener('storage', loadActiveCount)
  window.removeEventListener('focus', loadActiveCount)
})

const activeCount = computed(() => activeCountRef.value)
</script>

<style scoped></style>
