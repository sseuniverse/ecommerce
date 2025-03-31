import {
  localStorageAvailable,
  useLocalStorage,
} from "@/hooks/useLocalStorage";
import React, { useCallback, useMemo } from "react";

export type ThemeModeValue = "light" | "dark";
export type ThemeDirectionValue = "rtl" | "ltr";
export type ThemeColorPresetsValue =
  | "default"
  | "cyan"
  | "purple"
  | "blue"
  | "orange"
  | "red";

type SettingsProviderProps = {
  children: React.ReactNode;
};

// export type ThemeContrastValue = 'default' | 'bold';
// export type ThemeLayoutValue = 'vertical' | 'horizontal' | 'mini';
// export type ThemeStretchValue = boolean;

export type SettingsValueProps = {
  themeMode: ThemeModeValue;
  // themeLayout: ThemeLayoutValue;
  // themeStretch: ThemeStretchValue;
  // themeContrast: ThemeContrastValue;
  themeDirection: ThemeDirectionValue;
  themeColorPresets: ThemeColorPresetsValue;
};

type SettingsContextProps = SettingsValueProps & {
  onToggleMode: VoidFunction;
  onChangeMode: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleDirection: VoidFunction;
  onChangeDirection: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // onChangeDirectionByLang: (lang: string) => void;
  // onToggleLayout: VoidFunction;
  // onChangeLayout: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // onToggleContrast: VoidFunction;
  // onChangeContrast: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeColorPresets: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleStretch: VoidFunction;
  onResetSetting: VoidFunction;
};

export const defaultSettings: SettingsValueProps = {
  themeMode: "light",
  themeDirection: "ltr",
  // themeContrast: "default",
  // themeLayout: "vertical",
  themeColorPresets: "default",
  // themeStretch: false,
};

const initialState: SettingsContextProps = {
  ...defaultSettings,
  onToggleMode: () => {},
  onChangeMode: () => {},
  onToggleDirection: () => {},
  onChangeDirection: () => {},
  // onChangeDirectionByLang: () => {},
  // onToggleLayout: () => {},
  // onChangeLayout: () => {},
  // onToggleContrast: () => {},
  // onChangeContrast: () => {},
  onChangeColorPresets: () => {},
  // presetsColor: defaultPreset,
  // presetsOption: [],
  onToggleStretch: () => {},
  onResetSetting: () => {},
};

export const SettingsContext = React.createContext(initialState);

export const useSettingsContext = () => {
  const context = React.useContext(SettingsContext);

  if (!context)
    throw new Error("useSettingsContext must be use inside SettingsProvider");

  return context;
};

export function SettingsProvider({ children }: SettingsProviderProps) {
  const [settings, setSettings] = useLocalStorage("settings", defaultSettings);
  const storageAvailable = localStorageAvailable();

  const onToggleMode = useCallback(() => {
    const themeMode = settings.themeMode === "light" ? "dark" : "light";
    setSettings({ ...settings, themeMode });
  }, [setSettings, settings]);

  const onChangeMode = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const themeMode = event.target.value;
      setSettings({ ...settings, themeMode });
    },
    [setSettings, settings]
  );

  // Direction
  const onToggleDirection = useCallback(() => {
    const themeDirection = settings.themeDirection === "rtl" ? "ltr" : "rtl";
    setSettings({ ...settings, themeDirection });
  }, [setSettings, settings]);

  const onChangeDirection = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const themeDirection = event.target.value;
      setSettings({ ...settings, themeDirection });
    },
    [setSettings, settings]
  );

  //   const onChangeDirectionByLang = useCallback(
  //     (lang: string) => {
  //       const themeDirection = lang === 'ar' ? 'rtl' : 'ltr';
  //       setSettings({ ...settings, themeDirection });
  //     },
  //     [setSettings, settings]
  //   );

  // Color
  const onChangeColorPresets = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const themeColorPresets = event.target.value;
      setSettings({ ...settings, themeColorPresets });
    },
    [setSettings, settings]
  );

  // Reset
  const onResetSetting = useCallback(() => {
    setSettings(defaultSettings);
  }, [setSettings]);

  const memoizedValue = useMemo(
    () => ({
      ...settings,
      onToggleMode,
      onChangeMode,
      onToggleDirection,
      onChangeDirection,
      onChangeColorPresets,
      onResetSetting,
    }),
    [
      settings,
      onToggleMode,
      onChangeMode,
      onToggleDirection,
      onChangeDirection,
      onChangeColorPresets,
      onResetSetting,
    ]
  );

  return <SettingsContext.Provider value={memoizedValue}></SettingsContext.Provider>
}
