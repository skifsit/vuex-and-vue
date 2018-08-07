<template>
  <div :style="styleObj" ref="$wrapper">
    <!--<svg width="500" height="500">-->
      <!--<rect fill="#8ab200" x="0" y="350" height="150" width="100"></rect>-->
      <!--<rect fill="#8ab200" x="100" y="450" height="50" width="100"></rect>-->
      <!--<rect fill="#8ab200" x="200" y="470" height="30" width="100"></rect>-->
      <!--<rect fill="#8ab200" x="300" y="380" height="120" width="100"></rect>-->
      <!--<rect fill="#8ab200" x="400" y="20" height="480" width="100"></rect>-->
    <!--</svg>-->
    <!--<svg :width="width" :height="height">-->
      <!--<g transform="translate(50, 50)">-->
        <!--<rect v-for="(s, idx) in series"-->
              <!--:fill="`#8a${Number(255 / series.length * (idx + 1)).toString(16)}00`"-->
              <!--style="transition: all 1s ease;"-->
              <!--:x="idx * innerWidth / series.length" :y="innerHeight - s" :height="s"-->
              <!--:width="innerWidth / series.length"></rect>-->
      <!--</g>-->
    <!--</svg>-->
  </div>
</template>

<script>
  import {
    select as d3Select,
    scaleBand as d3ScaleBand,
    scaleLinear as d3ScaleLinear,
    interpolateRgb as d3InterpolateRgb,
    axisLeft as d3AxisLeft,
    axisRight as d3AxisRight,
    axisBottom as d3AxisBottom,
    min as d3Min,
    max as d3Max,
  } from 'd3'

  export default {
    name: 'd3-bars-chart',
    props: {
      styleObj: {
        type: Object,
      }
    },
    data () {
      return {
        width: 500,
        height: 500,
        innerWidth: 400,
        innerHeight: 400,
        series: []
      }
    },
    methods: {
      generateData () {
        this.series = [
          Math.random()*400,
          Math.random()*400,
          Math.random()*400,
          Math.random()*400,
          Math.random()*400,
        ]
      },
      updateChart (wrapper, curData) {
        if (!wrapper) {
          return
        }

        const minValue = d3Min(curData)
        const maxValue = d3Max(curData)
        const width = 500
        const height = 500
        const DURATION = 1000
        const margin = { top: 50, right: 50, bottom: 50, left: 50 }
        const innerWidth = width - margin.left - margin.right
        const innerHeight = height - margin.top - margin.bottom
        const svgData = d3Select(wrapper).selectAll('svg').data(['dummy data'])
        // enter clause
        const svgEnter = svgData.enter().append('svg')
        svgEnter.attr('width', width)
        svgEnter.attr('height', height)

        const gEnter = svgEnter.append('g').attr('class', 'bars-chart')
          .attr('transform', `translate(${margin.left}, ${margin.top})`)
        // merge clause
        const svgMerge = svgData.merge(svgEnter) // svg
        const gMerge = svgMerge.select('g.bars-chart')

        const indexes = Array.from({ length: curData.length }, (d, idx) => idx)
        const x = d3ScaleBand().range([0, innerWidth]).domain(indexes)
        const y = d3ScaleLinear().range([innerHeight, 0]).domain([minValue, maxValue])
        const xColor = d3ScaleLinear()
          .domain([indexes[0], indexes[indexes.length - 1]])
          .interpolate(d3InterpolateRgb)
          .range(['#8a0000', '#8ab200'])

        // enter
        gEnter.append('g')
          .attr('class', 'y-right')
          .call(d3AxisRight(y).tickSizeOuter(0).tickSizeInner(innerWidth))
        // merge
        const gY = gMerge.select('g.y-right')

        gY.transition()
          .duration(DURATION)
          .call(d3AxisRight(y).tickSizeOuter(0).tickSizeInner(innerWidth))

        gY.selectAll('line')
          .attr('stroke', '#777777')
          .attr('stroke-dasharray', '2,2')
        gY.selectAll('text').remove()

        const rectData = gMerge.selectAll('rect').data(curData)
        // enter clause
        const rectEnter = rectData.enter()
          .append('rect')
          // .attr('fill', '#8ab200')
          .attr('fill', (d, idx) => xColor(idx))
          // .attr('x', (d, idx) => idx * innerWidth / curData.length)
          .attr('x', (d, idx) => x(idx))
          // .attr('y', (d) => innerHeight - d)
          .attr('y', (d) => y(d))
          .attr('width', innerWidth / curData.length)
          .attr('height', (d) => innerHeight - y(d))

        const rectMerge = rectData.merge(rectEnter) // rect
        rectMerge
          .transition()
          .duration(DURATION)
          // .attr('y', (d) => innerHeight - d)
          .attr('y', (d) => y(d))
          .attr('height', (d) => innerHeight - y(d))

        // enter
        gEnter.append('g')
          .attr('class', 'y-left')
          .call(d3AxisLeft(y))
        // merge
        gMerge.select('g.y-left')
          .transition()
          .duration(DURATION)
          .call(d3AxisLeft(y))

        // enter
        gEnter.append('g')
          .attr('class', 'x')
          .call(d3AxisBottom(x))
        // merge
        gMerge.select('g.x')
          .attr('transform', `translate(0, ${innerHeight})`)
          .transition()
          .duration(DURATION)
          .call(d3AxisBottom(x))
      }
    },
    mounted () {
      this.generateData()
      this.updateChart(this.$refs.$wrapper, this.series)
      this.intervalId = setInterval(() => {
        this.generateData()
        this.updateChart(this.$refs.$wrapper, this.series)
      }, 5000)
    },
    beforeDestroy () {
      clearInterval(this.intervalId)
    }
  }
</script>