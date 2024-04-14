import { checkoutFormSchema, logInSchema, signUpSchema, } from "../schemas/schemas.js";
const signUpValidation = (req, res, next) => {
    const schema = signUpSchema.safeParse(req.body);
    if (!schema.success) {
        return res.status(400).json(schema.error.format());
    }
    return next();
};
const logInValidation = (req, res, next) => {
    const schema = logInSchema.safeParse(req.body);
    if (!schema.success) {
        return res.status(400).json(schema.error.format());
    }
    return next();
};
const checkoutValidation = (req, res, next) => {
    const schema = checkoutFormSchema.safeParse(req.body);
    if (!schema.success) {
        console.log("error: ", schema.error);
        return res.status(400).json(schema.error.format());
    }
    return next();
};
export { signUpValidation, logInValidation, checkoutValidation };
