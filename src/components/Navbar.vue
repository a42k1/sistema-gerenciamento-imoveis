<template>
    <div>
        <div class="navbar shadow-sm" style="background-color: var(--color-success); color: white;">
            <router-link>
                <div class="flex-1">
                    <img :src="logo" :alt="alt" id="logo" class="btn btn-ghost text-xl">                    
                </div>      
            </router-link>  
            <div class="flex-none">
                <ul class="menu menu-horizontal px-1">
                    <li><router-link to="/">Home</router-link></li>
                    <li><router-link to="/dashboard">Dashboard</router-link></li>
                    <li><router-link to="/novo-imovel">Cadastrar Novo Imóvel</router-link></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    name: 'Navbar', 
    props: ["logo", "alt"]
}
</script>