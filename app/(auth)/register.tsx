import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { registerUser } from "@/services/authService";
import { useLoader } from "@/hooks/useLoader";
import { Ionicons } from "@expo/vector-icons";

const Register = () => {
  const router = useRouter(); // import { useRouter } from "expo-router"

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [conPassword, setConPassword] = useState("");
  const [showConPassword, setShowConPassword] = useState(false);

  const { showLoader, hideLoader, isLoading } = useLoader();

  const handleRegister = async () => {
    if (!name || !email || !password || !conPassword || isLoading) {
      Alert.alert("Please fill all fields...!");
      return;
    }
    if (password !== conPassword) {
      Alert.alert("Password do not match...!");
      return;
    }
    showLoader();
    try {
      await registerUser(name, email, password);
      Alert.alert("Account created..!");
      router.replace("/login");
    } catch (e) {
      console.error(e);
      Alert.alert("Register fail..!");
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
            <View className="h-80 mb-3 justify-center items-center">
              <Image
                source={require("../../assets/images/barista02.png")}
                className="w-80 h-80"
                resizeMode="contain"
              />
            </View>

            <View className="items-center gap-0.5 mb-6">
              <Text className="text-3xl font-bold text-[#4A3428] text-center">
                Discover, Save & Cook
              </Text>

              <Text className="text-[#9A8478] text-center text-base">
                Create Your Recipe Collection
              </Text>
            </View>

            {/* FORM CONTAINER */}
            <View className="flex-1">
              <View className="mb-3">
                <TextInput
                  className="text-base text-[#4A3428] px-5 py-4 bg-[#FFF8F3] rounded-lg border border-[#E5D3B7]"
                  placeholder="Fullname"
                  placeholderTextColor="#9A8478"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="none"
                />
              </View>

              {/* Email Input */}
              <View className="mb-3 relative">
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
              <View className="mb-3 relative">
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

              <View className="mb-4 relative">
                <TextInput
                  className="text-base text-[#4A3428] px-5 py-4 bg-[#FFF8F3] rounded-lg border border-[#E5D3B7]"
                  placeholder="Confirm Password"
                  placeholderTextColor="#9A8478"
                  value={conPassword}
                  onChangeText={setConPassword}
                  secureTextEntry={!showConPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  className="absolute right-4 top-4 p-1"
                  onPress={() => setShowConPassword(!showConPassword)}
                >
                  <Ionicons
                    name={showConPassword ? "eye-outline" : "eye-off-outline"}
                    size={20}
                    color="#9A8478"
                  />
                </TouchableOpacity>
              </View>

              <Pressable
                onPress={handleRegister}
                disabled={isLoading}
                className={`bg-[#8B593E] py-4 rounded-lg mt-2 mb-7 ${
                  isLoading ? "opacity-70" : ""
                }`}
                style={({ pressed }) => ({
                  opacity: pressed && !isLoading ? 0.8 : 1,
                })}
              >
                <Text className="text-white text-base font-semibold text-center">
                  {isLoading ? "Signing In..." : "Sign In"}
                </Text>
              </Pressable>

              {/* Sign Up Link */}
              <View className="flex-row justify-center pb-5">
                <Text className="text-base text-[#9A8478]">
                  Already have an account? </Text>
                <TouchableOpacity
                  onPress={() => {
                    //router.push("/login")
                    //router.back()
                    router.replace("/login")
                  }}
                >
                  <Text className="text-[#8B593E] text-base font-medium">
                    Sign In
                  </Text>
                </TouchableOpacity>
              </View>

              {/* <TouchableOpacity
                className="items-center pb-5"
                onPress={() => router.push("/(auth)/login")}
              >
                <Text className="text-base text-[#9A8478]">
                  Already have an account?{" "}
                  <Text className="text-[#8B593E] text-base font-medium">
                    Sign In
                  </Text>
                </Text>
              </TouchableOpacity> */}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Register;
