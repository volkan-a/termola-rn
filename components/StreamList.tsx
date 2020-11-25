import { observer } from "mobx-react-lite";
import { View, Text, Icon, Button } from "native-base";
import React from "react";
import AlertAsync from "react-native-alert-async";

import { ProcessStream } from "../backend/processStream";
import { ScrollView } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Animated } from "react-native";
import { StreamStoreContext } from "../stores/StreamStore";

interface StreamListInterface {
  addStream(): void;
}

export const StreamList: React.FC<StreamListInterface> = observer(
  ({ addStream }) => {
    const streamStore = React.useContext(StreamStoreContext);
    const removeStreams = async () => {
      const response = await AlertAsync(
        "Tüm akımlar silinecek",
        "Emin misiniz?",
        [
          {
            text: "İptal",
            onPress: () => "no",
          },
          {
            text: "Tamam",
            onPress: () => Promise.resolve("yes"),
          },
        ],
        { cancelable: true, onDismiss: () => "no" }
      );
      if (response === "yes")
        streamStore.streams.map((stream) => streamStore.removeStream(stream));
    };

    const renderRightActions = (
      progress: Animated.AnimatedInterpolation,
      dragX: Animated.AnimatedInterpolation
    ) => {
      const trans = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [64, 0],
      });
      return (
        <View style={{ width: 64, flexDirection: "column-reverse" }}>
          <Animated.View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "flex-end",
              transform: [{ translateX: trans }],
            }}
          >
            <Button danger full>
              <Text
                style={{ color: "#f8f8f8", fontSize: 18, fontWeight: "300" }}
                onPress={() =>
                  streamStore.removeStream(
                    streamStore.selectedStream as ProcessStream
                  )
                }
              >
                Sil
              </Text>
            </Button>
          </Animated.View>
        </View>
      );
    };

    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "stretch",
          borderBottomColor: "d62632",
          borderWidth: 1,
        }}
      >
        <View
          style={{
            backgroundColor: "#f4f4f4",
            borderBottomWidth: 1,
            borderBottomColor: "pink",
            shadowColor: "#1a1c20",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,

            elevation: 2,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "300",
              textAlign: "left",
              textAlignVertical: "center",
              paddingStart: 5,
            }}
          >
            Akımlar
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button success transparent onPress={addStream}>
              <Text>Yeni ekle</Text>
            </Button>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "100",
              }}
            >
              Toplam {streamStore.streams.length}
            </Text>

            <Button danger transparent onPress={removeStreams}>
              <Text style={{ textAlign: "right" }}>Hepsini sil</Text>
            </Button>
          </View>
        </View>

        {streamStore.streams.length === 0 && (
          <Button
            large
            light
            transparent
            style={{
              alignSelf: "center",
              flex: 1,
            }}
            onPress={addStream}
          >
            <Text>Bir akım ekleyin</Text>
            <Icon type="Feather" name="plus" />
          </Button>
        )}
        {streamStore.streams.length > 0 && (
          <ScrollView>
            {streamStore.streams.map((stream, index) => (
              <Swipeable
                key={index}
                rightThreshold={40}
                friction={2}
                onSwipeableRightOpen={() => {
                  streamStore.setSelectedStream(stream);
                }}
                renderRightActions={renderRightActions}
                children={
                  <Button
                    full
                    style={{
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    onPress={() => {
                      streamStore.setSelectedStream(stream);
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        height: 45,
                        paddingHorizontal: 5,
                        backgroundColor: "#f4f4f4",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderBottomWidth: 0.25,
                        borderBottomColor: "#1a1c20",
                      }}
                    >
                      <Text
                        style={{
                          color: "#1a1c20",
                          fontSize: 18,
                          fontWeight: "200",
                        }}
                      >
                        {stream.name}
                      </Text>
                      <Icon
                        type="Feather"
                        name={
                          stream.isCalculated ? "check-circle" : "alert-circle"
                        }
                        style={{
                          fontSize: 18,
                          color: stream.isCalculated ? "green" : "red",
                          alignContent: "flex-start",
                        }}
                      />
                    </View>
                  </Button>
                }
              />
            ))}
          </ScrollView>
        )}
      </View>
    );
  }
);
