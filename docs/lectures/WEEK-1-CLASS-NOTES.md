# Week 1 Class Notes: Teaching Script with Code

> **Branch:** `demo/week1-basics` · **Demo route:** Settings tab → **Week 1 Demo** (`/learn`)
>
> **This week's topics**
>
> 1. React Native core components
> 2. TypeScript basics
> 3. Styling with Tailwind (NativeWind)
> 4. Expo Router, and how it differs from React Navigation
> 5. Zod basics (TypeScript-first validation)
>
> How to use this file: go top to bottom. **🗣 Say** is what to tell the class, **💻 Show** is the
> file to open, **🧪 Try live** is a small change you make in front of them to show the idea.

---

## 0. Class plan (about 2 hours)

| #   | Part                                                     | Time   |
| --- | -------------------------------------------------------- | ------ |
| 1   | Run the app, tour of the folder structure                | 15 min |
| 2   | Start at the Settings screen: components, props, imports | 20 min |
| 3   | Expo Router: how tapping the row opens `/learn`          | 20 min |
| 4   | React Native core components (Students screen)           | 20 min |
| 5   | Tailwind styling with NativeWind                         | 15 min |
| 6   | TypeScript basics (`student.ts` + typed props and state) | 15 min |
| 7   | Zod: validating the Add Student form                     | 15 min |
| 8   | Recap, questions, homework                               | 10 min |

**Before class**

```bash
cd expo-layered-crud
npm install
npm start          # press i (iOS), a (Android) or w (web)
npm run typecheck  # should print nothing (no errors)
npx jest src/modules/learn   # 2 Zod tests should pass
```

---

## 1. Folder structure: where every file lives

🗣 **Say:** "Before writing code, you must know _where_ code goes. In a big app, a wrong folder is a
bigger problem than a wrong line."

```
expo-layered-crud/
├── src/
│   ├── app/                 ← ROUTES (Expo Router). One file = one screen URL.
│   │   ├── _layout.tsx          root Stack navigator (wraps the whole app)
│   │   ├── (tabs)/              bottom tabs: Home · Products · Settings
│   │   │   ├── _layout.tsx
│   │   │   ├── index.tsx        → "/"
│   │   │   ├── products.tsx     → "/products"
│   │   │   └── settings.tsx     → "/settings"
│   │   └── learn/               ← 📘 Week 1 demo routes
│   │       ├── index.tsx        → "/learn"
│   │       └── [id].tsx         → "/learn/1", "/learn/2" ...
│   │
│   ├── modules/             ← BUSINESS CODE. One folder per business area.
│   │   ├── catalog/  home/  settings/
│   │   └── learn/               ← 📘 Week 1 demo module
│   │       ├── index.ts             PUBLIC API (the only "door" into the module)
│   │       ├── learn.routes.ts      every URL of this module, in one place
│   │       ├── README.md
│   │       ├── data/
│   │       │   ├── student.ts           TypeScript types + sample data
│   │       │   ├── student.schema.ts    Zod schema
│   │       │   └── __tests__/student.schema.test.ts
│   │       └── features/            one folder per use case
│   │           ├── students/            list + add form       (route /learn)
│   │           └── student-detail/      one student           (route /learn/[id])
│   │
│   └── shared/              ← code ANY module can use (no business logic)
│       ├── ui/                  basic building blocks (Button, Text, Separator ...)
│       ├── components/          composed pieces (SettingsRow, FormField ...)
│       ├── hooks/  lib/  api/  config/  providers/
│
├── tailwind.config.js      Tailwind theme (colors point to CSS variables)
├── src/global.css          the actual light/dark color values
└── tsconfig.json           TypeScript settings + the "@/..." import alias
```

### The 3 kinds of folders

| Folder        | Question it answers             | May import from                                                      |
| ------------- | ------------------------------- | -------------------------------------------------------------------- |
| `src/app`     | "Which URL shows which screen?" | `@/modules/<name>` (public API only), `@/shared`                     |
| `src/modules` | "What does the business do?"    | its own files (relative `./`), other modules' public API, `@/shared` |
| `src/shared`  | "What does any app need?"       | only `@/shared` and libraries. **Never** a module                    |

🗣 **Say:** "This is called _vertical slicing_. All files for one feature sit in **one folder**. To
delete the Week 1 demo, we delete `src/app/learn/` and `src/modules/learn/`, remove one row from
Settings, and that's it."

### Rules for where to put a new file

