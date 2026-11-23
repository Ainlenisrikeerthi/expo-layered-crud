import type { Href } from 'expo-router';

import type { Student } from './data/student';

/**
 * 📘 CONCEPT (Expo Router + TS): every route of the LEARN module in one place.
 * Route files live in `src/app/learn/`.
 *   src/app/learn/index.tsx → "/learn"
 *   src/app/learn/[id].tsx  → "/learn/1", "/learn/2", ...  ([id] = URL variable)
 */
export const learnRoutes = {
  students: '/learn' as const satisfies Href,
  // params become part of the URL → /learn/1?name=Ravi&age=21&course=Web
  detail: (student: Student) =>
    ({
      pathname: '/learn/[id]',
      params: {
        id: student.id,
        name: student.name,
        age: String(student.age),
        course: student.course,
      },
    }) satisfies Href,
};
