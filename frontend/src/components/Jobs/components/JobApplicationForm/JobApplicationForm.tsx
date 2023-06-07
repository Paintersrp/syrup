import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";

import {
  BaseProps,
  Button,
  ButtonBar,
  Container,
  ErrorDisplay,
  Flexer,
  Input,
  Item,
  Surface,
  Text,
  useFormValidation,
  validateForm,
} from "../../../../framework";
import { palettes } from "../../../../utils";
import { ApiAxiosInstance } from "../../../../lib";

import { JobData } from "../../Jobs";

interface JobApplicationFormProps extends BaseProps {
  job: JobData;
  formRef: React.RefObject<any>;
  editMode: boolean;
}

const formFields = [
  {
    helpText: "First Name",
    name: "first_name",
  },
  {
    helpText: "Last Name",
    name: "last_name",
  },
  {
    helpText: "Email",
    name: "email",
  },
  {
    helpText: "Phone",
    name: "phone",
  },
  {
    helpText: "City",
    name: "city",
  },
  {
    helpText: "Zip Code",
    name: "zipcode",
  },
];

const JobApplicationForm: React.FC<JobApplicationFormProps> = ({
  job,
  formRef,
  editMode,
  ...rest
}) => {
  const initialApplicationData = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    city: "",
    zipcode: "",
    resume: null,
    job: job.position,
  };

  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [apiError, setApiError] = useState<null | any>(null);
  const [formData, setFormData] = useState(initialApplicationData);

  const handleClick = () => {
    fileInputRef.current!.click();
  };

  const submitLogic = (event: any) => {
    event.preventDefault();

    ApiAxiosInstance.post("/application/", values)
      .then(() => {
        resetForm(initialApplicationData);
        dispatch({ type: "ALERT_SUCCESS", message: "Application Sent" });
      })
      .catch((err) => {
        setApiError(err);
        dispatch({
          type: "ALERT_FAIL",
          message: "Error occured, try again later",
        });
      });
  };

  const {
    values,
    errors,
    setErrors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormValidation(formData, validateForm, submitLogic);

  return (
    <div ref={formRef}>
      <Item xs={12} mt={40} {...rest}>
        <Surface maxWidth={1000} boxShadow={1} j="c" br={12}>
          {editMode && (
            <ButtonBar
              adminLink="application"
              tooltipPosition="top"
              text="Applications"
            />
          )}
          <Text t="h3" a="c" fw="bold" mb={0}>
            Apply Now
          </Text>
          <Text t="body1" s="0.9rem" a="c" mb={6}>
            {job.position} - {job.location} - {job.type}
          </Text>
          <Container>
            {formFields.map(({ helpText, name }, index) => (
              <Item key={index} xs={12} sm={6} mt={6} pl={4} pr={4}>
                <Input
                  size="medium"
                  helpText={helpText}
                  id={name}
                  name={name}
                  value={values[name]}
                  onChange={handleChange}
                />
              </Item>
            ))}
            <Flexer a="c" j="c" mt={12}>
              <input
                ref={fileInputRef}
                type="file"
                id="resume-input"
                name="resume"
                // inputProps={{ accept: ".pdf,.docx" }}
                onChange={handleChange}
                style={{ display: "none" }}
              />
              <Button
                size="small"
                onClick={handleClick}
                startIcon="attach_file"
                w={160}
              >
                {values.resume ? values.resume.name : "Upload Resume"}
              </Button>
            </Flexer>
            {errors.resume && (
              <Text c={palettes.error.main} a="c">
                {errors.resume}
              </Text>
            )}
            <Flexer j="c" mt={8}>
              <Button
                size="small"
                onClick={handleSubmit}
                startIcon="publish"
                w={160}
              >
                Submit Application
              </Button>
            </Flexer>
          </Container>
          <ErrorDisplay errors={errors} setErrors={setErrors} mt={8} />
        </Surface>
      </Item>
    </div>
  );
};

export default JobApplicationForm;
