// Uniform scalloped wave used at every section break: the `fill` (colour of
// the section above) flows over the `bg` (colour of the section below).
// The scallops are true semicircles drawn as a fixed-size repeating pattern,
// so they keep the same round proportions at any viewport width.
//
// The divider tucks OVERLAP px up under the section above, and that strip is
// painted in `fill`. The divider's top edge lands between device pixels on
// some pages (it depends on the height of everything above it), and Safari
// blends whatever is at that edge into a hairline; with the overlap the edge
// is `fill` against `fill`, so there's nothing to see, and the scallops start
// below it so their round tops are never shaved.
const R = 22; // scallop radius (px); scallop band height = 2R, one period = 4R
const OVERLAP = 2; // px, matches the negative margin-top on .wave
const PERIOD = 4 * R; // one up + one down scallop
const TILE = `M0,0 L0,${R} A${R},${R} 0 0,1 ${2 * R},${R} A${R},${R} 0 0,0 ${PERIOD},${R} L${PERIOD},0 Z`;

export default function WaveDivider({ fill, bg }: { fill: string; bg: string }) {
  const patternId = `scallop-${fill.slice(1)}-${bg.slice(1)}`;
  return (
    <div
      className="wave"
      style={{ background: `linear-gradient(${fill} 0 ${OVERLAP}px, ${bg} ${OVERLAP}px)` }}
      aria-hidden="true"
    >
      <svg width="100%" height="100%">
        <defs>
          <pattern
            id={patternId}
            y={OVERLAP}
            width={PERIOD}
            height={2 * R}
            patternUnits="userSpaceOnUse"
          >
            <path d={TILE} fill={fill} />
          </pattern>
        </defs>
        <rect y={OVERLAP} width="100%" height={2 * R} fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
}
