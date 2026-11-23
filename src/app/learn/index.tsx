/**
 * 📘 CONCEPT: Expo Router — file-based routing
 *
 * This FILE creates the route "/learn" automatically. No registration needed.
 *
 * ── Expo Router vs React Navigation ───────────────────────────────
 *  React Navigation (manual setup):
 *    const Stack = createNativeStackNavigator();
 *    <NavigationContainer>
 *      <Stack.Navigator>
 *        <Stack.Screen name="Learn" component={LearnScreen} />
 *      </Stack.Navigator>
 *    </NavigationContainer>
 *    navigation.navigate('Learn')                      // navigate by screen NAME
 *
 *  Expo Router (file-based):
 *    Create a file in src/app/ → it is a screen.
 *    <Link href="/learn" />  or  router.push('/learn')  // navigate by URL PATH
 *
 *  Key points:
 *   • Expo Router is BUILT ON TOP of React Navigation (same Stack/Tabs underneath).
 *   • Routes = folders/files (like Next.js), so deep links & web URLs work for free.
 *   • Typed routes: a wrong href gives a TypeScript error.
 * ──────────────────────────────────────────────────────────────────
 */
export { StudentsScreen as default } from '@/modules/learn';
