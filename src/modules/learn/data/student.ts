/**
 * 📘 CONCEPT: TypeScript Basics
 *
 * TypeScript = JavaScript + types. Types catch mistakes while you type,
 * before the app even runs.
 */

// CONCEPT (TS): Union type — the value can ONLY be one of these strings.
// Try writing course: 'Python' somewhere → TypeScript shows a red error.
export type Course = 'React Native' | 'TypeScript' | 'Web' | 'Next js';

// CONCEPT (TS): typed array of the union values (used for the course chips)
export const COURSES: Course[] = ['React Native', 'TypeScript', 'Web', 'Next js'];

// CONCEPT (TS): `type` describes the shape of an object.
export type Student = {
  id: string; // string
  name: string; // string
  age: number; // number
  course: Course; // our union type from above
  isActive: boolean; // boolean
  email?: string; // `?` = OPTIONAL property (may be undefined)
};

// CONCEPT (TS): Typed array — a list where every item must be a Student.
export const INITIAL_STUDENTS: Student[] = [
  { id: '1', name: 'Ravi', age: 21, course: 'React Native', isActive: true },
  { id: '2', name: 'Priya', age: 22, course: 'TypeScript', isActive: false },
  { id: '3', name: 'Arjun', age: 20, course: 'Web', isActive: true },
  { id: '4', name: 'sneha', age: 20, course: 'Web', isActive: true },
];

// CONCEPT (TS): Typed function — parameter type and return type.
export function getInitials(name: string): string {
  return name.slice(0, 1).toUpperCase();
}
