import { describe, it, expect } from "vitest";
import { leadFormSchema, calculatorFormSchema, registerSchema } from "@/lib/validations";

describe("leadFormSchema", () => {
  it("accepts a valid lead submission", () => {
    const result = leadFormSchema.safeParse({
      fullName: "Amit Kumar",
      phone: "9876543210",
      pincode: "226022",
      propertyType: "HOME",
    });
    expect(result.success).toBe(true);
  });

  it("rejects an invalid Indian phone number", () => {
    const result = leadFormSchema.safeParse({
      fullName: "Amit Kumar",
      phone: "12345",
      pincode: "226022",
      propertyType: "HOME",
    });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid pincode", () => {
    const result = leadFormSchema.safeParse({
      fullName: "Amit Kumar",
      phone: "9876543210",
      pincode: "12",
      propertyType: "HOME",
    });
    expect(result.success).toBe(false);
  });

  it("passes schema validation even with a filled honeypot (bot rejection happens in the API route, not the schema, so the response can look like success)", () => {
    const result = leadFormSchema.safeParse({
      fullName: "Bot",
      phone: "9876543210",
      pincode: "226022",
      propertyType: "HOME",
      website: "http://spam.example.com",
    });
    expect(result.success).toBe(true);
  });
});

describe("calculatorFormSchema", () => {
  it("rejects a bill below the minimum", () => {
    const result = calculatorFormSchema.safeParse({ pincode: "226022", monthlyBill: 100 });
    expect(result.success).toBe(false);
  });

  it("accepts a bill within range", () => {
    const result = calculatorFormSchema.safeParse({ pincode: "226022", monthlyBill: 3000 });
    expect(result.success).toBe(true);
  });
});

describe("registerSchema", () => {
  it("rejects a weak password", () => {
    const result = registerSchema.safeParse({
      name: "Test User",
      email: "test@example.com",
      phone: "9876543210",
      password: "weak",
    });
    expect(result.success).toBe(false);
  });

  it("accepts a strong password", () => {
    const result = registerSchema.safeParse({
      name: "Test User",
      email: "test@example.com",
      phone: "9876543210",
      password: "StrongPass123",
    });
    expect(result.success).toBe(true);
  });
});
