<template>
  <form @submit="onSubmit" class="add-form">
    <div class="form-control">
      <label>Task</label>
      <input
        v-model="task.text"
        type="text"
        name="text"
        placeholder="Add Task"
      />
    </div>
    <div class="form-control">
      <label>Day & Time</label>
      <input
        v-model="task.day"
        type="text"
        name="day"
        placeholder="Add Day & Time"
      />
    </div>
    <div class="form-control form-control-check">
      <label>Set Reminder</label>
      <input v-model="task.reminder" type="checkbox" name="reminder" />
    </div>
    <input type="submit" value="Save Task" class="btn btn-block" />
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const initalState = {
  text: "",
  day: "",
  reminder: false,
};

export default defineComponent({
  name: "AddTask",
  data() {
    return {
      task: initalState,
    };
  },
  methods: {
    onSubmit(e: Event) {
      if (!this.task.text || !this.task.day) {
        alert("Please add a task");
      }
      this.$emit("add-task", this.task);
      this.task = initalState;
      e.preventDefault();
    },
  },
});
</script>
<style scoped>
.add-form {
  margin-bottom: 40px;
}
.form-control {
  margin: 20px 0;
}
.form-control label {
  display: block;
}
.form-control input {
  width: 100%;
  height: 40px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
}
.form-control-check {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.form-control-check label {
  flex: 1;
}
.form-control-check input {
  flex: 2;
  height: 20px;
}
</style>
