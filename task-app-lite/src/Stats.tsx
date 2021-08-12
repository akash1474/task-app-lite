import React from "react";

interface StatsInterface {
  title: string;
  value: string;
  icon: React.ReactNode;
  padding: string;
  color: string;
  style?: object;
}

const Stats: React.FC<StatsInterface> = ({
  title,
  padding,
  value,
  icon,
  color,
  style,
}) => {
  const styles = {
    padding,
    backgroundColor: color + "20",
    borderRadius: 3,
    ...style,
  };
  return (
    <div style={styles} className="Stats">
      {icon}
      <div className="stats__spl">
        <p style={{ color }} className="stats__title">
          {title}
        </p>
        <p className="stats__value">{value}</p>
      </div>
    </div>
  );
};

export default Stats;
