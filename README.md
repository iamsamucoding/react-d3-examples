# Examples of React + D3.js

Examples of React applications that incorporate D3 charts. All examples are based on some posts and used here as reference for my react applications. Thus, the codes are purposely over-commented in most cases.

To run any application, just clone this repository and:
```
cd react_application_name
npm install
npm start
```

### 1. d3-oriented-approach
A D3-oriented approach for integrating React and D3 in which D3 manages the chart. It basically consists of:

1. create a container element in React for the bubble chart
2. add D3 code for creating and updating the bubble chart
3. call our D3 code on initial load (`componentDidMount`) and updates (`componentDidUpdate`)

This example was extracted from this [excellent post](https://frontendcharts.com/react-d3-integrate/).


### 2. react-oriented-approach:
A React-oriented approach for integrating React and D3 in which React manages the chart. React is responsible for creating and updating the chart, using D3 for ancillary functions such as `scaleLinear`.

This is the most straightforward way for this integration but React doesn’t have transitions built-in, so a transition plug-in should be install instead.

This example was also extracted from this [excellent post](https://frontendcharts.com/react-d3-integrate/).


### 3. hybrid-approach:
A hybrid approach for integrating React and D3 in which React creates elements and D3 updates them. Now we have D3’s transitions again.

This example was also extracted from this [excellent post](https://frontendcharts.com/react-d3-integrate/).


### 4. simple-zoom-d3-react-bootstrap
A simple react app that incorporates draggable and zoomable svg elements (a circle and a rectangle) into a bootstrap container by D3. This example was based on three posts: [first](https://coderwall.com/p/psogia/simplest-way-to-add-zoom-pan-on-d3-js), [second](https://www.d3-graph-gallery.com/graph/interactivity_zoom.html), and [third](http://bl.ocks.org/sgruhier/1d692762f8328a2c9957).


### 5. simple-responsive-zoom-d3-react-bootstrap
The previous app with responsive charts. In this example, the `<circle>` radius and the `<rect>` side are automatically set up according to the width of the parent `<div>` (surrounding container) of `<svg>`. They correspond to 15% of this value.

When horizontally resizing the browser's window with a width less than the container's one, it takes a new width.
Consequently, the `<circle>` and `<rect>` are redrawn according to this new width in their resized initial position. Any previous zoom and/or drag transforms are kept in the new SVG view box/port.

This example was based on [this post](https://chartio.com/resources/tutorials/how-to-resize-an-svg-when-the-window-is-resized-in-d3-js/) and [this another one](https://codepen.io/tigt/post/why-and-how-preserveaspectratio).


### 6. responsive-map
Example of a responsive map by using D3. When resizing the window horizontally, the map is scaled accordingly. This example was based on [this post](http://bl.ocks.org/jczaplew/4444770).

