import Joi from 'joi';

export const authSchema = Joi.object({
    username: Joi.string().required().messages({
        'string.empty': 'Username is required',
    }),
    password: Joi.string().required().messages({
        'string.empty': 'Password is required',
    }),
})

export const registerSchema = Joi.object({
    username: Joi.string().required().max(20).messages({
        'string.empty': 'Username is   required',
        'string.max': 'Username should be less than 20 characters'
    }),
    email:Joi.string().required().regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/).messages({
        string: 'Email is required',
        'string.pattern.base': 'Email is invalid',
    }),
    password: Joi.string().required().min(6).max(20).messages({
        'string.empty': 'Password is required',
        'string.min': 'Password should be at least 6 characters',
        'string.max': 'Password should be less than 20 characters',
    }),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.only': 'Passwords do not match', // Custom error message for password mismatch
        'string.empty': 'Please confirm your password',
    }),
    role: Joi.string().required().valid('admin', 'user')
})

export default defineNuxtPlugin(() => {
    return {
        provide: {
            joi: Joi,
            authSchema,
            registerSchema
        }
    }
});