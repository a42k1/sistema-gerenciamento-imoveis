<script setup>
import { ref } from "vue";
import { Plus, Bed, Bath, Milestone, Trash2, Edit } from "lucide-vue-next";
import { imoveisExemplo as initialData } from "@/lib/imoveis-data.js";
import FormularioImoveis from "@/components/formularios/FormularioImoveis.vue";

const imoveis = ref([...initialData]);
const showForm = ref(false);
const currentImovel = ref({});

const formatCurrency = (value) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const openForm = (imovel = null) => {
  if (imovel) {
    currentImovel.value = { ...imovel };
  } else {
    currentImovel.value = {
      id: Date.now(),
      titulo: "",
      tipo: "Apartamento",
      transacao: "Venda",
      preco: "",
      endereco: "",
      quartos: 0,
      banheiros: 1,
      vagas: 1,
      area: 0,
      descricao: "",
      condominio: "",
      iptu: "",
      mobiliado: false,
      piscina: false,
      churrasqueira: false,
      imagem: "https://picsum.photos/seed/newImovel/600/400",
      imageHint: "new property",
      status: "Disponível",
      dataInicioOcupacao: "",
      dataFimOcupacao: "",
    };
  }
  showForm.value = true;
};

const closeForm = () => {
  showForm.value = false;
  currentImovel.value = {};
};

const saveImovel = () => {
  const formData = { ...currentImovel.value };

  if (formData.id && imoveis.value.some((i) => i.id === formData.id)) {
    // Edit
    const index = imoveis.value.findIndex((i) => i.id === formData.id);
    if (index !== -1) {
      imoveis.value[index] = formData;
    }
  } else {
    // New
    if (!formData.id) formData.id = Date.now();
    imoveis.value.push(formData);
  }
  closeForm();
};

const deleteImovel = (id) => {
  if (confirm("Tem certeza que deseja excluir este imóvel?")) {
    imoveis.value = imoveis.value.filter((i) => i.id !== id);
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case "Disponível":
      return "bg-green-100 text-green-800";
    case "Alugado":
      return "bg-red-100 text-red-800";
    case "Vendido":
      return "bg-blue-100 text-blue-800";
    case "Reservado":
      return "bg-yellow-100 text-yellow-800";
    case "Em Manutenção":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
</script>

<template>
  <div class="space-y-6">
    <!-- Header / Actions -->
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-bold tracking-tight">Imóveis</h2>
      <div class="flex items-center gap-4">
        <button
          @click="openForm()"
          class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          <Plus class="mr-2 h-4 w-4" />
          Cadastrar Imóvel
        </button>
      </div>
    </div>

    <!-- Grid -->
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      <div
        v-for="imovel in imoveis"
        :key="imovel.id"
        class="group rounded-xl border bg-card text-card-foreground shadow overflow-hidden hover:shadow-lg transition-shadow cursor-pointer relative"
        @click="openForm(imovel)"
      >
        <div class="relative aspect-video overflow-hidden">
          <img
            :src="imovel.imagem"
            :alt="imovel.titulo"
            class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
          <div class="absolute top-2 left-2 flex gap-2">
            <span
              :class="[
                'px-2 py-1 rounded-full text-xs font-semibold',
                getStatusColor(imovel.status),
              ]"
            >
              {{ imovel.status }}
            </span>
            <span
              class="px-2 py-1 rounded-full text-xs font-semibold bg-slate-800 text-white"
            >
              {{ imovel.tipo }}
            </span>
          </div>

          <!-- Action Buttons -->
          <div
            class="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <button
              @click.stop="openForm(imovel)"
              class="p-2 bg-white/90 rounded-full hover:bg-white text-blue-600 shadow-sm"
              title="Editar"
            >
              <Edit class="h-4 w-4" />
            </button>
            <button
              @click.stop="deleteImovel(imovel.id)"
              class="p-2 bg-white/90 rounded-full hover:bg-white text-red-600 shadow-sm"
              title="Excluir"
            >
              <Trash2 class="h-4 w-4" />
            </button>
          </div>
        </div>

        <div class="p-4 space-y-4">
          <div class="space-y-1">
            <h3
              class="font-semibold leading-none tracking-tight truncate"
              :title="imovel.titulo"
            >
              {{ imovel.titulo }}
            </h3>
            <p
              class="text-sm text-muted-foreground truncate"
              :title="imovel.endereco"
            >
              {{ imovel.endereco }}
            </p>
          </div>

          <div class="flex items-baseline gap-1">
            <span class="text-lg font-bold text-primary">{{
              formatCurrency(Number(imovel.preco))
            }}</span>
            <span
              v-if="imovel.transacao === 'Aluguel'"
              class="text-sm text-muted-foreground"
              >/mês</span
            >
          </div>

          <div
            class="flex items-center justify-between text-sm text-muted-foreground border-t pt-4"
          >
            <div class="flex items-center gap-1">
              <Bed class="h-4 w-4" />
              <span>{{ imovel.quartos }} quartos</span>
            </div>
            <div class="flex items-center gap-1">
              <Bath class="h-4 w-4" />
              <span>{{ imovel.banheiros }} banheiros</span>
            </div>
            <div class="flex items-center gap-1">
              <Milestone class="h-4 w-4" />
              <span>{{ imovel.area }} m²</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Form (Simple implementation) -->
    <div
      v-if="showForm"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div
        class="bg-background p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold">
            {{
              currentImovel.id && imoveis.some((i) => i.id === currentImovel.id)
                ? "Editar Imóvel"
                : "Novo Imóvel"
            }}
          </h3>
          <button
            @click="closeForm"
            class="text-muted-foreground hover:text-foreground"
          >
            ✕
          </button>
        </div>
        <div class="flex-1 overflow-y-auto">
          <FormularioImoveis v-model="currentImovel" />
        </div>
        <div class="mt-4 flex justify-end gap-2">
          <button
            @click="closeForm"
            class="px-4 py-2 rounded-md border hover:bg-accent"
          >
            Cancelar
          </button>
          <button
            @click="saveImovel"
            class="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
