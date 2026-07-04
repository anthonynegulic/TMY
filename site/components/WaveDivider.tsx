// Uniform scalloped wave used at every section break: the `fill` (colour of
// the section above) flows over the `bg` (colour of the section below), so the
// seam reads as one shape rather than a stroked line.
const SCALLOPS = 16;
const WIDTH = 1200;
const MID = 37.5;

function scallopPath(): string {
  const r = WIDTH / SCALLOPS / 2;
  let d = `M0,0 L0,${MID}`;
  for (let i = 0; i < SCALLOPS; i++) {
    const sweep = i % 2 === 0 ? 1 : 0;
    d += ` A${r},${r} 0 0,${sweep} ${(i + 1) * r * 2},${MID}`;
  }
  return `${d} L${WIDTH},0 Z`;
}

const PATH = scallopPath();

export default function WaveDivider({ fill, bg }: { fill: string; bg: string }) {
  return (
    <div className="wave" style={{ background: bg }} aria-hidden="true">
      <svg viewBox="0 0 1200 75" preserveAspectRatio="none">
        <path d={PATH} fill={fill} />
      </svg>
    </div>
  );
}
