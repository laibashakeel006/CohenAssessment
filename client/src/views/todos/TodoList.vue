<template>
  <section class="space-y-6">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-bold">Todos</h1>
        <p class="text-sm text-slate-600">Manage todo lists from the API.</p>
      </div>

      <router-link
        class="inline-flex items-center justify-center rounded bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
        :to="{ name: routeNames.todoCreate }"
      >
        Add Todo
      </router-link>
    </div>

    <p v-if="isLoading" class="rounded border border-slate-200 bg-white p-4 text-slate-600">
      Loading todos...
    </p>

    <p v-else-if="errorMessage" class="rounded border border-red-200 bg-red-50 p-4 text-red-700">
      {{ errorMessage }}
    </p>

    <div v-else-if="todos.length" class="grid gap-3">
      <article
        v-for="todo in todos"
        :key="todo.id"
        class="rounded border border-slate-200 bg-white p-4 shadow-sm"
      >
      <router-link :to="{name: routeNames.tasks, params:{id: todo.id}}">
        <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div class="space-y-1">
            <h2 :class="todo.status == 'completed' ? 'text-lg font-semibold line-through' : 'text-lg font-semibold'">{{ todo.title }}</h2>
            <p :class="todo.status == 'completed' ? 'line-through' : ''" v-if="todo.description" class="text-sm text-slate-600">{{ todo.description}}</p>
            <div class="flex flex-wrap gap-2 pt-2 text-xs text-slate-500">
              <span v-if="todo.due_date" class="rounded bg-slate-100 px-2 py-1">
                Due {{ todo.due_date}}
              </span>
              
              <span class="rounded bg-slate-100 px-2 py-1">
                {{ todo.status || "pending" }}
              </span>
              <span v-if="todo.tasks && todo.tasks.length" class="text-sm text-slate-800">
                ({{ completedTaskCount(todo) }}/{{ todo.tasks.length }})
              </span>
            </div>
          </div>

          <button
            class="rounded border border-red-200 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
            type="button"
            :disabled="deletingId === todo.id"
            @click="deleteTodo(todo.id)"
          >
            {{ deletingId === todo.id ? "Deleting..." : "Delete" }}
          </button>
        </div>
      </router-link>
      </article>
    </div>

    <div v-else class="rounded border border-slate-200 bg-white p-6 text-center text-slate-600">
      No todos found.
    </div>
  </section>
</template>

<script>
import { routeNames } from "@/constants/routes";
import { todoService } from "@/services/todo.service";
import moment from "moment";

export default {
  name: "TodoList",
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
      todos: [],
      isLoading: false,
      deletingId: null,
      errorMessage: "",
    };
  },
  mounted() {
    this.loadTodos();
  },
  methods: {
    completedTaskCount(todo) {
      if (!Array.isArray(todo.tasks)) {
        return 0;
      }

      return todo.tasks.filter((task) => task.status === "completed").length;
    },
    async loadTodos() {
      this.isLoading = true;
      this.errorMessage = "";

      try {
        this.todos = await todoService.list();
      } catch (error) {
        this.errorMessage = error.response?.data?.message || "Unable to load todos.";
      } finally {
        this.isLoading = false;
      }
    },

    async deleteTodo(id) {
      this.deletingId = id;
      this.errorMessage = "";

      try {
        await todoService.remove(id);
        this.todos = this.todos.filter((todo) => todo.id !== id);
      } catch (error) {
        this.errorMessage = error.response?.data?.message || "Unable to delete this todo.";
      } finally {
        this.deletingId = null;
      }
    },
  },
};
</script>
