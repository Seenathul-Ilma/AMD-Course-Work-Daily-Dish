import { useLoader } from "@/hooks/useLoader";
import { login } from "@/services/authService";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { showLoader, hideLoader, isLoading } = useLoader();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    if (isLoading) {
      return;
    }

    showLoader();

    try {
      await login(email, password);
      Alert.alert("Login Success..!")
      //router.replace("/home")
    } catch (e) {
      console.error(e);
      Alert.alert("Login failed. Please try again.");
    } finally {
      hideLoader();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1 bg-[#FFF8F3]">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
          keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            className="px-6 pt-10"
          >
            <View className="h-80 mb-7 justify-center items-center">
              <Image
                source={require("../../assets/images/barista01.png")}
                className="w-80 h-80"
                resizeMode="contain"
              />
            </View>

            <View className="items-center gap-1 mb-10">
  <Text className="text-3xl font-bold text-[#4A3428] text-center">
    Ready to Cook?
  </Text>

  <Text className="text-[#9A8478] text-center text-base">
    Unlock your saved recipes
  </Text>
</View>
            
            {/* FORM CONTAINER */}
            <View className="flex-1">
              {/* Email Input */}
              <View className="mb-5">
                <TextInput
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
                className={`bg-[#8B593E] py-4 rounded-lg mt-5 mb-7 ${isLoading ? "opacity-70" : ""}`}
                onPress={handleLogin}
                disabled={isLoading}
                activeOpacity={0.8}
              >
                <Text className="text-white text-base font-semibold text-center">
                  {isLoading ? "Signing In..." : "Sign In"}
                </Text>
              </TouchableOpacity>

              {/* Sign Up Link */}
              <View className="flex-row justify-center pb-5">
                              <Text className="text-base text-[#9A8478]">
                                Don't have an account? </Text>
                              <TouchableOpacity
                                onPress={() => {
                                  router.push("/register")
                                }}
                              >
                                <Text className="text-[#8B593E] text-base font-medium">
                                  Sign In
                                </Text>
                              </TouchableOpacity>
                            </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
