
<template>
    <div class="min-h-screen bg-base-200 py-12 px-4">
        <div class="max-w-4xl mx-auto">
            <!-- Header -->
            <div class="mb-8">
                <h1 class="text-4xl font-bold text-base-content mb-2">Cadastrar Novo Imóvel</h1>
                <p class="text-base-content/70">Preencha todos os dados abaixo para adicionar um novo imóvel ao seu sistema</p>
            </div>

            <!-- Form Card -->
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
      
            <!-- Transação e Preço -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Tipo de Transação</span>
              </label>
                <select id="transacao" v-model="formData.transacao" class="select select-bordered w-full" required>
                <option value="Venda">Venda</option>
                <option value="Aluguel">Aluguel</option>
              </select>
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Preço (R$)</span>
              </label>
                <input id="preco" type="number" v-model="formData.preco" placeholder="Ex: 250000" class="input input-bordered w-full" required/>
            </div>
      
            <!-- Condomínio, IPTU, Status -->
            <!-- Removidos campos opcionais: condominio, iptu e status para simplificar o formulário -->
      
            <!-- Removidos campos de datas e status para simplificação -->
      
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
            <!-- Vagas removido para simplificar -->
      
            <!-- Recursos opcionais removidos para manter apenas os campos essenciais -->
      
            <!-- Endereço -->
            <h3 class="col-span-full text-lg font-bold text-base-content border-b border-base-300 pb-3 mt-6">Endereço</h3>
            <div class="form-control col-span-full">
              <label class="label">
                <span class="label-text font-semibold">Rua / Logradouro</span>
              </label>
                <input id="rua" v-model="addressParts.rua" placeholder="Ex: Rua das Flores" class="input input-bordered w-full" required/>
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Número</span>
              </label>
                <input id="numero" v-model="addressParts.numero" placeholder="Ex: 123" class="input input-bordered w-full" />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Cidade</span>
              </label>
                <input id="cidade" v-model="addressParts.cidade" placeholder="Ex: São Paulo" class="input input-bordered w-full" required/>
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

                <!-- Action Buttons -->
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
  transacao: 'Venda',
  preco: '',
  endereco: '',
  quartos: 0,
  banheiros: 1,
  area: 0,
  descricao: '',
  imagem: ''
};

const formData = ref({ ...defaultValues });
const addressParts = ref({
  rua: '',
  numero: '',
  cidade: ''
});

const initForm = () => {
  if (props.isEdit && props.imovel) {
    formData.value = { ...props.imovel };
    
    // Parse address
    if (formData.value.endereco) {
      const parts = formData.value.endereco.split(',');
      addressParts.value.rua = parts[0]?.trim() || '';
      addressParts.value.numero = parts[1]?.trim() || '';
      addressParts.value.cidade = parts[2]?.trim() || '';
    }
  } else {
    formData.value = { ...defaultValues };
    addressParts.value = { rua: '', numero: '', cidade: '' };
  }
};

watch(() => props.imovel, initForm, { immediate: true });

// Sem campos condicionais para datas

const updateAddress = () => {
  const { rua, numero, cidade } = addressParts.value;
  formData.value.endereco = `${rua}${numero ? ', ' + numero : ''}${cidade ? ', ' + cidade : ''}`;
};


const router = useRouter();

const handleSubmit = () => {
    console.log('Formulário enviado:', formData.value);

    // Prepara o imóvel para salvar
    const newImovel = {
      ...formData.value,
      id: Date.now(),
      endereco: formData.value.endereco || '',
      imagem: formData.value.imagem || ''
    };

    // Recupera lista do localStorage e adiciona o novo imóvel
    try {
      const stored = JSON.parse(localStorage.getItem('imoveis') || '[]');
      stored.push(newImovel);
      localStorage.setItem('imoveis', JSON.stringify(stored));
    } catch (e) {
      localStorage.setItem('imoveis', JSON.stringify([newImovel]));
    }

    msg.value = 'Imóvel cadastrado com sucesso!';
    setTimeout(() => msg.value = "", 3000);

    // Redireciona para a home para ver o imóvel listado
    router.push('/');
};

// Read file and store as data URL in formData.imagem
const handleFileChange = async (event) => {
  const file = event.target.files && event.target.files[0];
  if (!file) return;
  // Basic size guard (optional): limit to 2MB
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



watch(addressParts, updateAddress, { deep: true });

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
