import { UserRole } from "@prisma/client";
import * as z from "zod";
import { categories, colors } from "@/app/types";
export const LoginSchema = z.object({
  email: z.string().email({
    message: "⚠️Email is required",
  }),
  password: z.string().min(1, {
    message: "⚠️Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "⚠️Email is required",
  }),
  password: z.string().min(6, {
    message: "⚠️Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "⚠️Name is required",
  }),
});


export const addProductSchema = z.object({
   sku: z.string().min(9, {message:'SKU must contain at least 3 characters'}), //XXX-YYY-ZZZ
  name: z.string().min(1, {
    message: "⚠️Name is required",
  }).max(40, { message: "Name can't be longer than 40 characters" })
  ,
  description: z.string().min(1, {
    message: "⚠️Description is required",
  }).max(200, { message: "Description can't be longer than 200 characters" }),
  category: z.enum(categories, {
    errorMap: (issue, ctx) => ({ message: '⚠️Invalid' })
  }),
  color: z.enum(colors, {
    errorMap: (issue, ctx) => ({ message: '⚠️Invalid' })
  }),
  price: z.coerce.number().min(1, {
    message: "⚠️Price can't be less than 1",
  }),
  image: z.string().min(1, {
    message: "⚠️Image is required",
  }),
  stock: z.coerce.number().min(1, {
    message: "⚠️Stock mus't be at least 1",
  }),
  sizes: z.array(z.object({
    name: z.string().or(z.literal("XS")).or(z.literal("S")).or(z.literal("M")).or(z.literal("L")).or(z.literal("XL")).or(z.literal("XXL")),
    stock: z.number().min(0, {
      message: "⚠️Stock is required",
    }),
  }))
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "⚠️Email is required",
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "⚠️Minimum of 6 characters required",
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
      message: "⚠️New password is required!",
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
      message: "⚠️Password is required!",
      path: ["password"],
    }
  );
