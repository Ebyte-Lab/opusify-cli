interface LineChartProps {
  data: { label: string; value: number }[];
  height?: number;
}

export default function LineChart({ data, height = 200 }: LineChartProps) {
  const max = Math.max(...data.map((d) => d.value));
  const min = Math.min(...data.map((d) => d.value));
  const range = max - min || 1;

  const padding = { top: 20, right: 20, bottom: 30, left: 10 };
  const chartWidth = 800;
  const chartHeight = height;
  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;

  const points = data.map((d, i) => {
    const x = padding.left + (i / (data.length - 1)) * innerWidth;
    const y = padding.top + innerHeight - ((d.value - min) / range) * innerHeight;
    return { x, y };
  });

  const polylinePoints = points.map((p) => `${p.x},${p.y}`).join(' ');

  const areaPath = [
    `M ${points[0].x},${padding.top + innerHeight}`,
    `L ${points[0].x},${points[0].y}`,
    ...points.slice(1).map((p) => `L ${p.x},${p.y}`),
    `L ${points[points.length - 1].x},${padding.top + innerHeight}`,
    'Z',
  ].join(' ');

  const gridLines = 4;
  const gridValues = Array.from({ length: gridLines }, (_, i) => {
    const value = min + (range / (gridLines - 1)) * i;
    const y = padding.top + innerHeight - ((value - min) / range) * innerHeight;
    return { value, y };
  });

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        className="w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="lineChartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {gridValues.map((grid, i) => (
          <line
            key={i}
            x1={padding.left}
            y1={grid.y}
            x2={chartWidth - padding.right}
            y2={grid.y}
            stroke="var(--border-color)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        ))}

        {/* Area fill */}
        <path d={areaPath} fill="url(#lineChartGradient)" />

        {/* Line */}
        <polyline
          points={polylinePoints}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {points.map((p, i) => (
          <g key={i} className="group">
            <circle
              cx={p.x}
              cy={p.y}
              r="4"
              fill="var(--card-bg)"
              stroke="var(--primary)"
              strokeWidth="2"
              className="opacity-0 hover:opacity-100 transition-opacity"
            />
            <circle
              cx={p.x}
              cy={p.y}
              r="12"
              fill="transparent"
              className="cursor-pointer"
            />
          </g>
        ))}

        {/* X-axis labels */}
        {data.map((d, i) => {
          const x = padding.left + (i / (data.length - 1)) * innerWidth;
          return (
            <text
              key={i}
              x={x}
              y={chartHeight - 5}
              textAnchor="middle"
              fill="var(--text-secondary)"
              fontSize="11"
            >
              {d.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
