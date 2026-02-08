import { useFonts } from "expo-font";

const useFont = () => {
  const [fontsLoaded] = useFonts({
    "outfit-black": require("../assets/fonts/Outfit-Black.otf"),
    "outfit-bold": require("../assets/fonts/Outfit-Bold.otf"),
    "outfit-extrabold": require("../assets/fonts/Outfit-ExtraBold.otf"),
    "outfit-extralight": require("../assets/fonts/Outfit-ExtraLight.otf"),
    "outfit-light": require("../assets/fonts/Outfit-Light.otf"),
    "outfit-medium": require("../assets/fonts/Outfit-Medium.otf"),
    "outfit-regular": require("../assets/fonts/Outfit-Regular.otf"),
    "outfit-semibold": require("../assets/fonts/Outfit-SemiBold.otf"),
    "outfit-thin": require("../assets/fonts/Outfit-Thin.otf"),
  });

  return fontsLoaded;
};

export default useFont;