| You are writing...                         | Put it in                                      |
| ------------------------------------------ | ---------------------------------------------- |
| A new URL / screen route                   | `src/app/...` (keep it thin, 1–10 lines)       |
| The screen's real UI                       | `src/modules/<module>/features/<feature>/`     |
| A small component used only by one feature | same feature folder (e.g. `student-card.tsx`)  |
| Types, schemas, API calls for a module     | `src/modules/<module>/data/`                   |
| A component every module could reuse       | `src/shared/components/` or `src/shared/ui/`   |
| File names                                 | `kebab-case.tsx` (e.g. `add-student-form.tsx`) |

---

## 2. Start here: the Settings screen (components, props, imports)

💻 **Show:** `src/app/(tabs)/settings.tsx`

```tsx
// Route "/settings" (Settings tab). The screen lives in src/modules/settings/features/app-settings.
export { SettingsScreen as default } from '@/modules/settings';
```

🗣 **Say:** "This whole route file is ONE line. Expo Router needs a **default export** from each
route file. We re-export `SettingsScreen` from the settings module and call it `default`. The route
file only connects a URL to a screen. The real UI lives in the module."

💻 **Show:** `src/modules/settings/features/app-settings/settings-screen.tsx` (the new row in the
"Developer" group)

```tsx
import { router } from 'expo-router';
import { GraduationCap, Palette /* ... */ } from 'lucide-react-native';
import { ScrollView, View } from 'react-native';

import { learnRoutes } from '@/modules/learn';
import { SettingsGroup, SettingsRow } from '@/shared/components/settings-row';
import { Separator } from '@/shared/ui/separator';

export function SettingsScreen() {
  return (
    <ScrollView className="flex-1 bg-background" contentContainerClassName="gap-6 p-4 pb-10">
      {/* ... Appearance group ... */}

      <SettingsGroup title="Developer">
        {/* 📘 WEEK 1 DEMO: entry point to the teaching screens (route "/learn") */}
        <SettingsRow
          icon={GraduationCap}
          label="Week 1 Demo"
          description="Core components, TS, Tailwind, Expo Router, Zod"
          onPress={() => router.navigate(learnRoutes.students)}
        />
        <Separator />
        {/* ... UI Sandbox, Reset cached data ... */}
      </SettingsGroup>
    </ScrollView>
  );
}
```

### 2.1 What is a component?

🗣 **Say:** "A component is just a **function that returns UI** (JSX). Its name starts with a
capital letter. `SettingsScreen` is a component. `SettingsRow` is a component. `SettingsGroup` is a
component. We build screens by putting small components inside bigger ones, like LEGO."

```
SettingsScreen
└── ScrollView
    └── SettingsGroup (title="Developer")
        ├── SettingsRow (Week 1 Demo)
        ├── Separator
        └── SettingsRow (UI Sandbox) ...
```

### 2.2 What are props?

🗣 **Say:** "Props are the **inputs** of a component, the same way arguments are the inputs of a
function. The parent decides the values, the child only uses them. Props go **one way**: from
parent to child."

💻 **Show:** `src/shared/components/settings-row.tsx`, which is the receiving side:

```tsx
export function SettingsRow({
  icon, // which icon to draw
  label, // main text
  description, // small grey text (optional)
  value, // text on the right (optional)
  onPress, // what happens on tap (optional)
  right, // any custom element on the right (optional)
  destructive, // red style (optional)
}: {
  icon: LucideIcon;
  label: string;
  description?: string; // ? = optional
  value?: string;
  onPress?: () => void; // a FUNCTION passed as a prop
  right?: ReactNode; // any JSX passed as a prop
  destructive?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      className="flex-row items-center gap-3 px-4 py-3.5 active:bg-accent">
      <View className="rounded-md bg-muted p-2">
        <Icon as={icon} className="size-4" />
      </View>
      <View className="flex-1">
        <Text className="text-base">{label}</Text>
        {description ? <Text variant="muted">{description}</Text> : null}
      </View>
      {/* ... */}
    </Pressable>
  );
}
```

Teach these points one by one:

