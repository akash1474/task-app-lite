import * as React from "react";

interface Props {
  className: string;
  getValue: (val: string) => void;
  placeholder: string;
  id?: string;
  onFocus?: () => void;
}

const TextField: React.FC<Props> = ({
  className,
  getValue,
  placeholder,
  id,
  onFocus,
}) => {
  const [text, setText] = React.useState("");

  function handeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setText(value);
    getValue(value);
  }

  return (
    <input
      value={text}
      type="text"
      onSubmit={(e) => setText("")}
      onFocus={onFocus}
      onChange={handeChange}
      className={className}
      placeholder={placeholder}
      id={id}
    />
  );
};

export default TextField;
