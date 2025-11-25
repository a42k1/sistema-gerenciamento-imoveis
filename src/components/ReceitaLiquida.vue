<template>
  <div class="card card-compact bg-base-100 shadow-sm p-4">
    <div class="flex justify-between items-start">
      <div>
        <div class="text-sm font-medium text-base-content/70">Receita Líquida</div>
        <div class="text-2xl font-bold text-success">{{ formattedNet }}</div>
        <div class="text-sm text-base-content/60">Estimativa líquida (85% da receita total)</div>
      </div>
      <div class="text-3xl text-base-content/30"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const net = ref(0)

const loadNet = () => {
  try {
    const imoveis = JSON.parse(localStorage.getItem('imoveis') || '[]')
    const total = imoveis.reduce((acc, i) => acc + Number(i.preco || 0), 0)
    net.value = total * 0.85
  } catch (e) {
    net.value = 0
  }
}

onMounted(() => {
  loadNet()
  window.addEventListener('storage', loadNet)
  window.addEventListener('focus', loadNet)
})
onUnmounted(() => {
  window.removeEventListener('storage', loadNet)
  window.removeEventListener('focus', loadNet)
})

const formattedNet = computed(() => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(net.value)
})
</script>

<style scoped></style>
