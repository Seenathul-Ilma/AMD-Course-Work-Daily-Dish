import { View } from "react-native";
import { Slot } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardProvider } from "react-native-keyboard-controller";

import { LoaderProvider } from "@/context/LoaderContext";
import { AuthProvider } from "@/context/AuthContext";

const RootLayout = () => {
  const insets = useSafeAreaInsets();

  return (
    <KeyboardProvider>
      <LoaderProvider>
        <AuthProvider>
          <View
            style={{
              marginTop: insets.top,
              flex: 1,
              backgroundColor: "#FFF8F3",
            }}
          >
            <Slot />
          </View>
        </AuthProvider>
      </LoaderProvider>
    </KeyboardProvider>
  );
};

export default RootLayout;
