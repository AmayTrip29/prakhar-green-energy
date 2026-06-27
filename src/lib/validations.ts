import { z } from "zod";

// Indian mobile number: optional +91, then 6-9 followed by 9 digits.
const indianPhoneRegex = /^(?:\+91)?[6-9]\d{9}$/;
const pincodeRegex = /^[1-9][0-9]{5}$/;

export const leadFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(100, "Name is too long.")
    .regex(/^[a-zA-Z\s.'-]+$/, "Name can only contain letters and spaces."),
  phone: z
    .string()
    .trim()
    .regex(indianPhoneRegex, "Enter a valid 10-digit Indian mobile number."),
  pincode: z
    .string()
    .trim()
    .regex(pincodeRegex, "Enter a valid 6-digit pincode."),
  monthlyBill: z
    .number({ invalid_type_error: "Monthly bill must be a number." })
    .min(0, "Monthly bill cannot be negative.")
    .max(1000000, "Please enter a realistic monthly bill.")
    .optional(),
  propertyType: z.enum(["HOME", "HOUSING_SOCIETY", "COMMERCIAL"]).default("HOME"),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .optional()
    .or(z.literal("")),
  message: z.string().trim().max(1000, "Message is too long.").optional(),
  // Honeypot field — invisible to real users; bots that fill it are
  // silently "succeeded" in the API route rather than rejected here, so
  // we don't reveal the anti-spam mechanism via a validation error.
  website: z.string().optional().or(z.literal("")),
});

export type LeadFormInput = z.infer<typeof leadFormSchema>;

export const calculatorFormSchema = z.object({
  pincode: z.string().trim().regex(pincodeRegex, "Enter a valid 6-digit pincode."),
  monthlyBill: z
    .number({ invalid_type_error: "Monthly bill must be a number." })
    .min(500, "Minimum bill amount is ₹500.")
    .max(50000, "Maximum bill amount is ₹50,000."),
});

export type CalculatorFormInput = z.infer<typeof calculatorFormSchema>;

export const contactFormSchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  phone: z.string().trim().regex(indianPhoneRegex, "Enter a valid 10-digit Indian mobile number."),
  email: z.string().trim().email().optional().or(z.literal("")),
  subject: z.string().trim().min(2).max(150),
  message: z.string().trim().min(10, "Please add a bit more detail.").max(2000),
  website: z.string().optional().or(z.literal("")),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

export const registerSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().toLowerCase().email("Enter a valid email address."),
  phone: z.string().trim().regex(indianPhoneRegex, "Enter a valid 10-digit Indian mobile number."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(72, "Password is too long.")
    .regex(/[a-z]/, "Password must include a lowercase letter.")
    .regex(/[A-Z]/, "Password must include an uppercase letter.")
    .regex(/[0-9]/, "Password must include a number."),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(1, "Password is required."),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const blogPostSchema = z.object({
  title: z.string().trim().min(3).max(200),
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens."),
  excerpt: z.string().trim().min(10).max(300),
  content: z.string().trim().min(20),
  coverImageUrl: z.string().trim().url().optional().or(z.literal("")),
  published: z.boolean().default(false),
});

export type BlogPostInput = z.infer<typeof blogPostSchema>;

export const leadStatusUpdateSchema = z.object({
  leadId: z.string().cuid(),
  status: z.enum([
    "NEW",
    "CONTACTED",
    "SITE_VISIT_SCHEDULED",
    "SITE_VISIT_DONE",
    "PROPOSAL_SENT",
    "WON",
    "LOST",
  ]),
  notes: z.string().max(2000).optional(),
});

export type LeadStatusUpdateInput = z.infer<typeof leadStatusUpdateSchema>;
