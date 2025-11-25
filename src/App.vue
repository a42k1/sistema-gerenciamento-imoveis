<template>
  <Navbar :logo="logo_src" :alt="app_name" />
  <router-view />
</template>

<script>
import Navbar from "./components/Navbar.vue"
import logo from "@/assets/images/LG.svg"  

export default{
  components: {
    Navbar
  },
  data(){
    return{
      logo_src: logo,
      app_name: 'SGI'
    }
  }
}
</script>
<style scoped></style>
