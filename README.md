# Examples of React + D3.js

Examples of React applications that incorporates D3 charts. All examples are based on some posts and used here as reference for my react applications. Thus, the codes are purposely over-commented in most cases.

To run any application, just clone this repository and:
```
cd react_application_name
npm install
npm start
```

#### simple-zoom-d3-react-bootstrap
A simple react app that incorporates draggable and zoomable svg elements (a circle and a rectangle) into a bootstrap container by D3. This example was based on three posts: [first](https://coderwall.com/p/psogia/simplest-way-to-add-zoom-pan-on-d3-js), [second](https://www.d3-graph-gallery.com/graph/interactivity_zoom.html), and [third](http://bl.ocks.org/sgruhier/1d692762f8328a2c9957).

#### simple-responsive-zoom-d3-react-bootstrap-v1
It is the previous app with a first version of resizing. In this example, the `<circle>` radius and the `<rect>` side are automatically set up according to the width of the parent `<div>` (surrounding container) of `<svg>`. They correspond to 15% of this value.

When horizontally resizing the browser's window with a width less than the container's one, it takes a new width.
Consequently, the `<circle>` and `<rect>` are redrawn according to this new width in their resized initial position. Any previous zoom and/or drag transforms are ignored.

This example was based on [this post.](https://bl.ocks.org/curran/3a68b0c81991e2e94b19)

