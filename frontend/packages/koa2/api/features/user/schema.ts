import Joi from 'joi';

export const UserSchema = Joi.object({
  firstName: Joi.string().required().trim().min(2).max(2).messages({
    'string.base': 'First name must be a string',
    'string.empty': 'First name is required',
    'string.min': 'First name should have a minimum of {#limit} characters',
    'string.max': 'First name should have a maximum of {#limit} characters',
    'any.required': 'First name is required',
  }),
  lastName: Joi.string().required().trim().min(2).max(2).messages({
    'string.base': 'Last name must be a string',
    'string.empty': 'Last name is required',
    'string.min': 'Last name should have a minimum of {#limit} characters',
    'string.max': 'Last name should have a maximum of {#limit} characters',
    'any.required': 'Last name is required',
  }),
  //   email: Joi.string().required().email().trim().lowercase().messages({
  //     'string.base': 'Email must be a string',
  //     'string.empty': 'Email is required',
  //     'string.email': 'Email must be a valid email address',
  //     'any.required': 'Email is required',
  //   }),
  //   age: Joi.number().integer().positive().min(18).max(120).messages({
  //     'number.base': 'Age must be a number',
  //     'number.empty': 'Age is required',
  //     'number.integer': 'Age must be an integer',
  //     'number.positive': 'Age must be a positive number',
  //     'number.min': 'Age should be at least {#limit}',
  //     'number.max': 'Age should be at most {#limit}',
  //     'any.required': 'Age is required',
  //   }),
});
