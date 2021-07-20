<template>
  <div @dblclick="onToggle" :class="[task.reminder ? 'reminder' : '', 'task']">
    <h3>
      {{ task.text }}
      <i @click="onDelete" class="fas fa-times"></i>
    </h3>
    <p>{{ task.day }}</p>
  </div>
</template>

<script lang="ts">
import { ITask } from "@/lib/Task";
import { ActionTypes } from "@/store/action-types";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "Task",
  props: {
    task: {
      type: Object as PropType<ITask>,
    },
  },
  methods: {
    onDelete(id: string) {
      this.$store.dispatch(ActionTypes.DELETE_TASK, this.task!.id);
    },
    onToggle(id: string) {
      this.$store.dispatch(ActionTypes.TOGGLE_REMINDER, this.task!.id);
    },
  },
});
</script>

<style scope>
.fas {
  color: red;
}
.task {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
}
.task.reminder {
  border-left: 5px solid green;
}
.task h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
