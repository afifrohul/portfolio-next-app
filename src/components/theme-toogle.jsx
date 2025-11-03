import React, { useCallback, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useSettings } from "@/hooks/useSettings";
import {
  ThemeToggleButton,
  useThemeTransition,
} from "@/components/ui/theme-toogle-button";

const ThemeToggleVariants = () => {
  const { setTheme } = useTheme();
  const { settings, updateSettings } = useSettings();
  const { startTransition } = useThemeTransition();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeToggle = useCallback(() => {
    if (!settings) return; // 🧩 pastikan settings siap

    const newMode = settings.mode === "dark" ? "light" : "dark";

    startTransition(() => {
      const updatedSettings = {
        ...settings,
        mode: newMode,
        theme: {
          ...settings.theme,
          styles: {
            light: settings.theme?.styles?.light || {},
            dark: settings.theme?.styles?.dark || {},
          },
        },
      };

      updateSettings(updatedSettings);
      setTheme(newMode);
    });
  }, [settings, updateSettings, setTheme, startTransition]);

  if (!mounted || !settings) return null;

  const currentTheme =
    settings.mode === "system" ? "light" : settings.mode || "light";

  return (
    <div className="">
      <ThemeToggleButton
        theme={currentTheme}
        onClick={handleThemeToggle}
        variant="circle-blur"
        start="top-right"
      />
    </div>
  );
};

export default ThemeToggleVariants;
