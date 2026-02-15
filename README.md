# Daily Dish 🍳

**Daily Dish** is a comprehensive, AI-integrated mobile application designed to revolutionize the home cooking experience. Built with **Expo** and **React Native**, it serves as a powerful recipe finder and meal planner that leverages cutting-edge technology to inspire culinary creativity.

[![Download APK](https://img.shields.io/badge/Download-APK-brightgreen?style=for-the-badge&logo=android)](https://expo.dev/artifacts/eas/6LviZHyzLhd58aef2gPUs7.apk)

---

## 🚀 Key Features

- **🔐 Robust User Authentication**: Secure login and registration powered by **Firebase Auth**, including persistent sessions and personalized user profiles.
- **� Intelligent Recipe Discovery**: 
  - Effortlessly browse through organized recipe categories.
  - Quick-search functionality to find specific ingredients or dishes.
- **🤖 OpenAI Kitchen Assistant**: 
  - AI-driven recipe generation that creates custom recipes based on your specific cravings or available ingredients.
  - Interactive prompts that provide unique, chef-inspired cooking ideas.
- **❤️ Personal Favorites & Collections**: Save your favorite recipes to a dedicated favorites list for instant access.
- **📁 Meal Planning & Organization**: Categorized views help you plan your week's meals with ease.
- **📄 Professional Export (PDF & Print)**: Generate high-quality PDF versions of recipes for digital sharing or physical printing.
- **📤 Integrated Sharing**: Share recipes directly with friends and family via social platforms or messaging apps.
- **✨ Premium UI/UX**: 
  - Modern, responsive design using **NativeWind (Tailwind CSS)**.
  - Smooth navigation and transitions powered by **Expo Router**.
  - Dynamic loading states and interactive components.

---

## 🛠️ Technology Stack (Use Tech All)

The project utilizes a modern stack to ensure performance, scalability, and ease of development:

- **Core Framework**: [Expo SDK 54+](https://expo.dev/) & [React Native](https://reactnative.dev/)
- **Programming Language**: [TypeScript](https://www.typescriptlang.org/) for type-safe development.
- **Backend-as-a-Service**: [Firebase](https://firebase.google.com/) (Authentication & Firestore Database).
- **Artificial Intelligence**: [OpenAI API](https://openai.com/) (GPT-4/Turbo models for recipe generation).
- **Styling**: [NativeWind](https://www.nativewind.dev/) (Utility-first CSS for React Native).
- **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/) (File-based routing system).
- **Storage**: [Async Storage](https://react-native-async-storage.github.io/async-storage/) for local data persistence.
- **Animations**: [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) for high-performance UI animations.

---

## 📁 Project Structure

```text
daily-dish/
├── app/                  # File-based routing (Expo Router)
│   ├── (auth)/           # Authentication screens (Login, Register)
│   ├── (tabs)/           # Main navigation (Home, Search, Favorites, Profile)
│   ├── recipe-by-category/ # Recipe lists filtered by category
│   └── recipe-detail/    # Full recipe viewing experience
├── components/           # Reusable UI components (Cards, Buttons, Inputs)
├── context/              # Global React Context providers (Auth, Loader)
├── hooks/                # Custom React hooks (useAuth, useLoader, useAppNotification)
├── services/             # API & Firebase logic (AuthService, RecipeService, OpenAI)
├── types/                # TypeScript interfaces and definitions
├── constants/            # Theme, Colors, and Global Constants
├── assets/               # Static images and fonts
└── config/               # Firebase and third-party configurations
```

---

## ⚙️ Project Setup

### 1. Prerequisites
- **Node.js**: LTS version installed.
- **Git**: Installed for repository cloning.
- **Expo Go**: Downloaded on your mobile device (App Store or Play Store).

### 2. Installation
```bash
git clone https://github.com/Seenathul-Ilma/AMD-Course-Work-Daily-Dish.git
cd AMD-Course-Work-Daily-Dish
npm install
```

### 3. Environment Config
Create a `.env` file in the root directory:
```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_id
EXPO_PUBLIC_OPENAI_API_KEY=your_openai_key
```

---

## 📱 How to Run on Your Mobile Device

Daily Dish is optimized for live testing on physical devices using **Expo Go**.

1. **Start the Server**:
   ```bash
   npx expo start
   ```
2. **Scan the QR Code**:
   - **Android**: Open the **Expo Go** app and tap "Scan QR Code".
   - **iOS**: Use the built-in **Camera app** to scan the code; it will prompt you to open it in Expo Go.
3. **Important**: Ensure your mobile device and computer are on the **same Wi-Fi network**.

---

## 📥 Download & Install

You can download the latest Android build of **Daily Dish** directly from the link below:

**[Download Android APK (Direct Link)](https://expo.dev/artifacts/eas/6LviZHyzLhd58aef2gPUs7.apk)**

*(Note: You may need to enable "Install from Unknown Sources" on your Android settings to install the APK.)*

---

## 🏗️ Build & Deployment

When ready for distribution, use **EAS (Expo Application Services)**:

- **Android Preview (APK)**: `eas build -p android --profile preview`
- **Android Production (AAB)**: `eas build -p android --profile production`
- **iOS Build**: `eas build -p ios`

---

## 🏥 Health Checks
If you encounter any dependency issues, run:
```bash
npx expo-doctor
```

---
*Developed by Zeenathul Ilma for the AMD Course Work.*