| Point                                   | Example in this file                                                          |
| --------------------------------------- | ----------------------------------------------------------------------------- |
| Props are destructured in the arguments | `function SettingsRow({ icon, label, ... })`                                  |
| Props have types                        | `label: string`, `onPress?: () => void`                                       |
| `?` means the prop is optional          | `description?: string`, so the UI Sandbox row can skip it                     |
| A prop can be a **component**           | `icon={GraduationCap}` (we pass the icon itself, not `<GraduationCap />`)     |
| A prop can be a **function**            | `onPress={() => router.navigate(...)}`, so the parent decides what a tap does |
| Conditional rendering with props        | `{description ? <Text>...</Text> : null}`                                     |
| `children` is a special prop            | `SettingsGroup` receives the rows between its tags as `children`              |

```tsx
// SettingsGroup: whatever is between <SettingsGroup> and </SettingsGroup> arrives as `children`
export function SettingsGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View className="gap-2">
      <Text className="...">{title}</Text>
      <View className="overflow-hidden rounded-lg border border-border bg-card">{children}</View>
    </View>
  );
}
```

🧪 **Try live:**

1. Remove `label="Week 1 Demo"` and you get a red TypeScript error: _Property 'label' is missing_.
   "TypeScript protects props."
2. Remove `description=...` and there is no error, because it's optional. The row just shows less text.
3. Change `icon={GraduationCap}` to `icon={Palette}` and the icon changes. Same component, different props.

> ⚠️ **Teaching moment: a real bug we just fixed.** In JSX, a comment must be written as
> `{/* ... */}`. Plain text such as `📘 WEEK 1 DEMO: ...` sitting directly inside a `<View>`
> **crashes** React Native with _"Text strings must be rendered within a `<Text>` component"_.
> On the web this would just show the text, but in React Native **all text must be inside `<Text>`**.

### 2.3 How imports work

Look at the top of `settings-screen.tsx`. There are **4 kinds of import**:

```tsx
// 1) Library imports (from node_modules)
import { router } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { GraduationCap } from 'lucide-react-native';

// 2) Alias imports: "@/" means "src/". Used to reach ANOTHER module or shared code.
import { learnRoutes } from '@/modules/learn';
import { SettingsRow } from '@/shared/components/settings-row';

// 3) Relative imports: "./" or "../". Used INSIDE the same module.
import { settingsRoutes } from '../../settings.routes';
import { useResetServerData } from './use-reset-server-data';

// 4) Type-only imports: removed when the app is built, used only for checking
import { useThemePreference, type ThemePreference } from '@/shared/hooks/use-theme-preference';
```

🗣 **Say:** "Where does `@/` come from? `tsconfig.json`:"

```json
"paths": {
  "@/*": ["./src/*"]
}
```

So `@/modules/learn` is `src/modules/learn`. And because `learn` is a **folder**, the import loads
`src/modules/learn/index.ts`, the module's **public API**:

```ts
// src/modules/learn/index.ts
/** PUBLIC API of the LEARN module (Week 1 teaching demo). */
export { learnRoutes } from './learn.routes';
export { StudentsScreen } from './features/students';
export { StudentDetailScreen } from './features/student-detail';
```

🗣 **Say:** "`index.ts` is the **front door** of the module. Settings only knows `learnRoutes`.
It does NOT reach inside, for example `@/modules/learn/features/students/student-card`. If the learn
team renames internal files, Settings doesn't break."

### 2.4 Named export vs default export

| Kind    | Write it as                                    | Import it as                        | We use it for                                            |
| ------- | ---------------------------------------------- | ----------------------------------- | -------------------------------------------------------- |
| Named   | `export function StudentCard() {}`             | `import { StudentCard } from '...'` | **Everything** in modules/shared                         |
| Default | `export default function StudentDetailRoute()` | `import Anything from '...'`        | **Only** route files in `src/app` (Expo Router needs it) |

```tsx
// Re-export a named export AS the default (one-line route file)
export { StudentsScreen as default } from '@/modules/learn';
```

---

## 3. Expo Router: how tapping the row opens `/learn`

### 3.1 The path of a tap

```
Settings row tapped
  → onPress={() => router.navigate(learnRoutes.students)}
  → learnRoutes.students === '/learn'
  → Expo Router looks for the file  src/app/learn/index.tsx
  → that file default-exports StudentsScreen
  → the root Stack (_layout.tsx) pushes it on top of the tabs
```

### 3.2 File-based routing: the file IS the route

💻 **Show:** `src/app/learn/index.tsx`

```tsx
/**
 * This FILE creates the route "/learn" automatically. No registration needed.
 */
export { StudentsScreen as default } from '@/modules/learn';
```

