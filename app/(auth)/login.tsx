import useFont from "@/hooks/useFont";
import { useLoader } from "@/hooks/useLoader";
import { login } from "@/services/authService";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  KeyboardAwareScrollView,
  KeyboardToolbar,
} from "react-native-keyboard-controller";

const Login = () => {
  const router = useRouter();
  const fontsLoaded = useFont();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { showLoader, hideLoader, isLoading } = useLoader();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    if (isLoading || !fontsLoaded) {
      return;
    }

    showLoader();

    try {
      await login(email, password);
      Alert.alert("Login Success..!");
      //router.replace("/favourites")
    } catch (e) {
      console.error(e);
      Alert.alert("Login failed. Please try again.");
    } finally {
      hideLoader();
    }
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardDismissMode="on-drag"
          bottomOffset={64}
          showsVerticalScrollIndicator={false}
          className="px-6 pt-10 bg-[#FFF8F3]"
        >
          <View className="h-80 mb-7 justify-center items-center">
            <Image
              source={require("../../assets/images/barista01.png")}
              className="w-80 h-80"
              resizeMode="contain"
            />
          </View>

          <View className="items-center gap-1 mb-7">
            <Text
              className="text-3xl text-[#4A3428] text-center"
              style={{
                fontFamily: "outfit-bold",
              }}
            >
              Ready to Cook?
            </Text>

            <Text
              className="text-[#9A8478] text-center text-base"
              style={{
                fontFamily: "outfit-regular",
              }}
            >
              Just one step to delicious
            </Text>
          </View>

          {/* FORM CONTAINER */}
          <View className="flex-1">
            {/* Email Input */}
            <View className="mb-5">
              <TextInput
                style={{
                  fontFamily: "outfit-regular",
                }}
                className="text-base text-[#4A3428] px-5 py-4 bg-[#FFF8F3] rounded-lg border border-[#E5D3B7]"
                placeholder="Email Address"
                placeholderTextColor="#9A8478"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* PASSWORD INPUT */}
            <View className="mb-5 relative">
              <TextInput
                style={{
                  fontFamily: "outfit-regular",
                }}
                className="text-base text-[#4A3428] px-5 py-4 bg-[#FFF8F3] rounded-lg border border-[#E5D3B7]"
                placeholder="Password"
                placeholderTextColor="#9A8478"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                className="absolute right-4 top-4 p-1"
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color="#9A8478"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              className={`bg-[#8B593E] py-5 rounded-lg mt-4 mb-6 ${isLoading ? "opacity-70" : ""}`}
              onPress={handleLogin}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              <Text
                style={{
                  fontFamily: "outfit-semibold",
                }}
                className="text-white text-[15px] text-center"
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Text>
            </TouchableOpacity>

            {/* Sign Up Link */}
            <View className="flex-row justify-center pb-5">
              <Text
                style={{
                  fontFamily: "outfit-regular",
                }}
                className="text-base text-[#9A8478]"
              >
                Don't have an account?{" "}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  router.push("/register");
                }}
              >
                <Text
                  style={{
                    fontFamily: "outfit-semibold",
                  }}
                  className="text-[#8B593E] text-base"
                >
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>

      <KeyboardToolbar />
    </>
  );
};

export default Login;
