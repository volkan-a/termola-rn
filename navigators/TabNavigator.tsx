import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button, Footer, FooterTab, Icon } from "native-base";
import React from "react";
import AboutScreen from "../screens/AboutScreen";
import CalculateStackScreen from "./CalculateStackNavigator";

const Tab = createBottomTabNavigator();

const MyTabBar = ({ state, descriptors, navigation }) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }
  // const navigation2 = useNavigation();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  return (
    <Footer>
      <FooterTab style={{ flex: 1, justifyContent: "flex-end" }}>
        <Button onPress={() => navigation.navigate("Calculate")}>
          <Icon type="Feather" name="cpu" />
        </Button>
        <Button>
          <Icon
            type="Feather"
            name="info"
            onPress={() => navigation.navigate("About")}
          />
        </Button>
      </FooterTab>
    </Footer>
  );
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
      <Tab.Screen
        name="Calculate"
        component={CalculateStackScreen}
      ></Tab.Screen>
      <Tab.Screen name="About" component={AboutScreen}></Tab.Screen>
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
