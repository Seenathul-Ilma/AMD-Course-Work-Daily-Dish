import { AuthContext } from '@/context/AuthContext'
import { useAppNotification } from '@/hooks/useAppNotification'
import { logoutUser, updateUserProfileImage } from '@/services/authService'
import { uploadToCloudinary } from '@/services/cloudinaryService'
import { getUserCreatedRecipes } from '@/services/recipeService'
import { getAllFavourites } from '@/services/userFavouriteService'
import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { useRouter } from 'expo-router'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet'

const Profile = () => {
  const { user } = useContext(AuthContext)
  const router = useRouter()
  const { showSuccess, showError } = useAppNotification()
  const [stats, setStats] = useState({ recipes: 0, cravings: 0 })
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const actionSheetRef = useRef<ActionSheetRef>(null)

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

  const pickImage = async (useCamera: boolean) => {
    actionSheetRef.current?.hide()

    try {
      let result;
      if (useCamera) {
        const { status } = await ImagePicker.requestCameraPermissionsAsync()
        if (status !== 'granted') {
          showError("Permission Denied", "Camera permission is required to take photos.")
          return
        }
        result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.7,
        })
      } else {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted') {
          showError("Permission Denied", "Gallery permission is required to pick photos.")
          return
        }
        result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.7,
        })
      }

      if (!result.canceled && result.assets && result.assets.length > 0) {
        uploadImage(result.assets[0].uri)
      }
    } catch (error: any) {
      showError("Error", "Failed to pick image")
      console.error(error)
    }
  }

  const uploadImage = async (uri: string) => {
    if (!user) return

    setUploading(true)
    try {
      const imageUrl = await uploadToCloudinary(uri)
      await updateUserProfileImage(user.uid, imageUrl)
      showSuccess("Success", "Profile image updated!")
    } catch (error: any) {
      showError("Upload Failed", error.message)
      console.error(error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header section */}
        <View style={styles.header}>
          <View style={styles.profileImageContainer}>
            {uploading ? (
              <View style={[styles.profileImage, styles.loadingContainer]}>
                <ActivityIndicator size="large" color="#8B593E" />
              </View>
            ) : (
              <Image
                source={{ uri: user?.photoURL || 'https://ui-avatars.com/api/?name=User&background=8B593E&color=FFF8F3' }}
                style={styles.profileImage}
              />
            )}
            <TouchableOpacity
              style={styles.editBadge}
              onPress={() => actionSheetRef.current?.show()}
              disabled={uploading}
            >
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

      <ActionSheet ref={actionSheetRef}>
        <View style={styles.actionSheetContent}>
          <Text style={styles.actionSheetTitle}>Change Profile Photo</Text>

          <TouchableOpacity
            style={styles.actionSheetItem}
            onPress={() => pickImage(true)}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#FDF2E9' }]}>
              <Ionicons name="camera" size={24} color="#8B593E" />
            </View>
            <Text style={styles.actionText}>Take Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionSheetItem}
            onPress={() => pickImage(false)}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#FDF2E9' }]}>
              <Ionicons name="images" size={24} color="#8B593E" />
            </View>
            <Text style={styles.actionText}>Choose from Gallery</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionSheetItem, styles.cancelItem]}
            onPress={() => actionSheetRef.current?.hide()}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ActionSheet>
    </View>
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
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
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
  },
  actionSheetContent: {
    padding: 25,
    paddingBottom: 40,
  },
  actionSheetTitle: {
    fontSize: 20,
    fontFamily: 'outfit-bold',
    color: '#4A3428',
    marginBottom: 20,
    textAlign: 'center',
  },
  actionSheetItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  actionText: {
    fontSize: 16,
    fontFamily: 'outfit-medium',
    color: '#4A3428',
  },
  cancelItem: {
    borderBottomWidth: 0,
    marginTop: 10,
    justifyContent: 'center',
  },
  cancelText: {
    fontSize: 16,
    fontFamily: 'outfit-semibold',
    color: '#EF4444',
  }
})

export default Profile
