<template>
  <div class="card bg-base-100 shadow-sm p-4">
    <div class="card-title">Imóveis</div>
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
            <div class="text-xs text-base-content/60">{{ formatAddress(im) }}</div>
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

// Carrega todos os imóveis do localStorage, ordenando por id/ts decrescente
// e atualiza `recent.value` com a lista completa
const loadRecent = () => {
  try {
    const imoveis = JSON.parse(localStorage.getItem('imoveis') || '[]')
    // Ordena por id/ts decrescente e mostra todos os imóveis
    recent.value = imoveis.sort((a, b) => (b.id || 0) - (a.id || 0))
  } catch (e) {
    recent.value = []
  }
}

// Ao montar o componente, carregamos a lista e registramos listeners para
// atualizar a lista quando o armazenamento local mudar ou quando a página ganhar foco
onMounted(() => {
  loadRecent()
  window.addEventListener('storage', loadRecent)
  window.addEventListener('focus', loadRecent)
})
// Ao desmontar o componente, removemos os event listeners registrados
onUnmounted(() => {
  window.removeEventListener('storage', loadRecent)
  window.removeEventListener('focus', loadRecent)
})

// Formata um valor numérico para o formato de moeda BRL (pt-BR)
const formattedPrice = (p) => {
  const price = Number(p || 0)
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)
}

// Formata o endereço a partir dos campos estruturados (rua, numero, cidade)
// Faz fallback para `im.endereco` se os campos estruturados não estiverem presentes
const formatAddress = (im) => {
  const rua = (im.rua || '').toString().trim();
  const numero = (im.numero || '').toString().trim();
  const cidade = (im.cidade || '').toString().trim();
  if (rua || numero || cidade) {
    return `${rua}${numero ? ', ' + numero : ''}${cidade ? ', ' + cidade : ''}`.replace(/(^,\s+|\s+,\s+$)/g, '').trim();
  }
  return im.endereco || '';
}
</script>

<style scoped></style>
