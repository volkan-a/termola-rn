import { AdMobBanner } from "expo-ads-admob";
import { StyleSheet } from "react-native";
import React from "react";
import { StackNavigationProp } from "@react-navigation/stack/lib/typescript/src/types";
import { observer } from "mobx-react-lite";
import {
  ProcessStream,
  StreamInput,
  THERMODYNAMIC_PROPERTIES,
} from "../backend/processStream";
import {
  Button,
  Container,
  Footer,
  Header,
  Icon,
  Left,
  Right,
  Spinner,
  Text,
  Title,
  View,
} from "native-base";
import { PropertySelector } from "../components/PropertySelector";
import { Stack } from "react-native-spacing-system";
import { FluidSelector } from "../components/FluidSelector";
import { StreamStoreContext } from "../stores/StreamStore";
import { RouteProp } from "@react-navigation/native";

interface AddStreamPageProps {
  navigation: StackNavigationProp<any, any>;
  route: RouteProp<any, any>;
}

const testInput: StreamInput = {
  composition: [{ name: "Water", fraction: 1.0 }],
  massFlowrate: 1.0,
  massFlowrateUnit: "KilogramsPerSecond",
  property1: THERMODYNAMIC_PROPERTIES.PRESSURE,
  value1: 1,
  unit1: "MegaPascals",
  property2: THERMODYNAMIC_PROPERTIES.TEMPERATURE,
  value2: 100.0,
  unit2: "Degrees",
};

const AddStreamPage: React.FC<AddStreamPageProps> = observer(
  ({ navigation, route }) => {
    const [name, setName] = React.useState("");
    const [isWaiting, setWaiting] = React.useState(false);
    const [input, setInput] = React.useState(testInput);
    const streamStore = React.useContext(StreamStoreContext);
    React.useEffect(() => {
      if (route.params?.fluid)
        setInput({
          ...input,
          composition: [{ name: route.params?.fluid, fraction: 1.0 }],
        });
    }, [route.params?.fluid]);
    return (
      <Container
        style={{
          flex: 1,
          flexDirection: "column",
          backgroundColor: "#f4f4f4",
        }}
      >
        <Header style={{ backgroundColor: "#ebebeb", alignItems: "center" }}>
          <Left>
            <Button
              icon
              iconLeft
              transparent
              onPress={() => navigation.goBack()}
            >
              <Icon type="Feather" name="arrow-left" />
            </Button>
          </Left>
          <Title
            style={{
              color: "#363946",
              fontSize: 20,
              fontWeight: "500",
            }}
          >
            Akım ekle
          </Title>
          <Right />
        </Header>
        <View style={styles.container}>
          <FluidSelector
            navigation={navigation}
            fluid={input.composition[0].name}
            onNameUpdated={(n) => setName(n)}
          />
          <Stack size={16} />
          <PropertySelector
            propp={input.property1}
            valuee={input.value1}
            unitt={input.unit1}
            updateProps={(prop, value, unit) => {
              setInput({
                ...input,
                property1: prop,
                value1: parseFloat(value.replace(",", ".")),
                unit1: unit,
              });
            }}
          />
          <Stack size={16} />
          <PropertySelector
            propp={input.property2}
            valuee={input.value2}
            unitt={input.unit2}
            updateProps={(prop, value, unit) => {
              setInput({
                ...input,
                property2: prop,
                value2: parseFloat(value.replace(",", ".")),
                unit2: unit,
              });
            }}
          />
          <Stack size={16} />
          <Button
            primary
            full
            style={styles.button}
            onPress={() => {
              setWaiting(true);
              const stream = new ProcessStream(input);
              stream.name = name;
              stream.calculate().then(() => {
                streamStore.addStream(stream);
                setWaiting(false);
                navigation.goBack();
              });
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "500", color: "#f4f4f4" }}>
              Ekle
            </Text>
          </Button>
          {isWaiting && <Spinner color="red" />}
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
  header: {
    fontSize: 32,
    fontWeight: "100",
  },
  container: {
    flex: 1,
    padding: 5,
    flexDirection: "column",
    paddingTop: 10,

    alignItems: "stretch",
  },
  button: {
    backgroundColor: "#d62632",
    shadowColor: "#1a1c20",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  ad: {
    paddingHorizontal: 5,
    alignSelf: "center",
    paddingBottom: 5,
  },
});

export default AddStreamPage;
