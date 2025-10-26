import React from "react";
import { Section, Card, Title, Text, Button } from "@telegram-apps/telegram-ui";

export default function Tasks() {
  return (
    <Section header="Задания">
      <Card style={{ padding: 16 }}>
        <Title>Новое задание 🔥</Title>
        <Text>Напиши отзыв на Яндекс.Картах, получи 50₽</Text>
        <Button mode="filled" style={{ marginTop: 8 }}>
          Взять
        </Button>
      </Card>
    </Section>
  );
}
