import { StackNavigationProp } from "@react-navigation/stack";
import { fluidNames } from "../backend/fluidNames";
import {
  Body,
  Button,
  Container,
  Content,
  Footer,
  Header,
  Icon,
  Input,
  Item,
  Label,
  Left,
  List,
  ListItem,
  Right,
  Subtitle,
  Text,
  View,
} from "native-base";
import React from "react";
import { AdMobBanner } from "expo-ads-admob";
import { StyleSheet } from "react-native";

interface FluidListPageProps {
  navigation: StackNavigationProp<any, any>;
}
export const FluidListPage: React.FC<FluidListPageProps> = ({ navigation }) => {
  const [filteredText, setFilteredText] = React.useState("");
  return (
    <Container>
      <Header searchBar rounded>
        <Button onPress={() => navigation.goBack()} iconRight transparent>
          <Icon type="Feather" name="arrow-left" />
        </Button>
        <Item>
          <Icon name="ios-search" />
          <Input
            placeholder="Bir madde seçiniz"
            value={filteredText}
            onChange={(e) => setFilteredText(e.nativeEvent.text)}
          />
        </Item>
      </Header>
      <Content style={{ flex: 1 }}>
        <List>
          {fluidNames
            .filter(
              (name) =>
                name.toLowerCase().indexOf(filteredText.toLowerCase()) !== -1
            )
            .map((name, index) => (
              <ListItem
                onPress={() =>
                  navigation.navigate("AddStream", { fluid: name })
                }
              >
                <Label>{name}</Label>
              </ListItem>
            ))}
        </List>
      </Content>
      <Footer>
        <AdMobBanner
          style={styles.ad}
          bannerSize="banner"
          adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
        />
      </Footer>
    </Container>
  );
};

const styles = StyleSheet.create({
  ad: {
    paddingHorizontal: 5,
    alignSelf: "center",
    paddingBottom: 5,
  },
});
