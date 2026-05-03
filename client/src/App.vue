<template>
  <div class="min-h-screen bg-slate-50 text-slate-900">
    <MainNav />
    <main class="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <router-view />
    </main>
  </div>
</template>

<script>
import MainNav from "@/components/MainNav.vue";

export default {
  name: "App",
  components: {
    MainNav,
  },
  data() {
    return {
      title: (this.$route.name == 'tasks' ? 'Tasks' : 'Todos')
    }
  }
};
</script>
