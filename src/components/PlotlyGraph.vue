<template>
    <div ref="plotlyChart"></div>
  </template>
  
  <script>
  import Plotly from 'plotly.js-dist-min';
  
  export default {
    name: 'PlotlyGraph',
    props: {
      data: {
        type: Array,
        required: true,
      },
      layout: {
        type: Object,
        default: () => ({}),
      },
      config: {
        type: Object,
        default: () => ({}),
      },
    },
    mounted() {
      this.drawChart();
    },
    methods: {
      drawChart() {
        Plotly.newPlot(this.$refs.plotlyChart, this.data, this.layout, this.config);
      },
    },
    watch: {
      data(newData) {
        Plotly.react(this.$refs.plotlyChart, newData, this.layout, this.config);
      },
      layout(newLayout) {
        Plotly.react(this.$refs.plotlyChart, this.data, newLayout, this.config);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Optional: Add any styles for your chart container */
  </style>
  