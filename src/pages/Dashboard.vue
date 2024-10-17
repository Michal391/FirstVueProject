<template>
    <div class="flex h-screen">
      <!-- Side Navigation Menu -->
      <aside class="w-64 bg-gray-800 text-gray-100">
        <nav class="mt-10">
          <ul>
            <li class="px-6 py-2 hover:bg-gray-700">
              <router-link to="/" class="flex items-center">
                Home
              </router-link>
            </li>
            <li class="px-6 py-2 hover:bg-gray-700">
              <router-link to="/trainees" class="flex items-center">
                Trainees
              </router-link>
            </li>
            <li class="px-6 py-2 hover:bg-gray-700">
              <router-link to="/sessions" class="flex items-center">
                Sessions
              </router-link>
            </li>
            <li class="px-6 py-2 hover:bg-gray-700">
              <router-link to="/assessments" class="flex items-center">
                Assessments
              </router-link>
            </li>
          </ul>
        </nav>
      </aside>
  
      <!-- Main Content Area -->
      <main class="flex-1 bg-gray-100 p-6 overflow-auto">
        <router-view></router-view>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name: "DashboardPage",
  };
  </script>
  
  <style scoped>
  /* Add any component-specific styles here */
  </style>
  