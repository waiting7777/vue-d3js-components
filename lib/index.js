import modal from './test.vue'

export const test = modal

export const install = function(Vue) {
  Vue.component('test', test)
}
