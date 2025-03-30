import React from "react";

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

type SettingsContextProps = {
  themeMode: ThemeModeValue;
  // themeLayout: ThemeLayoutValue;
  // themeStretch: ThemeStretchValue;
  // themeContrast: ThemeContrastValue;
  themeDirection: ThemeDirectionValue;
  themeColorPresets: ThemeColorPresetsValue;
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

const initialState: SettingsContextProps = {
  themeMode: "light",
  themeDirection: "ltr",
  // themeContrast: "default",
  // themeLayout: "vertical",
  themeColorPresets: "default",
  // themeStretch: false,
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
