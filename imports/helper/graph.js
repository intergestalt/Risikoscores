import { setRealGraph, getRealGraph } from './actions';
import { exists, existsString } from './global';

const defaultColor = '#ee0000';
const selectedColor = '#00ee00';
const neighbourColor = '#eeee00';
const defaultEdgeColor = '#eeeeee';
const selectedEdgeColor = '#ee00ee';
const defaultLinkColor = '#0000ff';

export function cleanForSave(entry) {
  const result = entry;
  return result;
}

export function getColor(id) {
  if (id === 'defaultColor') {
    return defaultColor;
  } else if (id === 'selectedColor') {
    return selectedColor;
  } else if (id === 'neighbourColor') {
    return neighbourColor;
  } else if (id === 'defaultEdgeColor') {
    return defaultEdgeColor;
  } else if (id === 'selectedEdgeColor') {
    return selectedEdgeColor;
  } else if (id === 'defaultLinkColor') {
    return defaultLinkColor;
  }
}

export function getEdgeId(nodeId1, nodeId2) {
  if (nodeId1 > nodeId2) {
    return nodeId1 + '_' + nodeId2;
  }
  return nodeId2 + '_' + nodeId1;
}

export function getIsEdge(nodeId1, nodeId2, realGraph) {
  const edgeHash = realGraph.edgeHash;
  const edgeId = getEdgeId(nodeId1, nodeId2);
  return exists(edgeHash[edgeId]);
}

function getNextRealNode(pseudo, origin, realGraph) {
  var stack = [pseudo];

  visited = {};
  visited[origin] = true;
  visited[pseudo.id] = true;
  while (stack.length > 0) {
    const pop = stack[0];
    stack = stack.slice(1);
    const nodesHash = realGraph.nodesHash;
    const node = nodesHash[pop.id];

    const result = [];
    for (var i = 0; i < node.neighbours.length; i++) {
      const neighbourId = node.neighbours[i];
      const neighbour = realGraph.nodesHash[neighbourId];
      if (visited[neighbourId]) {
        continue;
      }
      visited[neighbourId] = true;
      if (!neighbour.pseudo) {
        return neighbour;
      } else {
        stack.push(neighbour);
      }
    }
  }
  return null;
}
function getEdgesToNextRealNode(neighbour, nodeId, realGraph) {
  var result = [];
  var stack = [neighbour];
  visited = {};
  visited[nodeId] = true;
  visited[neighbour.id] = true;
  var result = [];
  while (stack.length > 0) {
    const pop = stack[0];
    stack = stack.slice(1);
    const nodesHash = realGraph.nodesHash;
    const node = nodesHash[pop.id];
    for (var i = 0; i < node.neighbours.length; i++) {
      const neighbourId = node.neighbours[i];
      const neighbour = realGraph.nodesHash[neighbourId];

      if (visited[neighbourId]) {
        continue;
      }
      visited[neighbourId] = true;
      if (!neighbour.pseudo) {
        edgeId = getEdgeId(neighbourId, pop.id);
        result.push(edgeId);
        return result;
      } else {
        edgeId = getEdgeId(neighbourId, pop.id);
        result.push(edgeId);
        stack.push(neighbour);
      }
    }
  }
  return result;
}

export function getNeighbours(nodeId, realGraph) {
  const nodesHash = realGraph.nodesHash;
  const node = nodesHash[nodeId];
  const result = [];
  if (!exists(node)) {
    return result;
  }
  for (var i = 0; i < node.neighbours.length; i++) {
    const neighbourId = node.neighbours[i];
    const neighbour = nodesHash[neighbourId];
    if (neighbour.pseudo) {
      const nextNode = getNextRealNode(neighbour, nodeId, realGraph);
      if (exists(nextNode)) {
        result.push(nextNode.id);
      }
    } else {
      result.push(neighbour.id);
    }
  }
  return result;
}

