import React from 'react';

import * as d3 from "d3";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


// Example based on:
// https://coderwall.com/p/psogia/simplest-way-to-add-zoom-pan-on-d3-js
// http://bl.ocks.org/sgruhier/1d692762f8328a2c9957
// https://bl.ocks.org/curran/3a68b0c81991e2e94b19




class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.chartContainer = null;

        this.drawChart = this.drawChart.bind(this);
    }


    componentDidMount() {
        this.drawChart();
        window.addEventListener('resize', this.drawChart);
    }


    drawChart() {
        // to avoid multiple appends of <svg> into the char container, we must remove it
        d3.select(this.chartContainer).selectAll("svg").remove();

        let height = 600;

        let width = this.chartContainer.clientWidth;
        let circleRadius = 0.15 * width;
        let rectSide = 0.15 * width;

        let svg = d3.select(this.chartContainer)
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        let container = svg.append("g");

        let circleContainer = container.append("g");
        let circle = circleContainer.append("circle")
            .attr("cx", width / 2)
            .attr("cy", height / 2)
            .attr("r", circleRadius)
            .style("fill", "#B8DEE6");

        circleContainer.call(d3.zoom().on("zoom", () => {
            circle.attr("transform", d3.event.transform);
        }));


        let rectContainer = container.append("g");
        let rect = rectContainer.append("rect")
            .attr("x", 10)
            .attr("y", 10)
            .attr("width", rectSide)
            .attr("height", rectSide)
            .attr("fill", "black");

        rectContainer.call(d3.zoom().on("zoom", () => {
            rect.attr("transform", d3.event.transform);
        }));


        svg.call(d3.zoom().on("zoom", () => {
            container.attr("transform", d3.event.transform);
        }));
    }


    render() {
        return (
            <Container>
                <Row>
                    <Col xs={12}>
                        <div className={"d-flex justify-content-center align-items-center"}
                             ref={divEl => this.chartContainer = divEl}>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Chart;