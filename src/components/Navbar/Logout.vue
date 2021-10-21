<template>
  <a @click="logout"> Log Out </a>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useLogout } from "@/composables/auth";
import { useCookies } from "@/composables/cookie";
import { useRouter } from "vue-router";
import config from "@/config";

declare global {
  interface Window {
    google: any;
    localStorage: any;
  }
}

export default defineComponent({
  setup() {
    const cookies = useCookies();
    const router = useRouter();
    const COOKIE_NAME = config.COOKIE_NAME || "sps-sid";
    const uuid = cookies.get(COOKIE_NAME) as string;
    const { mutate, onError } = useLogout();
    const logout = async () => {
      window.google.accounts.id.disableAutoSelect();

      await mutate({ uuid }).catch(console.error);
      router.push("/login");
      cookies.remove(COOKIE_NAME);
      document.location.reload();
    };

    onError(console.error);
    return { logout };
  },
});
</script>
