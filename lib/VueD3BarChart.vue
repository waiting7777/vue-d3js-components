<template>
  <div ref="vm__bar__chart" class="vm__bar__chart"></div>
</template>

<script>
import * as d3 from 'd3'

export default {
  props: {
    width: {
      type: Number,
      default: 640
    },
    height: {
      type: Number,
      default: 360
    },
    color: {
      type: String,
      default: '#38b2ac'
    },
    data: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  mounted() {
    const margin = { top: 30, right: 0, bottom: 30, left: 40 }
    const width = this.width
    const height = this.height
    const color = this.color
    const data = this.data

    const yAxis = g =>
      g
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(null, '%'))
        .call(g => g.select('.domain').remove())
        .call(g =>
          g
            .append('text')
            .attr('x', -margin.left)
            .attr('y', 10)
            .attr('fill', 'currentColor')
            .attr('text-anchor', 'start')
            .text('↑ Frequency')
        )

    const xAxis = g =>
      g.attr('transform', `translate(0,${height - margin.bottom})`).call(
        d3
          .axisBottom(x)
          .tickFormat(i => data[i].name)
          .tickSizeOuter(0)
      )

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .nice()
      .range([height - margin.bottom, margin.top])

    const x = d3
      .scaleBand()
      .domain(d3.range(data.length))
      .range([margin.left, width - margin.right])
      .padding(0.1)

    const svg = d3
      .select(this.$refs.vm__bar__chart)
      .append('svg')
      .attr('viewBox', [0, 0, width, height])

    svg
      .append('g')
      .attr('fill', color)
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('x', (d, i) => x(i))
      .attr('y', d => y(d.value))
      .attr('height', d => y(0) - y(d.value))
      .attr('width', x.bandwidth())

    svg.append('g').call(xAxis)

    svg.append('g').call(yAxis)

    console.log(svg)
  }
}
</script>

<style lang="scss" scoped>
.vm__bar__chart {
  svg {
    width: 100%;
  }
}
</style>