| File                          | URL                                                          |
| ----------------------------- | ------------------------------------------------------------ |
| `src/app/(tabs)/index.tsx`    | `/`                                                          |
| `src/app/(tabs)/settings.tsx` | `/settings` (the `(tabs)` group is NOT in the URL)           |
| `src/app/learn/index.tsx`     | `/learn`                                                     |
| `src/app/learn/[id].tsx`      | `/learn/1`, `/learn/42` …                                    |
| `src/app/_layout.tsx`         | not a screen, it is the **navigator** that wraps the screens |

Special file and folder names:

- `_layout.tsx` is the navigator (Stack / Tabs) for that folder.
- `(tabs)` is a **group**: it organises files without changing the URL.
- `[id]` is a **dynamic segment**, a URL variable.
- `+not-found.tsx` is the 404 screen.

### 3.3 Layouts: tabs inside a stack

💻 **Show:** `src/app/_layout.tsx`

```tsx
export default function RootLayout() {
  return (
    <AppProviders>
      <Stack screenOptions={{ headerBackButtonDisplayMode: 'minimal', headerShadowVisible: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* ... products, ui-sandbox ... */}
        {/* 📘 WEEK 1 DEMO (Expo Router): Stack screens pushed on top of the tabs */}
        <Stack.Screen name="learn/index" options={{ title: 'Week 1 Demo' }} />
        <Stack.Screen name="learn/[id]" options={{ title: 'Student' }} />
      </Stack>
    </AppProviders>
  );
}
```

🗣 **Say:** "The root is a **Stack**, like a pile of cards. The tabs are the bottom card. `/learn`
is pushed on top, so it covers the tab bar and gets a back button. `<Stack.Screen>` here does NOT
create the route (the file does). It only sets **options** like the header title."

### 3.4 Dynamic route + params

💻 **Show:** `src/modules/learn/learn.routes.ts`

```ts
import type { Href } from 'expo-router';
import type { Student } from './data/student';

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
```

🗣 **Say:** "We keep every URL of the module in **one object**. No one types `'/learn'` by hand in
10 places. `satisfies Href` asks TypeScript to check that this is a **real route**. A typo like
`'/lern'` turns red."

💻 **Show:** `src/modules/learn/features/students/student-card.tsx`, which navigates with `<Link>`:

```tsx
<Link href={learnRoutes.detail(student)} asChild>
  <Pressable className="...">...</Pressable>
</Link>
```

💻 **Show:** `src/app/learn/[id].tsx`, which reads the params:

```tsx
export default function StudentDetailRoute() {
  const { id, name, age, course } = useLocalSearchParams<{
    id: string;
    name: string;
    age: string;
    course: string;
  }>();
  return <StudentDetailScreen id={id} name={name ?? ''} age={age ?? ''} course={course ?? ''} />;
}
```

🗣 **Say:** "The route file reads the URL and passes the values as **normal props** to the screen.
The screen doesn't know about URLs. Note that `age` is a `string` here, because **everything in a URL
is a string**."

💻 **Show:** `student-detail-screen.tsx`, which changes the header from inside the screen and goes back:

```tsx
<Stack.Screen options={{ title: name || 'Student' }} />
...
<Pressable onPress={() => router.back()}>...</Pressable>
```

### 3.5 Three ways to navigate

| API                     | Use it when                                  | Example in this repo   |
| ----------------------- | -------------------------------------------- | ---------------------- |
| `<Link href="...">`     | the user taps something (declarative)        | `StudentCard` → detail |
| `router.push(href)`     | in code, always add a new screen             | Settings → UI Sandbox  |
| `router.navigate(href)` | in code, go there (reuse it if already open) | Settings → Week 1 Demo |
| `router.back()`         | go to the previous screen                    | "Go Back" button       |
| `router.replace(href)`  | swap the current screen (e.g. after login)   | (not used yet)         |

### 3.6 Expo Router vs React Navigation (the comparison the class asked about)

The **same screen** in both:

```tsx
// ───────── React Navigation (manual) ─────────
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Students" component={StudentsScreen} />
        <Stack.Screen name="StudentDetail" component={StudentDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
// navigate by screen NAME, params in an object
navigation.navigate('StudentDetail', { id: '1' });
// read params
const { id } = route.params;
```

```tsx
// ───────── Expo Router (file-based) ─────────
// create src/app/learn/index.tsx and src/app/learn/[id].tsx and you're done
router.push('/learn/1'); // navigate by URL PATH
<Link href="/learn/1">Open</Link>;
const { id } = useLocalSearchParams(); // read params
```

