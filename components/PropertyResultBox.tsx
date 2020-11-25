import { Text, View } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";

interface PropertyResultBoxInterface {
  property: string;
  result: string;
  unit: string;
}
export const PropertyResultBox: React.FC<PropertyResultBoxInterface> = ({
  property,
  result,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text>{result}</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.text}>{property}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 110,
    height: 120,
    backgroundColor: "#f4f4f4",
    borderRadius: 8,
    margin: 12,
    alignItems: "center",
    shadowColor: "#1a1c20",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },

  footer: {
    flex: 1,
    backgroundColor: "#d62632",
    color: "white",
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  body: {
    flex: 3,
    padding: 12,
    backgroundColor: "#f4f4f4",
    color: "#1a1c20",
    alignItems: "center",
    justifyContent: "center",
  },
});
