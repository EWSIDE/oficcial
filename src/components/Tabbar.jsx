import React, { useState, useEffect } from "react";
import { Tabbar } from "@telegram-apps/telegram-ui";
import { IconHome, IconChecklist, IconUsers } from "@tabler/icons-react";
import WebApp from "@twa-dev/sdk";

const tabs = [
  { id: "home", text: "Главная", Icon: IconHome },
  { id: "tasks", text: "Задания", Icon: IconChecklist },
  { id: "friends", text: "Друзья", Icon: IconUsers },
];

export default function MyTabbar({ onTabChange }) {
  const [currentTab, setCurrentTab] = useState(tabs[0].id);
  const [theme, setTheme] = useState("light");
  const [accentColor, setAccentColor] = useState("#3390ec"); // fallback

  useEffect(() => {
    WebApp.ready();
    const updateTheme = () => {
      const currentTheme = WebApp.colorScheme || "light";
      setTheme(currentTheme);
      setAccentColor(WebApp.linkColor || "#3390ec");
    };
    updateTheme();
    WebApp.onEvent("themeChanged", updateTheme);
    return () => WebApp.offEvent("themeChanged", updateTheme);
  }, []);

  const handleClick = (id) => {
    setCurrentTab(id);
    if (onTabChange) onTabChange(id);
  };

  const isDark = theme === "dark";
  const bgColor = isDark ? "#1e1e1e" : "#fff";
  const inactiveColor = isDark ? "#888" : "#888";

  return (
    <Tabbar
      style={{
        background: bgColor,
        padding: "6px 0",
      }}
    >
      {tabs.map(({ id, text, Icon }) => (
        <Tabbar.Item
          key={id}
          selected={currentTab === id}
          onClick={() => handleClick(id)}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: currentTab === id ? 500 : 400,
              gap: "4px",
              transition: "font-weight 0.2s ease",
              fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              lineHeight: 1.2,
              color: currentTab === id ? accentColor : inactiveColor,
            }}
          >
            <Icon
              size={24}
              style={{
                color: currentTab === id ? accentColor : inactiveColor,
                transition: "color 0.2s ease",
              }}
            />
            <span>{text}</span>
          </div>
        </Tabbar.Item>
      ))}
    </Tabbar>
  );
}