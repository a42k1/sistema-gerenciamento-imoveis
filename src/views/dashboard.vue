<script setup>
import { ref } from "vue";
import { imoveisExemplo } from "@/lib/imoveis-data.js";
import ImoveisList from "./ImoveisList.vue";
import DashboardStats from "@/components/dashboard/DashboardStats.vue";
import RecentProperties from "@/components/dashboard/RecentProperties.vue";
import TopNavigation from "@/components/layout/TopNavigation.vue";

const currentTab = ref("dashboard");

const alugueisAtivos = imoveisExemplo.filter(
  (imovel) => imovel.transacao === "Aluguel" && imovel.status === "Alugado"
);
const receitaBrutaMensal = alugueisAtivos.reduce(
  (total, imovel) => total + Number(imovel.preco),
  0
);
const taxaSistema = receitaBrutaMensal * 0.15;
const receitaLiquidaMensal = receitaBrutaMensal - taxaSistema;
const totalImoveis = imoveisExemplo.length;

const recentImoveisData = imoveisExemplo.slice(0, 5);
</script>

<template>
  <div class="flex flex-col h-screen bg-background text-foreground font-body">
    <!-- Top Navigation Bar -->
    <TopNavigation v-model:currentTab="currentTab" />

    <!-- Main Content -->
    <main class="flex-1 flex flex-col overflow-hidden">
      <!-- Scrollable Content -->
      <div class="flex-1 overflow-auto p-6 space-y-6">
        <template v-if="currentTab === 'dashboard'">
          <!-- KPI Cards -->
          <DashboardStats
            :receitaBrutaMensal="receitaBrutaMensal"
            :totalImoveis="totalImoveis"
            :receitaLiquidaMensal="receitaLiquidaMensal"
          />

          <!-- Recent Sales / Properties -->
          <RecentProperties :imoveis="recentImoveisData" />
        </template>

        <template v-else-if="currentTab === 'imoveis'">
          <ImoveisList />
        </template>
      </div>
    </main>
  </div>
</template>
