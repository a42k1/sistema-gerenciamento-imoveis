<template>
  <div class="card bg-base-100 shadow-sm p-4">
    <div class="card-title">Imóveis Recentes</div>
    <div class="space-y-3 mt-2">
      <div v-for="im in recent" :key="im.id" class="flex items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <div class="avatar">
            <div class="w-12 h-12 rounded-full overflow-hidden bg-base-200">
              <img v-if="im.imagem" :src="im.imagem" alt="thumb" class="w-full h-full object-cover" />
              <div v-else class="w-full h-full flex items-center justify-center text-base-content/40"></div>
            </div>
          </div>
          <div>
            <div class="font-semibold">{{ im.titulo }}</div>
            <div class="text-xs text-base-content/60">{{ im.endereco }}</div>
          </div>
        </div>
        <div class="text-right">
          <div class="text-sm font-semibold">{{ formattedPrice(im.preco) }}</div>
          <div class="text-xs text-base-content/60">{{ im.status || '—' }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const recent = ref([])

const loadRecent = () => {
  try {
    const imoveis = JSON.parse(localStorage.getItem('imoveis') || '[]')
    // Sort by id/ts desc and take 5
    recent.value = imoveis.sort((a, b) => (b.id || 0) - (a.id || 0)).slice(0, 5)
  } catch (e) {
    recent.value = []
  }
}

onMounted(() => {
  loadRecent()
  window.addEventListener('storage', loadRecent)
  window.addEventListener('focus', loadRecent)
})
onUnmounted(() => {
  window.removeEventListener('storage', loadRecent)
  window.removeEventListener('focus', loadRecent)
})

const formattedPrice = (p) => {
  const price = Number(p || 0)
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)
}
</script>

<style scoped></style>
