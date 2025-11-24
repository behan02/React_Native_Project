import type { RootState } from '@/store/store';
import { useAppSelector } from '@/store/store';

export function useColorScheme() {
  const dark = useAppSelector((s: RootState) => (s.theme as { dark: boolean }).dark);
  return dark ? 'dark' : 'light';
}
