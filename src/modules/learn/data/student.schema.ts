/**
 * 📘 CONCEPT: Zod Basics (TypeScript-first validation)
 *
 * TypeScript checks types only while CODING.
 * Zod checks real data while the app is RUNNING (user input, API responses).
 */
import { z } from 'zod';

// CONCEPT (Zod): A schema = the rules the data must follow.
export const studentFormSchema = z.object({
  // string, at least 2 characters, with a custom error message
  name: z.string().trim().min(2, 'Name must be at least 2 characters'),

  // TextInput always gives us a string → z.coerce.number() converts "21" → 21
  age: z.coerce
    .number({ message: 'Age must be a number' })
    .int('Age must be a whole number')
    .min(16, 'Minimum age is 16')
    .max(60, 'Maximum age is 60'),

  // enum = only these values are allowed (same idea as the TS union type)
  course: z.enum(['React Native', 'TypeScript', 'Web', 'Next js']),

  // optional + must look like an email when it is filled
  email: z.email('Invalid email').optional().or(z.literal('')),
});

// CONCEPT (Zod + TS): z.infer creates a TypeScript type FROM the schema.
// One source of truth → no need to write the type twice.
export type StudentForm = z.infer<typeof studentFormSchema>;

// CONCEPT (Zod): safeParse never throws. It returns
//   { success: true, data }   or   { success: false, error }
// Example:
//   studentFormSchema.safeParse({ name: 'A', age: '10', course: 'Web' })
//   → success: false (name too short, age below 16)
