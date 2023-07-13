import * as Yup from 'yup';
import { CreateUserDTO } from './types';

export function validateUserInput(input: CreateUserDTO): void {
  const schema = Yup.object().shape({
    firstName: Yup.string()
      .required('First name is required')
      .min(2, 'First name must be at least 2 characters')
      .max(50, 'First name cannot exceed 50 characters'),
    lastName: Yup.string()
      .required('Last name is required')
      .min(2, 'Last name must be at least 2 characters')
      .max(50, 'Last name cannot exceed 50 characters'),
  });

  schema.validateSync(input, { abortEarly: false });
}
