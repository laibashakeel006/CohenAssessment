import { createRouter, createWebHistory } from "vue-router";
import { routeNames } from "@/constants/routes";
import TodoList from "@/views/todos/TodoList.vue";
import TodoCreate from "@/views/todos/TodoCreate.vue";
import TasksList from "@/views/tasks/TasksList.vue";
import TasksCreate from "@/views/tasks/TasksCreate.vue";
import About from "@/views/About.vue";

const routes = [
  {
    path: "/",
    redirect: { name: routeNames.todos },
  },
  {
    path: "/todos",
    name: routeNames.todos,
    component: TodoList,
  },
  {
    path: "/todos/create",
    name: routeNames.todoCreate,
    component: TodoCreate,
  },
  {
    path: "/tasks/:id",
    name: routeNames.tasks,
    component: TasksList,
  },
  {
    path: "/tasks/:id/create",
    name: routeNames.taskCreate,
    component: TasksCreate,
  },
  {
    path: "/about",
    name: routeNames.about,
    component: About,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: { name: routeNames.todos },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
