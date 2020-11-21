import { StackNavigationProp } from "@react-navigation/stack";
import { Button, Input, Item, Text, View } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";

interface FluidSelectorProps {
  navigation: StackNavigationProp<any, any>;
  fluid: string;
  onNameUpdated(arg0: string): void;
}

export const FluidSelector: React.FC<FluidSelectorProps> = ({
  navigation,
  fluid,
  onNameUpdated,
}) => {
  const [bgColor, setBgColor] = React.useState("#f4f4f4");
  const [name, setName] = React.useState("Yeni akım");
  React.useEffect(() => {
    onNameUpdated(name);
  }, [name]);
  return (
    <View style={styles.container}>
      <Item style={{ borderBottomWidth: 0 }}>
        <Input
          value={name}
          onFocus={(e) => setBgColor("white")}
          onBlur={(e) => setBgColor("#f4f4f4")}
          onChange={(e) => setName(e.nativeEvent.text)}
          style={{ ...styles.valueTextStyle, backgroundColor: bgColor }}
        />
      </Item>
      <Button
        transparent
        full
        onPress={() => navigation.navigate("SelectFluid")}
      >
        <Text style={styles.unitTextStyle}>{fluid}</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#f4f4f4",
    height: 100,
    shadowColor: "#1a1c20",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  valueTextStyle: {
    fontSize: 22,
    fontWeight: "500",
    color: "#ab3f6f",
    textAlign: "center",
  },

  unitTextStyle: {
    fontSize: 22,
    fontWeight: "500",
    color: "#717275",
    textAlign: "right",
  },
});