export function getOutgoingEdges(nodeId, realGraph) {
  const nodesHash = realGraph.nodesHash;
  const node = nodesHash[nodeId];
  const result = [];
  for (var i = 0; i < node.neighbours.length; i++) {
    const neighbourId = node.neighbours[i];
    const neighbour = nodesHash[neighbourId];
    const edgeId = getEdgeId(nodeId, neighbourId);
    result.push(edgeId);

    if (neighbour.pseudo) {
      const nextEdges = getEdgesToNextRealNode(neighbour, nodeId, realGraph);
      for (var j = 0; j < nextEdges.length; j++) {
        const nextEdgeId = nextEdges[j];
        if (exists(nextEdgeId)) {
          result.push(nextEdgeId);
        }
      }
    }
  }
  return result;
}

export function getTheRealGraph(graph) {
  var realGraph = getRealGraph();
  if (exists(realGraph)) {
    return realGraph;
  }
  realGraph = {};
  //Nodes
  const nodes = [];
  const nodesHash = {};
  for (var i = 0; i < graph.length; i++) {
    const oldNode = graph[i];
    const neighbours = oldNode.neighbours;
    const neighbourArray = neighbours.split(';');
    const newNeighbours = [];
    for (var j = 0; j < neighbourArray.length; j++) {
      const neighbourId = neighbourArray[j];
      if (existsString(neighbourId)) {
        newNeighbours.push(neighbourId);
      }
    }

    const newNode = {
      id: oldNode._id,
      pseudo: oldNode.pseudo,
      x: oldNode.x,
      y: oldNode.y,
      neighbours: newNeighbours
    };
    nodes.push(newNode);
    nodesHash[newNode.id] = newNode;
  }
  realGraph.nodes = nodes;
  realGraph.nodesHash = nodesHash;
  //Edges
  const edges = [];
  const edgesHash = {};
  for (var i = 0; i < graph.length; i++) {
    const oldNode = graph[i];
    const nodeId1 = oldNode._id;
    const neighbours = oldNode.neighbours;
    const neighbourArray = neighbours.split(';');
    for (var j = 0; j < neighbourArray.length; j++) {
      const nodeId2 = neighbourArray[j];
      if (existsString(nodeId2)) {
        const edgeId = getEdgeId(nodeId1, nodeId2);
        const newEdge = {
          id: edgeId,
          node1: nodeId1,
          node2: nodeId2
        };
        if (!exists(edgesHash[newEdge.id])) {
          edges.push(newEdge);
          edgesHash[newEdge.id] = newEdge;
        }
      }
    }
  }
  realGraph.edges = edges;
  realGraph.edgesHash = edgesHash;
  setRealGraph(realGraph);
  return realGraph;
}

function getDefaultNodeModes(realGraph) {
  nodeModes = {};
  for (var i = 0; i < realGraph.nodes.length; i++) {
    const node = realGraph.nodes[i];
    const nodeId = node.id;
    nodeModes[nodeId] = { selected: false, neighbour: false };
  }
  return nodeModes;
}
function getDefaultEdgeModes(nodeId, realGraph) {
  edgeModes = {};
  for (var i = 0; i < realGraph.edges.length; i++) {
    const edge = realGraph.edges[i];
    const edgesId = edge.id;
    edgeModes[edgesId] = { selected: false };
  }
  return edgeModes;
}

export function getGraphModes(
  realGraph,
  nodeId = null,
  neighbours = null,
  outgoingEdges = null
) {
  nodeModes = getDefaultNodeModes(realGraph);
  if (nodeId !== null) {
    nodeModes[nodeId].selected = true;
    for (var i = 0; i < neighbours.length; i++) {
      const nodeId = neighbours[i];
      nodeModes[nodeId].neighbour = true;
    }
  }

  edgeModes = getDefaultEdgeModes(nodeId, realGraph);

  if (nodeId !== null) {
    for (var i = 0; i < outgoingEdges.length; i++) {
      const edgeId = outgoingEdges[i];
      edgeModes[edgeId].selected = true;
    }
  }

  return { nodeModes: nodeModes, edgeModes: edgeModes };
}
