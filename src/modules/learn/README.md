# Module: `learn` (Week 1 teaching demo)

A small "Students" demo used to teach the Week 1 topics. Every file has `📘 CONCEPT:` comments
saying which topic that code shows.

| Topic                              | Where to look                                                             |
| ---------------------------------- | ------------------------------------------------------------------------- |
| 1. React Native core components    | `features/students/*`, `features/student-detail/*`                        |
| 2. TypeScript basics               | `data/student.ts`, typed props and state in every component               |
| 3. Tailwind styling (NativeWind)   | `className="..."` everywhere, conditional classes in `student-card.tsx`   |
| 4. Expo Router vs React Navigation | `src/app/learn/index.tsx`, `src/app/learn/[id].tsx`, `learn.routes.ts`    |
| 5. Zod basics                      | `data/student.schema.ts`, `safeParse` in `add-student-form.tsx`, the test |

Open it from **Settings → Week 1 Demo** (route `/learn`). Data is local state only (no API).

## Features

- [`students`](features/students/README.md) — list of students + add form
- [`student-detail`](features/student-detail/README.md) — one student, route `/learn/[id]`
