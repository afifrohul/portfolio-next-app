import { useState, useEffect, useCallback } from "react";

const defaultSettings = {
  mode: "light",
  theme: {
    styles: {
      light: {},
      dark: {},
    },
  },
};

export function useSettings() {
  const [settings, setSettings] = useState(defaultSettings);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("app-settings");
      if (stored) {
        setSettings(JSON.parse(stored));
      }
    } catch (err) {
      console.warn("Failed to load settings:", err);
    }
  }, []);

  const updateSettings = useCallback((newSettings) => {
    setSettings(newSettings);
    try {
      localStorage.setItem("app-settings", JSON.stringify(newSettings));
    } catch (err) {
      console.warn("Failed to save settings:", err);
    }
  }, []);

  return { settings, updateSettings };
}
