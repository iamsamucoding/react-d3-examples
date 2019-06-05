import React from 'react';

import * as d3 from "d3";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


// Example based on:
// https://coderwall.com/p/psogia/simplest-way-to-add-zoom-pan-on-d3-js
// http://bl.ocks.org/sgruhier/1d692762f8328a2c9957
// https://bl.ocks.org/curran/3a68b0c81991e2e94b19
//
// Responsive Charts
// https://chartio.com/resources/tutorials/how-to-resize-an-svg-when-the-window-is-resized-in-d3-js/
//
// Information about preserveAspectRatio option
// https://codepen.io/tigt/post/why-and-how-preserveaspectratio




class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.chartContainer = null;
    }


    componentDidMount() {
        this.drawChart();
    }


    drawChart() {
        // to avoid multiple appends of <svg> into the char container, we must remove it
        d3.select(this.chartContainer).selectAll("svg").remove();

        let height = 600;

        let width = this.chartContainer.clientWidth;
        let circleRadius = 0.15 * width;
        let rectSide = 0.15 * width;

        // We are defining a width and height of the chart and copying those values as the third and forth arguments
        // of the viewBox SVG attribute.
        //
        // The All SVG content is drawn inside SVG viewports. Every SVG viewport defines a drawing region characterized
        // by a size (width, height), and an origin, measured in abstract user units.
        // Each SVG viewport generates a viewport coordinate system and a user coordinate system, initially identical.
        // Providing a ‘viewBox’ on a viewport's element transforms the user coordinate system relative to the
        // viewport coordinate system as described in The ‘viewBox’ attribute.
        //
        // The ‘viewBox’ attribute, in conjunction with the ‘preserveAspectRatio’ attribute, provides the capability
        // to stretch an SVG viewport to fit a particular container element.
        //
        // The attribute `preserveAspectRatio` tells how the content of the viewBox will behavior after svg resizing.
        // It can accepts: preserveAspectRatio="{alignment keyword} {scaling keyword}"`
        //
        // The alignment keyword tells how is the base point to stretch/scale the svg viewBox:
        // 	           Left	      Center	Right
        // Top	    xMinYMin	xMidYMin	xMaxYMin
        // Center	xMinYMid	xMidYMid	xMaxYMid
        // Bottom	xMinYMax	xMidYMax	xMaxYMax
        //
        // The scaling keyword defines the behavior of the viewBox after streching/scaling
        // meet = scale the SVG down until it fits
        // slice = scale the SVG up until no empty space remains.
        //
        // We decided here to use the leftmost point of the svg to scale them.
        let svg = d3.select(this.chartContainer)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", `0 0 ${width} ${height}`);

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