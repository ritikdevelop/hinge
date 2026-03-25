# Hinge Dating App Architecture

## High-Level Overview
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   React Native  │◄──►│   Navigation     │◄──►│     Screens     │
│   (App.js)      │    │ (StackNavigator) │    │ (Stubs/Forms)   │
└──────────┬──────┘    └──────────────────┘    └─────────────────┘
           │
           ▼
┌─────────────────┐    ┌──────────────────┐
│   Components    │◄──►│     Assets       │
│ (ViewProfile)   │    │ (Lottie, Fonts)  │
└─────────────────┘    └──────────────────┘

           │
           ▼ (API Calls)
┌─────────────────┐
│   Backend API   │
│ (Express/Node)  │ ── DB (db.js - TBD: Mongo/Postgres)
└─────────────────┘
```

## Layers
1. **Presentation (UI)**:
   - Screens: 30+ functional stubs.
   - Components: ViewProfile (profile cards).
   - Styling: Inline + StyleSheet.

2. **Navigation**:
   - React Navigation v7: NativeStack + BottomTabs.
   - AuthStack (onboarding) → MainStack (tabs + modals).
   - Context: AuthContext (token-based auth guard - incomplete).

3. **State Management**:
   - Current: None (local useState).
   - Recommended: Redux/Context + AsyncStorage.

4. **Data/API**:
   - Backend: Express server (`api/index.js`) - basic setup, no routes.
   - `api/db.js`: Likely DB config (unimplemented).
   - Client: No fetch/axios yet - add in screens.

5. **Platform**:
   - Android/iOS: Full native setup (gradlew, Xcode).
   - Icons: Expo vector icons.

## Key Design Patterns
- **Screen-per-Step**: Onboarding as wizard flow.
- **Tab-based Dashboard**: Core dating UX (swipe, likes, chat, profile).
- **Modal Overlays**: Quick actions (likes, chat rooms).

## Tech Stack
- **Frontend**: React Native 0.84, React Navigation 7, Lottie.
- **Backend**: Node/Express, DB (TBD).
- **Future**: Real-time (Socket.io for chat), Push Notifications (FCM/APNs), Image Upload (Cloudinary).

**Current Status**: MVP skeleton. Scalable for full dating app.


