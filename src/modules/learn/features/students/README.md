# Feature: `students`

**User story:** _As a student, I can add a student with a validated form and see the list._

Route: `/learn`, file `src/app/learn/index.tsx`.

| File                   | Role                                                       |
| ---------------------- | ---------------------------------------------------------- |
| `index.ts`             | Public API of the feature                                  |
| `students-screen.tsx`  | Screen: `FlatList` of students with the form as its header |
| `add-student-form.tsx` | `TextInput`, `Switch`, `Pressable`, Zod `safeParse`        |
| `student-card.tsx`     | One row; `<Link>` to the detail route                      |
