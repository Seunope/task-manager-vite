import { useEffect, useState } from 'react';

type CircularProgressProps = {
  radius: number;
  strokeWidth: number;
  progress: number;
};

const CircularProgress = ({ radius, strokeWidth, progress }: CircularProgressProps) => {
  const [normalizedRadius] = useState(radius - strokeWidth / 2);
  const [circumference, setCircumference] = useState(normalizedRadius * 2 * Math.PI);
  const [offset, setOffset] = useState(circumference - (progress / 100) * circumference);
  const [color, setColor] = useState('#347822'); // Default color

  useEffect(() => {
    const normalizeCircumference = normalizedRadius * 2 * Math.PI;
    setCircumference(normalizeCircumference);
    setOffset(normalizeCircumference - (progress / 100) * normalizeCircumference);

    const colorScale: { [key: number]: string } = {
      0: '#ff0000',
      30: '#f9a825',
      50: '#347822',
    };

    const getColor = (percentage: number) => {
      for (const key in colorScale) {
        if (percentage >= parseInt(key)) {
          setColor(colorScale[key]);
        }
      }
    };

    getColor(progress);
  }, [normalizedRadius, progress]);

  return (
    <svg height={radius * 2} width={radius * 2}>
      <circle
        stroke="#d2d3d4"
        fill="transparent"
        strokeWidth={strokeWidth}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke={color}
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeDasharray={`${circumference} ${circumference}`}
        style={{
          strokeDashoffset: offset,
          transform: 'rotate(-90deg)',
          transformOrigin: '50% 50%',
        }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        strokeLinecap="round"
      />
      <text
        x={radius}
        y={radius}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={radius / 2}
        fill="#000"
        className="font-bold"
      >
        {progress}%
      </text>
      <text
        x={radius}
        y={radius * 1.4}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={radius / 8}
        fill="#808080"
        className="font-semibold"
      >
        Conversion rate
      </text>
    </svg>
  );
};

export default CircularProgress;
