import { useAppNotification } from "@/hooks/useAppNotification";
import { getAllCategories } from "@/services/categoryService";
import { Category } from "@/types/category";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter()
  const { showError } = useAppNotification();

  const fetchCategories = async () => {
    setLoading(true);
    try {
      let cats: Category[] = [];
      cats = await getAllCategories();
      setCategories(cats);
    } catch (error) {
      showError("Error", "Error fetching categories");
      //console.error('Error fetching categories:', error)
    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <View
      style={{
        marginTop: 20,
      }}
    >
      <Text style={styles.title}>Categories</Text>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#8B593E" />
        </View>
      ) : (
        <FlatList
          data={categories}
          numColumns={4}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => router.push({
                pathname: '/recipe-by-category',
                params: {
                  categoryName: item?.name
                }
              })}
              style={styles.categoryCard}>
              <Image
                source={{ uri: item.photoURL }}
                style={{
                  width: 50,
                  height: 50,
                }}
              />
              <Text
                style={{
                  fontFamily: "outfit-regular",
                  color: "#4A3428",
                  marginTop: 3,
                  fontSize: 14,
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "outfit-semibold",
    fontSize: 17,
    color: "#4A3428",
  },
  categoryCard: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    marginTop: 15,
  },
  loadingContainer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default CategoryList;
