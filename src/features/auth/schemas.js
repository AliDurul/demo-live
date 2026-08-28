import { z } from 'zod';

export const signInSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters long.'),
    password: z.string().min(6, 'Password must be at least 6 characters long.')
})

export const signUpSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    firstName: z.string()
        .min(2, "First name must be at least 3 characters")
        .max(50, "First name must be less than 50 characters"),
    lastName: z.string()
        .min(2, "Last name must be at least 3 characters")
        .max(50, "Last name must be less than 50 characters"),
    email: z.email("Invalid email address"),
    password: z.string()
        .min(1, "Required")
        .min(8, "Password must be at least 8 characters")
        .regex(/\d+/, "Must contain a digit")
        .regex(/[a-z]/, "Must contain a lowercase letter")
        .regex(/[A-Z]/, "Must contain an uppercase letter")
        .regex(/[@$?!%&*]+/, "Must contain a special character (@$?!%&*)"),
});