<template>
  <section class="mx-auto max-w-xl space-y-6">
    <div>
      <h1 class="text-2xl font-bold">Create Task</h1>
      <p class="text-sm text-slate-600">Add a new task in {{todo.title}}.</p>
    </div>

    <form class="space-y-4 rounded border border-slate-200 bg-white p-5 shadow-sm" @submit.prevent="saveTask">
      
      <label class="block space-y-1">
        <span class="text-sm font-medium text-slate-700">Description</span>
        <textarea
          v-model.trim="form.description"
          class="min-h-[110px] w-full rounded border border-slate-300 px-3 py-2 focus:border-slate-900 focus:outline-none"
          maxlength="200"
        />
      </label>

      <label class="block space-y-1">
        <span class="text-sm font-medium text-slate-700">Due date</span>
        <input
          v-model="form.due_date"
          class="w-full rounded border border-slate-300 px-3 py-2 focus:border-slate-900 focus:outline-none"
          required
          type="date"
        />
      </label>

      <label class="block space-y-1">
        <span class="text-sm font-medium text-slate-700">Priority</span>
        <select
          v-model="form.priority"
          class="w-full rounded border border-slate-300 px-3 py-2 focus:border-slate-900 focus:outline-none"
          required
        >
          <option value="">Select</option>
          <option value="high">High</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
        </select>
      </label>

      <p v-if="errorMessage" class="rounded bg-red-50 p-3 text-sm text-red-700">
        {{ errorMessage }}
      </p>

      <div class="flex items-center justify-end gap-3">
        <router-link
          class="rounded border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          :to="{ name: routeNames.tasks, params: { id: form.id } }"
        >
          Cancel
        </router-link>
        <button
          class="rounded border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          :disabled="isSaveDisabled"
          type="submit"
        >
          {{ isSaving ? "Saving..." : "Save" }}
        </button>
      </div>
    </form>
  </section>
</template>

<script>
import { routeNames } from "@/constants/routes";
import { taskService } from "@/services/task.service";

export default {
  name: "TasksCreate",
  data() {
    return {
      routeNames,
      todo:'',
      form: {
        description: "",
        due_date: "",
        priority: "",
        id: this.$route.params.id,
      },
      errorMessage: "",
      isSaving: false,
    };
  },
  computed: {
    isFormValid() {
      return Boolean(this.form.description && this.form.due_date && this.form.priority);
    },

    isSaveDisabled() {
      return !this.isFormValid || this.isSaving;
    },
  },
  mounted(){
    this.loadTasks();
  },
  methods: {
    async saveTask() {
      if (this.isSaveDisabled) {
        return;
      }

      this.isSaving = true;
      this.errorMessage = "";

      try {
        await taskService.createTask(this.form);
        this.$router.push({ name: routeNames.tasks, params: { id: this.form.id } });
      } catch (error) {
        const errors = error.response?.data?.errors;
        console.log(error, 'rr')
        this.errorMessage =
          error.response?.data?.message ||
          (errors ? Object.values(errors).join(" ") : "Unable to create task.");
      } finally {
        this.isSaving = false;
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
  },
};
</script>
