import React from "react";
import "./toggler.css";

interface TogglerInterface {
  title: string;
  disabledColor?: string;
  activeColor?: string;
  spaceBetween?: string;
  defaultState?: boolean;
  onChange: (val: boolean) => void;
  margin?: string;
}

const Toggler: React.FC<TogglerInterface> = ({
  title,
  activeColor,
  disabledColor,
  spaceBetween,
  onChange,
  defaultState,
  margin,
}) => {
  const [state, setState] = React.useState<boolean>(defaultState || false);

  React.useEffect(() => {
    onChange(state);
  }, [state]);

  return (
    <div
      style={{
        margin,
      }}
      className="TogglerContainer"
    >
      <p
        style={
          {
            marginRight: spaceBetween ? spaceBetween : "auto",
          } as React.CSSProperties
        }
        className="TogglerContainer--title"
      >
        {title}
      </p>
      <div onClick={() => setState((prev) => !prev)} className="Toggler">
        <div
          style={{
            backgroundColor: state
              ? activeColor
                ? activeColor
                : "#6279e2"
              : disabledColor
              ? disabledColor
              : "#909090",
            left: state ? "18px" : "2px",
          }}
          className="Toggler__switch"
        ></div>
      </div>
    </div>
  );
};

export default Toggler;
