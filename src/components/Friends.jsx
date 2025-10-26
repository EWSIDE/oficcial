import React from "react";
import { Section, Card, Title, Text } from "@telegram-apps/telegram-ui";

export default function Friends() {
  return (
    <Section header="Друзья">
      <Card style={{ padding: 16 }}>
        <Title>Пригласи друга 🤝</Title>
        <Text>Зови друзей и получай бонусы за их активность.</Text>
      </Card>
    </Section>
  );
}
