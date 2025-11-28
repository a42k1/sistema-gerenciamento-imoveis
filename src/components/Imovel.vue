<template>
  <!-- Card de imóvel que aparecerá na pagina home -->
  <router-link :to="{ name: 'editar-imovel', params: { id: imovel.id } }" class="card w-full bg-base-100 shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-2xl cursor-pointer">
    <div class="relative">
      <figure class="w-full h-52 overflow-hidden">
        <template v-if="imovel.imagem">
          <img :src="imovel.imagem" :alt="imovel.titulo" class="w-full h-full object-cover" />
        </template>
        <template v-else>
          <div class="w-full h-full bg-base-300 flex items-center justify-center text-base-content/50">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7l9-4 9 4v11a2 2 0 0 1-2 2h-4V11H9v9H5a2 2 0 0 1-2-2z"/></svg>
          </div>
        </template>
      </figure>

      <div class="absolute top-3 left-3">
        <span v-if="imovel.status" :class="['badge', statusClass]">{{ imovel.status }}</span>
      </div>
      <div class="absolute top-3 left-32">
        <span v-if="imovel.tipo" class="badge badge-ghost">{{ imovel.tipo }}</span>
      </div>
      <div v-if="occupiedRange" class="absolute top-3 right-3 text-sm text-base-content/80 text-right">
        <div>Ocupado de</div>
        <div class="font-semibold">{{ occupiedRange }}</div>
      </div>
    </div>

    <div class="card-body p-4">
      <div class="flex items-start justify-between gap-4">
        <div class="flex-1">
          <h3 class="text-lg font-bold text-base-content">{{ imovel.titulo }}</h3>
          <p class="text-sm text-base-content/70 mt-1">{{ displayAddress }}</p>
        </div>

        <div class="text-right">
          <div class="text-primary font-bold text-xl">{{ formattedPrice }}</div>
          <div class="text-sm text-base-content/70">{{ priceSuffix }}</div>
        </div>
      </div>

      <div class="divider my-2"></div>

      <div class="flex items-center justify-between text-sm text-base-content/70">
        <div class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7l9-4 9 4v11a2 2 0 0 1-2 2h-4V11H9v9H5a2 2 0 0 1-2-2z"/></svg>
          <span>{{ imovel.quartos }} quartos</span>
        </div>
        <div class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2 7h20M2 12h20M7 17h10"/></svg>
          <span>{{ imovel.banheiros }} banheiros</span>
        </div>
        <div class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7h18M7 3v18"/></svg>
          <span>{{ imovel.area }} m²</span>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  imovel: {
    type: Object,
    default: () => ({
      titulo: 'Imóvel Exemplo',
      tipo: 'Apartamento',
      preco: 0,
      endereco: '',
      rua: '',
      numero: '',
      cidade: '',
      quartos: 0,
      banheiros: 0,
      area: 0,
      imagem: 'https://picsum.photos/seed/defaultImovel/800/500',
      status: 'Disponível',
      dataInicioOcupacao: null,
      dataFimOcupacao: null,
    })
  }
})

const imovel = props.imovel

const formattedPrice = computed(() => {
  const price = Number(imovel.preco || 0)
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)
})

const statusClass = computed(() => {
  const s = (imovel.status || '').toLowerCase()
  if (s === 'alugado') return 'badge-error'
  if (s === 'disponível' || s === 'disponivel') return 'badge-success'
  return 'badge-ghost'
})

const occupiedRange = computed(() => {
  if (!imovel.dataInicioOcupacao || !imovel.dataFimOcupacao) return ''
  try {
    const start = new Date(imovel.dataInicioOcupacao)
    const end = new Date(imovel.dataFimOcupacao)
    const opts = { day: '2-digit', month: '2-digit', year: '2-digit' }
    return `${start.toLocaleDateString('pt-BR', opts)} a ${end.toLocaleDateString('pt-BR', opts)}`
  } catch (e) {
    return ''
  }
})

const displayAddress = computed(() => {
  const rua = (imovel.rua || '').toString().trim();
  const numero = (imovel.numero || '').toString().trim();
  const cidade = (imovel.cidade || '').toString().trim();
  if (rua || numero || cidade) {
    return `${rua}${numero ? ', ' + numero : ''}${cidade ? ', ' + cidade : ''}`.replace(/(^,\s+|\s+,\s+$)/g, '').trim();
  }
  return imovel.endereco || 'Endereço não informado';
})
</script>

<style scoped>
.card {
  border-radius: 8px;
}
.card figure img {
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}
.badge-ghost { background: rgba(0,0,0,0.1); color: var(--tw-color); }
</style>
