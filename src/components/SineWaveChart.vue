<template>
    <div>
      <!-- Plotly chart container -->
      <div ref="chart" style="width: 100%; height: 500px;"></div>
    </div>
  </template>
  
  <script>
  import Plotly from 'plotly.js-dist-min';
  
  export default {
    name: 'SineWaveChart',
    data() {
      return {
        socket: null,
        xData: [],
        yData: [],
        chartData: [],
        chartInitialized: false,
      };
    },
    mounted() {
      this.initChart();
      this.connectWebSocket();
    },
    beforeUnmount() {
      this.disconnectWebSocket();
    },
    methods: {
      initChart() {
        // Initialize the Plotly chart with empty data
        const trace = {
          x: [],
          y: [],
          mode: 'lines',
          line: { simplify: false, color: '#3b82f6' },
          name: 'Sine Wave',
        };
  
        const layout = {
          title: 'Real-Time Sine Wave',
          xaxis: { title: 'Time' },
          yaxis: { title: 'Amplitude', range: [-1.2, 1.2] },
          margin: { t: 50, l: 50, r: 50, b: 50 },
          plot_bgcolor: '#f9fafb',
          paper_bgcolor: '#f9fafb',
        };
  
        Plotly.newPlot(this.$refs.chart, [trace], layout);
        this.chartInitialized = true;
      },
      connectWebSocket() {
        // Establish WebSocket connection
        this.socket = new WebSocket('ws://172.16.1.33:8005/sine_wave');
  
        this.socket.addEventListener('open', () => {
          console.log('WebSocket connection opened.');
        });
  
        this.socket.addEventListener('message', (event) => {
          console.log('WebSocket message received.');
          console.log('Raw data received:', event.data);
          this.handleIncomingData(event.data);
        });
  
        this.socket.addEventListener('close', () => {
          console.log('WebSocket connection closed.');
        });
  
        this.socket.addEventListener('error', (error) => {
          console.error('WebSocket error:', error);
        });
      },
      disconnectWebSocket() {
        if (this.socket) {
          this.socket.close();
        }
      },
      handleIncomingData(data) {
        console.log('Received data:', data);
        try {
          // Parse the amplitude value
          const amplitude = parseFloat(data);
          if (isNaN(amplitude)) {
            throw new Error('Received data is not a valid number');
          }
  
          // Use the current time as the x-axis value
          const time = Date.now() / 1000;
  
          // Update the data arrays
          this.xData.push(time);
          this.yData.push(amplitude);
  
          console.log('xData:', this.xData);
          console.log('yData:', this.yData);
  
          // Limit the data arrays to the last 10 points
          if (this.xData.length > 10) {
            this.xData.shift();
            this.yData.shift();
          }
  
          // Update the chart
          if (this.chartInitialized) {
            Plotly.react(this.$refs.chart, [{
              x: [...this.xData],
              y: [...this.yData],
              mode: 'lines',
              line: { simplify: false, color: '#3b82f6' },
              name: 'Sine Wave',
            }], {
              xaxis: { title: 'Time', range: [Math.min(...this.xData), Math.max(...this.xData)] },
              yaxis: { title: 'Amplitude', range: [-1.2, 1.2] },
              margin: { t: 50, l: 50, r: 50, b: 50 },
              plot_bgcolor: '#f9fafb',
              paper_bgcolor: '#f9fafb',
            });
          }
        } catch (error) {
          console.error('Error handling incoming data:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add any necessary styling here */
  </style>
  