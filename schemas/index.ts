import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(6, { message: "Minimum 6 characters required" }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const ProductSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().int().nonnegative(),
  colors: z.array(z.string().min(1)),
});
