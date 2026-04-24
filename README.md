# Hinge Clone - Full-Stack Dating Application

A comprehensive dating application clone inspired by Hinge, built with React Native and Node.js. This project features a multi-step onboarding process, real-time matching, and a robust backend.

## 🚀 Features

### 🔐 Authentication & Onboarding
- **Linear Onboarding Flow:** 20+ screens for a detailed profile setup (Name, DOB, Gender, Location, Job, Workplace, etc.).
- **Email & OTP Verification:** Secure signup and login process.
- **Profile Prompts:** Interactive prompts to showcase personality.
- **Photo Management:** Dedicated screens for uploading and managing profile pictures.

### 💘 Core Dating UX
- **Home Feed:** Discover potential matches through prompt-based cards.
- **Likes & Matches:** Send and receive likes, with dedicated screens for handling matches.
- **Real-time Chat:** Instant messaging using Socket.io for matched users.
- **Profile View:** Detailed profile cards for deeper insights into matches.

### 💎 Premium Features
- **Hinge Plus & HingeX:** Subscription screens and logic for premium tiers.
- **Boosts & Unlimited Likes:** Integrated upsell flows.

## 🛠️ Tech Stack

### Frontend (Mobile)
- **Framework:** [React Native](https://reactnative.dev/) (0.84.1)
- **Navigation:** [React Navigation v7](https://reactnavigation.org/) (Stack & Bottom Tabs)
- **Icons:** React Native Vector Icons (AntDesign, Entypo, Ionicons, etc.)
- **Animations:** [Lottie React Native](https://github.com/lottierender/lottie-react-native)
- **Networking:** Axios for API communication
- **Real-time:** Socket.io-client

### Backend (API)
- **Runtime:** Node.js
- **Framework:** Express.js (v5.2.1)
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JSON Web Tokens (JWT) & Bcrypt for password hashing
- **Real-time:** Socket.io
- **Utilities:** Dayjs, Dotenv, UUID

## 📁 Project Structure

```text
hinge/
├── api/                # Node.js Express Backend
│   ├── controllers/    # Business logic for routes
│   ├── models/         # Mongoose schemas (User, Message)
│   ├── routes/         # API endpoints
│   ├── service/        # Database interaction layers
│   ├── utils/          # Socket.io and helper utilities
│   └── index.js        # Server entry point
├── components/         # Reusable React Native components
├── navigation/         # Stack and Tab navigation logic
├── screens/            # 30+ Mobile application screens
├── utils/              # Frontend helper functions
├── assets/             # Lottie animations, fonts, and images
└── App.js              # Frontend entry point
```

## 🏁 Getting Started

### Prerequisites
- Node.js (>= 22.11.0)
- React Native Development Environment ([Setup Guide](https://reactnative.dev/docs/set-up-your-environment))
- MongoDB instance (local or Atlas)

### 1. Backend Setup
```sh
cd api
npm install
# Create a .env file with: PORT, MONGO_URI, JWT_SECRET
npm start
```

### 2. Frontend Setup
```sh
# From the root directory
npm install

# For iOS (macOS only)
cd ios && pod install && cd ..

# Start Metro Bundler
npm start
```

### 3. Run the App
```sh
# Android
npm run android

# iOS
npm run ios
```

## 🏗️ Architecture
The app follows a **Presentation-Navigation-Data** layer architecture:
- **Presentation:** UI screens built with React Native components.
- **Navigation:** Controlled by React Navigation, switching between `AuthStack` (onboarding) and `MainStack` (authenticated tabs).
- **Data:** Backend API handles persistence and real-time events, with local state managed via React Context/Hooks.

## 🗺️ Roadmap
- [ ] Implement Redux Toolkit for global state management.
- [ ] Integrate Cloudinary for image uploads.
- [ ] Add Push Notifications (FCM/APNs).
- [ ] Integrate Stripe for subscriptions.
- [ ] Complete E2E testing with Detox.

## 📄 License
This project is licensed under the ISC License.
