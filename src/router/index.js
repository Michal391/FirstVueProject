import { createRouter, createWebHistory } from "vue-router";
import DashboardPage from "../pages/Dashboard.vue";
import HomePage from "../pages/Home.vue";
import TraineesPage from "../pages/Trainees.vue";
import SessionsPage from "../pages/Sessions.vue";
import AssessmentsPage from "../pages/Assessments.vue";

const routes = [
{
    path: "/",
    component: DashboardPage,
    children: [
        {
        path: "",
        name: "Home",
        component: HomePage,
        },
        {
        path: "trainees",
        name: "Trainees",
        component: TraineesPage,
        },
        {
        path: "sessions",
        name: "Sessions",
        component: SessionsPage,
        },
        {
        path: "assessments",
        name: "Assessments",
        component: AssessmentsPage,
        },
    ],
    },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
