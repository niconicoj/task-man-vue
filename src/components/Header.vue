<template>
  <header>
    <h1>{{ title }}</h1>
    <Button color="green" @click="toggleAddTask">{{ buttonText }}</Button>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "@/components/Button.vue";
import { MutationTypes } from "@/store/mutation-types";

export default defineComponent({
  name: "Header",
  props: {
    title: String,
    buttonText: String,
  },
  components: {
    Button,
  },
  methods: {
    toggleAddTask() {
      this.$store.commit(MutationTypes.TOGGLE_ADD_TASK);
    },
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
