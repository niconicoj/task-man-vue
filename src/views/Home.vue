<template>
  <Header
    title="Task Tracker"
    :buttonText="showAddTask ? 'close' : 'Add Task'"
  />
  <AddTask v-show="showAddTask" @add-task="addTask" />
  <TaskList @toggle-reminder="toggleReminder" @delete-task="deleteTask" />
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import TaskList from "@/components/TaskList.vue";
import AddTask from "@/components/AddTask.vue";
import { ITask } from "@/lib/Task";
import { apiFetch } from "@/lib/api";
import { MutationTypes } from "@/store/mutation-types";

export default defineComponent({
  name: "App",
  components: {
    Header,
    TaskList,
    AddTask,
  },
  computed: {
    showAddTask() {
      return this.$store.state.showAddTask;
    },
  },
  methods: {
    async fetchTasks(): Promise<ITask[]> {
      return apiFetch("api/tasks");
    },
  },
  async created() {
    let tasks = await this.fetchTasks();
    this.$store.commit(MutationTypes.ADD_TASKS, tasks);
  },
});
</script>
