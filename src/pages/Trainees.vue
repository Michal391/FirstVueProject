<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-8 text-gray-800">Trainees</h1>

    <!-- Trainee Selection -->
    <div class="mb-8">
      <label class="block text-gray-700 text-lg font-medium mb-2" for="trainee-select">
        Select Trainee
      </label>
      <select
        id="trainee-select"
        v-model="selectedTraineeId"
        @change="onTraineeChange"
        class="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-3 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
      >
        <option disabled value="">Please select a trainee</option>
        <option
          v-for="trainee in trainees"
          :key="trainee.id"
          :value="trainee.id"
        >
          {{ trainee.name }} {{ trainee.surname }}
        </option>
      </select>
    </div>

    <div v-if="selectedTrainee">
      <!-- Trainee Information and Total Sessions -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <!-- Trainee Information Card -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">Trainee Information</h2>
          <p class="text-gray-700"><strong>Name:</strong> {{ selectedTrainee.name }}</p>
          <p class="text-gray-700"><strong>Surname:</strong> {{ selectedTrainee.surname }}</p>
          <p class="text-gray-700"><strong>Employee Number:</strong> {{ selectedTrainee.employeeNumber }}</p>
        </div>

        <!-- Total Sessions and Training Time Card -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">Training Overview</h2>
          <div class="flex items-center justify-between mb-4">
            <div>
              <p class="text-gray-700 text-lg">Total Sessions</p>
              <p class="text-3xl font-bold text-blue-600">{{ totalSessions }}</p>
            </div>
            <div>
              <p class="text-gray-700 text-lg">Total Training Time</p>
              <p class="text-3xl font-bold text-blue-600">{{ totalTrainingTime }} hrs</p>
            </div>
          </div>
          <!-- Training Time Progression Chart -->
          <div class="mt-6">
            <h3 class="text-xl font-semibold mb-4 text-gray-800">Training Time Progression</h3>
            <SinewaveChart />
          </div>
        </div>
      </div>

      <!-- Performance Over Time and Skills Evaluation -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <!-- Performance Over Time Chart -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">Performance Over Time</h2>
          <PlotlyChart :data="averageChartData" :layout="averageChartLayout" />
        </div>

        <!-- Skills Evaluation Radar Chart -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">Skills Evaluation</h2>
          <BubbleChart />
        </div>
      </div>

      <!-- Additional Charts -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <!-- Multi-Pie Chart -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">Assessment Type Distribution</h2>
          <MultiPieChart
            :data-values="multiPieDataValues"
            :data-labels="multiPieDataLabels"
            :chart-names="multiPieChartNames"
            :colors="multiPieColors"
          />
        </div>

        <!-- Grouped Bar Chart -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">Session Metrics Comparison</h2>
          <GroupedBarChart />
        </div>
      </div>

      <!-- Annotated Line Chart -->
      <div class="bg-white rounded-lg shadow p-6 mb-8">
        <h2 class="text-2xl font-semibold mb-4 text-gray-800">Progression Analysis</h2>
        <AnnotatedLineChart />
      </div>

      <!-- Bubble Chart -->
      <div class="bg-white rounded-lg shadow p-6 mb-8">
        <h2 class="text-2xl font-semibold mb-4 text-gray-800">Performance Bubble Chart</h2>
        <BubbleChart />
      </div>

      <!-- Session Selection -->
      <div class="mb-8">
        <label class="block text-gray-700 text-lg font-medium mb-2" for="session-select">
          Select Session
        </label>
        <select
          id="session-select"
          v-model="selectedSessionId"
          @change="onSessionChange"
          class="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-3 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        >
          <option disabled value="">Please select a session</option>
          <option
            v-for="session in traineeSessions"
            :key="session.id"
            :value="session.id"
          >
            Session {{ session.id }} - {{ session.assessmentType }}
          </option>
        </select>
      </div>

      <!-- Session Information and Charts -->
      <div v-if="selectedSession" class="bg-white rounded-lg shadow p-6 mb-8">
        <h2 class="text-2xl font-semibold mb-4 text-gray-800">Session Information</h2>
        <p class="text-gray-700"><strong>Assessment Type:</strong> {{ selectedSession.assessmentType }}</p>
        <p class="text-gray-700"><strong>Start Date:</strong> {{ selectedSession.startDate }}</p>
        <p class="text-gray-700"><strong>End Date:</strong> {{ selectedSession.endDate }}</p>

        <!-- Session Data Chart -->
        <div class="mt-6">
          <h3 class="text-xl font-semibold mb-4 text-gray-800">Session Metrics</h3>
          <PlotlyChart :data="sessionChartData" :layout="sessionChartLayout" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchTrainees } from '@/api/api'; // Adjust the path if necessary
