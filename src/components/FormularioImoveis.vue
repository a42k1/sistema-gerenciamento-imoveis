<template>
  <div class="min-h-screen bg-base-200 py-12 px-4">
    <div class="max-w-4xl mx-auto">
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-base-content mb-2">{{ isEditMode ? 'Editar Imóvel' : 'Cadastrar Novo Imóvel' }}</h1>
        <p class="text-base-content/70">{{ isEditMode ? 'Altere os dados abaixo para atualizar o imóvel.' : 'Preencha os dados para adicionar um novo imóvel.' }}</p>
      </div>

      <form @submit.prevent="handleSubmit" class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <div class="form-grid">

            <!-- Título do Anúncio -->
            <div class="form-control col-span-full">
              <label class="label"><span class="label-text font-semibold">Título do Anúncio</span></label>
              <input v-model="formData.titulo" placeholder="Ex: Apartamento 2 quartos no centro" class="input input-bordered w-full" required />
            </div>

            <!-- Tipo e Status -->
            <div class="form-control">
              <label class="label"><span class="label-text font-semibold">Tipo de Imóvel</span></label>
              <select v-model="formData.tipo" class="select select-bordered w-full" required>
                <option>Apartamento</option>
                <option>Casa</option>
                <option>Terreno</option>
                <option>Comercial</option>
              </select>
            </div>
            <div class="form-control">
              <label class="label"><span class="label-text font-semibold">Status</span></label>
              <select v-model="formData.status" class="select select-bordered w-full" required>
                <option>Disponível</option>
                <option>Alugado</option>
                <option>Em Negociação</option>
              </select>
            </div>
            
            <!-- Preço -->
            <div class="form-control col-span-full">
              <label class="label"><span class="label-text font-semibold">Preço (R$)</span></label>
              <input v-model.number="formData.preco" type="number" placeholder="Ex: 250000" class="input input-bordered w-full" required/>
            </div>

            <!-- Características -->
            <h3 class="col-span-full text-lg font-bold text-base-content border-b border-base-300 pb-3 mt-6">Características</h3>
            <div class="form-control">
              <label class="label"><span class="label-text font-semibold">Quartos</span></label>
              <input type="number" v-model.number="formData.quartos" class="input input-bordered w-full" min="0" required />
            </div>
            <div class="form-control">
              <label class="label"><span class="label-text font-semibold">Banheiros</span></label>
              <input type="number" v-model.number="formData.banheiros" class="input input-bordered w-full" min="0" required />
            </div>
            <div class="form-control">
              <label class="label"><span class="label-text font-semibold">Área (m²)</span></label>
              <input type="number" v-model.number="formData.area" class="input input-bordered w-full" min="0" required />
            </div>

            <!-- Descrição (COM ESTILO ESPECÍFICO E ISOLADO) -->
            <div class="description-field">
              <label class="label">
                <span class="label-text font-semibold">Descrição</span>
              </label>
              <textarea v-model="formData.descricao" class="textarea textarea-bordered h-40 w-full" placeholder="Descreva os detalhes do imóvel..."></textarea>
            </div>

            <!-- Mídia -->
            <h3 class="col-span-full text-lg font-bold text-base-content border-b border-base-300 pb-3 mt-6">Mídia</h3>
            <div class="form-control col-span-full">
              <label class="label"><span class="label-text font-semibold">Foto do Imóvel</span></label>
              <input type="file" accept="image/*" @change="handleFileChange" class="file-input file-input-bordered w-full"/>
              <label class="label" v-if="isEditMode && formData.imagem">
                <span class="label-text-alt">Deixe em branco para manter a imagem atual.</span>
              </label>
            </div>
          </div>
        </div>

        <div class="card-actions justify-end p-6 border-t border-base-300">
          <router-link to="/" class="btn btn-ghost">Cancelar</router-link>
          <button type="submit" class="btn btn-primary">{{ isEditMode ? 'Salvar Alterações' : 'Cadastrar Imóvel' }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

// Lógica unificada para detectar o modo (edição ou cadastro) e pegar o ID
const isEditMode = computed(() => route.name === 'editar-imovel');
const imovelId = computed(() => route.params.id);

const formData = ref({});

onMounted(() => {
  const imoveis = JSON.parse(localStorage.getItem('imoveis') || '[]');
  
  if (isEditMode.value) {
    // Modo Edição: Carrega os dados do imóvel
    const imovelParaEditar = imoveis.find(imovel => String(imovel.id) === String(imovelId.value));
    if (imovelParaEditar) {
      formData.value = { ...imovelParaEditar };
    } else {
      alert('Imóvel não encontrado!');
      router.push('/');
    }
  } else {
    // Modo Cadastro: Prepara um formulário em branco
    formData.value = {
      titulo: '', tipo: 'Apartamento', status: 'Disponível',
      preco: null, quartos: 0, banheiros: 1, area: 0,
      descricao: '', imagem: '', rua: '', numero: '', cidade: ''
    };
  }
});

// Lógica de salvar que funciona para ambos os casos
const handleSubmit = () => {
  const imoveis = JSON.parse(localStorage.getItem('imoveis') || '[]');

  if (isEditMode.value) {
    // Encontra o imóvel pelo ID e o atualiza
    const index = imoveis.findIndex(i => String(i.id) === String(imovelId.value));
    if (index !== -1) {
      imoveis[index] = formData.value;
      localStorage.setItem('imoveis', JSON.stringify(imoveis));
      alert('Imóvel atualizado com sucesso!');
    }
  } else {
    // Adiciona um ID único e salva o novo imóvel
    const newImovel = { ...formData.value, id: Date.now() };
    imoveis.push(newImovel);
    localStorage.setItem('imoveis', JSON.stringify(imoveis));
    alert('Imóvel cadastrado com sucesso!');
  }

  window.dispatchEvent(new Event('storage'));
  router.push('/');
};

// Converte a imagem para Base64
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    formData.value.imagem = e.target.result;
  };
  reader.readAsDataURL(file);
};
</script>

<style scoped>
.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.col-span-full {
  grid-column: 1 / -1;
}

.description-field {
  grid-column: 1 / -1;   
  display: flex;         
  flex-direction: column;
}
</style>
