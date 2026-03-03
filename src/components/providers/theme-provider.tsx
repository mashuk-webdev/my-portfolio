'use client';

import * as React from 'react';

type Theme = 'dark' | 'light' | 'system';
type ResolvedTheme = Exclude<Theme, 'system'>;
type ThemeAttribute = 'class' | `data-${string}`;

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  enableSystem?: boolean;
  attribute?: ThemeAttribute;
  disableTransitionOnChange?: boolean;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => undefined,
};

const ThemeProviderContext = React.createContext<ThemeProviderState>(initialState);

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function disableTransitionsTemporarily(): () => void {
  const style = document.createElement('style');
  style.appendChild(
    document.createTextNode('*{transition:none !important;animation:none !important;}')
  );
  document.head.appendChild(style);

  return () => {
    void window.getComputedStyle(document.body);
    style.remove();
  };
}

function isTheme(value: string | null): value is Theme {
  return value === 'dark' || value === 'light' || value === 'system';
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'portfolio-theme',
  enableSystem = true,
  attribute = 'class',
  disableTransitionOnChange = false,
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(defaultTheme);
  const [isHydrated, setIsHydrated] = React.useState(false);

  const resolveTheme = React.useCallback(
    (candidate: Theme): ResolvedTheme => {
      if (candidate === 'system') {
        if (enableSystem) return getSystemTheme();

        if (defaultTheme === 'dark' || defaultTheme === 'light') {
          return defaultTheme;
        }

        return 'light';
      }

      return candidate;
    },
    [defaultTheme, enableSystem]
  );

  const applyTheme = React.useCallback(
    (candidate: Theme) => {
      const root = window.document.documentElement;
      const resolvedTheme = resolveTheme(candidate);
      const restoreTransitions =
        disableTransitionOnChange ? disableTransitionsTemporarily() : null;

      if (attribute === 'class') {
        root.classList.remove('light', 'dark');
        root.classList.add(resolvedTheme);
      } else {
        root.setAttribute(attribute, resolvedTheme);
      }

      restoreTransitions?.();
    },
    [attribute, disableTransitionOnChange, resolveTheme]
  );

  React.useEffect(() => {
    setIsHydrated(true);

    const persistedTheme = localStorage.getItem(storageKey);
    const nextTheme = isTheme(persistedTheme) ? persistedTheme : defaultTheme;
    setThemeState(nextTheme);
  }, [defaultTheme, storageKey]);

  React.useEffect(() => {
    if (!isHydrated) return;
    applyTheme(theme);
  }, [applyTheme, isHydrated, theme]);

  React.useEffect(() => {
    if (!isHydrated || !enableSystem || theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => applyTheme('system');

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [applyTheme, enableSystem, isHydrated, theme]);

  const value = React.useMemo<ThemeProviderState>(
    () => ({
      theme,
      setTheme: (nextTheme: Theme) => {
        localStorage.setItem(storageKey, nextTheme);
        setThemeState(nextTheme);
      },
    }),
    [storageKey, theme]
  );

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => React.useContext(ThemeProviderContext);
