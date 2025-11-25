<script setup>
import { LayoutDashboard, Receipt, LogOut } from "lucide-vue-next";

defineProps({
  currentTab: {
    type: String,
    required: true,
  },
});

defineEmits(["update:currentTab"]);
</script>

<template>
  <header
    class="h-16 border-b bg-sidebar text-sidebar-foreground flex items-center justify-between px-6 shrink-0"
  >
    <div class="flex items-center gap-6">
      <!-- Logo -->
      <div class="flex items-center gap-3">
        <div
          class="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground"
        >
          <svg viewBox="0 0 100 100" class="h-6 w-6 text-sidebar">
            <path
              d="M50,0A50,50,0,1,0,99.9,50,50,50,0,0,0,50,0ZM22.4,70.16A42.52,42.52,0,0,1,50,7.5a42.52,42.52,0,0,1,27.6,62.66Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <h2 class="text-xl font-bold">SGI</h2>
      </div>

      <!-- Navigation -->
      <nav class="flex items-center gap-4 ml-6">
        <button
          @click="$emit('update:currentTab', 'dashboard')"
          :class="[
            'flex items-center gap-2 px-3 py-2 rounded-md transition-colors',
            currentTab === 'dashboard'
              ? 'bg-sidebar-accent text-sidebar-accent-foreground'
              : 'hover:bg-sidebar-accent/50',
          ]"
        >
          <LayoutDashboard class="h-4 w-4" />
          <span>Dashboard</span>
        </button>
        <button
          @click="$emit('update:currentTab', 'imoveis')"
          :class="[
            'flex items-center gap-2 px-3 py-2 rounded-md transition-colors',
            currentTab === 'imoveis'
              ? 'bg-sidebar-accent text-sidebar-accent-foreground'
              : 'hover:bg-sidebar-accent/50',
          ]"
        >
          <Receipt class="h-4 w-4" />
          <span>Imóveis</span>
        </button>
      </nav>
    </div>
  </header>
</template>
