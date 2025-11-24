import { useAppSelector } from '@/store/store';
import { Redirect } from 'expo-router';

export default function Index() {
  const token = useAppSelector((s) => s.auth.token);

  // Redirect to login if no token, otherwise to tabs
  if (!token) {
    return <Redirect href="/login" />;
  }

  return <Redirect href="/(tabs)" />;
}
