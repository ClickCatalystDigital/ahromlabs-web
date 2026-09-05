import { Fragment } from "react";
import {
  BuildingOffice2Icon,
  CubeIcon,
  LinkIcon,
  ArrowPathIcon,
  CircleStackIcon,
  ScaleIcon,
  DocumentCheckIcon,
  CpuChipIcon,
  BoltIcon,
} from "@heroicons/react/24/outline";
import {
  diagramNodes,
  diagramEdges,
  diagramLayerBands,
  diagramTextEquivalent,
  type DiagramNode,
  type DiagramEdge,
} from "@/lib/diagram-data";

const nodeIcons: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  business: BuildingOffice2Icon,
  entities: CubeIcon,
  relationships: LinkIcon,
  workflows: ArrowPathIcon,
  data: CircleStackIcon,
  decisions: ScaleIcon,
  evidence: DocumentCheckIcon,
  intelligence: CpuChipIcon,
  execution: BoltIcon,
};

function findNode(id: string, nodes: DiagramNode[]) {
  const node = nodes.find((n) => n.id === id);
  if (!node) throw new Error(`Unknown diagram node: ${id}`);
  return node;
}

function nodeRadius(node: DiagramNode) {
  return node.layer === "input" || node.id === "execution" ? 3.2 : 2.6;
}

/** Cross-layer edges route as right-angle elbows, like a wiring diagram.
 *  Same-layer edges stay as a straight run since both ends share a y. */
function edgePath(from: DiagramNode, to: DiagramNode) {
  if (from.x === to.x || from.y === to.y) {
    return `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
  }
  const midY = (from.y + to.y) / 2;
  return `M ${from.x} ${from.y} L ${from.x} ${midY} L ${to.x} ${midY} L ${to.x} ${to.y}`;
}

function Edges({ edges, nodes }: { edges: DiagramEdge[]; nodes: DiagramNode[] }) {
  return (
    <>
      {edges.map((edge) => {
        const from = findNode(edge.from, nodes);
        const to = findNode(edge.to, nodes);
        const isFlow = edge.kind === "flow";
        // Flow edges always approach their target from directly above in this
        // layout. Stop the line right at the node's edge (a hairline short of
        // it) so the arrowhead sits flush against the circle instead of being
        // painted over by it, since the node circle sits on top of the edges.
        const target = isFlow ? { ...to, y: to.y - (nodeRadius(to) + 0.1) } : to;
        return (
          <path
            key={`${edge.from}-${edge.to}`}
            d={edgePath(from, target)}
            className={isFlow ? "diagram-edge diagram-edge-flow" : "diagram-edge diagram-edge-relation"}
            markerEnd={isFlow ? "url(#diagram-arrow)" : undefined}
            pathLength={1}
          />
        );
      })}
    </>
  );
}

function Nodes({ nodes, showLabels }: { nodes: DiagramNode[]; showLabels: boolean }) {
  return (
    <>
      {nodes.map((node) => {
        const radius = nodeRadius(node);
        const Icon = nodeIcons[node.id];
        const iconSize = radius * 1.15;
        return (
          <g key={node.id}>
            <circle cx={node.x} cy={node.y} r={radius} className="diagram-node" />
            {Icon && (
              <Icon
                x={node.x - iconSize / 2}
                y={node.y - iconSize / 2}
                width={iconSize}
                height={iconSize}
                strokeWidth={2.5}
                className="diagram-icon"
              />
            )}
            {showLabels && (
              <>
                <text
                  x={node.x - radius - 1.4}
                  y={node.y - 1.2}
                  textAnchor="end"
                  className="diagram-label"
                >
                  {node.label}
                </text>
                {/* Separator for naive text extraction. The svg is aria-hidden and
                    has an sr-only equivalent, but aria-hidden doesn't remove text
                    nodes from the DOM, so a crawler concatenating textContent used
                    to read "BUSINESSENTITIESRELATIONSHIPS...". Character data outside
                    a <text> element is not rendered by SVG, so this costs nothing
                    visually. */}
                {" "}
              </>
            )}
          </g>
        );
      })}
    </>
  );
}

function LayerBands() {
  return (
    <>
      {diagramLayerBands.map((band) => (
        <Fragment key={band.label}>
          <text x={98} y={band.y + 1} textAnchor="end" className="diagram-band-label">
            {band.label}
          </text>
          {/* See the note in Nodes: non-rendering separator for text extraction. */}
          {" "}
        </Fragment>
      ))}
    </>
  );
}

/**
 * The full system diagram: business at the top, resolving through structure
 * and reasoning layers into operational intelligence and execution. Solid
 * arrowed elbows show the flow of information downward; dashed hairlines
 * show the associations within a layer.
 */
export function SystemDiagram() {
  return (
    <figure className="relative m-0">
      <svg viewBox="0 0 100 100" className="diagram-svg" aria-hidden="true" focusable="false">
        <defs>
          <marker
            id="diagram-arrow"
            viewBox="0 0 8 8"
            refX="6.5"
            refY="4"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M0,0 L8,4 L0,8 Z" className="diagram-arrowhead" />
          </marker>
        </defs>
        <LayerBands />
        <Edges edges={diagramEdges} nodes={diagramNodes} />
        <Nodes nodes={diagramNodes} showLabels />
      </svg>
      <figcaption className="diagram-caption">
        Structure and reasoning are one system. Each layer feeds the next.
      </figcaption>
      <p className="sr-only">{diagramTextEquivalent}</p>
    </figure>
  );
}
