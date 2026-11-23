/**
 * 📘 CONCEPT: Expo Router — dynamic route screen
 *
 * File: src/app/learn/[id].tsx → URL: /learn/1, /learn/2, ...
 * The route file reads the URL params and passes them here as normal props.
 */
import { useHeaderHeight } from 'expo-router/react-navigation';
import { router, Stack } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';

// CONCEPT (TS): props type — every value is a string because URL params are strings
type Props = {
  id: string;
  name: string;
  age: string;
  course: string;
};

export function StudentDetailScreen({ id, name, age, course }: Props) {
  const headerHeight = useHeaderHeight();

  return (
    // CONCEPT (Core Component): ScrollView = scrollable container (for short content)
    <ScrollView
      className="flex-1 bg-background"
      contentContainerClassName="px-4"
      // Same fix as the list: start below the see-through header, no iOS auto inset
      contentInsetAdjustmentBehavior="never"
      automaticallyAdjustContentInsets={false}
      contentContainerStyle={{ paddingTop: headerHeight + 16, paddingBottom: 32 }}>
      {/* CONCEPT (Expo Router): set the header title from inside the screen */}
      <Stack.Screen options={{ title: name || 'Student' }} />

      <View className="items-center rounded-xl border border-border bg-card p-6">
        <View className="size-20 items-center justify-center rounded-full bg-primary">
          <Text className="text-3xl font-bold text-primary-foreground">{name.slice(0, 1)}</Text>
        </View>
        <Text className="mt-3 text-2xl font-bold text-card-foreground">{name}</Text>
        <Text className="mt-1 text-muted-foreground">{`${course} · ${age} yrs`}</Text>
        <Text className="mt-4 text-xs text-muted-foreground">{`Route: /learn/${id}`}</Text>
      </View>

      {/* CONCEPT (Expo Router): imperative navigation with `router` */}
      <Pressable
        onPress={() => router.back()}
        className="mt-4 items-center rounded-lg bg-secondary py-3 active:opacity-80">
        <Text className="font-semibold text-secondary-foreground">Go Back</Text>
      </Pressable>
    </ScrollView>
  );
}
