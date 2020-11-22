import { StackNavigationProp } from "@react-navigation/stack";
import { AdMobBanner } from "expo-ads-admob";
import { observer } from "mobx-react-lite";
import {
  Body,
  Container,
  Fab,
  Footer,
  Header,
  Icon,
  Title,
  View,
} from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import { StreamStoreContext } from "../stores/StreamStore";
import { StreamList } from "../components/StreamList";

interface CalculateScreenProps {
  navigation: StackNavigationProp<any, any>;
}

const CalculateScreen: React.FC<CalculateScreenProps> = observer(
  ({ navigation }) => {
    const streamStore = React.useContext(StreamStoreContext);
    React.useEffect(() => {
      console.log("n: ", streamStore.streams.length);
    }, streamStore.streams);
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
          ></View>
          <StreamList
            streams={streamStore.streams}
            removeStream={streamStore.removeStream}
            addStream={() => navigation.navigate("AddStream")}
          />
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
