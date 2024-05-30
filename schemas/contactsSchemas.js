import Joi from "joi";

export const createContactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ukr'] } }).required(),
    phone: Joi.string().required()
})

export const updateContactSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ukr'] } }),
    phone: Joi.string(),
}).min(1).messages({'any.required': "Body must have at least one field"});