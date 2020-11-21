import { View, Text, Icon, List, ListItem, Button } from "native-base";
import React from "react";
import { Inset, Queue } from "react-native-spacing-system";
import { SwipeListView } from "react-native-swipe-list-view";
import { StreamStoreContext } from "../stores/StreamStore";

export const StreamList = () => {
  const streamStore = React.useContext(StreamStoreContext);

  return (
    <SwipeListView
      closeOnRowOpen={false}
      closeOnScroll={true}
      closeOnRowBeginSwipe={true}
      closeOnRowPress={true}
      rightOpenValue={-50}
      rightActivationValue={-50}
      disableRightSwipe
      data={streamStore.streams}
      renderItem={(stream) => (
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            backgroundColor: "#f4f4f4",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <View
            style={{ flexDirection: "row", alignItems: "center", padding: 5 }}
          >
            <Icon
              type="Feather"
              // name="check-circle"
              name={stream.item.isCalculated ? "check-circle" : "alert-circle"}
              style={{
                fontSize: 18,
                color: stream.item.isCalculated ? "green" : "red",
                alignContent: "flex-start",
              }}
            />
            <Queue size={10} />
            <Text style={{ fontSize: 18, fontWeight: "500", color: "1a1c20" }}>
              {stream.item.name}
            </Text>
          </View>
          <View>
            <List>
              <ListItem>
                <Text>{stream.item.result?.specificEnthalpy}</Text>
              </ListItem>
            </List>
          </View>
        </View>
      )}
      renderHiddenItem={(stream) => (
        <View
          style={{
            flex: 1,
            paddingVertical: 0,
            backgroundColor: "#f8f8f8",
            flexDirection: "row",
            alignContent: "stretch",
            justifyContent: "flex-end",
          }}
        >
          <Button
            full
            danger
            onPress={() => streamStore.removeStream(stream.item)}
          >
            <Text>Sil</Text>
          </Button>
        </View>
      )}
      ItemSeparatorComponent={() => (
        <View
          style={{
            backgroundColor: "gray",
            height: 0.25,
            paddingTop: 1,
          }}
        />
      )}
    />
  );
};
