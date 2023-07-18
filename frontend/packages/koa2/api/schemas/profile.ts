import * as Yup from 'yup';

export const ProfileSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .min(5, 'Email Address must be at least 5 characters')
    .max(50, 'Email Address cannot exceed 50 characters'),
  firstName: Yup.string()
    .trim()
    .min(2, 'First name must be at least 2 characters')
    .max(30, 'First name cannot exceed 30 characters'),
  lastName: Yup.string()
    .trim()
    .min(2, 'Last name must be at least 2 characters')
    .max(40, 'Last name cannot exceed 40 characters'),
  bio: Yup.string().trim().max(1024, 'Bio cannot exceed 1024 characters'),
  city: Yup.string()
    .trim()
    .min(2, 'City must be at least 2 characters')
    .max(50, 'City cannot exceed 50 characters'),
  country: Yup.string()
    .trim()
    .min(2, 'Country must be at least 2 characters')
    .max(30, 'Country cannot exceed 30 characters'),
  phone: Yup.string().matches(/^\d{10}$/, 'Phone number must be a 10-digit number'),
  facebook: Yup.string()
    .trim()
    .min(2, 'Facebook must be at least 2 characters')
    .max(30, 'Facebook cannot exceed 30 characters'),
  instagram: Yup.string()
    .trim()
    .min(2, 'Instagram must be at least 2 characters')
    .max(30, 'Instagram cannot exceed 30 characters'),
  threads: Yup.string()
    .trim()
    .min(2, 'Threads must be at least 2 characters')
    .max(30, 'Threads cannot exceed 30 characters'),
  twitter: Yup.string()
    .trim()
    .min(2, 'Twitter must be at least 2 characters')
    .max(30, 'Twitter cannot exceed 30 characters'),
  github: Yup.string()
    .trim()
    .min(2, 'Github must be at least 2 characters')
    .max(30, 'Github cannot exceed 30 characters'),
  youtube: Yup.string()
    .trim()
    .min(2, 'YouTube must be at least 2 characters')
    .max(30, 'YouTube cannot exceed 30 characters'),
  linkedIn: Yup.string()
    .trim()
    .min(2, 'LinkedIn must be at least 2 characters')
    .max(30, 'LinkedIn cannot exceed 30 characters'),
});
