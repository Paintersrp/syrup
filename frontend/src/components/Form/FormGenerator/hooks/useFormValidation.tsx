import { useState, FormEvent } from 'react';

type SubmitFunction = (event: FormEvent) => void;

interface FormValidationResult {
  values: any;
  errors: any;
  setErrors: any;
  isSubmitting: boolean;
  handleChange: any;
  handleSubmit: (event: FormEvent) => void;
  resetForm: (reset: any) => void;
}

const useFormValidation = (
  initialState: any,
  validate: any,
  handleSubmitLogin: SubmitFunction
): FormValidationResult => {
  const [values, setValues] = useState<any>(initialState);
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event: any) => {
    const { name, value, checked } = event.target;
    if (name.includes('checkbox') || name.includes('rememberMe')) {
      setValues({
        ...values,
        [name]: checked,
      });
    } else if (name.includes('resume')) {
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

  const resetForm = (reset: any) => {
    setValues(reset);
    setErrors({});
    setIsSubmitting(false);
  };

  return {
    values,
    errors,
    setErrors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
  };
};

export default useFormValidation;
