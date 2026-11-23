/**
 * 📘 CONCEPTS: Core Components + Tailwind (NativeWind) styling + Typed props + Expo Router <Link>
 */
import { Link } from 'expo-router';
// CONCEPT (Core Components): these come straight from React Native.
// They become REAL native views on Android / iOS (not HTML).
import { Pressable, Text, View } from 'react-native';

import { getInitials, type Student } from '../../data/student';
import { learnRoutes } from '../../learn.routes';

// CONCEPT (TS): Props type — the component tells everyone what it needs.
type Props = {
  student: Student;
};

export function StudentCard({ student }: Props) {
  return (
    // CONCEPT (Expo Router): <Link> navigates using a URL path (not a screen name).
    // `asChild` passes the press handler to the Pressable below.
    <Link href={learnRoutes.detail(student)} asChild>
      {/* CONCEPT (Core Component): Pressable = anything you can tap */}
      <Pressable className="mb-3 flex-row items-center rounded-xl border border-border bg-card p-4 active:opacity-70">
        {/*
          CONCEPT (Tailwind): utility classes instead of StyleSheet objects.
            flex-row     → children side by side (default in RN is column!)
            items-center → vertical centre
            rounded-full → circle,  size-12 → 48x48
            bg-primary   → theme colour (auto switches in dark mode)
        */}
        <View className="size-12 items-center justify-center rounded-full bg-primary">
          <Text className="text-lg font-bold text-primary-foreground">
            {getInitials(student.name)}
          </Text>
        </View>

        {/* CONCEPT (Tailwind): flex-1 → take remaining space, ml-3 → margin-left */}
        <View className="ml-3 flex-1">
          {/* CONCEPT (Core Component): ALL text must be inside <Text> in RN */}
          <Text className="text-base font-semibold text-card-foreground">{student.name}</Text>
          <Text className="text-sm text-muted-foreground">
            {`${student.course} · ${student.age} yrs`}
          </Text>
        </View>

        {/* CONCEPT (Tailwind): conditional classes — different colour when active */}
        <View className={`rounded-full px-2 py-1 ${student.isActive ? 'bg-success' : 'bg-muted'}`}>
          <Text
            className={`text-xs ${student.isActive ? 'text-background' : 'text-muted-foreground'}`}>
            {student.isActive ? 'Active' : 'Inactive'}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
}
