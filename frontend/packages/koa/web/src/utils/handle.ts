import React from 'react';

const toggleState = (setState: React.Dispatch<React.SetStateAction<any>>, state: boolean) => {
  setState(!state);
};

const toggleSwapStates = (
  setPrimaryState: React.Dispatch<React.SetStateAction<any>>,
  primaryState: boolean,
  setSecondaryState: React.Dispatch<React.SetStateAction<any>>,
  secondaryState: boolean
) => {
  setPrimaryState(!primaryState);
  if (secondaryState) {
    setSecondaryState(!secondaryState);
  }
};

const handleDataChange = (
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setData: React.Dispatch<React.SetStateAction<any>>,
  data: any
) => {
  setData({
    ...data,
    [event.target.name]:
      event.target.type === 'checkbox'
        ? (event.target as HTMLInputElement).checked
        : event.target.value,
  });
};

const handleNestedDataChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  setData: React.Dispatch<React.SetStateAction<any>>,
  data: any,
  nestedName: string
) => {
  setData({
    ...data,
    [nestedName]: {
      ...data[nestedName],
      [event.target.name]:
        event.target.type === 'checkbox' ? event.target.checked : event.target.value,
    },
  });
};

type ErrorType = string;
type ErrorsType = ErrorType[];

type NestedErrorsType = {
  [key: string]: ErrorsType;
};

type SetErrorsType = React.Dispatch<React.SetStateAction<ErrorsType>>;
type SetNestedErrorsType = React.Dispatch<React.SetStateAction<NestedErrorsType>>;

const handleClearErrors = (index: number, errors: ErrorsType, setErrors: SetErrorsType): void => {
  const updatedErrors: ErrorsType = [...errors];
  updatedErrors.splice(index, 1);
  setErrors(updatedErrors);
};

const handleClearNestedErrors = (
  index: number,
  setErrors: SetNestedErrorsType,
  nestedName: string
): void => {
  setErrors((prevErrors: NestedErrorsType) => {
    const updatedErrors: any = { ...prevErrors };
    const sectionErrors: ErrorsType = [...prevErrors[nestedName]];
    sectionErrors.splice(index, 1);
    updatedErrors[nestedName] = sectionErrors;
    return updatedErrors;
  });
};

export {
  handleClearErrors,
  handleClearNestedErrors,
  toggleState,
  toggleSwapStates,
  handleDataChange,
  handleNestedDataChange,
};
