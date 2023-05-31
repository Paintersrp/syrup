import React, {
  useState,
  useEffect,
  useRef,
  ReactNode,
  CSSProperties,
} from "react";
import Divider from "../Divider/Divider";
import HelpText from "../HelpText/HelpText";
import MaterialIcon from "../Icon/MaterialIcon";
import { OptionProps } from "../Option/Option";
import Text from "../Text/Text";
import "./Select.css";

interface SelectProps {
  children: ReactNode;
  onChange?: (event: any) => void;
  dividers?: boolean;
  label?: string;
  name?: string;
  style?: CSSProperties;
  textStyle?: CSSProperties;
  className?: string;
  iconMixin?: boolean;
  value?: any;
  dense?: boolean;
}

const Select: React.FC<SelectProps> = ({
  children,
  onChange,
  dividers = true,
  label,
  name,
  style,
  textStyle = { paddingLeft: 4 },
  className,
  iconMixin = false,
  value,
  dense,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>(value || "");
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

    const syntheticEvent = {
      target: {
        value: selectedValue,
        name: name,
      },
    } as React.ChangeEvent<HTMLSelectElement>;

    if (onChange) {
      onChange(syntheticEvent);
    }
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
        <React.Fragment>
          {shouldRenderDivider && <Divider />}
          {React.cloneElement(child, {
            isSelected: selectedOption === child.props.value,
            onClick: () => {
              handleSelectChange(syntheticEvent);
              handleToggleOptions();
            },
          })}
        </React.Fragment>
      );
    }

    return null;
  });

  return (
    <div className={`select ${className}`} ref={selectRef} style={style}>
      {label && <HelpText>{label}</HelpText>}
      <div
        className={dense ? "selected-option-dense" : "selected-option"}
        onClick={handleToggleOptions}
      >
        {iconMixin && (
          <MaterialIcon size="20px" icon={selectedOption} mr={12} />
        )}
        <Text style={textStyle}>{selectedOption || "\u00A0"}</Text>
      </div>
      <div style={style}>
        <div className={`options ${isOptionsVisible ? "visible" : ""}`}>
          {options}
        </div>
      </div>
      <select
        className="hidden-select"
        value={selectedOption}
        onChange={handleSelectChange}
        onClick={handleToggleOptions}
        name={name}
      >
        <option value="" disabled hidden></option>
        {children}
      </select>
    </div>
  );
};

export default Select;
