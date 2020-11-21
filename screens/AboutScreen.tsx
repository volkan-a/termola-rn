import React from "react";
import { StyleSheet, View } from "react-native";
import thermoprocLogo from "../assets/logo.png";
import termolaLogo from "../assets/icon.png";
import { Container, Content, Thumbnail, Text } from "native-base";

const AboutScreen = () => {
  return (
    <Container style={{ backgroundColor: "#f4f4f4" }}>
      <Content>
        <View
          style={{
            backgroundColor: "#f4f4f4",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "50%",
          }}
        >
          <Thumbnail
            large
            source={termolaLogo}
            style={{
              width: 192,
              height: 192,
              alignSelf: "center",
            }}
          />
          <Text style={styles.header}>Termola</Text>
          <Text style={styles.subheader}>
            Termodinamik özellik hesaplayıcısı
          </Text>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 12 }}>©2020 ThermoProc Ltd.</Text>
            <Thumbnail
              large
              source={thermoprocLogo}
              style={{ width: 36, height: 36 }}
            />
          </View>
        </View>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 48,
    fontWeight: "100",
  },
  subheader: {
    fontSize: 18,
    fontWeight: "300",
  },
  ad: {
    alignItems: "center",
    backgroundColor: "transparent",
    alignSelf: "center",
    justifyContent: "flex-start",
  },
});

export default AboutScreen;
