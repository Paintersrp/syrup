import * as Yup from 'yup';

export const RequestSchema = Yup.object().shape({
  method: Yup.string()
    .trim()
    .required('Method is required.')
    .min(2, 'Method must be at least 2 characters.')
    .max(10, 'Method cannot exceed 10 characters.'),

  endpoint: Yup.string()
    .trim()
    .required('Endpoint is required.')
    .min(2, 'Endpoint must be at least 2 characters.')
    .max(50, 'Endpoint cannot exceed 50 characters.'),

  headers: Yup.string()
    .trim()
    .required('Headers is required.')
    .min(2, 'Headers must be at least 2 characters.')
    .max(2000, 'Headers cannot exceed 2000 characters.'),

  payload: Yup.string()
    .trim()
    .required('Payload is required.')
    .min(2, 'Payload must be at least 2 characters.')
    .max(2000, 'Payload cannot exceed 2000 characters.'),
});
