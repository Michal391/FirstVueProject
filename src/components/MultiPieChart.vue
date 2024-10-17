<template>
    <div ref="chart"></div>
  </template>
  
  <script>
  import Plotly from 'plotly.js-dist-min';
  
  export default {
    name: 'MultiPieChart',
    props: {
      dataValues: {
        type: Array,
        required: true,
      },
      dataLabels: {
        type: Array,
        required: true,
      },
      chartNames: {
        type: Array,
        required: true,
      },
      colors: {
        type: Array,
        required: true,
      },
    },
    mounted() {
      this.drawChart();
    },
    methods: {
      drawChart() {
        const data = [];
  
        // Assuming dataValues is an array of arrays, each containing values for one pie chart
        for (let i = 0; i < this.dataValues.length; i++) {
          data.push({
            values: this.dataValues[i],
            labels: this.dataLabels,
            type: 'pie',
            name: this.chartNames[i],
            marker: {
              colors: this.colors[i],
            },
            domain: {
              row: Math.floor(i / 2),
              column: i % 2,
            },
            hoverinfo: 'label+percent+name',
            textinfo: 'none',
          });
        }
  
        const layout = {
          grid: { rows: 2, columns: 2 },
          height: 400,
          width: 500,
          title: 'Multi-Pie Chart',
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
  