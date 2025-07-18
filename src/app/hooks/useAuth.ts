import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  userId: string | null;
}

const useAuth = (): AuthState & { logout: () => Promise<void> } => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    userId: null,
  });
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/check-auth'); // You'll need to create this API route
        if (res.ok) {
          const data = await res.json();
          setAuthState({ isAuthenticated: true, isLoading: false, userId: data.userId });
        } else {
          setAuthState({ isAuthenticated: false, isLoading: false, userId: null });
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        setAuthState({ isAuthenticated: false, isLoading: false, userId: null });
      }
    };

    checkAuth();
  }, []);

  const logout = async () => {
    try {
      const res = await fetch('/api/logout', {
        method: 'POST',
      });
      if (res.ok) {
        setAuthState({ isAuthenticated: false, isLoading: false, userId: null });
        router.push('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return { ...authState, logout };
};

export default useAuth;
