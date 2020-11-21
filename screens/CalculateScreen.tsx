import { StackNavigationProp } from "@react-navigation/stack";
import { AdMobBanner } from "expo-ads-admob";
import { observer } from "mobx-react-lite";
import {
  Body,
  Button,
  Card,
  Container,
  Fab,
  Footer,
  Header,
  Icon,
  Left,
  List,
  ListItem,
  Right,
  Text,
  Title,
  View,
} from "native-base";
import React from "react";
import AlertAsync from "react-native-alert-async";
import { StyleSheet } from "react-native";
import { StreamStoreContext } from "../stores/StreamStore";
import { SwipeListView } from "react-native-swipe-list-view";
import { StreamList } from "../components/StreamList";

interface CalculateScreenProps {
  navigation: StackNavigationProp<any, any>;
}

const CalculateScreen: React.FC<CalculateScreenProps> = observer(
  ({ navigation }) => {
    const streamStore = React.useContext(StreamStoreContext);
    return (
      <Container style={{ flex: 1, flexDirection: "column" }}>
        <Header style={{ backgroundColor: "#F8F8F8" }}>
          <Body>
            <Title
              style={{ color: "#363946", fontSize: 24, fontWeight: "700" }}
            >
              Hesapla
            </Title>
          </Body>
        </Header>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <View
            padder
            style={{
              flex: 1,
              flexDirection: "column",
            }}
          >
            <Card style={{ height: "100%" }}></Card>
          </View>
          <View
            padder
            style={{
              flex: 1,
              flexDirection: "column",
              padding: 0,
              justifyContent: "flex-start",
              alignItems: "stretch",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Left>
                <Text style={{ fontSize: 20, fontWeight: "300" }}>Akımlar</Text>
              </Left>
            </View>
            <View
              style={{
                flexDirection: "row",
                // borderBottomWidth: 1,
                marginBottom: 5,
              }}
            >
              <Left>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "100",
                  }}
                >
                  Toplam {streamStore.streams.length}
                </Text>
              </Left>
              <Text></Text>
              <Right>
                <Button
                  danger
                  transparent
                  onPress={async () => {
                    const response = await AlertAsync(
                      "Tüm akımlar silinecek",
                      "Emin misiniz?",
                      [
                        {
                          text: "İptal",
                          onPress: () => "no",
                        },
                        {
                          text: "Tamam",
                          onPress: () => Promise.resolve("yes"),
                        },
                      ],
                      { cancelable: true, onDismiss: () => "no" }
                    );
                    if (response === "yes")
                      streamStore.streams.map((stream) =>
                        streamStore.removeStream(stream)
                      );
                    else {
                      console.log(response);
                    }
                  }}
                >
                  <Text>Hepsini sil</Text>
                </Button>
              </Right>
            </View>

            <StreamList />
          </View>
          <Fab
            style={{ backgroundColor: "#D76A03" }}
            onPress={() => navigation.navigate("AddStream")}
            position="bottomRight"
          >
            <Icon type="Feather" name="plus" style={{ color: "#fff" }} />
          </Fab>
        </View>
        <Footer>
          <AdMobBanner
            style={styles.ad}
            bannerSize="banner"
            adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
          />
        </Footer>
      </Container>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  ad: {
    paddingHorizontal: 5,
    alignSelf: "center",
    paddingBottom: 5,
  },
});

export default CalculateScreen;
