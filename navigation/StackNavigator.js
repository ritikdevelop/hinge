import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import Entypo from '@react-native-vector-icons/entypo';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import Ionicons from '@react-native-vector-icons/ionicons';
import LikesScreen from '../screens/LikesScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import BasicInfoScreen from '../screens/BasicInfoScreen';
import NameScreen from '../screens/NameScreen';
import EmailScreen from '../screens/EmailScreen';
import OtpScreen from '../screens/OtpScreen';
import PasswordScreen from '../screens/PasswordScreen';
import DateOfBirthScreen from '../screens/DateOfBirthScreen';
import LocationScreen from '../screens/LocationScreen';
import GenderScreen from '../screens/GenderScreen';
import TypeScreen from '../screens/TypeScreen';
import DatingTypeScreen from '../screens/DatingTypeScreen';
import LookingForScreen from '../screens/LookingForScreen';
import HomeTownScreen from '../screens/HomeTownScreen';
import JobTitleScreen from '../screens/JobTitleScreen';
import PhotoScreen from '../screens/PhotoScreen';
import PromptsScreen from '../screens/PromptsScreen';
import ShowPromptsScreen from '../screens/ShowPromptsScreen';
import PreFinalScreen from '../screens/PreFinalScreen';
import WritePromptScreen from '../screens/WritePromptScreen';
import SendLikeScreen from '../screens/SendLikeScreen';
import HandleLikeScreen from '../screens/HandleLikeScreen';
import SubscriptionScreen from '../screens/SubscriptionScreen';
import WorkplaceScreen from '../screens/WorkplaceScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import ProfileDetailsScreen from '../screens/ProfileDetailsScreen';
import AuthContext from '../AuthContext';
import LottieView from 'lottie-react-native';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const { token, isLoading } = useContext(AuthContext);
  function BottomTabs() {
    return (
      <Tab.Navigator
        screenOptions={() => ({
          tabBarShowLabel: false,
          tabBarStyle: { height: 90 },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarStyle: { backgroundColor: '#101010' },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons
                  style={{ paddingTop: 3 }}
                  name="shuffle-outline"
                  size={30}
                  color="white"
                />
              ) : (
                <Ionicons
                  style={{ paddingTop: 3 }}
                  name="shuffle-outline"
                  size={30}
                  color="#989898"
                />
              ),
          }}
        />

        <Tab.Screen
          name="Likes"
          component={LikesScreen}
          options={{
            tabBarStyle: { backgroundColor: '#101010' },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Entypo
                  style={{ paddingTop: 3 }}
                  name="heart"
                  size={30}
                  color="white"
                />
              ) : (
                <Entypo
                  style={{ paddingTop: 3 }}
                  name="heart"
                  size={30}
                  color="#989898"
                />
              ),
          }}
        />

        <Tab.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            tabBarStyle: { backgroundColor: '#101010' },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <MaterialIcons
                  style={{ paddingTop: 3 }}
                  name="chat-bubble-outline"
                  size={30}
                  color="white"
                />
              ) : (
                <MaterialIcons
                  style={{ paddingTop: 3 }}
                  name="chat-bubble-outline"
                  size={30}
                  color="#989898"
                />
              ),
          }}
        />

        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarStyle: { backgroundColor: '#101010' },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons
                  style={{ paddingTop: 3 }}
                  name="person-circle-outline"
                  size={28}
                  color="white"
                />
              ) : (
                <Ionicons
                  style={{ paddingTop: 3 }}
                  name="person-circle-outline"
                  size={28}
                  color="#989898"
                />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }
  const AuthStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Basic"
          component={BasicInfoScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Name"
          component={NameScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Email"
          component={EmailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Otp"
          component={OtpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Password"
          component={PasswordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Birth"
          component={DateOfBirthScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Location"
          component={LocationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Gender"
          component={GenderScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Type"
          component={TypeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dating"
          component={DatingTypeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LookingFor"
          component={LookingForScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Hometown"
          component={HomeTownScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Workplace"
          component={WorkplaceScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="JobTitle"
          component={JobTitleScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Photos"
          component={PhotoScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Prompts"
          component={PromptsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ShowPrompts"
          component={ShowPromptsScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="WritePrompt"
          component={WritePromptScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PreFinal"
          component={PreFinalScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  };
  function MainStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SendLike"
          component={SendLikeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HandleLike"
          component={HandleLikeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />

        <Stack.Screen
          name="Subscription"
          component={SubscriptionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfileDetail"
          component={ProfileDetailsScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
        <LottieView
          source={require('../assets/loading.json')}
          autoPlay
          loop
          style={{ width: 200, height: 200 }}
        />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {token ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
