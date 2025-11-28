<template>
  <!-- Fomúmlário de cadastro de imóveis -->
    <div class="min-h-screen bg-base-200 py-12 px-4">
        <div class="max-w-4xl mx-auto">
            <!-- Cabeçalho -->
            <div class="mb-8">
                <h1 class="text-4xl font-bold text-base-content mb-2">Cadastrar Novo Imóvel</h1>
                <p class="text-base-content/70">Preencha todos os dados abaixo para adicionar um novo imóvel ao seu sistema</p>
            </div>

            <!-- Card do formulário -->
            <form @submit.prevent="handleSubmit" class="card bg-base-100 shadow-xl">
                <div class="card-body">
                    <div class="form-grid">
            <!-- Título e Tipo -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Título do Anúncio</span>
              </label>
                <input id="titulo" v-model="formData.titulo" placeholder="Ex: Apartamento 2 quartos no centro" class="input input-bordered w-full" required />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Tipo de Imóvel</span>
              </label>
                <select id="tipo" v-model="formData.tipo" class="select select-bordered w-full" required>
                <option value="Apartamento">Apartamento</option>
                <option value="Casa">Casa</option>
                <option value="Terreno">Terreno</option>
                <option value="Kitnet">Kitnet</option>
                <option value="Comercial">Sala Comercial</option>
              </select>
            </div>
      
            <!-- Descrição -->
            <div class="form-control col-span-full">
              <label class="label">
                <span class="label-text font-semibold">Descrição (opcional)</span>
              </label>
              <textarea id="descricao" v-model="formData.descricao" placeholder="Resumo curto do imóvel (opcional)" class="textarea textarea-bordered w-full h-20"></textarea>
            </div>
      
            <!-- Status e Preço -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">O status do seu imóvel será</span>
              </label>
                <select id="status" v-model="formData.status" class="select select-bordered w-full" required>
                <option value="Disponivel">Disponível</option>
                <option value="Alugado">Alugado</option>
               <option value="Em Manutencao">Em Manutenção</option> 
              </select>
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Preço (R$)</span>
              </label>
                <input id="preco" type="number" v-model="formData.preco" placeholder="Ex: 250000" class="input input-bordered w-full" required/>
            </div>

            <!-- Características -->
            <h3 class="col-span-full text-lg font-bold text-base-content border-b border-base-300 pb-3 mt-6">Características</h3>
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Área (m²)</span>
              </label>
                <input id="area" type="number" v-model="formData.area" placeholder="Ex: 75" class="input input-bordered w-full" required/>
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Quartos</span>
              </label>
                <input id="quartos" type="number" v-model="formData.quartos" placeholder="Ex: 2" class="input input-bordered w-full" required/>
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Banheiros</span>
              </label>
                <input id="banheiros" type="number" v-model="formData.banheiros" placeholder="Ex: 1" class="input input-bordered w-full" required/>
            </div>     
            <!-- Endereço -->
            <h3 class="col-span-full text-lg font-bold text-base-content border-b border-base-300 pb-3 mt-6">Endereço</h3>
            <div class="form-control col-span-full">
              <label class="label">
                <span class="label-text font-semibold">Rua / Logradouro</span>
              </label>
                <input id="rua" v-model="formData.rua" placeholder="Ex: Rua das Flores" class="input input-bordered w-full" required/>
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Número</span>
              </label>
                <input id="numero" v-model="formData.numero" placeholder="Ex: 123" class="input input-bordered w-full" />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Cidade</span>
              </label>
                <input id="cidade" v-model="formData.cidade" placeholder="Ex: São Paulo" class="input input-bordered w-full" required/>
            </div>
      
            <!-- Mídia -->
            <h3 class="col-span-full text-lg font-bold text-base-content border-b border-base-300 pb-3 mt-6">Mídia</h3>
            <div class="form-control col-span-full">
              <label class="label">
                <span class="label-text font-semibold">Fotos do Imóvel</span>
              </label>
              <input id="fotos" type="file" accept="image/*" @change="handleFileChange" class="file-input file-input-bordered w-full"/>
            </div>
                    </div>
                </div>

                <!-- Botões de ação -->
                <div class="card-actions justify-end p-6 border-t border-base-300">
                    <button type="button" class="btn btn-ghost">Cancelar</button>
                    <button type="submit" class="btn btn-primary">Cadastrar Imóvel</button>
                </div>
            </form>
        </div>
        <Mensagem :msg="msg" v-show="msg" class="max-w-xs mx-auto mt-4 text-sm py-2 px-4"/>
    </div>
</template>

<script setup>
import Mensagem from './Mensagem.vue';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const msg = ref("");

const props = defineProps({
  imovel: {
    type: Object,
    default: null
  },
  isEdit: {
    type: Boolean,
    default: false
  }
});

const defaultValues = {
  id: Date.now(),
  titulo: '',
  tipo: 'Apartamento',
  status: 'Disponivel',
  preco: '',
  quartos: 0,
  banheiros: 1,
  area: 0,
  descricao: '',
  imagem: '',
  rua: '',
  numero: '',
  cidade: ''
};

const formData = ref({ ...defaultValues });

const initForm = () => {
  if (props.isEdit && props.imovel) {
    formData.value = { ...defaultValues, ...props.imovel };
  } else {
    formData.value = { ...defaultValues };
  }
};

watch(() => props.imovel, initForm, { immediate: true });

const router = useRouter();

const handleSubmit = () => {
    console.log('Formulário enviado:', formData.value);

    const newImovel = {
      ...formData.value,
      id: Date.now()
    };
    
    if (newImovel.endereco) delete newImovel.endereco;

    try {
      const stored = JSON.parse(localStorage.getItem('imoveis') || '[]');
      stored.push(newImovel);
      localStorage.setItem('imoveis', JSON.stringify(stored));
    } catch (e) {
      localStorage.setItem('imoveis', JSON.stringify([newImovel]));
    }

    msg.value = 'Imóvel cadastrado com sucesso!';
    setTimeout(() => msg.value = "", 3000);

    router.push('/');
};

const handleFileChange = async (event) => {
  const file = event.target.files && event.target.files[0];
  if (!file) return;
  const sizeLimit = 2 * 1024 * 1024;
  if (file.size > sizeLimit) {
    msg.value = 'Imagem muito grande, limite de 2MB';
    setTimeout(() => msg.value = '', 3000);
    return;
  }
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
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .form-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.col-span-full {
  grid-column: 1 / -1;
}

/* Animações suaves */
.form-control input,
.form-control select,
.form-control textarea {
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-control input:focus,
.form-control select:focus,
.form-control textarea:focus {
  outline: none;
}
</style>
