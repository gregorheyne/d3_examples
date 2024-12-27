// Import D3 from the served /d3 route
// according to ChatGTP this should work, but it doesnt.
// since it works bzy serving it to index.html i dont care to investigate now
// import * as d3 from '/d3/dist/d3.min.js';

console.log("ForceGraph module loaded.");
// console.log(d3);

export function ForceGraph({ nodes, links }) {
  console.log("Rendering ForceGraph...");

  const width = 800, height = 600;

  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height);

  // ChatGTP explanation:
  // Creates a force simulation (d3.forceSimulation) using the provided nodes array.
  // Forces:
  // "link": Ensures links between nodes are properly simulated using d3.forceLink.
  // .id(d => d.id): Maps links to nodes by their unique id property.
  // "charge": Adds a repulsive force to prevent nodes from collapsing into one another (d3.forceManyBody).
  // "center": Pulls nodes towards the center of the canvas (width / 2, height / 2).
  const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));

  // ChatGTP explanation:
  // Appends a <g> (group) element to the SVG to hold all the links.
  // Binds the links data to SVG line elements (.data(links)).
  // Uses .join("line") to create one line element for each link.
  // Sets the stroke color of each line to #999.
  const link = svg.append("g")
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("stroke", "#999");

  // ChatGTP explanation:
  // Appends another <g> (group) element to hold all the nodes.
  // Binds the nodes data to SVG circle elements (.data(nodes)).
  // Uses .join("circle") to create one circle for each node.
  // Sets:
  // r: Radius of each circle (5 pixels).
  // fill: Fill color of each circle (blue).
  const node = svg.append("g")
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("r", 5)
    .attr("fill", "blue");


  // ChatGTP explanation:
  // Adds a listener ("tick") to the force simulation. This runs on each iteration of the simulation.
  // Links:
  // Updates the position (x1, y1, x2, y2) of each line based on the current positions of its source and target nodes.
  // Nodes:
  // Updates the position (cx, cy) of each circle based on its current x and y coordinates.
  // This ensures the graph visually updates as the simulation calculates new positions for the nodes and links.  
  simulation.on("tick", () => {
    link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);

    node
      .attr("cx", d => d.x)
      .attr("cy", d => d.y);
  });

  return svg.node();
}
