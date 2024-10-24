import Joi from 'joi';

export const authSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
})

export const registerSchema = Joi.object({
    username: Joi.string().required().max(20),
    email:Joi.string().required().regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/),
    password: Joi.string().required().min(6).max(20),
    repeatPassword: Joi.ref('password'),
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