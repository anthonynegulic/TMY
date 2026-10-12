// Uniform scalloped wave used at every section break: the `fill` (colour of
// the section above) flows over the `bg` (colour of the section below).
// The scallops are true semicircles drawn as a fixed-size repeating pattern,
// so they keep the same round proportions at any viewport width.
// The `bg` colour starts 1px down: when the divider's top edge lands between
// device pixels (it depends on the height of everything above it), Safari
// would otherwise blend a sliver of `bg` into a thin line above the scallops.
const R = 22; // scallop radius (px); divider height = 2R, one period = 4R
const PERIOD = 4 * R; // one up + one down scallop
const TILE = `M0,0 L0,${R} A${R},${R} 0 0,1 ${2 * R},${R} A${R},${R} 0 0,0 ${PERIOD},${R} L${PERIOD},0 Z`;

export default function WaveDivider({ fill, bg }: { fill: string; bg: string }) {
  const patternId = `scallop-${fill.slice(1)}-${bg.slice(1)}`;
  return (
    <div
      className="wave"
      style={{ background: `linear-gradient(${fill} 0 1px, ${bg} 1px)` }}
      aria-hidden="true"
    >
      <svg width="100%" height="100%">
        <defs>
          <pattern
            id={patternId}
            width={PERIOD}
            height={2 * R}
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
