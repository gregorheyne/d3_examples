

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

# Versions of applied D3 in this repo

## features to add:
- adjust graph physics
- display labels only when sufficiently zoomed or rather when node distance is big enough
- create / source an additional interesting data set for development
- longer labels with linebreaks
- hover on nodes:
  - highlight directly connected nodes
  - display additional informaton


### current
- same as v2, except for the following changes in the forceGraph function:
  - enable zooming and panning
  - added labels to nodes (just using the node id as label)

### v2
- same as v1, except for 
  - reading miserables.json on server side
  - passing it via server route to index.html upon request
  - using the thus fetched data to call force graph function with

### v1
- first working example :)
- hard-coded data in index.html, i.e. on client side

