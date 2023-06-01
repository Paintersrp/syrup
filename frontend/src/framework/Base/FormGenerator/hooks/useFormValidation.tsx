import React, { useState, ChangeEvent, FormEvent } from "react";

interface FormValues {
  [key: string]: any;
}

type ValidationErrors = {
  [key: string]: string;
};

type ValidateFunction = (values: FormValues) => ValidationErrors;

type SubmitFunction = (event: FormEvent) => void;

interface FormValidationResult {
  values: FormValues;
  errors: ValidationErrors;
  isSubmitting: boolean;
  handleChange: any;
  handleSubmit: (event: FormEvent) => void;
  resetForm: (reset: FormValues) => void;
}

const useFormValidation = (
  initialState: FormValues,
  validate: ValidateFunction,
  handleSubmitLogin: SubmitFunction
): FormValidationResult => {
  const [values, setValues] = useState<FormValues>(initialState);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event: any) => {
    const { name, value, checked } = event.target;
    if (name.includes("checkbox") || name.includes("rememberMe")) {
      setValues({
        ...values,
        [name]: checked,
      });
    } else if (name.includes("resume")) {
      setValues({
        ...values,
        [name]: event.target.files[0],
      });
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
    if (Object.keys(validate(values)).length !== 0) {
      return errors;
    }

    handleSubmitLogin(event);
  };

  const resetForm = (reset: FormValues) => {
    setValues(reset);
    setErrors({});
    setIsSubmitting(false);
  };

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
  };
};

export default useFormValidation;
