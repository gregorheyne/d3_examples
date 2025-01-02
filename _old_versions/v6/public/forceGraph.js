export function ForceGraph({ nodes, links, nodegroups }) {
  console.log("Rendering ForceGraph...");

  const width = 1400, height = 800;

  // Map node group properties for quick lookup
  const groupPropertiesMap = new Map(nodegroups.map(group => [group.id, { color: group.color, shape: group.shape }]));

  // Default variables
  const defaultColor = "blue";
  const labelZoomThreshold = 1;
  const nonLinkedColor = "lightgrey";

  // Create the SVG element
  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .call(d3.zoom() // Add zoom behavior
      .scaleExtent([0.1, 10]) // Set zoom scale limits
      .on("zoom", (event) => {
        g.attr("transform", event.transform); // Apply zoom and pan
        toggleLabelsVisibility(event.transform.k); // Update label visibility based on zoom level
      }));

  // Add a group element to hold the graph elements (nodes and links)
  const g = svg.append("g");

  // Create the simulation
  const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id))
    .force("charge", d3.forceManyBody().strength(-75)) // -30 is default strength
    .force("center", d3.forceCenter(width / 2, height / 2));

  const link = g.append("g")
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("stroke", "#999")
    .attr("stroke-opacity", 0.5)
    .attr("stroke-width", 0.25);

  const node = g.append("g")
    .selectAll(".node")
    .data(nodes)
    .join("g")
    .attr("class", "node")
    .call(drag(simulation)) // Correctly added drag behavior
    .on("mouseenter", (evt, d) => LinkHighlighting(d, true))
    .on("mouseleave", () => LinkHighlighting(null, false));

  // Append shape based on group shape property
  node.each(function(d) {
    const group = groupPropertiesMap.get(d.group) || {};
    const shape = group.shape || "circle";
    const color = group.color || defaultColor;

    if (shape === "circle") {
      d3.select(this)
        .append("circle")
        .attr("r", 5)
        .attr("fill", color);
    } else if (shape === "rectangle") {
      d3.select(this)
        .append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .attr("x", -5) // Center the rectangle
        .attr("y", -5) // Center the rectangle
        .attr("fill", color);
    }
  });

  const label = g.append("g")
    .selectAll("text")
    .data(nodes)
    .join("text")
    .attr("text-anchor", "middle")
    .attr("dy", 10) // Position the label below the node
    .text(d => d.label) // Use the `label` property as the label
    .attr("font-size", "6px") // Set font size
    .attr("fill", "black") // Set text color
    .attr("display", "none"); // Hide labels by default

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

    node.attr("transform", d => `translate(${d.x},${d.y})`);

    label
      .attr("x", d => d.x)
      .attr("y", d => d.y);
  });

  // Function to toggle label visibility based on zoom level 
  function toggleLabelsVisibility(zoomLevel) {
    if (zoomLevel > labelZoomThreshold) {
      label.attr("display", "block"); // Show labels
    } else {
      label.attr("display", "none"); // Hide labels
    }
  }

  // Function to apply color mapping
  function getNodeColor(node) {
    const group = groupPropertiesMap.get(node.group) || {};
    return group.color || defaultColor;
  }

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

  // Function for link highlighting
  function LinkHighlighting(targetNode, highlight) {
    if (highlight) {
      const linkedNodes = new Set();
      link
        .attr("stroke-opacity", l => {
          if (l.source.id === targetNode.id || l.target.id === targetNode.id) {
            linkedNodes.add(l.source.id);
            linkedNodes.add(l.target.id);
            return 1;
          }
          return 0.1;
        });

      node
        .selectAll("circle, rect")
        .attr("fill", n => (linkedNodes.has(n.id) ? getNodeColor(n) : nonLinkedColor));

      label
        .attr("display", n => (linkedNodes.has(n.id) ? "block" : "none"));
    } else {
      link.attr("stroke-opacity", 0.5);
      node
        .selectAll("circle, rect")
        .attr("fill", d => getNodeColor(d));
      label.attr("display", "none");
    }
  }

  // Append the graph to the DOM
  return svg.node();
}
