# Feature: `student-detail`

**User story:** _As a student, I can tap a student and see their details._

Route: `/learn/[id]`, file `src/app/learn/[id].tsx` (reads URL params, passes them as props).

| File                        | Role                                        |
| --------------------------- | ------------------------------------------- |
| `index.ts`                  | Public API of the feature                   |
| `student-detail-screen.tsx` | `ScrollView`, header title, `router.back()` |
