<template>
  <div v-for="task in tasks" :key="task.id">
    <Task
      @delete-task="$emit('delete-task', task.id)"
      @toggle-reminder="$emit('toggle-reminder', task.id)"
      :task="task"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ITask } from "@/lib/Task";
import Task from "@/components/Task.vue";

export default defineComponent({
  name: "TaskList",
  computed: {
    tasks(): ITask[] {
      return this.$store.state.tasks;
    },
  },
  components: {
    Task,
  },
});
</script>