| Topic            | React Navigation                               | Expo Router                                            |
| ---------------- | ---------------------------------------------- | ------------------------------------------------------ |
| How routes exist | You register each screen in code               | Each **file** in `src/app` is a route                  |
| Navigate by      | Screen **name** (`'StudentDetail'`)            | URL **path** (`'/learn/1'`)                            |
| Deep links       | Extra `linking` config by hand                 | Free: every screen already has a URL                   |
| Web support      | Extra work                                     | Same URLs work in the browser                          |
| Type safety      | You write a `RootStackParamList` type yourself | **Typed routes** generated from the files              |
| Under the hood   | It IS the navigation library                   | **Built on top of React Navigation** (same Stack/Tabs) |
| Similar to       | Classic mobile navigation                      | Next.js app router                                     |

🗣 **Say:** "Expo Router is not a _replacement_ for React Navigation. It is React Navigation plus
file-based routing. That's why we can import `useHeaderHeight` from `expo-router/react-navigation`."

🧪 **Try live:** create `src/app/learn/about.tsx` with
`export default function About() { return <Text>About</Text>; }`, then open `/learn/about`
(on web, type it in the address bar). "A new screen with zero registration." Delete it after.

---

## 4. React Native core components

💻 **Show:** `students-screen.tsx`, `add-student-form.tsx`, `student-card.tsx`, `student-detail-screen.tsx`

🗣 **Say:** "Core components come from `react-native`. They are NOT HTML. On Android/iOS they
become **real native views**. `<View>` becomes `android.view.View` / `UIView`."

| Component    | Web equivalent     | Where in the demo                      | Key props                                                                |
| ------------ | ------------------ | -------------------------------------- | ------------------------------------------------------------------------ |
| `View`       | `<div>`            | every card / row                       | `className`, `style`                                                     |
| `Text`       | `<p>`, `<span>`    | every label                            | `numberOfLines`                                                          |
| `TextInput`  | `<input>`          | Name / Age / Email                     | `value`, `onChangeText`, `placeholder`, `keyboardType`, `autoCapitalize` |
| `Pressable`  | `<button>`         | Add button, course chips, student card | `onPress`, `disabled`                                                    |
| `Switch`     | checkbox toggle    | "Active student"                       | `value`, `onValueChange`                                                 |
| `ScrollView` | scrolling `<div>`  | detail screen, Settings screen         | `contentContainerClassName`                                              |
| `FlatList`   | (virtualised list) | the students list                      | `data`, `renderItem`, `keyExtractor`, `ListHeaderComponent`              |

### The 4 rules that surprise web developers

1. **All text must be inside `<Text>`.** Plain text in a `<View>` crashes the app (see the bug in 2.2).
2. **Flexbox is the default and the direction is `column`.** Items stack vertically. Use `flex-row`
   to put them side by side.
3. **No CSS cascade.** A `<View>`'s text color does NOT flow into its `<Text>` children. Style the
   `<Text>` itself.
4. **No `onClick`. Use `onPress`.** No `onChange` on inputs either. Use `onChangeText` (it gives you
   the string directly).

### FlatList vs `.map()` inside ScrollView

```tsx
<FlatList
  data={students} // the array
  keyExtractor={(item) => item.id} // unique key per row
  renderItem={({ item }) => <StudentCard student={item} />} // how to draw ONE row
  ListHeaderComponent={<AddStudentForm onAdd={addStudent} />} // form scrolls with the list
/>
```

🗣 **Say:** "`ScrollView` renders **everything** at once. With 10,000 students the app freezes.
`FlatList` renders only what is on screen (_virtualisation_). Use `.map()` only for small fixed
lists. We do that for the 3 course chips."

### Controlled TextInput

```tsx
const [name, setName] = useState('');
<TextInput value={name} onChangeText={setName} placeholder="Name" />;
```

🗣 **Say:** "State is the single source of truth. The input shows `name`, and typing calls
`setName`. This is a **controlled** input."

### Lifting state up (props going down, callbacks going up)

```
StudentsScreen   owns  students[]  and  addStudent()
 ├── AddStudentForm  onAdd={addStudent}     ← child CALLS the parent's function
 └── FlatList → StudentCard  student={item} ← child RECEIVES data
```

```tsx
// students-screen.tsx
const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
const addStudent = (student: Student) => setStudents((prev) => [student, ...prev]);

// add-student-form.tsx
type Props = { onAdd: (student: Student) => void };
```

