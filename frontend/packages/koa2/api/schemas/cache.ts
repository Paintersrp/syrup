import * as Yup from 'yup';

export const CacheSchema = Yup.object().shape({
  cacheKey: Yup.string()
    .trim()
    .required('CacheKey is required.')
    .min(2, 'CacheKey must be at least 2 characters.')
    .max(100, 'CacheKey cannot exceed 100 characters.'),

  response: Yup.string()
    .trim()
    .required('Response is required.')
    .min(2, 'Response must be at least 2 characters.')
    .max(2000, 'Response cannot exceed 2000 characters.'),
});
