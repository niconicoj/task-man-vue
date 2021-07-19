<template>
  <header>
    <h1>{{ title }}</h1>
    <Button color="green" @click="$emit('toggle-add-task')">{{
      buttonText
    }}</Button>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "@/components/Button.vue";

export default defineComponent({
  name: "Header",
  props: {
    title: String,
    buttonText: String,
  },
  components: {
    Button,
  },
});
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>
