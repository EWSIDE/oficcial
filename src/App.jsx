import React, { useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";
import { AppRoot } from "@telegram-apps/telegram-ui";
import SlidesComponent from "./components/SlidesComponent.jsx";
import MyTabbar from "./components/Tabbar.jsx";

export default function App() {
  const [started, setStarted] = useState(false);
  const [webApp, setWebApp] = useState(null);

  useEffect(() => {
    WebApp.ready();
    WebApp.expand();
    setWebApp(WebApp);
  }, []);

  return (
    <AppRoot>
      {!started ? (
        <SlidesComponent onComplete={() => setStarted(true)} />
      ) : (
        <MyTabbar webApp={webApp} />
      )}
    </AppRoot>
  );
}
