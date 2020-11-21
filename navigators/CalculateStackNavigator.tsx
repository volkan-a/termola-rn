import { createStackNavigator } from "@react-navigation/stack";
import AddStreamPage from "../screens/AddStreamPage";
import CalculateScreen from "../screens/CalculateScreen";
import React from "react";
import { FluidListPage } from "../screens/FluidListPage";

const CalculateStack = createStackNavigator();

const CalculateStackScreen = () => {
  return (
    <CalculateStack.Navigator screenOptions={{ headerShown: false }}>
      <CalculateStack.Screen name="Calculate" component={CalculateScreen} />
      <CalculateStack.Screen name="AddStream" component={AddStreamPage} />
      <CalculateStack.Screen name="SelectFluid" component={FluidListPage} />
    </CalculateStack.Navigator>
  );
};

export default CalculateStackScreen;
