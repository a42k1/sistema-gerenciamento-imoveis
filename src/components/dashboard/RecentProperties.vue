<script setup>
import { ref } from "vue";
import { formatCurrency } from "@/lib/utils.js";

const props = defineProps({
  imoveis: {
    type: Array,
    required: true,
  },
});

// We need to make a local copy or handle the status change.
// Since the parent passed a slice, modifying it here might not affect the original array if it's a new array.
// However, objects are passed by reference.
// The original code created a `recentImoveis` ref which was a mapped copy.
// Let's replicate that logic or accept the `recentImoveis` as a prop.
// If we accept `recentImoveis` as a prop, we can emit changes or just mutate if it's a reactive object (though mutating props is bad practice).
// Better: The parent manages the state. But the status logic was local to the dashboard view in the previous code.
// Let's move the logic here.

const recentImoveis = ref(
  props.imoveis.map((imovel, index) => ({
    ...imovel,
    paymentStatus:
      index % 3 === 0 ? "Pago" : index % 3 === 1 ? "Pendente" : "Atrasado",
  }))
);

const getStatusStyles = (status) => {
  switch (status) {
    case "Pago":
      return "bg-green-100 text-green-700";
    case "Pendente":
      return "bg-yellow-100 text-yellow-700";
    case "Atrasado":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};
</script>

<template>
  <div class="rounded-xl border bg-card text-card-foreground shadow">
    <div class="p-6 flex flex-row items-center justify-between space-y-0">
      <div class="space-y-1">
        <h3 class="font-semibold leading-none tracking-tight">
          Imóveis Recentes
        </h3>
        <p class="text-sm text-muted-foreground">
          Últimas atualizações de status.
        </p>
      </div>
    </div>
    <div class="p-6 pt-0">
      <div class="space-y-8">
        <div
          v-for="imovel in recentImoveis"
          :key="imovel.id"
          class="flex items-center justify-between"
        >
          <div class="flex items-center">
            <div
              class="h-9 w-9 rounded-full bg-muted flex items-center justify-center overflow-hidden"
            >
              <img
                :src="imovel.imagem"
                alt="Avatar"
                class="h-full w-full object-cover"
              />
            </div>
            <div class="ml-4 space-y-1">
              <p class="text-sm font-medium leading-none">
                {{ imovel.titulo }}
              </p>
              <p class="text-sm text-muted-foreground">{{ imovel.endereco }}</p>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <div class="font-medium">
              {{ formatCurrency(Number(imovel.preco)) }}
            </div>
            <select
              v-model="imovel.paymentStatus"
              :class="[
                'px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer border-none focus:ring-0 appearance-none text-center',
                getStatusStyles(imovel.paymentStatus),
              ]"
            >
              <option value="Pago">Pago</option>
              <option value="Pendente">Pendente</option>
              <option value="Atrasado">Atrasado</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
