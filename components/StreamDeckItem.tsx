import { Card, CardItem, DeckSwiper, Text } from "native-base";
import React from "react";
import { ProcessStream } from "../backend/processStream";

interface StreamDeckItemProps {
  item: ProcessStream;
}

export const StreamDeckItem: React.FC<StreamDeckItemProps> = ({ item }) => {
  return (
    <Card style={{ elevation: 5 }}>
      <CardItem header>{item.name}</CardItem>
      <CardItem cardBody>
        <Text>Hello world</Text>
      </CardItem>
    </Card>
  );
};
