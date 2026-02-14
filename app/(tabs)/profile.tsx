import { AuthContext } from '@/context/AuthContext'
import { useAppNotification } from '@/hooks/useAppNotification'
import { logoutUser } from '@/services/authService'
import { getUserCreatedRecipes } from '@/services/recipeService'
import { getAllFavourites } from '@/services/userFavouriteService'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const Profile = () => {
  const { user } = useContext(AuthContext)
  const router = useRouter()
  const { showSuccess, showError } = useAppNotification()
  const [stats, setStats] = useState({ recipes: 0, cravings: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const recipes = await getUserCreatedRecipes()
      const favourites = await getAllFavourites()
      setStats({
        recipes: recipes.length,
        cravings: favourites.length
      })
    } catch (error) {
      console.error("Error fetching profile stats:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await logoutUser()
      showSuccess("Logged Out", "See you again soon!")
      router.replace('/(auth)/login')
    } catch (error: any) {
      showError("Logout Failed", error.message)
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Header section */}
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: user?.photoURL || 'https://ui-avatars.com/api/?name=User&background=8B593E&color=FFF8F3' }}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editBadge}>
            <Ionicons name="camera" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <Text style={styles.displayName}>{user?.displayName || 'Chef Name'}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      {/* Stats section */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          {loading ? (
            <ActivityIndicator size="small" color="#8B593E" />
          ) : (
            <Text style={styles.statNumber}>{stats.recipes}</Text>
          )}
          <Text style={styles.statLabel}>Recipes</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statBox}>
          {loading ? (
            <ActivityIndicator size="small" color="#8B593E" />
          ) : (
            <Text style={styles.statNumber}>{stats.cravings}</Text>
          )}
          <Text style={styles.statLabel}>Cravings</Text>
        </View>
      </View>

      {/* Menu items */}
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem}>
          <View style={[styles.iconContainer, { backgroundColor: '#FDF2E9' }]}>
            <Ionicons name="person-outline" size={22} color="#8B593E" />
          </View>
          <Text style={styles.menuText}>Personal Info</Text>
          <Ionicons name="chevron-forward" size={20} color="#9A8478" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={[styles.iconContainer, { backgroundColor: '#FDF2E9' }]}>
            <Ionicons name="notifications-outline" size={22} color="#8B593E" />
          </View>
          <Text style={styles.menuText}>Notifications</Text>
          <Ionicons name="chevron-forward" size={20} color="#9A8478" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={[styles.iconContainer, { backgroundColor: '#FDF2E9' }]}>
            <Ionicons name="settings-outline" size={22} color="#8B593E" />
          </View>
          <Text style={styles.menuText}>Settings</Text>
          <Ionicons name="chevron-forward" size={20} color="#9A8478" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={[styles.iconContainer, { backgroundColor: '#FDF2E9' }]}>
            <Ionicons name="help-circle-outline" size={22} color="#8B593E" />
          </View>
          <Text style={styles.menuText}>Help Center</Text>
          <Ionicons name="chevron-forward" size={20} color="#9A8478" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuItem, styles.logoutItem]}
          onPress={handleLogout}
        >
          <View style={[styles.iconContainer, { backgroundColor: '#FEE2E2' }]}>
            <Ionicons name="log-out-outline" size={22} color="#EF4444" />
          </View>
          <Text style={[styles.menuText, { color: '#EF4444' }]}>Logout</Text>
          <Ionicons name="chevron-forward" size={20} color="#EF4444" />
        </TouchableOpacity>
      </View>

      <Text style={styles.versionText}>Daily Dish v1.0.0</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F3',
  },
  contentContainer: {
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  editBadge: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#8B593E',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  displayName: {
    fontSize: 24,
    fontFamily: 'outfit-semibold',
    color: '#4A3428',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    fontFamily: 'outfit-regular',
    color: '#9A8478',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#8B593E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 25,
    marginTop: 10,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  divider: {
    width: 1,
    backgroundColor: '#E5D3B7',
    height: '60%',
    alignSelf: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontFamily: 'outfit-semibold',
    color: '#8B593E',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'outfit-regular',
    color: '#9A8478',
  },
  menuContainer: {
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 15,
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'outfit-medium',
    color: '#4A3428',
  },
  logoutItem: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  versionText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 12,
    fontFamily: 'outfit-regular',
    color: '#9A8478',
  }
})

export default Profile
