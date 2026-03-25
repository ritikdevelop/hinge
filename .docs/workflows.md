# Hinge Dating App Workflows

## 1. User Onboarding (Auth + Profile Setup)
**Linear Stack Flow** (non-authenticated users):
```
LoginScreen → BasicInfoScreen → NameScreen → EmailScreen → OtpScreen → PasswordScreen 
→ DateOfBirthScreen → LocationScreen → GenderScreen → TypeScreen → DatingTypeScreen 
→ LookingForScreen → HomeTownScreen → WorkplaceScreen → JobTitleScreen → PhotoScreen 
→ PromptsScreen → ShowPromptsScreen → WritePromptScreen → PreFinalScreen → Main App (Bottom Tabs)
```
- **Purpose**: Collect user data progressively. Each screen likely has form → validate → next.
- **Exit Points**: Back navigation or errors.
- **Success**: Store profile data (local/DB), issue auth token, route to Home tab.

## 2. Main App (Authenticated - Bottom Tabs)
**Tab Navigation**:
- **Home** (HomeScreen): Card swiping/matching feed (like Tinder/Hinge prompts).
- **Likes** (LikesScreen): View incoming likes, respond.
- **Chat** (ChatScreen): List conversations → ChatRoomScreen.
- **Profile** (ProfileScreen): Edit/view profile → ProfileDetailsScreen.

**Modals/Overlays** (from tabs):
```
Home → SendLikeScreen → HandleLikeScreen
Likes → ViewProfile (component)
Chat → ChatRoomScreen
Profile → SubscriptionScreen (paywall), Photo/Prompt edits (back to onboarding screens?)
```

## 3. Social Interactions
- **Like Flow**: Home card → SendLikeScreen → API call → HandleLikeScreen (if match).
- **Match → Chat**: Notification → ChatScreen → ChatRoomScreen.
- **Profile View**: Any screen → ViewProfile component → ProfileDetailsScreen.

## 4. Monetization
- SubscriptionScreen: Upsell Hinge Plus/X features (unlimited likes, boosts).

## 5. Backend Workflows
- API server (port 4000): Handle auth (signup/login/OTP), profile CRUD, likes/matches, chat messages.
- Flows: Client API calls on form submits, real-time for chat (add Socket.io later).

## Data Flow
- Local State: Per-screen (forms).
- Persist: AsyncStorage (user token/profile).
- Sync: API on complete (e.g., POST /profile after PreFinal).

**Current Status**: All screens stubbed. Implement forms, validation, API integration next.


