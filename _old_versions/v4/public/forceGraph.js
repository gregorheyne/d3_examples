export function ForceGraph({ nodes, links }) {
  console.log("Rendering ForceGraph...");

  const width = 1400, height = 800;

  // Create the SVG element
  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .call(d3.zoom() // Add zoom behavior
      .scaleExtent([0.1, 10]) // Set zoom scale limits
      .on("zoom", (event) => {
        g.attr("transform", event.transform); // Apply zoom and pan
      }));

  // Add a group element to hold the graph elements (nodes and links)
  const g = svg.append("g");

  // Create the simulation
  const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id))
    .force("charge", d3.forceManyBody().strength(-75)) // -30 is default strength
    .force("center", d3.forceCenter(width / 2, height / 2));

  // Add link elements
  const link = g.append("g")
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("stroke", "#999")
    .attr("stroke-opacity", 0.5) // Reduce the opacity for more transparency
    .attr("stroke-width", 0.25); // Reduce the line thickness;

  // Add node elements
  const node = g.append("g")
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("r", 5)
    .attr("fill", "blue")
    .call(drag(simulation)) // Add drag behavior to nodes
    // https://observablehq.com/@john-guerra/force-directed-graph-with-link-highlighting
    .on("mouseenter", (evt, d) => {
      link
        .attr("display", "none")
        .filter(l => l.source.id === d.id || l.target.id === d.id)
        .attr("display", "block");
    })
    .on("mouseleave", evt => {
      link.attr("display", "block");
    });

  // Add labels to nodes
  const label = g.append("g")
    .selectAll("text")
    .data(nodes)
    .join("text")
    .attr("text-anchor", "middle")
    .attr("dy", 10) // Position the label below the node
    .text(d => d.label) // Use the `label` property as the label
    .attr("font-size", "6px") // Set font size
    .attr("fill", "black"); // Set text color

  // Add a div element for the tooltip
  const tooltip = d3.select("body").append("div")
    .style("position", "absolute")
    .style("visibility", "hidden")
    .style("background", "white")
    .style("border", "1px solid black")
    .style("border-radius", "4px")
    .style("padding", "5px")
    .style("font-size", "12px");

  // Add mouse event handlers for tooltips
  node.on("mouseover", (event, d) => {
      tooltip.style("visibility", "visible").html(d.tooltip.replace(/\n/g, "<br>"));
    })
    .on("mousemove", (event) => {
      tooltip.style("top", `${event.pageY + 10}px`).style("left", `${event.pageX + 10}px`);
    })
    .on("mouseout", () => {
      tooltip.style("visibility", "hidden");
    });

  // Update positions on each tick of the simulation
  simulation.on("tick", () => {
    link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);

    node
      .attr("cx", d => d.x)
      .attr("cy", d => d.y);

    label
      .attr("x", d => d.x)
      .attr("y", d => d.y);
  });

  // Drag behavior for nodes
  function drag(simulation) {
    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
  }

  return svg.node();
}
