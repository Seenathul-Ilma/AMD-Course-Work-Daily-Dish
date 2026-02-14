import { View } from "react-native";
import { Slot, Stack } from "expo-router";
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
            {/* <Slot /> */}

            {/* We hide the header for everything except the recipe list */}
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="(auth)" />
              <Stack.Screen name="(tabs)" />
              
              {/* This turns the back arrow ON */}
              <Stack.Screen 
                name="recipe-by-category/index" 
                options={{ 
                  headerShown: false, 
                  headerTitle: '',         // Empty title for a clean look
                  headerTransparent: true, // Floats the arrow over your design
                  headerTintColor: '#4A3428'
                }} 
              />
            </Stack>

          </View>
        </AuthProvider>
      </LoaderProvider>
    </KeyboardProvider>
  );
};

export default RootLayout;
