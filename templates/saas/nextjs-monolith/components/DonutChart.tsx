interface DonutChartProps {
  segments: { label: string; value: number; color: string }[];
  size?: number;
}

export default function DonutChart({ segments, size = 180 }: DonutChartProps) {
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  const strokeWidth = size * 0.18;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  let cumulativeOffset = 0;

  const segmentArcs = segments.map((segment) => {
    const percentage = segment.value / total;
    const dashLength = circumference * percentage;
    const dashGap = circumference - dashLength;
    const offset = -cumulativeOffset;
    cumulativeOffset += dashLength;

    return {
      ...segment,
      percentage,
      dashArray: `${dashLength} ${dashGap}`,
      dashOffset: offset,
    };
  });

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative" style=\{{ width: size, height: size }}>
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="w-full h-full -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="var(--border-color)"
            strokeWidth={strokeWidth}
          />
          {/* Segments */}
          {segmentArcs.map((seg, i) => (
            <circle
              key={i}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth={strokeWidth}
              strokeDasharray={seg.dashArray}
              strokeDashoffset={seg.dashOffset}
              strokeLinecap="butt"
              className="transition-all duration-300"
            />
          ))}
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-foreground">{total}</span>
          <span className="text-xs text-text-secondary">Total</span>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-2 w-full">
        {segments.map((seg) => (
          <div key={seg.label} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full flex-shrink-0"
              style=\{{ backgroundColor: seg.color }}
            />
            <span className="text-sm text-text-secondary truncate">{seg.label}</span>
            <span className="text-sm font-medium text-foreground ml-auto">
              {Math.round((seg.value / total) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
