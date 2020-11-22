import { observer } from "mobx-react-lite";
import { View, Text, Icon, Button } from "native-base";
import React from "react";
import AlertAsync from "react-native-alert-async";
import { Stack } from "react-native-spacing-system";

import { ProcessStream } from "../backend/processStream";
import { ScrollView } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Animated } from "react-native";

interface StreamListInterface {
  streams: ProcessStream[];
  removeStream(arg: ProcessStream): void;
  addStream(): void;
}

export const StreamList = observer(
  ({ streams, removeStream, addStream }: StreamListInterface) => {
    const [selectedStream, setSelectedStream] = React.useState<ProcessStream>();
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
      if (response === "yes") streams.map((stream) => removeStream(stream));
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
                onPress={() => removeStream(selectedStream)}
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
        padder
        style={{
          flex: 1,
          flexDirection: "column",
          padding: 0,
          justifyContent: "flex-start",
          alignItems: "stretch",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottomColor: "#1a1c20",
            borderBottomWidth: 1,
            paddingBottom: 10,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "300",
              textAlign: "left",
            }}
          >
            Akımlar
          </Text>
          <Button
            small
            style={{ backgroundColor: "#d62632" }}
            onPress={addStream}
          >
            <Icon fontSize={20} type="Feather" name="plus" />
          </Button>
        </View>
        <ScrollView>
          {streams.map((stream, index) => (
            <Swipeable
              key={index}
              rightThreshold={40}
              friction={2}
              onSwipeableRightOpen={() => setSelectedStream(stream)}
              renderRightActions={renderRightActions}
              children={
                <Button
                  full
                  style={{
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                  onPress={() => alert(stream.result?.temperature.toFixed(1))}
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
        <Stack size={16} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderTopWidth: 1,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "100",
            }}
          >
            Toplam {streams.length}
          </Text>

          <Button danger transparent onPress={removeStreams}>
            <Text>Hepsini sil</Text>
          </Button>
        </View>
      </View>
    );
  }
);
