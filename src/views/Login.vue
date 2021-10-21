<template>
  <div class="title">Student Profile System</div>
  <article class="message is-warning" v-if="!credential">
    <div class="message-body">請用學校 Google 帳戶登入</div>
  </article>
  <article class="message is-link" v-else-if="user">
    <div class="message-body">歡迎歸來 {{ user.id }}。</div>
  </article>
  <article class="message is-danger" v-else>
    <div class="message-body">
      你所使用的電郵
      {{ credential.email }}，並沒有權限使用此系統，請聯絡系統管理員。
    </div>
  </article>
  <div id="loginButton"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, watch } from "vue";
import {
  useLogin,
  useCredential,
  CredentialResponse,
} from "@/composables/auth";
import { useCookies } from "@/composables/cookie";
import { useTeacherAndUser } from "@/composables/user";
import { useRouter } from "vue-router";
import config from "@/config";
import { useScriptTag } from "@vueuse/core";

declare global {
  interface Window {
    google: any;
    localStorage: any;
  }
}

export default defineComponent({
  setup() {
    const GOOGLE_CLIENT_ID = config.GOOGLE_CLIENT_ID;
    const COOKIE_NAME = config.COOKIE_NAME;

    const cookies = useCookies();
    const router = useRouter();
    const { user } = useTeacherAndUser();

    const payload = reactive({} as CredentialResponse);

    const handleCredentialResponse = (
      credentialResponse: CredentialResponse,
    ) => {
      payload.clientId = credentialResponse.clientId;
      payload.credential = credentialResponse.credential;
      payload.select_by = credentialResponse.select_by;
    };

    onMounted(async () => {
      const { load } = useScriptTag("https://accounts.google.com/gsi/client");
      await load(); // confirm to run the remaining code after load() is run
      await window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
        context: "use",
        cancel_on_tap_outside: true,
      });

      await window.google.accounts.id.renderButton(
        document.getElementById("loginButton"),
        {
          theme: "outline",
          text: "continue_with",
        },
      );
    });

    const { mutate } = useLogin(payload);
    const { credential, onError } = useCredential();

    onError(console.error);

    watch(payload, async () => {
      await mutate().then((res) => {
        const uuid = res?.data?.login || "";
        cookies.set(COOKIE_NAME, uuid);
        router.push("/");
      });
    });

    return { show: true, credential, user };
  },
});
</script>
