import { useAppNotification } from "@/hooks/useAppNotification";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import RecipeCardHome from "./RecipeCardHome";

const LatestRecipes = ({ recipes }: any) => {
  const { showError } = useAppNotification();
  //const [latestRecipes, setLatestRecipes] = useState<Recipe[]>([]);
  //const [loading, setLoading] = useState(false);
  //console.log("Category Name: ", categoryName)

  /* useEffect(() => {
    GetLatestRecipes();
  }, []); */

  /* const GetLatestRecipes = async () => {
    setLoading(true);
    try {
      let recipes: Recipe[] = [];
      recipes = await getLatestRecipes(10 as number);
      setLatestRecipes(recipes);
      //console.log(recipes)
    } catch (error: any) {
      showError("Error", error?.message || "Something went wrong");
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  }; */


  return (
    <View
      style={{
        marginTop: 20,
      }}
    >
      <Text style={styles.title}>Latest Recipes</Text>

      <FlatList
        data={recipes}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View>
            <RecipeCardHome recipe={item} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "outfit-semibold",
    fontSize: 17,
    color: "#4A3428",
    marginTop: 5,
  },
});

export default LatestRecipes;
