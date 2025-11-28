<template>
<!-- Receita de aluguéis no dashboard -->
  <div class="card card-compact bg-base-100 shadow-sm p-4">
    <div class="flex justify-between items-start">
      <div>
        <div class="text-sm font-medium text-base-content/70">Receita de Aluguéis</div>
        <div class="text-2xl font-bold text-primary">{{ formattedTotal }}</div>
        <div class="text-sm text-base-content/60">Soma dos imóveis alugados</div>
      </div>
      <div class="text-3xl text-base-content/30"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const total = ref(0)

// Carrega a soma (receita total) dos imóveis alugados a partir do localStorage
// e atualiza a referência reativa `total` com o valor calculado
const loadTotal = () => {
  try {
    const imoveis = JSON.parse(localStorage.getItem('imoveis') || '[]')
    // Filtra apenas imóveis com status 'Alugado' e soma seus preços
    total.value = imoveis
      .filter(i => (i.status || '').toLowerCase() === 'alugado')
      .reduce((acc, i) => acc + Number(i.preco || 0), 0)
  } catch (e) {
    total.value = 0
  }
}

// Ao montar, carrega o total e registra listeners para manter o valor atualizado
onMounted(() => {
  loadTotal()
  window.addEventListener('storage', loadTotal)
  window.addEventListener('focus', loadTotal)
})
// Ao desmontar, remove os listeners registrados
onUnmounted(() => {
  window.removeEventListener('storage', loadTotal)
  window.removeEventListener('focus', loadTotal)
})

const formattedTotal = computed(() => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total.value)
})
</script>

<style scoped></style>
