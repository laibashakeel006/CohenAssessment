<template>
  <section class="mx-auto max-w-xl space-y-6">
    <div>
      <h1 class="text-2xl font-bold">Create Todo</h1>
      <p class="text-sm text-slate-600">Add a new todo list through the API.</p>
    </div>

    <form class="space-y-4 rounded border border-slate-200 bg-white p-5 shadow-sm" @submit.prevent="saveTodo">
      <label class="block space-y-1">
        <span class="text-sm font-medium text-slate-700">Title</span>
        <input
          v-model.trim="form.title"
          class="w-full rounded border border-slate-300 px-3 py-2 focus:border-slate-900 focus:outline-none"
          required
          minlength="3"
          type="text"
        />
      </label>

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

      <p v-if="errorMessage" class="rounded bg-red-50 p-3 text-sm text-red-700">
        {{ errorMessage }}
      </p>

      <div class="flex items-center justify-end gap-3">
        <router-link
          class="rounded border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          :to="{ name: routeNames.todos }"
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
import { todoService } from "@/services/todo.service";

export default {
  name: "TodoCreate",
  data() {
    return {
      routeNames,
      form: {
        title: "",
        description: "",
        due_date: "",
      },
      isSaving: false,
      errorMessage: "",
    };
  },
  computed:{
    isValidForm(){
      return Boolean( this.form.title && this.form.description && this.form.due_date );
    },
    isSaveDisabled(){
      return !this.isValidForm || this.isSaving
    }
  },
  methods: {
    async saveTodo() {
      this.isSaving = true;
      this.errorMessage = "";

      try {
        await todoService.create(this.form);
        this.$router.push({ name: routeNames.todos });
      } catch (error) {
        const errors = error.response?.data?.errors;
        this.errorMessage =
          error.response?.data?.message ||
          (errors ? Object.values(errors).join(" ") : "Unable to create todo.");
      } finally {
        this.isSaving = false;
      }
    },
  },
};
</script>
