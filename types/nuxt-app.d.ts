import Joi from 'joi';

declare module '#app' {
  interface NuxtApp {
    $authSchema: Joi.Schema;
    $registerSchema: Joi.Schema;
  }
}