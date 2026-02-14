import { useLoader } from "@/hooks/useLoader";
import { getAllCategories } from "@/services/categoryService";
import { Category } from "@/types/category";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const { showLoader, hideLoader } = useLoader();
  const router = useRouter()

  const fetchCategories = async () => {
    showLoader();
    try {
      let cats: Category[] = [];
      cats = await getAllCategories();
      setCategories(cats);
    } catch (error) {
      Alert.alert("Error", "Error fetching tasks");
      //console.error('Error fetching categories:', error)
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <View
      style={{
        marginTop: 15,
      }}
    >
      <Text style={styles.title}>Categories</Text>
      <FlatList
        data={categories}
        numColumns={4}
        renderItem={({ item }) => (
          <TouchableOpacity 
          onPress={() => router.push({
            pathname:'/recipe-by-category',
            params:{
              categoryName: item?.name
            }
          })} 
          style={styles.categoryCard}>
            <Image
              source={{ uri: item.photoURL }}
              style={{
                width: 40,
                height: 40,
              }}
            />
            <Text
              style={{
                fontFamily: "outfit-regular",
                color: "#4A3428",
                marginTop: 3,
                fontSize: 13,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
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
  },
  categoryCard: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    marginTop: 10,
  },
});

export default CategoryList;
