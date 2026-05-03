<template>
  <section class="space-y-6">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-bold">Tasks</h1>
        <p class="text-sm text-slate-600">Manage tasks lists from the {{todo.title}} todo list.</p>
      </div>

      <router-link
        class="inline-flex items-center justify-center rounded bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
        :to="{ name: routeNames.taskCreate, params: { id: id } }"
      >
        Add Task
      </router-link>
    </div>

    <p v-if="isLoading" class="rounded border border-slate-200 bg-white p-4 text-slate-600">
      Loading tasks...
    </p>

    <p v-else-if="errorMessage" class="rounded border border-red-200 bg-red-50 p-4 text-red-700">
      {{ errorMessage }}
    </p>

    <div v-else-if="tasks" class="grid gap-3">
      <article
        v-for="task in tasks"
        :key="task.id"
        class="rounded border border-slate-200 bg-white p-4 shadow-sm"
      >
        <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div class="space-y-1">
            <h2 :class="task.status == 'completed' ? 'text-lg font-semibold line-through' : 'text-lg font-semibold'">{{ task.description }}</h2>
            <div class="flex flex-wrap gap-2 pt-2 text-xs text-slate-500">
              <span v-if="task.due_date" class="rounded bg-slate-100 px-2 py-1">
                Due {{ task.due_date}}
              </span>
              <span class="rounded bg-slate-100 px-2 py-1">
                {{ task.status || "pending" }}
              </span>
              <span class="text-sm text-slate-800" v-if="task.priority == 'high'">
                <i class="fa fa-arrow-up" style="color: red;"></i>
              </span>
              <span class="text-sm text-slate-800" v-else-if="task.priority == 'medium'">
                <i class="fa fa-minus" style="color: turquoise;"></i>
              </span>
              <span class="text-sm text-slate-800" v-else>
                <i class="fa fa-arrow-down" style="color: green;"></i>
              </span>
            </div>
          </div>
          <div class="flex items-center justify-end gap-3">
            <!-- <router-link :to="{name: todos}">
              <button
                class="rounded border border-black-200 px-3 py-2 text-sm font-medium text-black-700 hover:bg-slate-50"
                type="button"
              >
                <i class="fa fa-pencil" ></i>
              </button>
            </router-link> -->
            <select
              v-model="task.priority"
              class="w-full rounded border border-slate-300 px-3 py-2 focus:border-slate-900 focus:outline-none"
              @input="changePriority(task.id, todo.id)"
            >
              <option value="">Select</option>
              <option value="high">High</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
            </select>
            <button
              class="rounded border border-red-200 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
              type="button"
              :disabled="deletingId === task.id"
              @click="deleteTask(task.id, todo.id)"
            >
              {{ deletingId === task.id ? "Deleting..." : "Delete" }}
            </button>
          </div>
        </div>
      </article>
    </div>

    <div v-else class="rounded border border-slate-200 bg-white p-6 text-center text-slate-600">
      No tasks found.
    </div>
  </section>
</template>

<script>
import { routeNames } from "@/constants/routes";
import { taskService } from "@/services/task.service";
import moment from "moment";

export default {
  name: "TasksList",
  filters: {
    capitalize: function (value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
    formatDate: function (date) {
      if (date != null) return moment(date).utc().format("DD MMM YYYY");
      else return "-";
    },
  },
  data() {
    return {
      routeNames,
      tasks: [],
      todo: "",
      isLoading: false,
      deletingId: null,
      errorMessage: "",
      id: this.$route.params.id,
      priority: ""
    };
  },
  mounted() {
    this.loadTasks();
  },
  methods: {
    // Get total completed task
    completedTaskCount(task) {
      if (!Array.isArray(task.tasks)) {
        return 0;
      }

      return task.tasks.filter((task) => task.status === "completed").length;
    },
    changePriority(id, taskId){
      this.deletingId = id;
      this.errorMessage = "";

      try {
        const data = {
          taskId: taskId,
          priority: this.priority,
        };

        taskService.changePriority(id, data);
        this.tasks = this.tasks.filter((task) => task.id !== id);
      } catch (error) {
        this.errorMessage = error.response?.data?.message || "Unable to change priority.";
      } finally {
        this.deletingId = null;
      }
    },
    async loadTasks() {
      this.isLoading = true;
      this.errorMessage = "";

      try {
        this.todo = await taskService.list({id: this.id});
        this.tasks = this.todo.tasks;
      } catch (error) {
        console.log(error);
        this.errorMessage = error.response?.data?.message || "Unable to load tasks.";
      } finally {
        this.isLoading = false;
      }
    },

    async deleteTask(id, taskId) {
      this.deletingId = id;
      this.errorMessage = "";

      try {
        await taskService.remove(id, taskId);
        this.tasks = this.tasks.filter((task) => task.id !== id);
      } catch (error) {
        this.errorMessage = error.response?.data?.message || "Unable to delete this task.";
      } finally {
        this.deletingId = null;
      }
    }

  },
};
</script>
