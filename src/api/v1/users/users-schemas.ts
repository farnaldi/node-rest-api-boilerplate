import * as Joi from '@hapi/joi';

const patchUserSchema: Joi.ObjectSchema = Joi.object().keys({
    firstName: Joi.string()
        .max(255)
        .optional(),
    lastName: Joi.string()
        .max(255)
        .optional(),
    email: Joi.string()
        .email()
        .max(255)
        .optional(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .optional(),
    role: Joi.string()
        .max(255)
        .optional(),
});

export default patchUserSchema;
