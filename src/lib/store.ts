import { create } from 'zustand';
import { UserProfile } from '@shared/types';
import { MOCK_USER_PROFILE } from '@shared/mock-data';
interface AuthState {
  user: UserProfile | null;
  balance: number;
  login: (user: UserProfile) => void;
  logout: () => void;
}
export const useAuthStore = create<AuthState>((set) => ({
  user: MOCK_USER_PROFILE, // Default logged in for demo
  balance: 15.5, // ETH
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));