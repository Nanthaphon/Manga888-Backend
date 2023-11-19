const Joi = require("joi");
const { register } = require("../controller/auth-controller");

const registerSchema = Joi.object({
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  email: Joi.string().trim().email(),
  password: Joi.string()
    .pattern(new RegExp("[a-zA-Z0-9]{3,30}$"))
    .trim()
    .required(),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .trim()
    .required()
    .strip(),
});
exports.registerSchema = registerSchema;

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
exports.loginSchema = loginSchema;
