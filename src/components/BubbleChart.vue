<template>
    <div ref="chart"></div>
  </template>
  
  <script>
  import Plotly from 'plotly.js-dist-min';
  
  export default {
    name: 'BubbleChart',
    mounted() {
      this.drawChart();
    },
    methods: {
      drawChart() {
        const data = [
          {
            x: [1, 2, 3, 4, 5],
            y: [10, 11, 12, 13, 14],
            mode: 'markers',
            marker: {
              size: [40, 60, 80, 100, 120],
            },
          },
        ];
  
        const layout = {
          title: 'Bubble Chart Example',
          showlegend: false,
          height: 600,
          width: 600,
        };
  
        Plotly.newPlot(this.$refs.chart, data, layout, { responsive: true });
      },
    },
  };
  </script>
  
  <style scoped>
  div {
    width: 100%;
  }
  </style>
  