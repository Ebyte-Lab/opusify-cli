interface BarChartProps {
  data: { label: string; value: number }[];
  height?: number;
}

export default function BarChart({ data, height = 200 }: BarChartProps) {
  const max = Math.max(...data.map((d) => d.value));

  return (
    <div className="w-full">
      <div className="flex items-end gap-3" style=\{{ height }}>
        {data.map((item) => {
          const barHeight = (item.value / max) * 100;
          return (
            <div key={item.label} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
              <span className="text-xs font-medium text-text-secondary">
                {item.value >= 1000 ? `${(item.value / 1000).toFixed(1)}k` : item.value}
              </span>
              <div
                className="w-full rounded-t-sm transition-all duration-300 hover:opacity-80"
                style=\{{ height: `${barHeight}%`, backgroundColor: 'var(--primary)' }}
              />
            </div>
          );
        })}
      </div>
      <div className="flex gap-3 mt-2 pt-2 border-t border-border">
        {data.map((item) => (
          <div key={item.label} className="flex-1 text-center">
            <span className="text-xs text-text-secondary truncate block">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
