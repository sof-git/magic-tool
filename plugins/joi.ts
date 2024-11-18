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

export const heroSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': 'Name is required',
    }),
    description: Joi.string().required().messages({
        'string.empty': 'Description is required',
    }),
    img:{
        url: Joi.string().allow("").default('/uploads/default.jpg'),
        alt: Joi.string().default('Hero Image'),
    },
    activeSpell: Joi.object({
        name: Joi.string().required().messages({
            'string.empty': 'Name is required',
        }),
        description: Joi.string().required().messages({
            'string.empty': 'Description is required',
        }),
        type: Joi.string().required().messages({
            'string.empty': 'Type is required',
        }),
        target: Joi.string().required().messages({
            'string.empty': 'Target is required',
        }),
        duration: Joi.string().required().messages({
            'string.empty': 'Duration is required',
        }),
        effect: Joi.string().required().messages({
            'string.empty': 'Effect is required',
        }),
        value: Joi.number().required().messages({
            'number.empty': 'Value is required',
        }),
    }),
    passiveSpell: Joi.object({
        name: Joi.string().required().messages({
            'string.empty': 'Name is required',
        }),
        description: Joi.string().required().messages({
            'string.empty': 'Description is required',
        }),
        type: Joi.string().required().messages({
            'string.empty': 'Type is required',
        }),
        target: Joi.string().required().messages({
            'string.empty': 'Target is required',
        }),
        duration: Joi.string().required().messages({
            'string.empty': 'Duration is required',
        }),
        effect: Joi.string().required().messages({
            'string.empty': 'Effect is required',
        }),
        value: Joi.number().required().messages({
            'number.empty': 'Value is required',
        }),
    }),
});

export default defineNuxtPlugin(() => {
    return {
        provide: {
            joi: Joi,
            authSchema,
            registerSchema,
            heroSchema,
        }
    }
});