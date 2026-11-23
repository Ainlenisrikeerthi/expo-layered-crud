import { useLocalSearchParams } from 'expo-router';

import { StudentDetailScreen } from '@/modules/learn';

/**
 * 📘 CONCEPT: Expo Router — dynamic route
 *   [id] = URL variable → /learn/1, /learn/42 ...
 *   React Navigation equivalent: navigation.navigate('StudentDetail', { id: '1' })
 *
 * The route file's only job: read the URL params and hand them to the screen.
 */
export default function StudentDetailRoute() {
  // CONCEPT (Expo Router + TS): read URL params with their types
  const { id, name, age, course } = useLocalSearchParams<{
    id: string;
    name: string;
    age: string;
    course: string;
  }>();
  return <StudentDetailScreen id={id} name={name ?? ''} age={age ?? ''} course={course ?? ''} />;
}
