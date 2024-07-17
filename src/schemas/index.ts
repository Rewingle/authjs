import { UserRole } from "@prisma/client";
import * as z from "zod";
import { categories } from "@/app/types";
export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const addProductSchema = z.object({
  sku: z.string().min(1, {}), //XXX-YYY-ZZZ
  name: z.string().min(1, {
    message: "Name is required",
  }).max(40, { message: "Name can't be longer than 40 characters" })
  ,
  description: z.string().min(1, {
    message: "Description is required",
  }).max(200, { message: "Description can't be longer than 200 characters" }),
  category: z.string()
    .or(z.literal("Tshirt"))
    .or(z.literal("Shirt"))
    .or(z.literal("Pants"))
    .or(z.literal("Shoes"))
    .or(z.literal("Hoodie"))
    .or(z.literal("Jacket"))
    .or(z.literal("Shorts"))
    .or(z.literal("Sweater"))
    .or(z.literal("Socks"))
    .or(z.literal("Underwear"))
    .or(z.literal("Accessories"))
    .or(z.literal("Other")),
  color: z.string()
    .or(z.literal("Black"))
    .or(z.literal("White"))
    .or(z.literal("Red"))
    .or(z.literal("Blue"))
    .or(z.literal("Green"))
    .or(z.literal("Yellow"))
    .or(z.literal("Orange"))
    .or(z.literal("Purple"))
    .or(z.literal("Pink"))
    .or(z.literal("Brown"))
    .or(z.literal("Grey"))
    .or(z.literal("Beige"))
    .or(z.literal("Mixed")),
  price: z.number().min(0, {
    message: "Price can't be negative number",
  }),
  image: z.string().min(1, {
    message: "Image is required",
  }),
  stock: z.number().min(0, {
    message: "Stock can't be negative number",
  }),
  sizes: z.array(z.object({
    name: z.string().or(z.literal("XS")).or(z.literal("S")).or(z.literal("M")).or(z.literal("L")).or(z.literal("XL")).or(z.literal("XXL")),
    stock: z.number().min(0, {
      message: "Stock is required",
    }),
  }))
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    }
  );
