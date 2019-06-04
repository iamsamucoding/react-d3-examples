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
// http://bl.ocks.org/sgruhier/1d692762f8328a2c9957


const WIDTH = 400;
const HEIGHT = 400;


class Chart extends React.Component {
    componentDidMount() {
        var svg = d3.select("#chart")
                    .append("svg")
                    .attr("width", WIDTH)
                    .attr("height", HEIGHT)
                    .call(d3.zoom().on("zoom", function () {
                        svg.attr("transform", d3.event.transform)
                    }))
                    .append("g");

        svg.append("circle")
           .attr("cx", WIDTH / 2)
           .attr("cy", HEIGHT / 2)
           .attr("r", 50)
           .style("fill", "#B8DEE6");
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

        // return (
        //     <div id={"chart"}></div>
        // );
    }
}

ReactDOM.render(<Chart />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
