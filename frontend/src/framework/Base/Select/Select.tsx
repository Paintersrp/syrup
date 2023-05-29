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
import Text from "../Text/Text";
import "./Select.css";

interface SelectProps {
  children: ReactNode;
  onChange: (event: any) => void;
  dividers?: boolean;
  label?: string;
  name?: string;
  style?: CSSProperties;
  className?: string;
  iconMixin?: boolean;
  value?: any;
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
  name,
  style,
  className,
  iconMixin = false,
  value,
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

    onChange(syntheticEvent);
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
      <HelpText>{label}</HelpText>
      <div className="selected-option" onClick={handleToggleOptions}>
        {iconMixin && (
          <MaterialIcon size="20px" icon={selectedOption} mr={12} />
        )}
        <Text>{selectedOption || "\u00A0"}</Text>
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

export const Option: React.FC<OptionProps> = ({
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

export default Select;
