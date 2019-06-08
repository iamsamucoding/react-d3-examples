import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import * as d3 from "d3";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import * as topojson from "topojson";

import "./index.css";


// Example based on: http://bl.ocks.org/jczaplew/4444770

const DEFAULT_WIDTH = 900;
const DEFAULT_MAP_SCALE = 1100;

class Chart extends React.Component {
    constructor(props) {
        super(props);

        this.initial_width = 0;
        this.initial_height = 0;

        this.updateSizes = this.updateSizes.bind(this);
    }


    componentDidMount() {
        this.initial_width = (this.chartContainer.clientWidth) ? this.chartContainer.clientWidth : DEFAULT_WIDTH;
        this.initial_height = this.initial_width * 0.618; // some logic propsed by the author which seems to be based on the size
                                                          // of this specific map

        // probably, this map scale was obtained after many trials
        console.log('this.initial_width: ', this.initial_width);
        let projection = d3.geoAlbersUsa().scale(this.initial_width);
        let path = d3.geoPath().projection(projection);

        let svg = d3.select(this.chartContainer)
            .append("svg")
            .attr("width", this.initial_width)
            .attr("height", this.initial_height)
            .append("g");

        let us = require("./us-states.json");
        svg.selectAll(".states")
            .data(topojson.feature(us, us.objects.states).features)
            .enter().append("path")
            .attr("class", "states")
            .attr("d", path);

        d3.select(window).on("resize", this.updateSizes.bind(this));
    }


    updateSizes() {
        // since the map is drawn by using fixed points associated with the initial svg viewport,
        // one option is simply to provide a `scale transform` in the canvas/component <g>
        // without changing its width and height
        let scale = this.chartContainer.clientWidth / this.initial_width;
        let svg = d3.select(this.chartContainer).select("svg");
        let g = svg.select("g");

        g.attr("transform",`scale(${scale})`);
    }


    render() {
        return (
            <Container>
                <Row>
                    <Col xs={12}>
                        <div id="my-container" ref={divEl => this.chartContainer = divEl}>
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