🧪 **Try live:** change `[student, ...prev]` to `[...prev, student]`. New students now appear at the
bottom.

---

## 5. Styling with Tailwind (NativeWind)

🗣 **Say:** "React Native has no CSS files. Normally we write `StyleSheet.create({...})`.
**NativeWind** lets us write Tailwind classes in `className`, and turns them into React Native
styles when the app is built."

### Same card, two ways

```tsx
// ❌ StyleSheet way
<View style={styles.card}>...</View>
const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, borderWidth: 1, marginBottom: 12 },
});

// ✅ Tailwind way (student-card.tsx)
<Pressable className="mb-3 flex-row items-center rounded-xl border border-border bg-card p-4 active:opacity-70">
```

### Classes used in the demo

| Class                                                 | Meaning                                           |
| ----------------------------------------------------- | ------------------------------------------------- |
| `flex-1`                                              | take all remaining space                          |
| `flex-row`                                            | children side by side (default is column!)        |
| `items-center` / `justify-center`                     | centre on the cross axis / main axis              |
| `p-4`, `px-3`, `py-1`, `mt-2`, `ml-3`                 | padding / margin (1 unit = 4px, so `p-4` = 16px)  |
| `gap-2`                                               | space between children                            |
| `rounded-xl`, `rounded-full`                          | border radius, full = circle                      |
| `size-12`                                             | width AND height = 48px                           |
| `text-lg font-bold`                                   | font size + weight                                |
| `active:opacity-70`                                   | style **while pressed** (only works on Pressable) |
| `bg-primary`, `text-card-foreground`, `border-border` | **theme colours** (see below)                     |

### Theme colours and dark mode

🗣 **Say:** "We never write `bg-blue-500`. We write `bg-primary`. Where does `primary` come from?"

```js
// tailwind.config.js
colors: {
  primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
  card:    { DEFAULT: 'hsl(var(--card))',    foreground: 'hsl(var(--card-foreground))' },
  ...
}
```

The actual values live in `src/global.css`, with one set for light mode and one for dark mode. Toggle the theme in
Settings and every `bg-card` / `text-foreground` changes. **No code changes.**

### Conditional classes

```tsx
// student-card.tsx: green badge if active, grey if not
<View className={`rounded-full px-2 py-1 ${student.isActive ? 'bg-success' : 'bg-muted'}`}>

// add-student-form.tsx: selected chip is highlighted
className={`rounded-full border px-3 py-1 ${course === c ? 'border-primary bg-primary' : 'border-border'}`}
```

In the rest of the app we use the `cn()` helper (`src/shared/lib/utils.ts`) for the same job, as
`SettingsRow` does: `cn('rounded-md bg-muted p-2', destructive && 'bg-destructive/10')`.

### Special props: `contentContainerClassName`

`ScrollView` and `FlatList` have two boxes: the outer frame and the inner content.
`className` styles the frame and `contentContainerClassName` styles the inner content (padding,
gap).

🧪 **Try live:** change `rounded-xl` to `rounded-none` on the student card, then `p-4` to `p-8`. Save
and watch it update instantly (Fast Refresh).

---

## 6. TypeScript basics

🗣 **Say:** "TypeScript = JavaScript + types. It catches mistakes **while you type**, before the app
runs. It disappears at build time. The phone runs plain JavaScript."

💻 **Show:** `src/modules/learn/data/student.ts`

```ts
// Union type: ONLY these 3 strings are allowed
export type Course = 'React Native' | 'TypeScript' | 'Web';

// Object type: the shape of a student
export type Student = {
  id: string;
  name: string;
  age: number;
  course: Course;      // uses our union
  isActive: boolean;
  email?: string;      // ? = optional (may be undefined)
};

// Typed array
export const INITIAL_STUDENTS: Student[] = [
  { id: '1', name: 'Ravi', age: 21, course: 'React Native', isActive: true },
  ...
];

// Typed function: parameter type → return type
export function getInitials(name: string): string {
  return name.slice(0, 1).toUpperCase();
}
```

### Where types appear in the demo

