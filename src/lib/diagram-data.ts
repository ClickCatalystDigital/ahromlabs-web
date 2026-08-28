export type DiagramNode = {
  id: string;
  label: string;
  x: number;
  y: number;
  layer: "input" | "structure" | "reasoning" | "output";
};

export type EdgeKind =
  | "flow" // crosses layers, directional, gets an arrowhead
  | "relation"; // stays within a layer, undirected, plain hairline

export type DiagramEdge = {
  from: string;
  to: string;
  kind: EdgeKind;
};

// Coordinate space is 0-100 on both axes, laid out for a wide (desktop) viewBox.
export const diagramNodes: DiagramNode[] = [
  { id: "business", label: "BUSINESS", x: 50, y: 8, layer: "input" },

  { id: "entities", label: "ENTITIES", x: 20, y: 32, layer: "structure" },
  { id: "relationships", label: "RELATIONSHIPS", x: 50, y: 32, layer: "structure" },
  { id: "workflows", label: "WORKFLOWS", x: 80, y: 32, layer: "structure" },

  { id: "data", label: "DATA", x: 20, y: 58, layer: "reasoning" },
  { id: "decisions", label: "DECISIONS", x: 50, y: 58, layer: "reasoning" },
  { id: "evidence", label: "EVIDENCE", x: 80, y: 58, layer: "reasoning" },

  { id: "intelligence", label: "OPERATIONAL INTELLIGENCE", x: 50, y: 80, layer: "output" },
  { id: "execution", label: "BUSINESS EXECUTION", x: 50, y: 96, layer: "output" },
];

export const diagramEdges: DiagramEdge[] = [
  { from: "business", to: "entities", kind: "flow" },
  { from: "business", to: "relationships", kind: "flow" },
  { from: "business", to: "workflows", kind: "flow" },

  { from: "entities", to: "relationships", kind: "relation" },
  { from: "relationships", to: "workflows", kind: "relation" },

  { from: "entities", to: "data", kind: "flow" },
  { from: "relationships", to: "decisions", kind: "flow" },
  { from: "workflows", to: "evidence", kind: "flow" },

  { from: "data", to: "decisions", kind: "relation" },
  { from: "decisions", to: "evidence", kind: "relation" },

  { from: "data", to: "intelligence", kind: "flow" },
  { from: "decisions", to: "intelligence", kind: "flow" },
  { from: "evidence", to: "intelligence", kind: "flow" },

  { from: "intelligence", to: "execution", kind: "flow" },
];

// Layer bands, drawn as a label to the left of each row so a cold reader can
// see the grouping without decoding it from node names alone.
export const diagramLayerBands = [
  { label: "STRUCTURE", y: 32 },
  { label: "REASONING", y: 58 },
];

export const diagramTextEquivalent =
  "Business connects entities, relationships, and workflows into a single structure. " +
  "That structure produces data, decisions, and evidence. " +
  "Data, decisions, and evidence combine into operational intelligence, which drives business execution.";