import PlotlyChart from '../components/PlotlyChart.vue';
import MultiPieChart from '../components/MultiPieChart.vue';
import GroupedBarChart from '../components/GroupedBarChart.vue';
import AnnotatedLineChart from '../components/AnnotatedLineChart.vue';
import BubbleChart from '../components/BubbleChart.vue';
import SinewaveChart from '../components/SineWaveChart.vue';

export default {
  name: 'TraineesPage',
  components: {
    PlotlyChart,
    MultiPieChart,
    GroupedBarChart,
    AnnotatedLineChart,
    BubbleChart,
    SinewaveChart,
  },
  data() {
    return {
      trainees: [],
      selectedTraineeId: '',
      selectedTrainee: null,
      traineeSessions: [],
      selectedSessionId: '',
      selectedSession: null,
      totalSessions: 0,
      totalTrainingTime: 0,
      averageChartData: [],
      averageChartLayout: {},
      trainingTimeChartData: [],
      trainingTimeChartLayout: {},
      skillsChartData: [],
      skillsChartLayout: {},
      multiPieDataValues: [],
      multiPieDataLabels: [],
      multiPieChartNames: [],
      multiPieColors: [],
      sessionChartData: [],
      sessionChartLayout: {},
    };
  },
  created() {
    this.fetchTrainees();
  },
  methods: {
    fetchTrainees() {
      fetchTrainees()
        .then((response) => {
          // Map the API data to the expected structure
          this.trainees = response.data.map((apiTrainee) => ({
            id: apiTrainee._id,
            name: apiTrainee.firstName,
            surname: apiTrainee.lastName,
            employeeNumber: apiTrainee.personnelNumber,
          }));

          // Optionally, select the first trainee by default
          if (this.trainees.length > 0) {
            this.selectedTraineeId = this.trainees[0].id;
            this.onTraineeChange();
          }
        })
        .catch((error) => {
          console.error('Error fetching trainees:', error);
        });
    },
    onTraineeChange() {
      this.selectedSessionId = '';
      this.selectedSession = null;
      this.fetchTraineeData();
    },
    fetchTraineeData() {
      this.selectedTrainee = this.trainees.find(
        (trainee) => trainee.id === this.selectedTraineeId
      );

      if (this.selectedTrainee) {
        // Since the endpoints are not available, use dummy data
        // Assign dummy skills
        this.selectedTrainee.skills = [80, 85, 75, 90, 70];

        // Assign dummy sessions
        this.traineeSessions = [
          {
            id: 'S1',
            assessmentType: 'Assessment A',
            startDate: '2023-01-01',
            endDate: '2023-01-02',
            date: '2023-01-01',
            duration: 2,
            averageScore: 75,
            metric1: 80,
            metric2: 70,
            metric3: 85,
          },
          {
            id: 'S2',
            assessmentType: 'Assessment B',
            startDate: '2023-02-01',
            endDate: '2023-02-02',
            date: '2023-02-01',
            duration: 3,
            averageScore: 80,
            metric1: 78,
            metric2: 82,
            metric3: 79,
          },
          // Add more dummy sessions as needed
        ];
        this.selectedTrainee.sessions = this.traineeSessions;

        // Calculate totals and prepare charts
        this.totalSessions = this.traineeSessions.length;
        this.totalTrainingTime = this.traineeSessions.reduce(
          (total, session) => total + session.duration,
          0
        );

        // Prepare charts
        this.prepareAverageChart();
        this.prepareTrainingTimeChart();
        this.prepareSkillsChart();
        this.prepareMultiPieChartData();
      } else {
        // Handle the case where selectedTrainee is null
        this.traineeSessions = [];
        this.totalSessions = 0;
        this.totalTrainingTime = 0;
      }
    },
    onSessionChange() {
      this.fetchSessionData();
    },
    fetchSessionData() {
      this.selectedSession = this.traineeSessions.find(
        (session) => session.id === this.selectedSessionId
      );

      if (this.selectedSession) {
        // Prepare session-specific charts
        this.prepareSessionChart();
      }
    },
    prepareAverageChart() {
      const dates = this.traineeSessions.map((session) => session.date);
      const averages = this.traineeSessions.map((session) => session.averageScore);

      this.averageChartData = [
        {
          x: dates,
          y: averages,
          type: 'scatter',
          mode: 'lines+markers',
          marker: { color: '#3b82f6' },
          name: 'Average Score',
        },
      ];

      this.averageChartLayout = {
        title: 'Average Score Over Time',
        xaxis: { title: 'Date' },
        yaxis: { title: 'Average Score' },
        plot_bgcolor: '#f9fafb',
        paper_bgcolor: '#f9fafb',
      };
    },
    prepareTrainingTimeChart() {
      const dates = this.traineeSessions.map((session) => session.date);
      const cumulativeTime = [];
      let totalTime = 0;
      this.traineeSessions.forEach((session) => {
        totalTime += session.duration;
        cumulativeTime.push(totalTime);
      });

      this.trainingTimeChartData = [
        {
          x: dates,
          y: cumulativeTime,
          type: 'scatter',
          mode: 'lines+markers',
          marker: { color: '#10b981' },
          name: 'Training Time',
        },
      ];

      this.trainingTimeChartLayout = {
        title: 'Training Time Progression',
        xaxis: { title: 'Date' },
        yaxis: { title: 'Total Training Time (hours)' },
        plot_bgcolor: '#f9fafb',
        paper_bgcolor: '#f9fafb',
      };
    },
    prepareSkillsChart() {
      const skills = ['Communication', 'Teamwork', 'Problem Solving', 'Technical Knowledge', 'Adaptability'];
      const skillScores = this.selectedTrainee.skills;

      this.skillsChartData = [
        {
          type: 'scatterpolar',
          r: skillScores,
          theta: skills,
          fill: 'toself',
          name: `${this.selectedTrainee.name}'s Skills`,
          marker: { color: 'rgba(59, 130, 246, 0.7)' },
        },
      ];

      this.skillsChartLayout = {
        polar: {
          radialaxis: {
            visible: true,
            range: [0, 100],
          },
        },
        showlegend: false,
        title: 'Skills Evaluation',
        plot_bgcolor: '#f9fafb',
        paper_bgcolor: '#f9fafb',
      };
    },
    prepareMultiPieChartData() {
      // Prepare data for MultiPieChart using dummy data
      this.multiPieDataLabels = ['Type A', 'Type B', 'Type C', 'Type D', 'Type E'];
      this.multiPieDataValues = [
        [20, 30, 25, 15, 10],
        [25, 35, 20, 10, 10],
        [30, 25, 20, 15, 10],
        [35, 30, 15, 10, 10],
      ];
      this.multiPieChartNames = ['Session 1', 'Session 2', 'Session 3', 'Session 4'];
      this.multiPieColors = [
        ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56', '#e7e9ed'],
        ['#36a2eb', '#ff6384', '#ffce56', '#cc65fe', '#e7e9ed'],
        ['#cc65fe', '#36a2eb', '#ff6384', '#ffce56', '#e7e9ed'],
        ['#ffce56', '#cc65fe', '#36a2eb', '#ff6384', '#e7e9ed'],
      ];
    },
    prepareSessionChart() {
      this.sessionChartData = [
        {
          x: ['Metric 1', 'Metric 2', 'Metric 3'],
          y: [
            this.selectedSession.metric1,
            this.selectedSession.metric2,
            this.selectedSession.metric3,
          ],
          type: 'bar',
          marker: { color: '#f59e0b' },
        },
      ];

      this.sessionChartLayout = {
        title: `Session ${this.selectedSession.id} Metrics`,
        xaxis: { title: 'Metrics' },
        yaxis: { title: 'Values' },
        plot_bgcolor: '#f9fafb',
        paper_bgcolor: '#f9fafb',
      };
    },
  },
};
</script>

<style scoped>
/* Add your styles here if needed */
</style>
