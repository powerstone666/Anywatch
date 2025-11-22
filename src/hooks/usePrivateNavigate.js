import { useNavigate } from 'react-router-dom';
import { useCallback, useMemo } from 'react';

/**
 * Custom navigation hook that prevents history entries in PWA mode
 * Uses 'replace' instead of 'push' to avoid cluttering browser history
 */
export function usePrivateNavigate() {
  const navigate = useNavigate();
  
  // Check if running as PWA (memoized to avoid re-calculating)
  const isPWA = useMemo(() => {
    return window.matchMedia('(display-mode: standalone)').matches || 
           window.navigator.standalone || 
           document.referrer.includes('android-app://');
  }, []);

  // Wrap navigate to use 'replace' in PWA mode
  const privateNavigate = useCallback((to, options = {}) => {
    if (isPWA) {
      // In PWA mode, always use replace to prevent history entries
      navigate(to, { ...options, replace: true });
    } else {
      // In browser mode, use normal navigation
      navigate(to, options);
    }
  }, [navigate, isPWA]);

  return privateNavigate;
}
