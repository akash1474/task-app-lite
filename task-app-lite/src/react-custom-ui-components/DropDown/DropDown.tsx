import React, { useState, useEffect, useRef } from "react";
import "./DropDown.css";

interface Props {
  title?: string;
  children: JSX.Element[];
  onChange: (val: string) => void;
}

export const DropDown: React.FC<Props> = ({
  title = "Select",
  children,
  onChange,
}) => {
  const [state, setState] = useState<string>(title);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as HTMLDivElement)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  function handleStateChange(e: React.MouseEvent) {
    const el = e.target as HTMLDivElement;
    setState(el.dataset!.title as string);
    onChange(el.dataset!.value as string);
    setIsOpen(false);
  }

  return (
    <div>
      <div className="dropDown">
        <div onClick={() => setIsOpen((prev) => !prev)} className="main">
          <p className="dropDown__title">{state}</p>
          <svg style={{ height: 10 }} viewBox="0 0 451.847 451.847">
            <g>
              <path
                d="M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751
                        c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0
                        c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z"
              />
            </g>
          </svg>
        </div>
        {isOpen ? (
          <div ref={ref} onClick={handleStateChange} className="dropDown__body">
            {children}
          </div>
        ) : null}
      </div>
    </div>
  );
};

interface DropDownProps {
  title: string;
  value: string;
}

export const DropDownItem: React.FC<DropDownProps> = ({ title, value }) => {
  return (
    <div data-value={value} data-title={title} className="dropDownItem">
      <p data-title={title} data-value={value}>
        {title}
      </p>
    </div>
  );
};
