export function ForceGraph({ nodes, links, nodegroups }) {
  console.log("Rendering ForceGraph...");

  const width = 1400, height = 800;

  // Map node group properties for quick lookup
  const groupPropertiesMap = new Map(
    nodegroups.map(group => [group.id, { color: group.color, shape: group.shape, name: group.name }])
  );

  // Default variables
  const labelZoomThreshold = 1;
  const defaultNodeColor = "blue";
  const NodeVerticalHeight = 10;
  const NodeCircleRadius = NodeVerticalHeight / 2;
  const NodeRectWidth = NodeVerticalHeight;
  const NodeRectHeight = NodeVerticalHeight;
  const LinkStrokeOppacity = 0.5;
  const LinkStrokeWidth = 0.25;
  const LabelFontSize = '6px';
  const ToolTipFontSize = '14px';
  const greyedOutColor = "lightgrey";
  const greyedOutOppacity = 0.1;

  // Create the SVG element
  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height);

  const fgraph = svg.append("g").attr("class", "graph");

  svg.call(d3.zoom()
    .scaleExtent([0.1, 10])
    .on("zoom", (event) => {
      fgraph.attr("transform", event.transform); // Apply zoom and pan
      toggleLabelsVisibility(event.transform.k); // Update label visibility based on zoom level
    }));

  // Create the simulation
  const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id))
    .force("charge", d3.forceManyBody().strength(-75)) // -30 is default strength
    .force("center", d3.forceCenter(width / 2, height / 2));

  const link = fgraph.append("g")
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("stroke", "#999")
    .attr("stroke-opacity", LinkStrokeOppacity)
    .attr("stroke-width", LinkStrokeWidth);

  const node = fgraph.append("g")
    .selectAll(".node")
    .data(nodes)
    .join("g")
    .attr("class", "node")
    .call(drag(simulation)) // Correctly added drag behavior
    .on("mouseenter", (evt, d) => LinkHighlighting(d, true))
    .on("mouseleave", () => LinkHighlighting(null, false));

  // Append shape based on group shape property
  node.each(function (d) {
    const group = groupPropertiesMap.get(d.group) || {};
    const shape = group.shape || "circle";
    const color = group.color || defaultNodeColor;

    if (shape === "circle") {
      d3.select(this)
        .append("circle")
        .attr("r", NodeCircleRadius)
        .attr("fill", color);
    } else if (shape === "rectangle") {
      d3.select(this)
        .append("rect")
        .attr("width", NodeRectWidth)
        .attr("height", NodeRectHeight)
        .attr("x", -NodeRectWidth / 2) // Center the rectangle
        .attr("y", -NodeRectHeight / 2) // Center the rectangle
        .attr("fill", color);
    }
  });

  const label = fgraph.append("g")
    .selectAll("text")
    .data(nodes)
    .join("text")
    .attr("text-anchor", "middle")
    .attr("dy", NodeVerticalHeight) // Position the label below the node
    .text(d => d.label) // Use the `label` property as the label
    .attr("font-size", LabelFontSize)
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
    .style("font-size", ToolTipFontSize);

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
    return group.color || defaultNodeColor;
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
          return greyedOutOppacity;
        });

      node
        .selectAll("circle, rect")
        .attr("fill", n => (linkedNodes.has(n.id) ? getNodeColor(n) : greyedOutColor));

      label
        .attr("display", n => (linkedNodes.has(n.id) ? "block" : "none"));
    } else {
      link.attr("stroke-opacity", LinkStrokeOppacity);
      node
        .selectAll("circle, rect")
        .attr("fill", d => getNodeColor(d));
      label.attr("display", "none");
    }
  }

  // Encapsulated Legend Creation Function
  function createLegend() {
    let legendVisible = true; // Track legend visibility

    // Legend container group
    const legendContainer = svg.append("g")
      .attr("class", "legend-container")
      .attr("transform", "translate(20, 20)");

    // Header and toggle button
    const headerGroup = legendContainer.append("g")
      .attr("class", "legend-header");

    headerGroup.append("text")
      .attr("x", 0)
      .attr("y", 0)
      .attr("font-size", "22px")
      .attr("font-weight", "bold")
      .text("Legend");

    const toggleButton = headerGroup.append("text")
      .attr("x", 80) // Position toggle button next to the header
      .attr("y", 0)
      .attr("font-size", "22px")
      .attr("font-weight", "bold")
      .attr("cursor", "pointer")
      .text("-") // Initially, the legend is visible
      .on("click", () => {
        legendVisible = !legendVisible; // Toggle visibility state
        toggleButton.text(legendVisible ? "-" : "+"); // Update button text
        legendGroup.attr("display", legendVisible ? "block" : "none"); // Show/hide legend
      });

    // Legend group (actual content)
    const legendGroup = legendContainer.append("g")
      .attr("class", "legend")
      .attr("transform", "translate(0, 30)"); // Offset below the header

    // Create legend entries
    nodegroups.forEach((group, index) => {
      const entry = legendGroup.append("g")
        .attr("transform", `translate(0, ${index * 40})`)
        .on("mouseover", () => highlightGroup(group.id))
        .on("mouseout", () => resetGraph());

      if (group.shape === "circle") {
        entry.append("circle")
          .attr("r", 10)
          .attr("fill", group.color)
          .attr("cx", 15)
          .attr("cy", 15);
      } else if (group.shape === "rectangle") {
        entry.append("rect")
          .attr("width", 20)
          .attr("height", 20)
          .attr("x", 5)
          .attr("y", 5)
          .attr("fill", group.color);
      }

      entry.append("text")
        .attr("x", 40)
        .attr("y", 20)
        .attr("font-size", "20px")
        .text(group.name);
    });
  }

  // Highlight a group in the graph
  function highlightGroup(groupId) {
    node.selectAll("circle, rect")
      .attr("fill", d => (d.group === groupId ? getNodeColor(d) : greyedOutColor));

    link
      .attr("stroke-opacity", l => (l.source.group === groupId || l.target.group === groupId ? 1 : greyedOutOppacity));
  }

  // Reset graph highlighting
  function resetGraph() {
    node.selectAll("circle, rect").attr("fill", d => getNodeColor(d));
    link.attr("stroke-opacity", LinkStrokeOppacity);
  }

  createLegend();

  // Append the graph to the DOM
  return svg.node();
}
