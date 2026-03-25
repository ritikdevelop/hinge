# Hinge Dating App Development Plan

## MVP Goals
- Functional onboarding with data persistence.
- Basic swiping/matching on Home.
- Simple chat.
- Backend CRUD for users/likes/chats.

## Phase 1: Core Setup (1-2 days)
1. [ ] Fix AuthContext in StackNavigator: Proper token check (AsyncStorage) to switch AuthStack ↔ MainStack.
2. [ ] Implement package.json scripts if needed (e.g., backend dev).
3. [ ] Run backend: `cd api && npm install && node index.js`.

## Phase 2: Backend (2-3 days)
1. [ ] api/db.js: Setup MongoDB/Mongoose or SQLite.
2. [ ] api/index.js: Add routes:
   - `/auth/register`, `/auth/login`, `/auth/otp`.
   - `/profile` (GET/PUT).
   - `/likes` (POST, get matches).
   - `/chat` (rooms, messages).
3. [ ] CORS + auth middleware (JWT).

## Phase 3: Frontend Implementation (5-7 days)
1. [ ] Onboarding Screens: Forms + validation (Formik/Yup) + API calls → Next on success.
2. [ ] HomeScreen: Swipe cards (react-native-deck-swiper) + profiles from API.
3. [ ] LikesScreen: List likes + ViewProfile.
4. [ ] ChatScreen/ChatRoomScreen: FlatList messages + input + Socket.io.
5. [ ] ProfileScreen: Edit forms, photo picker.
6. [ ] State: Redux Toolkit for user/matches/chats.

## Phase 4: Polish & Features (3-5 days)
1. [ ] Animations: Lottie for likes/matches.
2. [ ] Subscriptions: Stripe integration.
3. [ ] Push Notifications.
4. [ ] Testing: Jest for utils, Detox E2E.

## Phase 5: Deploy (1 day)
1. [ ] Backend: Render/Vercel.
2. [ ] App: Expo EAS Build → Stores.

## Risks/Notes
- Screens are stubs → Replace with real UI (Tailwind RN?).
- No images/DB → Add Cloudinary + Mongo Atlas.
- Total Est: 2-3 weeks solo.

Track progress by updating this file or TODO.md.


