<template>
  <div class="card card-compact bg-base-100 shadow-sm p-4">
    <div class="flex justify-between items-start">
      <div>
        <div class="text-sm font-medium text-base-content/70">Imóveis Ativos</div>
        <div class="text-2xl font-bold">{{ activeCount }}</div>
        <div class="text-sm text-base-content/60">Quantidade de imóveis disponíveis</div>
      </div>
      <div class="text-3xl text-base-content/30"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const activeCountRef = ref(0)

const loadActiveCount = () => {
  try {
    const imoveis = JSON.parse(localStorage.getItem('imoveis') || '[]')
    // Count imoveis where status !== 'Alugado' (or status empty -> available)
    activeCountRef.value = imoveis.filter(i => { 
      const s = (i.status || '').toString().toLowerCase();
      return s !== 'alugado';
    }).length
  } catch (e) {
    activeCountRef.value = 0
  }
}

onMounted(() => {
  loadActiveCount()
  window.addEventListener('storage', loadActiveCount)
  window.addEventListener('focus', loadActiveCount)
})
onUnmounted(() => {
  window.removeEventListener('storage', loadActiveCount)
  window.removeEventListener('focus', loadActiveCount)
})

const activeCount = computed(() => activeCountRef.value)
</script>

<style scoped></style>
