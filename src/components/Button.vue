<template>
  <button :style="{ background: color }" class="btn">
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Button",
  props: {
    color: String,
  },
});
</script>
