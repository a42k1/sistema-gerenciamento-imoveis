<template>
  <div class="min-h-screen py-8 px-4">
    <h1 class="text-2xl font-semibold mb-6">Imóveis</h1>

    <div v-if="imoveis.length === 0" class="text-base-content/80">Nenhum imóvel cadastrado. Clique em <strong>Cadastrar Novo Imóvel</strong> para adicionar.</div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Imovel v-for="im in imoveis" :key="im.id" :imovel="im" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Imovel from '@/components/Imovel.vue'

const imoveis = ref([])

const loadImoveis = () => {
  try {
    imoveis.value = JSON.parse(localStorage.getItem('imoveis') || '[]')
  } catch (e) {
    imoveis.value = []
  }
}

onMounted(() => {
  loadImoveis()
})
</script>

<style scoped></style>
