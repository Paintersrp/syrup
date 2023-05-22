import React, { useState, useEffect, useRef, ReactNode } from "react";
import { HelpText } from "../../Prebuilt/Text";
import Divider from "../Divider/Divider";
import Text from "../Text/Text";
import "./Select.css";

interface SelectProps {
  children: ReactNode;
  onChange: (selectedValue: string) => void;
  dividers?: boolean;
  label?: string;
}

interface OptionProps {
  children?: ReactNode;
  value?: string;
  isSelected?: boolean;
  onClick?: () => void;
}

const Select: React.FC<SelectProps> = ({
  children,
  onChange,
  dividers = true,
  label = "Select an Option",
}) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isOptionsVisible, setIsOptionsVisible] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOptionsVisible(false);
      }
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onChange(selectedValue);
  };

  const handleToggleOptions = () => {
    setIsOptionsVisible(!isOptionsVisible);
  };

  const options = React.Children.map(children, (child, index) => {
    const shouldRenderDivider = dividers && index !== 0;

    if (React.isValidElement<OptionProps>(child) && child.props.value) {
      const syntheticEvent = {
        target: { value: child.props.value },
      } as React.ChangeEvent<HTMLSelectElement>;

      return (
        <>
          {shouldRenderDivider && <Divider />}
          {React.cloneElement(child, {
            isSelected: selectedOption === child.props.value,
            onClick: () => {
              handleSelectChange(syntheticEvent);
              handleToggleOptions();
            },
          })}
        </>
      );
    }

    return null;
  });

  return (
    <div className="select" ref={selectRef}>
      <HelpText>{label}</HelpText>
      <div className="selected-option" onClick={handleToggleOptions}>
        <Text>{selectedOption || "\u00A0"}</Text>
      </div>
      <div className={`options ${isOptionsVisible ? "visible" : ""}`}>
        {options}
      </div>
      <select
        className="hidden-select"
        value={selectedOption}
        onChange={handleSelectChange}
        onClick={handleToggleOptions}
      >
        <option value="" disabled hidden></option>
        {children}
      </select>
    </div>
  );
};

const Option: React.FC<OptionProps> = ({
  children,
  value,
  isSelected,
  onClick,
}) => {
  return (
    <div className={`option ${isSelected ? "selected" : ""}`} onClick={onClick}>
      <Text>{children}</Text>
    </div>
  );
};

export { Select, Option };
