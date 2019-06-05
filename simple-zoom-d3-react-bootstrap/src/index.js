import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import * as d3 from "d3";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


// Example based on:
// https://coderwall.com/p/psogia/simplest-way-to-add-zoom-pan-on-d3-js
// https://www.d3-graph-gallery.com/graph/interactivity_zoom.html
// http://bl.ocks.org/sgruhier/1d692762f8328a2c9957


class Chart extends React.Component {
    componentDidMount() {
        let width = 600;
        let height = 400;

        // creates a <svg> element for drawing
        let svg = d3.select("#chart")
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height);

        // Our "main container" is a group element <g> used to group our SVG shapes together.
        // Note it is inside the <svg>
        let container = svg.append("g");

        // To transform SVG shapes, we can wrapped each one into an own group element <g> ("container").
        // Thus, we create a container for the circle inside the main container, and then created a circle inside it.
        // Since we only have a single SVG element (circle, in the case) inside the container, it has the same
        // shape of its SVG element.
        let circleContainer = container.append("g");
        let circle = circleContainer.append("circle")
           .attr("cx", width / 2)
           .attr("cy", height / 2)
           .attr("r", 50)
           .style("fill", "#B8DEE6");

        // selector.call() executes a given callback function for the `selector`.
        // Here, we are associating a function to the circle container that deals with transformations.
        //
        // When dragging and/or zooming (by scrolling the mouse wheel) over the circle (more precisely,
        // the circle container, but it has the same shape of the circle in the case), the attribute `transform`
        // is set up to the circle SVG element with the corresponding transformation.
        //
        // IMPORTANT: we cannot associate this zoom/drawing function to a given selector and change its attributes
        // inside the function. D3 will have an unpredictable behavior.
        // Therefore, we wrapped the circle with a "container".
        circleContainer.call(d3.zoom().on("zoom", () => {
            circle.attr("transform", d3.event.transform); // it contains the translate and scale values
        }));


        // add a second "container", now with a rectangle, to the main container
        let rectContainer = container.append("g");
        let rect = rectContainer.append("rect")
                                .attr("x", 10)
                                .attr("y", 10)
                                .attr("width", 50)
                                .attr("height", 50)
                                .attr("fill", "black");

        // the same rules for it
        rectContainer.call(d3.zoom().on("zoom", () => {
            rect.attr("transform", d3.event.transform);
        }));


        // Since the <svg> element has a single element (our main container), both has the same shape.
        // We can then associate the transform event to it.
        // Thus, when dragging/zooming the svg (any region inside the svg/main container but out of the circle and rect),
        // the main container will be transformed.
        // Consequently, both inner containers will be also transformed.
        svg.call(d3.zoom().on("zoom", () => {
            container.attr("transform", d3.event.transform);
        }));
    }


    render() {
        return (
            <Container>
                <Row>
                    <Col xs={12}>
                        <div id={"chart"} className={"d-flex justify-content-center align-items-center"}>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

ReactDOM.render(<Chart />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
