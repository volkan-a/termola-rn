import { observer } from "mobx-react-lite";
import { Thumbnail, View } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import { ProcessStream, StreamResult } from "../backend/processStream";
import { StreamStoreContext } from "../stores/StreamStore";
import { PropertyResultBox } from "./PropertyResultBox";
import Icon from "../assets/icon.png";
import { ScrollView } from "react-native-gesture-handler";

export const StreamResultComponent = observer(() => {
  const streamStore = React.useContext(StreamStoreContext);
  const results = (streamStore.selectedStream as ProcessStream).result;
  return (
    <View style={styles.container}>
      {typeof streamStore.selectedStream === "number" && (
        <Thumbnail
          source={Icon}
          style={{ opacity: 0.1, width: 300, height: 300 }}
        />
      )}
      {typeof streamStore.selectedStream !== "number" && (
        <ScrollView>
          <View style={styles.row}>
            <PropertyResultBox
              property={"Sıcaklık"}
              result={(results?.temperature! - 273.15).toFixed(1)}
              unit="oC"
            />
            <PropertyResultBox
              property={"Basınç"}
              result={(results?.pressure! / 1000).toFixed(0)}
              unit="kPa"
            />
            <PropertyResultBox
              property={"Yoğunluk"}
              result={results?.density!.toFixed(4)}
              unit="kg/m3"
            />
          </View>
          <View style={styles.row}>
            <PropertyResultBox
              property={"Özgül entalpi"}
              result={(results?.specificEnthalpy! / 1000).toFixed(1)}
              unit="kJ/kg"
            />
            <PropertyResultBox
              property={"Özgül entropi"}
              result={(results?.specificEntropy! / 1000).toFixed(4)}
              unit="kJ/kgK"
            />
            <PropertyResultBox
              property={"Kuruluk derecesi"}
              result={results?.vaporFraction}
              unit="-"
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
  },

  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-around",
  },
});
