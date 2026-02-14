import { FlatList, ScrollView } from 'react-native'
import React from 'react'
import IntoHeader from '@/components/IntoHeader'
import CreateRecipe from '@/components/CreateRecipe'
import CategoryList from '@/components/CategoryList'
import LatestRecipes from '@/components/LatestRecipes'

export default function Home() {
  return (
    <FlatList
    data={[]}
    renderItem={()=>null}
    showsVerticalScrollIndicator={false}
    showsHorizontalScrollIndicator={false}
    ListHeaderComponent={
    <ScrollView style={{
      height: '100%',
      backgroundColor: '#FFFFFF',
      padding: 20
    }}>

      {/* Intro */}
      <IntoHeader />

      {/* Recipe Generator UI */}
      {/* <CreateRecipe /> */}
      <CreateRecipe 
  containerBg="#FFF8F3"
  inputBg="#FFFFFF"
/>

      
      {/* Category */}
      <CategoryList />

      <LatestRecipes />

    </ScrollView>
    } />
  )
}

/* const Home = () => {

  return (
    <ScrollView style={{
      height: '100%',
      backgroundColor: '#FFFFFF',
      padding: 20
    }}>

      <IntoHeader />

      <CreateRecipe />
      
      <CategoryList />

    </ScrollView>
  )
}

export default Home */