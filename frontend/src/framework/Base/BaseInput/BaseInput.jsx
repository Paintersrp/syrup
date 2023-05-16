import React, { useState } from "react";
import "./BaseInput.css";

import HelpText from "../../Prebuilt/Text/HelpText";
import Flexer from "../Flexer/Flexer";

const BaseInput = ({
  id,
  name,
  type = "text",
  helpText = "",
  helpPosition = "top",
  value,
  onChange,
  rows = 1,
  multiline = false,
  required = false,
  error = false,
  placeholder,
  style,
  inputStyle,
  className,
}) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const InputComponent = multiline ? "textarea" : "input";

  return (
    <div className="input-root" style={{ ...style }}>
      {helpText && (
        <HelpText
          mt={0}
          mb={0}
          style={{ order: helpPosition === "top" ? 1 : 2 }}
        >
          {helpText}
        </HelpText>
      )}
      <InputComponent
        className={`${className} base-input`}
        id={id || name}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        required={required}
        type={type}
        error={error}
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{
          ...inputStyle,
          minHeight: multiline ? 169.5 : null,
          order: helpPosition === "top" ? 2 : 1,
        }}
      />
    </div>
  );
};

export default BaseInput;