| Concept                  | Code                                                | File                   |
| ------------------------ | --------------------------------------------------- | ---------------------- |
| Basic types              | `string`, `number`, `boolean`                       | `student.ts`           |
| Union type               | `'React Native' \| 'TypeScript' \| 'Web'`           | `student.ts`           |
| Optional property        | `email?: string`                                    | `student.ts`           |
| Typed array              | `Student[]`                                         | `student.ts`           |
| Typed function           | `getInitials(name: string): string`                 | `student.ts`           |
| Typed props              | `type Props = { student: Student }`                 | `student-card.tsx`     |
| Function as a prop type  | `onAdd: (student: Student) => void`                 | `add-student-form.tsx` |
| Generic `useState`       | `useState<Student[]>(...)`, `useState<Course>(...)` | screen + form          |
| `Record<K, V>`           | `useState<Record<string, string>>({})` for errors   | `add-student-form.tsx` |
| Type inference           | `useState('')` is automatically `string`            | `add-student-form.tsx` |
| Type-only import         | `import { type Student } from ...`                  | everywhere             |
| `as const` + `satisfies` | `'/learn' as const satisfies Href`                  | `learn.routes.ts`      |
| Type from a schema       | `z.infer<typeof studentFormSchema>`                 | `student.schema.ts`    |

### `type` vs `interface` (common question)

Both describe object shapes. This project uses `type` everywhere for consistency. `type` can also
do unions (`'a' | 'b'`), which `interface` cannot.

🧪 **Try live** (show the red squiggle, then undo):

```ts
{ id: '4', name: 'Kiran', age: '22', course: 'Python', isActive: true }
//                              ^^^^          ^^^^^^^^
//            string is not number      'Python' is not a Course
```

Then run `npm run typecheck` to show the same errors in the terminal.

---

## 7. Zod basics: validating real data

🗣 **Say:** "TypeScript only checks **while coding**. When the user types `abc` into the Age box,
TypeScript is already gone. **Zod checks real data while the app is running**: user input, API
responses, URL params."

| TypeScript                  | Zod                                                     |
| --------------------------- | ------------------------------------------------------- |
| Checks at **compile time**  | Checks at **runtime**                                   |
| Removed from the final app  | Ships with the app                                      |
| Trusts that data is correct | **Proves** the data is correct                          |
| `type Student = {...}`      | `z.object({...})` and then `z.infer` gives you the type |

💻 **Show:** `src/modules/learn/data/student.schema.ts`

```ts
import { z } from 'zod';

export const studentFormSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters'),

  // TextInput always gives a string → coerce converts "21" → 21
  age: z.coerce
    .number({ message: 'Age must be a number' })
    .int('Age must be a whole number')
    .min(16, 'Minimum age is 16')
    .max(60, 'Maximum age is 60'),

  course: z.enum(['React Native', 'TypeScript', 'Web']), // same idea as the TS union

  email: z.email('Invalid email').optional().or(z.literal('')), // empty OR a valid email
});

// ONE source of truth: the TS type is generated FROM the schema
export type StudentForm = z.infer<typeof studentFormSchema>;
```

### Using it in the form

💻 **Show:** `add-student-form.tsx` → `handleAdd`

```tsx
const handleAdd = () => {
  const result = studentFormSchema.safeParse({ name, age, course, email });

  if (!result.success) {
    // turn Zod issues into { name: '...', age: '...' } to show under each input
    const fieldErrors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      fieldErrors[String(issue.path[0])] = issue.message;
    }
    setErrors(fieldErrors);
    return; // stop, don't add
  }

  // ✅ result.data is clean and typed: age is a real number now
  onAdd({
    id: Date.now().toString(),
    ...result.data,
    email: result.data.email || undefined,
    isActive,
  });
};
```

### `parse` vs `safeParse`

| Method                | On bad data                         | Use when                                   |
| --------------------- | ----------------------------------- | ------------------------------------------ |
| `schema.parse(x)`     | **throws** an error                 | you want a crash/try-catch (API responses) |
| `schema.safeParse(x)` | returns `{ success: false, error }` | forms: you want to show messages           |

### Proof with a test

💻 **Show:** `src/modules/learn/data/__tests__/student.schema.test.ts`, then run:

```bash
npx jest src/modules/learn
```

```ts
it('accepts valid data and converts age "21" → 21', () => {
  const result = studentFormSchema.safeParse({ name: 'Ravi', age: '21', course: 'Web', email: '' });
  expect(result.success).toBe(true);
  expect(result.data?.age).toBe(21); // string became a number
});

it('rejects a short name, young age and bad email', () => {
  const result = studentFormSchema.safeParse({ name: 'A', age: '10', course: 'Web', email: 'abc' });
  expect(result.success).toBe(false);
});
```

🧪 **Try live in the app:**

