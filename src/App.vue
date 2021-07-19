<template>
  <div class="container">
    <Header
      @toggle-add-task="toggleAddTask"
      title="Task Tracker"
      :buttonText="showAddTask ? 'close' : 'Add Task'"
    />
    <AddTask v-show="showAddTask" @add-task="addTask" />
    <TaskList
      @toggle-reminder="toggleReminder"
      @delete-task="deleteTask"
      :tasks="tasks"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/Header.vue";
import TaskList from "@/components/TaskList.vue";
import AddTask from "@/components/AddTask.vue";
import { ITask } from "@/lib/Task";
import { apiFetch } from "@/lib/api";

export default defineComponent({
  name: "App",
  components: {
    Header,
    TaskList,
    AddTask,
  },
  data(): {
    tasks: ITask[];
    showAddTask: boolean;
  } {
    return {
      tasks: [],
      showAddTask: false,
    };
  },
  methods: {
    async deleteTask(id: string) {
      const res = await apiFetch<ITask>(`api/tasks/${id}`, {
        method: "DELETE",
      });
      this.tasks = this.tasks.filter((task) => task.id !== id);
    },
    async toggleReminder(id: string) {
      const task = this.tasks.find((task) => task.id === id)!;
      const res = await apiFetch<ITask>(`api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          ...task,
          reminder: !task.reminder,
        }),
      });
      this.tasks = this.tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      );
    },
    async toggleAddTask() {
      this.showAddTask = !this.showAddTask;
    },
    async addTask(task: { text: string; day: string; reminder: boolean }) {
      const res = await apiFetch<ITask>("api/tasks", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(task),
      });
      this.tasks = [
        ...this.tasks,
        {
          ...res,
        },
      ];
    },
    async fetchTasks(): Promise<ITask[]> {
      return apiFetch("api/tasks");
    },
    async fetchTask(id: number): Promise<ITask> {
      return apiFetch(`api/tasks/${id}`);
    },
  },
  async created() {
    this.tasks = await this.fetchTasks();
  },
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap");
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: "Poppins", sans-serif;
}
.container {
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid steelblue;
  padding: 30px;
  border-radius: 5px;
}
.btn {
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}
.btn:focus {
  outline: none;
}
.btn:active {
  transform: scale(0.98);
}
.btn-block {
  display: block;
  width: 100%;
}
</style>
