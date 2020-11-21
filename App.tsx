import React from "react";

import { setTestDeviceIDAsync } from "expo-ads-admob";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";

import BottomTabNavigator from "./navigators/TabNavigator";
import { StreamStore, StreamStoreContext } from "./stores/StreamStore";

export default function App() {
  setTestDeviceIDAsync("EMULATOR");
  return (
    <StreamStoreContext.Provider value={new StreamStore()}>
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </StreamStoreContext.Provider>
  );
}