1. Tap **Add Student** with empty fields, and errors appear under Name and Age.
2. Type `A` / `10` / `abc` and you get three different error messages.
3. Type `Ravi` / `21` / leave email empty and the student is added to the top of the list.
4. Change `.min(16, ...)` to `.min(18, ...)`, save, and try age 17.

---

## 8. Full flow recap (draw this on the board)

```
[Settings tab]  src/app/(tabs)/settings.tsx  →  SettingsScreen (module)
      │  SettingsRow  props: icon, label, description, onPress
      │  onPress → router.navigate(learnRoutes.students)  = '/learn'
      ▼
[/learn]  src/app/learn/index.tsx  →  StudentsScreen
      │  useState<Student[]>            (TypeScript)
      │  FlatList + View + Text         (Core components)
      │  className="..."                (Tailwind)
      │  AddStudentForm → safeParse     (Zod) → onAdd() → list updates
      │  StudentCard → <Link href={learnRoutes.detail(student)}>
      ▼
[/learn/1?name=Ravi&age=21&course=Web]  src/app/learn/[id].tsx
      │  useLocalSearchParams()  → props
      ▼
StudentDetailScreen  → Stack.Screen title, router.back()
```

---

## 9. Questions to ask the class (check understanding)

1. Why is `src/app/learn/index.tsx` only one line? Where is the real screen?
2. What happens if I put plain text directly inside a `<View>`?
3. What is the difference between `@/modules/learn` and `../../data/student` imports? When do we use each?
4. Why can't the Settings screen import `student-card.tsx` directly?
5. In `[id].tsx`, why is `age` a `string` and not a `number`?
6. Expo Router vs React Navigation: name two differences. Is Expo Router a replacement for React Navigation?
7. Why `FlatList` instead of `students.map()` inside a `ScrollView`?
8. TypeScript already has types. Why do we still need Zod?
9. `parse` vs `safeParse`: which one for a form, and why?
10. Why `bg-primary` instead of `bg-blue-500`?

---

## 10. Homework (practice on the same demo)

1. **Core components + TS:** add a `phone?: string` field to `Student` and show it on the detail screen.
2. **Zod:** add `phone` to `studentFormSchema`: optional, exactly 10 digits
   (`z.string().regex(/^\d{10}$/, 'Phone must be 10 digits')`). Show its error under the input.
3. **Tailwind:** make inactive students' cards look faded (`opacity-60`) using a conditional class.
4. **Expo Router:** add a new route `src/app/learn/about.tsx` and a Settings row (or a `<Link>`)
   that opens it. Add its URL to `learnRoutes`.
5. **Props:** add a "Delete" button on `StudentCard` through an `onDelete: (id: string) => void`
   prop that the screen implements with `setStudents(prev => prev.filter(...))`.
6. Run `npm run typecheck` and `npx jest src/modules/learn`. Both must pass.

---

## 11. Quick reference: files in this demo

| File                                                                  | Topic                                     |
| --------------------------------------------------------------------- | ----------------------------------------- |
| `src/app/_layout.tsx`                                                 | Expo Router: root Stack, screen options   |
| `src/app/(tabs)/settings.tsx`                                         | route file → module screen                |
| `src/modules/settings/features/app-settings/settings-screen.tsx`      | entry row, props, imports                 |
| `src/shared/components/settings-row.tsx`                              | defining props, optional props, children  |
| `src/app/learn/index.tsx`                                             | file-based route `/learn`                 |
| `src/app/learn/[id].tsx`                                              | dynamic route + `useLocalSearchParams`    |
| `src/modules/learn/index.ts`                                          | module public API                         |
| `src/modules/learn/learn.routes.ts`                                   | typed routes, `satisfies Href`            |
| `src/modules/learn/data/student.ts`                                   | TypeScript basics                         |
| `src/modules/learn/data/student.schema.ts`                            | Zod schema, `z.infer`                     |
| `src/modules/learn/features/students/students-screen.tsx`             | FlatList, useState, lifting state         |
| `src/modules/learn/features/students/add-student-form.tsx`            | TextInput, Switch, Pressable, safeParse   |
| `src/modules/learn/features/students/student-card.tsx`                | Tailwind, conditional classes, `<Link>`   |
| `src/modules/learn/features/student-detail/student-detail-screen.tsx` | ScrollView, header title, `router.back()` |
| `src/modules/learn/data/__tests__/student.schema.test.ts`             | proving the schema works                  |
