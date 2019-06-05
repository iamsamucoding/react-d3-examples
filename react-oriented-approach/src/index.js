import React from "react";
import ReactDOM from "react-dom";

import * as d3 from "d3";


function getData() {
    let numItems = 20 + Math.floor(20 * Math.random())
    let data = []
    for(let i=0; i<numItems; i++) {
        data.push({
            x: Math.random(),
            y: Math.random(),
            r: Math.random(),
            colour: i % 5
        })
    }
    return data
}

let colours = ['#2176ae', '#57b8ff', '#b66d0d', '#fbb13c', '#fe6847']

class Circles extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            data: getData()
        }

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.setState({
            data: getData()
        })
    }

    render() {
        let maxRadius = 40
        let xScale = d3.scaleLinear().domain([0, 1]).range([0, this.props.width])
        let yScale = d3.scaleLinear().domain([0, 1]).range([0, this.props.height])
        let rScale = d3.scaleLinear().domain([0, 1]).range([0, maxRadius])

        let points = this.state.data.map(d => <circle cx={xScale(d.x)} cy={yScale(d.y)} r={rScale(d.r)} fill={colours[d.colour]} />)

        return <div>
            <svg width={this.props.width} height={this.props.height}>{points}</svg>
            <div><button onClick={this.handleClick}>Update</button></div>
        </div>
    }
}

ReactDOM.render(
    <Circles width={800} height={600} />,
    document.getElementById('app')
)