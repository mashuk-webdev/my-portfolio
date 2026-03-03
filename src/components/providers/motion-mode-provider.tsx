'use client';

import * as React from 'react';

export type MotionMode = 'normal' | 'butter' | 'minimal';

export const MOTION_MODE_STORAGE_KEY = 'portfolio-motion-mode';

function isMotionMode(value: string | null): value is MotionMode {
  return value === 'normal' || value === 'butter' || value === 'minimal';
}

type MotionModeContextValue = {
  mode: MotionMode;
  setMode: (mode: MotionMode) => void;
};

const MotionModeContext = React.createContext<MotionModeContextValue>({
  mode: 'butter',
  setMode: () => undefined,
});

type MotionModeProviderProps = {
  children: React.ReactNode;
  defaultMode?: MotionMode;
};

export function MotionModeProvider({
  children,
  defaultMode = 'butter',
}: MotionModeProviderProps) {
  const [mode, setModeState] = React.useState<MotionMode>(defaultMode);
  const [isHydrated, setIsHydrated] = React.useState(false);

  React.useEffect(() => {
    setIsHydrated(true);
    const persistedMode = localStorage.getItem(MOTION_MODE_STORAGE_KEY);
    if (isMotionMode(persistedMode)) {
      setModeState(persistedMode);
    }
  }, []);

  React.useEffect(() => {
    if (!isHydrated) return;
    window.document.documentElement.setAttribute('data-motion-mode', mode);
  }, [isHydrated, mode]);

  const value = React.useMemo<MotionModeContextValue>(
    () => ({
      mode,
      setMode: (nextMode) => {
        localStorage.setItem(MOTION_MODE_STORAGE_KEY, nextMode);
        setModeState(nextMode);
      },
    }),
    [mode]
  );

  return (
    <MotionModeContext.Provider value={value}>
      {children}
    </MotionModeContext.Provider>
  );
}

export function useMotionMode(): MotionModeContextValue {
  return React.useContext(MotionModeContext);
}
