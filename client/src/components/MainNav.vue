<template>
  <header class="border-b border-slate-200 bg-white">
    <div class="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
      <router-link class="text-xl font-bold text-slate-950" :to="{ name: routeNames.todos }">
        Todos Manager
      </router-link>

      <nav class="flex items-center gap-2">
        <router-link
          v-for="item in navItems"
          :key="item.name"
          class="rounded px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-950"
          active-class="bg-slate-900 text-white hover:bg-slate-900 hover:text-white"
          :to="{ name: item.name }"
        >
          {{ item.label }}
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script>
import { routeNames } from "@/constants/routes";

export default {
  name: "MainNav",
  props:{
    title:Text
  },
  data() {
    return {
      routeNames,
      navItems: [
        { label: "Todos", name: routeNames.todos },
        { label: "Create", name: routeNames.todoCreate },
      ],
    };
  },
};
</script>
