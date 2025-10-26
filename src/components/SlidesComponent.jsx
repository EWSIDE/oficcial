import React, { useState, useEffect } from "react";
import WebApp from "@twa-dev/sdk";
import { Card, Placeholder, Spinner, Button } from "@telegram-apps/telegram-ui";
import { motion, AnimatePresence } from "framer-motion";
import "@telegram-apps/telegram-ui/dist/styles.css";

const slides = [
  {
    header: "Привет!",
    description: "Зарабатывай на простых отзывах для Яндекс, Авито, Google и 2ГИС.",
    sticker: "https://xelene.me/telegram.gif",
  },
  {
    header: "Как работать",
    description: "Включи уведомления, возьми задание и напиши админу 'я за работой'. Оплата после проверки.",
    sticker: "https://github.com/goforbg/telegram-emoji-gifs/blob/master/blush.gif?raw=true",
  },
  {
    header: "Готово",
    description: "Следуй инструкциям и зарабатывай. Вопросы — админу.",
    sticker: "https://github.com/goforbg/telegram-emoji-gifs/blob/master/chick.gif?raw=true",
  },
];

export default function SlidesComponent({ onComplete }) {
  const [step, setStep] = useState(0);
  const [theme, setTheme] = useState("light");
  const [currentImageLoaded, setCurrentImageLoaded] = useState(false);

  useEffect(() => {
  WebApp.ready();
  WebApp.expand();

  const updateTheme = () => {
    const currentTheme = WebApp.colorScheme || "light";
    setTheme(currentTheme);

    const bgColor = currentTheme === "dark" ? "#1e1e1e" : "#ffffff";

    // Обновляем header и фон
    WebApp.setBackgroundColor(bgColor);
    WebApp.setHeaderColor(bgColor);
  };

  updateTheme();
  WebApp.onEvent("themeChanged", updateTheme);

  return () => WebApp.offEvent("themeChanged", updateTheme);
}, []);

  const nextStep = () => {
    if (step < slides.length - 1) {
      setCurrentImageLoaded(false);
      setStep(step + 1);
    } else {
      if (onComplete) onComplete();
    }
  };

  const isDark = theme === "dark";
  const bgColor = isDark ? "#1e1e1e" : "#ffffff";
  const textColor = isDark ? "#ffffff" : "#000000";
  const [accentColor, setAccentColor] = useState("#3390ec"); // fallback

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 20,
        background: bgColor,
        color: textColor,
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {/* Прогресс */}
      <div style={{ display: "flex", width: "100%", gap: 6, marginBottom: 16 }}>
        {slides.map((_, i) => (
          <motion.div
            key={i}
            style={{
              flex: 1,
              height: 6,
              borderRadius: 3,
              backgroundColor: isDark ? "#555" : "#ccc",
            }}
            animate={{
              backgroundColor: i <= step ? accentColor : (isDark ? "#555" : "#ccc")
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>

      {/* Слайды */}
      <div
        style={{
          width: "100%",
          maxWidth: 400,
          flex: "1 0 auto",
          display: "flex",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            style={{ width: "100%" }}
          >
            <Card
              style={{
                position: "relative",
                textAlign: "center",
                padding: "32px 20px",
                background: bgColor, // единый фон
                minHeight: 320,
                overflow: "hidden",
                boxSizing: "border-box",
                boxShadow: "none",
                border: "none",
              }}
            >
              <Placeholder
                header={slides[step].header}
                description={slides[step].description}
                style={{ color: textColor }}
                headerStyle={{ color: textColor }}
                descriptionStyle={{ color: textColor }}
              >
                <div
                  style={{
                    width: 140,
                    height: 140,
                    margin: "0 auto",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  {!currentImageLoaded && <Spinner size="m" />}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: currentImageLoaded ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                    style={{ position: "absolute", width: "100%", height: "100%" }}
                  >
                    <img
                      src={slides[step].sticker}
                      alt="sticker"
                      onLoad={() => setCurrentImageLoaded(true)}
                      style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    />
                  </motion.div>
                </div>
              </Placeholder>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Кнопка */}
      <div
        style={{
          marginTop: 24,
          width: "100%",
          maxWidth: 320,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          mode="filled"
          size="l"
          style={{
            width: "100%",
            padding: "14px 0",
            fontSize: 18,
            boxShadow: "none",
            border: "none",
            backgroundColor: accentColor, // ← теперь совпадает
            color: "#fff",
          }}
          onClick={nextStep}
        >
          {step < slides.length - 1 ? "Далее" : "Готово"}
        </Button>
      </div>
    </div>
  );
}
