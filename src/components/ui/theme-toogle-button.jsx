import { Moon, Sun } from "lucide-react";
import React, { useCallback } from "react";

const ThemeToggleButton = ({
  theme = "light",
  showLabel = false,
  variant = "circle",
  start = "center",
  url,
  className,
  onClick,
}) => {
  const handleClick = useCallback(() => {
    const styleId = `theme-transition-${Date.now()}`;
    const style = document.createElement("style");
    style.id = styleId;

    let css = "";
    const positions = {
      center: "center",
      "top-left": "top left",
      "top-right": "top right",
      "bottom-left": "bottom left",
      "bottom-right": "bottom right",
    };

    if (variant === "circle" || variant === "circle-blur") {
      const cx = start.includes("left")
        ? "0"
        : start.includes("right")
        ? "100"
        : "50";
      const cy = start.includes("top")
        ? "0"
        : start.includes("bottom")
        ? "100"
        : "50";

      css =
        variant === "circle"
          ? `
        @supports (view-transition-name: root) {
          ::view-transition-new(root) {
            animation: circle-expand 0.4s ease-out;
            transform-origin: ${positions[start]};
          }
          @keyframes circle-expand {
            from { clip-path: circle(0% at ${cx}% ${cy}%); }
            to { clip-path: circle(150% at ${cx}% ${cy}%); }
          }
        }`
          : `
        @supports (view-transition-name: root) {
          ::view-transition-new(root) {
            animation: circle-blur-expand 0.5s ease-out;
            transform-origin: ${positions[start]};
          }
          @keyframes circle-blur-expand {
            from { clip-path: circle(0% at ${cx}% ${cy}%); filter: blur(4px); }
            to { clip-path: circle(150% at ${cx}% ${cy}%); filter: blur(0); }
          }
        }`;
    } else if (variant === "gif" && url) {
      css = `
        @supports (view-transition-name: root) {
          ::view-transition-new(root) {
            animation: gif-reveal 2.5s cubic-bezier(0.4, 0, 0.2, 1);
            mask-image: url('${url}');
            mask-size: 0%;
            mask-repeat: no-repeat;
            mask-position: center;
          }
          @keyframes gif-reveal {
            0% { mask-size: 0%; }
            60% { mask-size: 35%; }
            100% { mask-size: 300%; }
          }
        }
      `;
    } else if (variant === "polygon") {
      css = `
        @supports (view-transition-name: root) {
          ::view-transition-new(root) {
            animation: ${
              theme === "light" ? "wipe-in-dark" : "wipe-in-light"
            } 0.4s ease-out;
          }
          @keyframes wipe-in-dark {
            from { clip-path: polygon(0 0, 0 0, 0 100%, 0 100%); }
            to { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
          }
          @keyframes wipe-in-light {
            from { clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%); }
            to { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
          }
        }
      `;
    }

    if (css) {
      style.textContent = css;
      document.head.appendChild(style);
      setTimeout(() => document.getElementById(styleId)?.remove(), 3000);
    }

    onClick?.();
  }, [onClick, variant, start, url, theme]);

  return (
    <div
      onClick={handleClick}
      className="relative flex p-0.5 cursor-pointer items-center justify-center rounded-full  hover:bg-accent hover:text-accent-foreground transition-all"
    >
      <Sun className="h-4 w-4 transition-all scale-100 rotate-0 dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-4 w-4 transition-all scale-0 rotate-90 dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </div>
  );
};

// ✅ Helper hook tetap diekspor dengan benar
const useThemeTransition = () => {
  const startTransition = useCallback((updateFn) => {
    if ("startViewTransition" in document) {
      // @ts-ignore
      document.startViewTransition(updateFn);
    } else {
      updateFn();
    }
  }, []);

  return { startTransition };
};

export { ThemeToggleButton, useThemeTransition };
