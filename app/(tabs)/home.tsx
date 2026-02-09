import { ScrollView } from 'react-native'
import React from 'react'
import IntoHeader from '@/components/IntoHeader'
import CreateRecipe from '@/components/CreateRecipe'

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

    </ScrollView>
  )
}

export default Home