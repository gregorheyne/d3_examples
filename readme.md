

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
- adjust graph physics
- display labels only when sufficiently zoomed or rather when node distance is big enough
- (longer labels with linebreaks - tooltip is the better option)
  - https://observablehq.com/@cesare/svg-text-and-tspan-word-wrapping
  - https://gist.github.com/mbostock/7555321
  - related but cooler:
    - https://observablehq.com/@mbostock/fit-text-to-circle

## Versions of applied D3 in this repo

### v4 = current
- same as v3, except for the following changes in the forceGraph function:
  - added tooltips on nodes
  - added link-highlighting on tooltip
    - used: https://observablehq.com/@john-guerra/force-directed-graph-with-link-highlighting
    - another version, which i didnt get to work (tried only for one miniute :D):
      - https://d3-graph-gallery.com/graph/arc_highlight.html

### v3
- same as v2, except for the following changes in the forceGraph function:
  - enable zooming and panning
  - added labels to nodes

### v2
- same as v1, except for 
  - reading miserables.json on server side
  - passing it via server route to index.html upon request
  - using the thus fetched data to call force graph function with

### v1
- first working example :)
- hard-coded data in index.html, i.e. on client side

