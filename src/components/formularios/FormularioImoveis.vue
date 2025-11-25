<script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({
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
      status: "Disponível",
      dataInicioOcupacao: "",
      dataFimOcupacao: "",
    }),
  },
});

const emit = defineEmits(["update:modelValue"]);

const formData = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const showDateFields = computed(() =>
  ["Alugado", "Reservado", "Em Manutenção"].includes(formData.value.status)
);

// Estilos genéricos para funcionar em qualquer projeto com Tailwind
const inputClass =
  "flex h-9 w-full rounded-md border border-gray-300 bg-white px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50";
const labelClass = "text-sm font-medium leading-none text-gray-700";
const checkboxClass =
  "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500";
</script>

<template>
  <div class="grid gap-6 p-1">
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div class="space-y-2">
        <label class="block" :class="labelClass">Título do Anúncio</label>
        <input
          v-model="formData.titulo"
          placeholder="Ex: Apartamento 2 quartos no centro"
          :class="inputClass"
        />
      </div>
      <div class="space-y-2">
        <label class="block" :class="labelClass">Tipo de Imóvel</label>
        <select v-model="formData.tipo" :class="inputClass">
          <option value="Apartamento">Apartamento</option>
          <option value="Casa">Casa</option>
          <option value="Terreno">Terreno</option>
          <option value="Kitnet">Kitnet</option>
          <option value="Comercial">Sala Comercial</option>
        </select>
      </div>
    </div>

    <div class="space-y-2">
      <label class="block" :class="labelClass">Status</label>
      <select v-model="formData.status" :class="inputClass">
        <option value="Disponível">Disponível</option>
        <option value="Alugado">Alugado</option>
        <option value="Vendido">Vendido</option>
        <option value="Reservado">Reservado</option>
        <option value="Em Manutenção">Em Manutenção</option>
      </select>
    </div>

    <div v-if="showDateFields" class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div class="space-y-2">
        <label class="block" :class="labelClass">Início da Ocupação</label>
        <input
          type="date"
          v-model="formData.dataInicioOcupacao"
          :class="inputClass"
        />
      </div>
      <div class="space-y-2">
        <label class="block" :class="labelClass">Fim da Ocupação</label>
        <input
          type="date"
          v-model="formData.dataFimOcupacao"
          :class="inputClass"
        />
      </div>
    </div>

    <div class="space-y-2">
      <label class="block" :class="labelClass">Valor (R$)</label>
      <input
        type="number"
        v-model="formData.preco"
        placeholder="0,00"
        :class="inputClass"
      />
    </div>

    <div class="space-y-2">
      <label class="block" :class="labelClass">Endereço</label>
      <input
        v-model="formData.endereco"
        placeholder="Endereço completo"
        :class="inputClass"
      />
    </div>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div class="space-y-2">
        <label class="block" :class="labelClass">Quartos</label>
        <input type="number" v-model="formData.quartos" :class="inputClass" />
      </div>
      <div class="space-y-2">
        <label class="block" :class="labelClass">Banheiros</label>
        <input type="number" v-model="formData.banheiros" :class="inputClass" />
      </div>
      <div class="space-y-2">
        <label class="block" :class="labelClass">Área (m²)</label>
        <input type="number" v-model="formData.area" :class="inputClass" />
      </div>
    </div>

    <div class="space-y-2">
      <label class="block" :class="labelClass">Descrição</label>
      <textarea
        v-model="formData.descricao"
        :class="[inputClass, 'min-h-[80px] py-2']"
      ></textarea>
    </div>

    <div class="flex items-center gap-6">
      <label class="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          v-model="formData.mobiliado"
          :class="checkboxClass"
        />
        <span :class="labelClass">Mobiliado</span>
      </label>
      <label class="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          v-model="formData.piscina"
          :class="checkboxClass"
        />
        <span :class="labelClass">Piscina</span>
      </label>
      <label class="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          v-model="formData.churrasqueira"
          :class="checkboxClass"
        />
        <span :class="labelClass">Churrasqueira</span>
      </label>
    </div>
  </div>
</template>
