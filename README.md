# Examples of React + D3.js

Examples of React applications that incorporates D3 charts. All examples are based on some posts and used here as reference for my react applications.

To run any application, just clone this repository and:
```
cd react_application_name
npm install
npm start
```

#### simple-zoom-d3-react-bootstrap
A simple react app that incorporates a zoomable D3 into a bootstrap container. This example was based on three posts: [first](https://coderwall.com/p/psogia/simplest-way-to-add-zoom-pan-on-d3-js), [second](https://www.d3-graph-gallery.com/graph/interactivity_zoom.html), and [third](http://bl.ocks.org/sgruhier/1d692762f8328a2c9957).

#### simple-responsive-zoom-d3-react-bootstrap-v1
The previous app with a first version of resizing. In this example, the `<svg>` has its surrounding container width and the `<circle>` has 20% of it.

When horizontally resizing the browser's window with a width less than the container's one, it takes a new width, as well as its `<svg>`, and the `<circle>` is redrawn with its new width in the center of `<svg>`. Any zoom and/or drag transforms are ignored.

This example was based on [this post.](https://bl.ocks.org/curran/3a68b0c81991e2e94b19)

