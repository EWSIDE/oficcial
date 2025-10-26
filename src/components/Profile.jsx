import React, { useState } from "react";
import {
  Card,
  Title,
  Text,
  Divider,
  IconButton,
  Placeholder,
} from "@telegram-apps/telegram-ui";
import { IconPlus, IconWallet, IconHistory, IconChecklist, IconCoins } from "@tabler/icons-react";

export default function ProfileContent() {
  const [balance, setBalance] = useState(720);

  return (
    <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 12 }}>
      {/* Баланс и действия */}
      <Card
        style={{
          borderRadius: 16,
          padding: 14,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <Title>💰 Баланс</Title>
          <Text size="large" style={{ fontWeight: 600 }}>
            {balance} ₽
          </Text>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <IconButton Icon={IconPlus} mode="filled" onClick={() => setBalance(balance + 100)} />
          <IconButton Icon={IconWallet} mode="filled" />
          <IconButton Icon={IconHistory} mode="filled" />
          <IconButton Icon={IconChecklist} mode="filled" />
        </div>
      </Card>

      {/* История операций */}
      <Card style={{ borderRadius: 16, padding: 12 }}>
        <Placeholder
          description="У вас пока нет пополнений и выводов средств"
          header="Пусто!"
        >
          <img
            alt="Telegram sticker"
            style={{ width: 120, height: 120, margin: "0 auto" }}
            src="https://github.com/goforbg/telegram-emoji-gifs/blob/master/star.gif?raw=true"
          />
        </Placeholder>
      </Card>
    </div>
  );
}
