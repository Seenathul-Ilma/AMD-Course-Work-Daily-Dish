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
      <View className="flex-1 bg-[#F3E5F5]">
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
                source={require("../../assets/images/i1.png")}
                className="w-80 h-80"
                resizeMode="contain"
              />
            </View>

            <Text className="text-3xl font-bold text-center text-[#4A148C] mb-10">
              Welcome Back
            </Text>

            {/* FORM CONTAINER */}
            <View className="flex-1">
              {/* Email Input */}
              <View className="mb-5">
                <TextInput
                  className="text-base text-[#4A148C] px-5 py-4 bg-[#F3E5F5] rounded-lg border border-[#D1C4E9]"
                  placeholder="Enter email"
                  placeholderTextColor="#999"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              {/* PASSWORD INPUT */}
              <View className="mb-5 relative">
                <TextInput
                  className="text-base text-[#4A148C] px-5 py-4 bg-[#F3E5F5] rounded-lg border border-[#D1C4E9]"
                  placeholder="Enter password"
                  placeholderTextColor="#999"
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
                    color="#999"
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                className={`bg-[#6A1B9A] py-4 rounded-lg mt-5 mb-7 ${isLoading ? "opacity-70" : ""}`}
                onPress={handleLogin}
                disabled={isLoading}
                activeOpacity={0.8}
              >
                <Text className="text-white text-base font-semibold text-center">
                  {isLoading ? "Signing In..." : "Sign In"}
                </Text>
              </TouchableOpacity>

              {/* Sign Up Link */}
              <TouchableOpacity
                className="items-center pb-5"
                onPress={() => router.push("/(auth)/login")}
              >
                <Text className="text-base text-[#999]">
                  Don't have an account?{" "}
                  <Text className="text-[#6A1B9A] text-base font-medium">Sign up</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
