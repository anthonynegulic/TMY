// Uniform scalloped wave used at every section break: the `fill` (colour of
// the section above) flows over the `bg` (colour of the section below).
// The scallops are narrow rounded "fingers" (matching how the original
// stretched divider rendered on phones — the look the client picked) drawn
// as a fixed-size repeating pattern, so they keep the same proportions at
// any viewport width.
const RX = 12; // half a finger's width (px)
const RY = 22; // finger height above/below the midline; divider height = 2·RY
const PERIOD = 4 * RX; // one up + one down finger
const TILE = `M0,0 L0,${RY} A${RX},${RY} 0 0,1 ${2 * RX},${RY} A${RX},${RY} 0 0,0 ${PERIOD},${RY} L${PERIOD},0 Z`;

export default function WaveDivider({ fill, bg }: { fill: string; bg: string }) {
  const patternId = `scallop-${fill.slice(1)}-${bg.slice(1)}`;
  return (
    <div className="wave" style={{ background: bg }} aria-hidden="true">
      <svg width="100%" height="100%">
        <defs>
          <pattern
            id={patternId}
            width={PERIOD}
            height={2 * RY}
            patternUnits="userSpaceOnUse"
          >
            <path d={TILE} fill={fill} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
}
