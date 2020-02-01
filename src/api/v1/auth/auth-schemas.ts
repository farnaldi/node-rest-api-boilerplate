import * as Joi from '@hapi/joi';

const registerSchema: Joi.ObjectSchema = Joi.object().keys({
    firstName: Joi.string()
        .required()
        .max(255),
    lastName: Joi.string()
        .required()
        .max(255),
    email: Joi.string()
        .email()
        .required()
        .max(255),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
});

export default registerSchema;
