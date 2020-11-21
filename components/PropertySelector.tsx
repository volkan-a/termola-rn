import { Picker, Icon, Input, Item, View } from "native-base";
// import { Picker } from "@react-native-community/picker";
import { StyleSheet } from "react-native";
import React from "react";
import {
  THERMODYNAMIC_PROPERTIES,
  THERMODYNAMIC_PROPERTY_NAMES,
} from "../backend/processStream";

export interface PropertySelectorProps {
  propp: THERMODYNAMIC_PROPERTIES;
  valuee: number;
  unitt: string;
  updateProps(
    prop: THERMODYNAMIC_PROPERTIES,
    value: string,
    unit: string
  ): void;
}
export const PropertySelector: React.FC<PropertySelectorProps> = ({
  propp,
  valuee,
  unitt,
  updateProps,
}) => {
  const [bgColor, setBgColor] = React.useState("#f4f4f4");
  const [prop, setProp] = React.useState(propp);
  const [value, setValue] = React.useState(valuee.toString());
  const [units, setUnits] = React.useState(GetUnitsOptions(prop));
  const [unit, setUnit] = React.useState(unitt);

  React.useEffect(() => {
    setUnits(GetUnitsOptions(prop));
    setValue("0,0");
  }, [prop]);

  React.useEffect(() => {
    setUnit(units[0].props.value);
  }, [units]);

  React.useEffect(() => {
    updateProps(prop, value, unit);
  }, [prop, unit, value]);

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Item picker style={{ borderBottomColor: "transparent" }}>
          <Picker
            style={{ marginHorizontal: 0, height: 50 }}
            selectedValue={prop}
            onValueChange={(value, position) => {
              setProp(value as THERMODYNAMIC_PROPERTIES);
            }}
            mode="dropdown"
            textStyle={styles.propTextStyle}
            iosIcon={<Icon name="arrow-down" style={{ color: "#f4f4f4" }} />}
            iosHeader="Özellik"
          >
            {THERMODYNAMIC_PROPERTY_NAMES.map((name, index) => (
              <Picker.Item
                label={name}
                value={index as THERMODYNAMIC_PROPERTIES}
                key={index}
              />
            ))}
          </Picker>
        </Item>
      </View>
      <View style={styles.right}>
        <Item style={{ borderBottomColor: "transparent" }}>
          <Input
            keyboardType="numeric"
            onFocus={(e) => setBgColor("white")}
            onBlur={(e) => setBgColor("#f4f4f4")}
            style={{ ...styles.valueTextStyle, backgroundColor: bgColor }}
            value={value.toString()}
            onChange={(e) => {
              setValue(e.nativeEvent.text);
            }}
          />
        </Item>
        <Item picker style={{ borderBottomColor: "transparent" }}>
          <Picker
            selectedValue={unit}
            onValueChange={(value, position) => setUnit(value)}
            mode="dropdown"
            textStyle={styles.unitTextStyle}
            iosIcon={<Icon name="arrow-down" style={{ color: "#717275" }} />}
            iosHeader="Birim"
          >
            {units}
          </Picker>
        </Item>
      </View>
    </View>
  );
};

function GetUnitsOptions(property: THERMODYNAMIC_PROPERTIES) {
  switch (property) {
    case THERMODYNAMIC_PROPERTIES.PRESSURE:
    default:
      return [
        <Picker.Item key="Pascals" value="Pascals" label="Pa" />,
        <Picker.Item key="KiloPascals" value="KiloPascals" label="kPa" />,
        <Picker.Item key="MegaPascals" value="MegaPascals" label="MPa" />,
        <Picker.Item key="Bars" value="Bars" label="bar" />,
        <Picker.Item key="Atmospheres" value="Atmospheres" label="atm" />,
      ];
    case THERMODYNAMIC_PROPERTIES.TEMPERATURE:
      return [
        <Picker.Item key="Degrees" value="Degrees" label="°C" />,
        <Picker.Item key="Kelvins" value="Kelvins" label="K" />,
        <Picker.Item key="Fahrenheits" value="Fahrenheits" label="°F" />,
        <Picker.Item key="Rankines" value="Rankines" label="R" />,
      ];
    case THERMODYNAMIC_PROPERTIES.DENSITY:
      return [
        <Picker.Item
          key="KilogramsPerCubicMeter"
          value="KilogramsPerCubicMeter"
          label="kg/m3"
        />,
        <Picker.Item
          key="PoundsPerCubicFoot"
          value="PoundsPerCubicFoot"
          label="lb/ft3"
        />,
      ];
    case THERMODYNAMIC_PROPERTIES.SPECIFIC_ENTHALPY:
      return [
        <Picker.Item
          key="JoulesPerKilogram"
          value="JoulesPerKilogram"
          label="J/kg"
        />,
        <Picker.Item
          key="KiloJoulesPerKilogram"
          value="KiloJoulesPerKilogram"
          label="kJ/kg"
        />,
        <Picker.Item
          key="BritishThermalUnitsPerPound"
          value="BritishThermalUnitsPerPound"
          label="BTU/lb"
        />,
      ];
    case THERMODYNAMIC_PROPERTIES.SPECIFIC_ENTROPY:
      return [
        <Picker.Item
          key="JoulesPerKilogramKelvin"
          value="JoulesPerKilogramKelvin"
          label="J/kg.K"
        />,
        <Picker.Item
          key="KiloJoulesPerKilogramKelvin"
          value="KiloJoulesPerKilogramKelvin"
          label="kJ/kg.K"
        />,
        <Picker.Item
          key="BritishThermalUnitsPerPoundFahrenheit"
          value="BritishThermalUnitsPerPoundFahrenheit"
          label="BTU/lb.F"
        />,
      ];
    case THERMODYNAMIC_PROPERTIES.VAPOR_FRACTION:
      return [
        <Picker.Item key="Fraction" value="Fraction" label="-" />,
        <Picker.Item key="PerCent" value="PerCent" label="%" />,
      ];
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f4f4f4",
    flexDirection: "row",
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

  left: {
    flex: 1,
    backgroundColor: "#d62632",
    alignItems: "center",
    justifyContent: "center",
  },

  right: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "space-between",
  },

  propTextStyle: {
    fontSize: 20,
    fontWeight: "500",
    color: "#f4f4f4",
    textAlign: "center",
  },

  valueTextStyle: {
    fontSize: 22,
    fontWeight: "500",
    color: "#ab3f6f",
    textAlign: "center",
  },

  unitTextStyle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#717275",
    textAlign: "right",
  },
});
