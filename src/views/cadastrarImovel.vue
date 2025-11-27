<template>
    <div class="min-h-screen p-6">
        <h1 class="text-2xl font-semibold mb-6">Cadastrar Novo Imóvel</h1>
        <FormularioImoveis />
    </div>
</template>
<script>
import FormularioImoveis from '@/components/FormularioImoveis.vue'
export default {
    name: 'CadastrarImovel',
    components: {
        FormularioImoveis
    }
}
</script>