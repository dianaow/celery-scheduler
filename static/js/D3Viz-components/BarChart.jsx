import React,{ Component, Fragment } from 'react';
import { scaleBand, scaleLinear, scaleOrdinal } from 'd3-scale';
import { max } from 'd3-array';
import Axis from './Axis'
import Bars from './Bars'
import Legend from './Legend'

class BarChart extends Component {

  constructor() {
    super()
    this.xscale = scaleBand()
    this.yscale = scaleLinear()
    this.colorScale = scaleOrdinal()
  }

  render() {
    
    const data = this.props.qualData
    const raceData = this.props.raceData
    const wrapper = { width: this.props.width, height: this.props.height }
    const legendSpace = { width: 200, height: 400 }
    const axisSpace = { width: 30, height: 30 }
    const margins = { top: 20, right: 20, bottom: 20, left: 30 }
    const svgDimensions = { width: wrapper.width - legendSpace.width - axisSpace.width - margins.left - margins.right, 
                            height: wrapper.height - axisSpace.height - margins.top - margins.bottom}

    const xScale = this.xscale
                      .padding(0.1)
                      .domain(data.map(d => d.driverRef))
                      .range([margins.left, svgDimensions.width])

    const yScale = this.yscale
                    .domain([0, max(data, d => d.position)])
                    .range([svgDimensions.height, margins.top])

    const teamColors = [{id:1, key: "ferrari", value: "#DC0000"},
                       {id:2, key: "mercedes", value: "#01d2be"},
                       {id:3, key: "red_bull", value: "#09153B"},
                       {id:4, key: "force_india", value: "#F595C8"},
                       {id:5, key: "haas", value: "#828282"},
                       {id:6, key: "mclaren", value: "#FF8700"},
                       {id:7, key: "renault", value: "#FFD700"},
                       {id:8, key: "sauber", value: "#9B0000"},
                       {id:9, key: "toro_rosso", value: "#021688"},
                       {id:10, key: "williams", value: "#002F5F"},
                       {id:11, key: "manor", value: "#007AC0"}]

    const colorScale = this.colorScale 
                        .domain(teamColors.map(d => d.key))
                        .range(teamColors.map(d => d.value))

    const textStyle = {
      textAlign: 'center',
      fontWeight: 'bold',
      textTransform: 'uppercase'
    } 

    const yProps = {
      orient: 'Left',
      scale: yScale,
      translate: `translate(${margins.left}, 0)`,
      tickSizeOuter: 6,
      tickPadding: 10
    }

    console.log(data)
    console.log(raceData)

    return (
      <svg width={wrapper.width} height={wrapper.height}>
        <g transform={"translate(" + (axisSpace.width + margins.left) + "," + (margins.top) + ")"}>
          <Axis {...yProps} />
          <Bars
            scales={{ xScale, yScale, colorScale}}
            data={data}
            raceData={raceData}
            svgDimensions={svgDimensions}
            margins={margins}
            axisSpace={axisSpace}
          />
          <text 
            style={textStyle}
            transform={"translate(" + (- margins.left) + "," + (svgDimensions.height/2 + margins.top + axisSpace.height) + ")rotate(-90)"}>
            Qualifying Position
          </text>
          <text 
            style={textStyle}
            transform={"translate(" + (svgDimensions.width/2 - axisSpace.width - margins.left) + "," + (svgDimensions.height + axisSpace.height + margins.top) + ")"}>
            Race Finish Position
          </text>
        </g>
        <g transform={"translate(" + (svgDimensions.width + axisSpace.width + margins.left + margins.right) + "," + (margins.top) + ")"}>
          <Legend
              colormap={teamColors}
              data={data}
              raceData={raceData}
          />
        </g>
      </svg>
    );
  }

};

export default BarChart;