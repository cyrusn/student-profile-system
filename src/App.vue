<template>
  <body class="has-navbar-fixed-top">
    <navbar />
    <div class="container mt-2 is-max-desktop">
      <router-view />
    </div>
  </body>
</template>

<script lang="ts">
import Navbar from "@/components/Navbar/index.vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: { Navbar },
});
</script>
