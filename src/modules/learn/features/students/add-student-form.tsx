/**
 * 📘 CONCEPTS: Core Components (TextInput, Switch, Pressable) + Zod validation
 */
import { useState } from 'react';
import { Pressable, Switch, Text, TextInput, View } from 'react-native';

import { COURSES, type Course, type Student } from '../../data/student';
import { studentFormSchema } from '../../data/student.schema';

const INPUT_CLASS = 'mt-2 rounded-lg border border-input px-3 py-2 text-foreground';

// CONCEPT (TS): a function type as a prop → the parent decides what "add" does
type Props = {
  onAdd: (student: Student) => void;
};

export function AddStudentForm({ onAdd }: Props) {
  // Form fields (TextInput always works with strings)
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  // CONCEPT (TS): useState<Course> → only the 3 allowed course values
  const [course, setCourse] = useState<Course>('React Native');
  const [isActive, setIsActive] = useState(true);
  // CONCEPT (TS): Record<string, string> → object with string keys & values
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleAdd = () => {
    // CONCEPT (Zod): validate the raw form values at runtime
    const result = studentFormSchema.safeParse({ name, age, course, email });

    if (!result.success) {
      // Turn Zod issues into { fieldName: 'message' } to show under each input
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        fieldErrors[String(issue.path[0])] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    // ✅ result.data is now clean & typed (age is a real number here)
    onAdd({
      id: Date.now().toString(),
      ...result.data,
      email: result.data.email || undefined,
      isActive,
    });
    setName('');
    setAge('');
    setEmail('');
    setErrors({});
  };

  return (
    <View className="mb-4 rounded-xl border border-border bg-card p-4">
      <Text className="mb-1 text-lg font-bold text-card-foreground">Add details</Text>

      {/* CONCEPT (Core Component): TextInput = text field */}
      <TextInput value={name} onChangeText={setName} placeholder="Name" className={INPUT_CLASS} />
      <ErrorText message={errors.name} />

      <TextInput
        value={age}
        onChangeText={setAge}
        placeholder="Age"
        keyboardType="number-pad" // shows the numeric keyboard
        className={INPUT_CLASS}
      />
      <ErrorText message={errors.age} />

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email (optional)"
        keyboardType="email-address"
        autoCapitalize="none"
        className={INPUT_CLASS}
      />
      <ErrorText message={errors.email} />

      {/* CONCEPT (Tailwind): conditional classes — the selected chip is highlighted */}
      <View className="mt-3 flex-row flex-wrap gap-2">
        {COURSES.map((c) => (
          <Pressable
            key={c}
            onPress={() => setCourse(c)}
            className={`rounded-full border px-3 py-1 ${course === c ? 'border-primary bg-primary' : 'border-border'}`}>
            <Text className={course === c ? 'text-primary-foreground' : 'text-foreground'}>
              {c}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* CONCEPT (Core Component): Switch = native on/off toggle */}
      <View className="mt-3 flex-row items-center justify-between">
        <Text className="text-foreground">Active student</Text>
        <Switch value={isActive} onValueChange={setIsActive} />
      </View>

      {/* CONCEPT (Core Component): Pressable used as a button */}
      <Pressable
        onPress={handleAdd}
        className="mt-4 items-center rounded-lg bg-primary py-3 active:opacity-80">
        <Text className="font-semibold text-primary-foreground">Add Student</Text>
      </Pressable>
    </View>
  );
}

// CONCEPT (TS): optional prop with `?` — renders nothing if there is no message
function ErrorText({ message }: { message?: string }) {
  if (!message) return null;
  return <Text className="mt-1 text-xs text-destructive">{message}</Text>;
}
