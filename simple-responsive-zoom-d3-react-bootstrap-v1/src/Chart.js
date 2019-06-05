import React from 'react';

import * as d3 from "d3";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


// Example based on:
// https://coderwall.com/p/psogia/simplest-way-to-add-zoom-pan-on-d3-js
// http://bl.ocks.org/sgruhier/1d692762f8328a2c9957
// https://bl.ocks.org/curran/3a68b0c81991e2e94b19


const HEIGHT = 600;


class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.chartContainer = null;
        this.svgChartContainer = null;

        this.circle_radius = 200;

        this.redraw = this.redraw.bind(this);
    }

    componentDidMount() {
        this.redraw();
        window.addEventListener('resize', this.redraw);
    }

    redraw() {
        // The svg will have the width of the <div id="chart"> that surrounds it,
        // and the circle radius will have 20% of it.
        let width = this.chartContainer.clientWidth;
        this.circle_radius = 0.2 * width;

        // since we append a <g> into the <svg> for each call, we need
        // to remove it before rendering the viz again
        d3.select(this.svgChartContainer).selectAll("g").remove();

        // the transform must be in <g> not in <svg>, otherwise rendering
        // becomes slower
        let svg = d3.select(this.svgChartContainer)
            .attr("width", width)
            .attr("height", HEIGHT)
            .call(d3.zoom().on("zoom", function () {
                svg.attr("transform", d3.event.transform)
            }))
            .append("g");

        svg.append("circle")
            .attr("cx", width / 2)
            .attr("cy", HEIGHT / 2)
            .attr("r", this.circle_radius)
            .style("fill", "#B8DEE6");
    }


    render() {
        return (
            <Container>
                <Row>
                    <Col xs={12}>
                        <div id={"chart"} className={"d-flex justify-content-center align-items-center"}
                             ref={divEl => this.chartContainer = divEl}>
                            <svg id={"svg-chart"} ref={svgEl => this.svgChartContainer = svgEl}></svg>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Chart;