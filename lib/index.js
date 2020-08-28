import VueD3BarChart from './VueD3BarChart.vue'

export const VueD3jsComponents = {
  VueD3BarChart,
  install: Vue => {
    Vue.component('VueD3BarChart', VueD3BarChart)
  }
}

export default VueD3jsComponents
