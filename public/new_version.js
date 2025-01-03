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
  