

## websites about d3


- learn d3 by Mike Bostock:
  - https://observablehq.com/collection/@d3/learn-d3
- another tutorial on d3 (Enrico Bertini's Visualization Lab):
  - https://observablehq.com/@nyuvis/d3-introduction
- svg version of the observablehq force graph:
  - https://observablehq.com/@d3/force-directed-graph-component
- example with bundling nodes:
  - https://observablehq.com/@rymarchikbot/d3-js-force-layout-click-to-group-bundle-nodes
- medium article 
  - https://medium.com/ninjaconcept/interactive-dynamic-force-directed-graphs-with-d3-da720c6d7811
  - also as pdf in folder media "Interactive & Dynamic Force-Directed Graphs with D3 | by Robin Weser | NinjaConcept | Medium.pdf"
  - related github:
    - https://github.com/ninjaconcept/d3-force-directed-graph/tree/master
- d3 zoom:
  - https://d3js.org/d3-zoom
  - https://www.d3indepth.com/zoom-and-pan/
  - https://tomroth.dev/fdg-zoom/


## websites about d3 and/in PBI
- https://community.fabric.microsoft.com/t5/Developer/Network-force-directed-visual-using-power-BI-d3-custom-visual/m-p/645814- 

## Public network data repos
- https://networkrepository.com
- https://snap.stanford.edu/data/


---
---


## features to add:
- make node size flexible?
  - can/should node sizes be specified in pixel size then?
  - requires label moving as well
- links:
  - link thickness as parameter?
  - curve them a bit?
- add a focusNodes function that works on clicking on a node
  - should also have a search for node(s) field
  - the graph should be panned (and zoomed) such that the nodes in focus are in the middle
- derive and set a link strength .strength(d => d.value) 
- refactor the code all in callback functions
- collect all relevant variables of the forcegraph function in one place
- adjust graph physics
- (longer labels with linebreaks - tooltip is the better option)
  - https://observablehq.com/@cesare/svg-text-and-tspan-word-wrapping
  - https://gist.github.com/mbostock/7555321
  - related but cooler:
    - https://observablehq.com/@mbostock/fit-text-to-circle

## ToDo:
- check/understand the chatGTP generated function LinkHighlighting

## Versions of applied D3 in this repo

### v7 = current
- features:
  - added an interactive and collabsible legend (new)
  - allows for node shape being either circle or rectangle, dependent on property "shape" in "nodegroups"
  - replaced colormap with attribute 'color' in the new property 'nodegroups'
  - improved linkhighlighting
    - only labels and nodes of linked nodes are shown, the rest of the graph is a light grey
    - linkhighlighting is a stand-alone local function instead of being attached "on the fly to the nodes object
  - add colorMap and function getNodeColor to color nodes based on group
  - node labes are only shown above a zoom level threshold
  - added tooltips on nodes
  - added link-highlighting on tooltip
    - used: https://observablehq.com/@john-guerra/force-directed-graph-with-link-highlighting
    - another version, which i didnt get to work (tried only for one miniute :D):
      - https://d3-graph-gallery.com/graph/arc_highlight.html
  - enable zooming and panning
  - added labels to nodes
  - reading miserables.json on server side
  - passing it via server route to index.html upon request
  - using the thus fetched data to call force graph function with


### v6
- features:
  - allows for node shape being either circle or rectangle, dependent on property "shape" in "nodegroups" (new)
  - replaced colormap with attribute 'color' in the new property 'nodegroups' (new)
  - improved linkhighlighting
    - only labels and nodes of linked nodes are shown, the rest of the graph is a light grey
    - linkhighlighting is a stand-alone local function instead of being attached "on the fly to the nodes object
  - add colorMap and function getNodeColor to color nodes based on group
  - node labes are only shown above a zoom level threshold
  - added tooltips on nodes
  - added link-highlighting on tooltip
    - used: https://observablehq.com/@john-guerra/force-directed-graph-with-link-highlighting
    - another version, which i didnt get to work (tried only for one miniute :D):
      - https://d3-graph-gallery.com/graph/arc_highlight.html
  - enable zooming and panning
  - added labels to nodes
  - reading miserables.json on server side
  - passing it via server route to index.html upon request
  - using the thus fetched data to call force graph function with

### v5
- features:
  - improved linkhighlighting (new)
    - only labels and nodes of linked nodes are shown, the rest of the graph is a light grey
    - linkhighlighting is a stand-alone local function instead of being attached "on the fly to the nodes object
  - add colorMap and function getNodeColor to color nodes based on group (new)
  - node labes are only shown above a zoom level threshold (new)
  - added tooltips on nodes
  - added link-highlighting on tooltip
    - used: https://observablehq.com/@john-guerra/force-directed-graph-with-link-highlighting
    - another version, which i didnt get to work (tried only for one miniute :D):
      - https://d3-graph-gallery.com/graph/arc_highlight.html
  - enable zooming and panning
  - added labels to nodes
  - reading miserables.json on server side
  - passing it via server route to index.html upon request
  - using the thus fetched data to call force graph function with

### v4
- features:
  - added tooltips on nodes (new)
  - added link-highlighting on tooltip (new)
    - used: https://observablehq.com/@john-guerra/force-directed-graph-with-link-highlighting
    - another version, which i didnt get to work (tried only for one miniute :D):
      - https://d3-graph-gallery.com/graph/arc_highlight.html
  - enable zooming and panning
  - added labels to nodes
  - reading miserables.json on server side
  - passing it via server route to index.html upon request
  - using the thus fetched data to call force graph function with

### v3
- features:
  - enable zooming and panning (new)
  - added labels to nodes (new)
  - reading miserables.json on server side
  - passing it via server route to index.html upon request
  - using the thus fetched data to call force graph function with

### v2
- features:
  - reading miserables.json on server side
  - passing it via server route to index.html upon request
  - using the thus fetched data to call force graph function with

### v1
- first working example :)
- hard-coded data in index.html, i.e. on client side

