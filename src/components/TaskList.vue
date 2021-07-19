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
  props: {
    tasks: {
      type: Object as PropType<ITask[]>,
    },
  },
  components: {
    Task,
  },
  emits: ["delete-task", "toggle-reminder"],
});
</script>
