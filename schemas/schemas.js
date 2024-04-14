import { z } from "zod";
const minError = (lenght) => {
    if (lenght > 1)
        return `${lenght} characters minimum`;
    return "this field is required";
};
const maxError = (lenght) => `${lenght} characters maximum`;
export const signUpSchema = z
    .object({
    username: z.string().min(1, minError(1)).max(20, maxError(20)),
    password: z.string().min(6, minError(6)).max(100, maxError(100)),
    confirmPassword: z.string(),
})
    .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
        ctx.addIssue({
            code: "custom",
            message: "password dosen't match",
            path: ["confirmPassword"],
        });
    }
});
export const logInSchema = z.object({
    username: z.string().min(1, minError(1)).max(20, maxError(20)),
    password: z.string().min(1, minError(1)).max(100, maxError(100)),
});
export const checkoutFormSchema = z.object({
    firstName: z.string().min(1, minError(1)).max(20, maxError(20)),
    lastName: z.string().min(1, minError(1)).max(100, maxError(100)),
    address: z.string().min(1, minError(1)).max(100, maxError(100)),
    email: z.string().email().min(1, minError(1)).max(100, maxError(100)),
    shippingCountry: z.string().min(1, minError(1)).max(100, maxError(100)),
    city: z.string().min(1, minError(1)).max(100, maxError(100)),
    zipCode: z.string().min(1, minError(1)).max(100, maxError(100)),
});
