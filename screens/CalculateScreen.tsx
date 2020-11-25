import { StackNavigationProp } from "@react-navigation/stack";
import { AdMobBanner } from "expo-ads-admob";
import { Body, Container, Footer, Header, Title, View } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import { StreamList } from "../components/StreamList";
import { StreamResultComponent } from "../components/StreamResultComponent";

interface CalculateScreenProps {
  navigation: StackNavigationProp<any, any>;
}

const CalculateScreen: React.FC<CalculateScreenProps> = ({ navigation }) => {
  return (
    <Container style={{ flex: 1, flexDirection: "column" }}>
      <Header style={{ backgroundColor: "#F8F8F8" }}>
        <Body>
          <Title style={{ color: "#1a1c20", fontSize: 24, fontWeight: "700" }}>
            Hesapla
          </Title>
        </Body>
      </Header>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <View style={{ flex: 1 }}>
          <StreamList addStream={() => navigation.navigate("AddStream")} />
        </View>
        <View style={{ flex: 2 }}>
          <StreamResultComponent />
        </View>
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
};

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
