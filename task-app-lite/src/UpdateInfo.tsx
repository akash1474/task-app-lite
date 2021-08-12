import React from "react";

interface UpdateInfoProps {
  updates: string[];
  title: string;
  icon: React.ReactNode;
  color: string;
}

const UpdateInfo: React.FC<UpdateInfoProps> = ({
  updates,
  title,
  icon,
  color,
}) => {
  const style = {
    backgroundColor: color + "20",
    borderRadius: 3,
    width: "-webkit-fill-available",
  };
  return (
    <div style={style} className="updateInfo">
      <div className="updateInfo__header">
        {icon}
        <p style={{ color }}>{title}</p>
      </div>
      <div className="updateInfo__body">
        {updates.map((update) => {
          return <p className="update__text">{">  " + update}</p>;
        })}
      </div>
    </div>
  );
};

export default UpdateInfo;
