<template>
  <div class="modal" :class="{ 'is-active': isActive }">
    <div class="modal-background is-danger"></div>
    <div class="modal-content">
      <article class="message" :class="color">
        <div class="message-header">
          <p>{{ title }}</p>
          <button class="delete" aria-label="delete" @click="reset"></button>
        </div>
        <div class="message-body">
          <div class="field">
            {{ message }}
          </div>
        </div>
      </article>
    </div>
    <button
      class="modal-close is-large"
      aria-label="close"
      @click="reset"
    ></button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { AlertMessage } from "@/store/index";

export default defineComponent({
  setup() {
    const store = useStore();
    const title = computed(
      () => (store.state.alertMessage as AlertMessage).title,
    );
    const message = computed(
      () => (store.state.alertMessage as AlertMessage).message,
    );
    const color = computed(
      () => (store.state.alertMessage as AlertMessage).color,
    );
    const isActive = computed(() => message.value);
    const reset = () => store.commit("resetAlertMessage");
    return { isActive, title, message, color, reset };
  },
});
</script>
