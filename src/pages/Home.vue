<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Dashboard Overview</h1>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Trainees Card -->
      <div class="bg-white shadow rounded-lg p-6">
        <div class="flex items-center">
          <!-- Icon -->
          <div class="p-3 bg-green-200 rounded-full">
            <AcademicCapIcon class="h-8 w-8 text-green-600" />
          </div>
          <div class="ml-4">
            <h2 class="text-xl font-semibold">Trainee Pass Rate</h2>
            <!-- Progress Bar -->
            <div class="mt-2">
              <div class="text-sm text-gray-600">Goal: 90%</div>
              <div class="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                <div
                  class="bg-green-500 h-2.5 rounded-full"
                  :style="{ width: traineePassRate + '%' }"
                ></div>
              </div>
              <div class="text-sm text-gray-600 mt-1">
                Current: {{ traineePassRate }}%
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sessions Card -->
      <div class="bg-white shadow rounded-lg p-6">
        <div class="flex items-center">
          <!-- Icon -->
          <div class="p-3 bg-blue-200 rounded-full">
            <ClockIcon class="h-8 w-8 text-blue-600" />
          </div>
          <div class="ml-4">
            <h2 class="text-xl font-semibold">Sessions Completed</h2>
            <!-- Progress Bar -->
            <div class="mt-2">
              <div class="text-sm text-gray-600">Goal: 40 Sessions</div>
              <div class="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                <div
                  class="bg-blue-500 h-2.5 rounded-full"
                  :style="{ width: sessionCompletionRate + '%' }"
                ></div>
              </div>
              <div class="text-sm text-gray-600 mt-1">
                Current: {{ completedSessions }} Sessions
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Assessments Card -->
      <div class="bg-white shadow rounded-lg p-6">
        <div class="flex items-center">
          <!-- Icon -->
          <div class="p-3 bg-yellow-200 rounded-full">
            <ClipboardDocumentListIcon class="h-8 w-8 text-yellow-600" />
          </div>
          <div class="ml-4">
            <h2 class="text-xl font-semibold">Assessment Pass Rate</h2>
            <!-- Progress Bar -->
            <div class="mt-2">
              <div class="text-sm text-gray-600">Goal: 85%</div>
              <div class="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                <div
                  class="bg-yellow-500 h-2.5 rounded-full"
                  :style="{ width: assessmentPassRate + '%' }"
                ></div>
              </div>
              <div class="text-sm text-gray-600 mt-1">
                Current: {{ assessmentPassRate }}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Chart Section -->
    <div class="mt-8">
      <h2 class="text-xl font-semibold mb-4">Training Data Visualization</h2>
      <div class="bg-white shadow rounded-lg p-6">
        <PlotlyChart />
      </div>
    </div>
  </div>
</template>

<script>
import { AcademicCapIcon } from '@heroicons/vue/24/solid';
import { ClockIcon } from '@heroicons/vue/24/solid';
import { ClipboardDocumentListIcon } from '@heroicons/vue/24/solid';
import PlotlyChart from '../components/PlotlyChart.vue';

export default {
  name: 'HomePage',
  components: {
    AcademicCapIcon,
    ClockIcon,
    ClipboardDocumentListIcon,
    PlotlyChart,
  },
  data() {
    return {
      // Trainee Pass Rate
      traineePassRate: 78, // Current pass rate in percentage
      traineeGoal: 90, // Goal pass rate

      // Sessions
      completedSessions: 42, // Current completed sessions
      sessionGoal: 40, // Goal for sessions
      sessionCompletionRate: 0, // Calculated percentage towards goal

      // Assessments
      assessmentPassRate: 85, // Current assessment pass rate
      assessmentGoal: 85, // Goal assessment pass rate
    };
  },
  created() {
    // Calculate session completion rate
    this.sessionCompletionRate = Math.min(
      (this.completedSessions / this.sessionGoal) * 100,
      100
    );
  },
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
