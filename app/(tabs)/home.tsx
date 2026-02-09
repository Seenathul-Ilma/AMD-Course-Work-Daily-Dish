import { ScrollView } from 'react-native'
import React from 'react'
import IntoHeader from '@/components/IntoHeader'
import CreateRecipe from '@/components/CreateRecipe'
import CategoryList from '@/components/CategoryList'

const Home = () => {

  return (
    <ScrollView style={{
      height: '100%',
      backgroundColor: '#FFFFFF',
      padding: 20
    }}>

      {/* Intro */}
      <IntoHeader />

      {/* Recipe Generator UI */}
      <CreateRecipe />
      
      {/* Category */}
      <CategoryList />

    </ScrollView>
  )
}

export default Home