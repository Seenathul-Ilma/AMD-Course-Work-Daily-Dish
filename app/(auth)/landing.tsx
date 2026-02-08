import useFont from "@/hooks/useFont";
import { Marquee } from "@animatereactnative/marquee";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Landing() {
  const router = useRouter();

  const fontsLoaded = useFont();

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF8F3' }}>
        {/* You can add a loading indicator here if desired */}
        <Text style={{ fontFamily: 'System', fontSize: 18 }}>Loading...</Text>
      </View>
    );
  }

  const imageList = [
    require("./../../assets/images/1.jpg"),
    require("./../../assets/images/2.jpg"),
    require("./../../assets/images/5.jpg"),
    require("./../../assets/images/7.jpg"),
    require("./../../assets/images/9.jpg"),
    require("./../../assets/images/10.jpg"),
    require("./../../assets/images/11.jpg"),
    require("./../../assets/images/14.jpg"),
    require("./../../assets/images/15.jpg"),
  ];

  //const infiniteImages = [...imageList01, ...imageList01];

  return (
    <GestureHandlerRootView>
      <View
        style={{
          backgroundColor: "#FFF8F3",
        }}
      >
        <Marquee
          spacing={10}
          speed={1.2}
          //reverse={false}
          style={{
            transform: [{ rotate: "-4deg" }],
            marginTop: 10,
          }}
        >
          <View style={styles.imageContainer}>
            {imageList.map((image, index) => (
              <Image key={index} source={image} style={styles.image} />
            ))}
          </View>
        </Marquee>

        <Marquee
          spacing={10}
          speed={0.4}
          reverse={true}
          style={{
            transform: [{ rotate: "-4deg" }],
            marginTop: 10,
          }}
        >
          <View style={styles.imageContainer}>
            {imageList.map((image, index) => (
              <Image key={index} source={image} style={styles.image} />
            ))}
          </View>
        </Marquee>

        <Marquee
          spacing={10}
          speed={0.8}
          //reverse={false}
          style={{
            transform: [{ rotate: "-4deg" }],
            marginTop: 10,
          }}
        >
          <View style={styles.imageContainer}>
            {imageList.map((image, index) => (
              <Image key={index} source={image} style={styles.image} />
            ))}
          </View>
        </Marquee>
      </View>

      <View
        style={{
          backgroundColor: "#FFF8F3",
          height: "100%",
          padding: 20,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-semibold",
            fontSize: 30,
            textAlign: "center",
          }}
        >
          Daily Dish | Find, Create & Enjoy Delicious Recipes
        </Text>

        <Text
          style={{
            textAlign: "center",
            fontFamily: "outfit-regular",
            fontSize: 17,
            color: "gray",
            marginTop: 10
          }}
        >
          Generate delicious recipes in seconds with the power of AI
        </Text>

        <View className="bg-[#8B593E] py-3 rounded-3xl mt-7 mb-7">
          <TouchableOpacity
            onPress={() => {
              router.push("/register");
            }}
          >
            <Text style={{
            fontFamily: "outfit-semibold"
          }} className="text-white text-lg text-center">
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 160,
    height: 160,
    borderRadius: 25,
  },
  imageContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 6,
    backgroundColor: "#FFF8F3",
  },
});
