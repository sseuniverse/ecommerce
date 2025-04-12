import React from "react";
import { SettingsProps } from "@/types";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { checkAuth } from "@/store/auth-slice";
import { editSettings, fetchSettings } from "@/store/setting-slice";

interface SettingsContext {
  isLoading: boolean;
  settings: SettingsProps;
  fetchSetting: (userId: string | null) => void;
  updateSettings: (userId: string | null, formData: any) => void;
}

export const SettingContext = React.createContext<SettingsContext | undefined>(
  undefined
);
export const SettingsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const { isLoading, setting } = useAppSelector((state) => state.settings);

  const fetchSetting = (userId: string | null) => {
    if (isAuthenticated && userId) {
      dispatch(fetchSettings(userId));
    } else {
      const localSettings = localStorage.getItem("settings");
      return localSettings;
    }
  };

  const updateSettings = (userId: string | null, formData: any) => {
    if (isAuthenticated && userId) {
      dispatch(editSettings({ userId, formData }));
    } else {
      localStorage.setItem("userSettings", JSON.stringify(formData));
    }
  };

  React.useEffect(() => {
    fetchSetting(user ? user.id : null);
  }, [user, isAuthenticated]);

  React.useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  return (
    <SettingContext.Provider
      value={{ isLoading, settings: setting, fetchSetting, updateSettings }}
    >
      {children}
    </SettingContext.Provider>
  );
};

export const useSettings = () => {
  const context = React.useContext(SettingContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
