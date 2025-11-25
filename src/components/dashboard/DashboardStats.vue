<script setup>
import { Receipt, Users } from "lucide-vue-next";
import { formatCurrency } from "@/lib/utils.js";

defineProps({
  receitaBrutaMensal: {
    type: Number,
    required: true,
  },
  totalImoveis: {
    type: Number,
    required: true,
  },
  receitaLiquidaMensal: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
    <div class="rounded-xl border bg-card text-card-foreground shadow p-6">
      <div class="flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 class="tracking-tight text-sm font-medium">Receita Total</h3>
        <span class="text-muted-foreground font-bold">$</span>
      </div>
      <div class="text-2xl font-bold">
        {{ formatCurrency(receitaBrutaMensal) }}
      </div>
      <p class="text-xs text-muted-foreground">+20.1% mês passado</p>
    </div>

    <div class="rounded-xl border bg-card text-card-foreground shadow p-6">
      <div class="flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 class="tracking-tight text-sm font-medium">Imóveis Ativos</h3>
        <Users class="h-4 w-4 text-muted-foreground" />
      </div>
      <div class="text-2xl font-bold">{{ totalImoveis }}</div>
      <p class="text-xs text-muted-foreground">+180 novos</p>
    </div>

    <div class="rounded-xl border bg-card text-card-foreground shadow p-6">
      <div class="flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 class="tracking-tight text-sm font-medium">Receita Líquida</h3>
        <Receipt class="h-4 w-4 text-muted-foreground" />
      </div>
      <div class="text-2xl font-bold">
        {{ formatCurrency(receitaLiquidaMensal) }}
      </div>
      <p class="text-xs text-muted-foreground">+201 desde a última hora</p>
    </div>
  </div>
</template>
