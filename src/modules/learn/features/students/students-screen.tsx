/**
 * 📘 WEEK 1 DEMO SCREEN — route "/learn" (open it from Settings → "Week 1 Demo")
 *
 * Covers:
 *  1. React Native core components → View, Text, TextInput, Pressable, Switch, FlatList, ScrollView
 *  2. TypeScript basics            → data/student.ts, typed state, typed props, union types
 *  3. Tailwind styling             → className="..." (NativeWind)
 *  4. Expo Router                  → src/app/learn/index.tsx and src/app/learn/[id].tsx
 *  5. Zod basics                   → data/student.schema.ts + safeParse in add-student-form.tsx
 */
import { useHeaderHeight } from 'expo-router/react-navigation';
import { useState } from 'react';
import { FlatList, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { INITIAL_STUDENTS, type Student } from '../../data/student';
import { AddStudentForm } from './add-student-form';
import { StudentCard } from './student-card';

export function StudentsScreen() {
  // CONCEPT (TS): useState<Student[]> → this state can only hold Students.
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  // Height of the (see-through) Stack header + the phone's bottom safe area
  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();

  const addStudent = (student: Student) => {
    setStudents((prev) => [student, ...prev]);
  };

  return (
    // CONCEPT (Core Component): View = a box (like <div> on the web)
    <View className="flex-1 bg-background">
      {/*
        CONCEPT (Core Component): FlatList renders long lists efficiently
        (only items on screen are rendered). Prefer it over .map() inside ScrollView.
      */}
      <FlatList
        data={students}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <StudentCard student={item} />}
        contentContainerClassName="px-4"
        // iOS: the header is see-through, so the list starts BEHIND it. We turn off iOS's
        // automatic inset (it jumps around with the keyboard) and add the header height ourselves.
        contentInsetAdjustmentBehavior="never"
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={{ paddingTop: headerHeight + 16, paddingBottom: insets.bottom + 32 }}
        scrollIndicatorInsets={{ top: headerHeight }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        ListHeaderComponent={<AddStudentForm onAdd={addStudent} />}
      />
    </View>
  );
}
