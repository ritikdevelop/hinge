import {
  Animated,
  Easing,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import Ionicons from '@react-native-vector-icons/ionicons';
import AuthContext from '../AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import Entypo from '@react-native-vector-icons/entypo';
const HomeScreen = () => {
  const [option, setOption] = useState('Age');
  const { userId, setUserId, token, setToken, userInfo, setUserInfo } =
    useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [currentProfile, setCurrentProfile] = useState(users[0]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [profileVisible, setProfileVisible] = useState(true);
  const [dislikedProfiles, setDislikedProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const animationValue = new Animated.Value(0);
  const scale = useState(new Animated.Value(1))[0];

  useEffect(() => {
    const initialize = async () => {
      if (userId) {
        try {
          await Promise.all([fetchMatches(), getUserDetails()]);
        } catch (error) {
          console.log('Error getting data', error);
        }
      }
    };
    initialize();
  }, [userId]);

  useEffect(() => {
    if (isAnimating) {
      Animated.timing(scale, {
        toValue: 1.3,
        duration: 600,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(scale, {
        toValue: 1,
        duration: 600,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    }
  }, [isAnimating]);

  //Context: This function will save the disliked profiles to AsyncStorage and update the state. It can be called whenever a user dislikes a profile, ensuring that the disliked profiles are persisted across app sessions.
  const saveDislikedProfiles = async profiles => {
    try {
      await AsyncStorage.setItem('dislikedProfiles', JSON.stringify(profiles));
    } catch (error) {
      console.error('Error saving disliked profiles:', error);
    }
  };

  //Context: This function will load the disliked profiles from AsyncStorage when the app initializes. It can be called in a useEffect hook when the HomeScreen component mounts, allowing the app to retrieve and set the disliked profiles in the state, ensuring that the user's preferences are maintained across sessions.
  const loadDislikedProfiles = async () => {
    try {
      const data = await AsyncStorage.getItem('dislikedProfiles');
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.log('Error loading disliked profiles:', error);
    }
  };

  //Context: This function will handle the logic for when a user dislikes a profile. It will update the state to reflect the disliked profile, save it to AsyncStorage, and then move on to the next profile. This function can be called when the user presses a "dislike" button on a profile, ensuring that their preferences are recorded and that they can continue browsing other profiles seamlessly.
  const handleDislike = async () => {
    setProfileVisible(prev => !prev);

    setIsAnimating(true);

    Animated.timing(animationValue, {
      toValue: 1,
      duration: 600,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      animationValue.setValue(0);
      setIsAnimating(false);
      setProfileVisible(true);
    });

    if (!currentProfile) return;

    const updatedDislikedProfiles = [
      ...dislikedProfiles,
      { ...currentProfile, dislikedAt: new Date().toISOString() },
    ];
    setDislikedProfiles(updatedDislikedProfiles);

    await saveDislikedProfiles(updatedDislikedProfiles);

    const remainingUsers = users.slice(1);
    setUsers(remainingUsers);

    setCurrentProfile(remainingUsers.length > 0 ? remainingUsers[0] : null);
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      const now = new Date();
      const storedDislikedProfiles = await loadDislikedProfiles();

      const profilesToKeep = [];
      const profilesToReintroduce = [];

      storedDislikedProfiles.forEach(profile => {
        const dislikedAt = new Date(profile.dislikedAt);
        const elapsedHours = (now - dislikedAt) / (1000 * 60 * 60);
        if (elapsedHours >= 24) {
          profilesToReintroduce.push(profile);
        } else {
          profilesToKeep.push(profile);
        }
      });

      if (profilesToReintroduce.length > 0) {
        setUsers(prevUsers => [...prevUsers, ...profilesToReintroduce]);
      }
      setDislikedProfiles(profilesToKeep);
      await saveDislikedProfiles(profilesToKeep);
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const decodeToken = jwtDecode(token);
        const userId = decodeToken.userId;
        setUserId(userId);
      }
    };

    fetchUser();
  }, [setUserId]);

  const fetchMatches = async () => {};

  const getUserDetails = async () => {};

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          marginTop: 55,
        }}
      >
        <View
          style={{
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <Pressable
            onPress={() => console.log('pressed')}
            style={{
              width: 38,
              height: 38,
              borderRadius: 19,
              backgroundColor: '#D0D0D0',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Ionicons name="sparkles-sharp" size={22} color="black" />
          </Pressable>

          <Pressable
            onPress={() => setOption('Age')}
            style={{
              borderColor: option === 'Age' ? 'transparent' : '#808080',
              borderWidth: 0.7,
              paddingHorizontal: 10,
              paddingVertical: 8,
              borderRadius: 20,
              backgroundColor: option === 'Age' ? 'black' : 'transparent',
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                fontSize: 14,
                fontWeight: ' 400',
                color: option === 'Age' ? 'white' : '#808080',
              }}
            >
              Age
            </Text>
          </Pressable>

          <Pressable
            style={{
              borderColor: option === 'Height' ? 'transparent' : '#808080',
              borderWidth: 0.7,
              paddingHorizontal: 10,
              paddingVertical: 8,
              borderRadius: 20,
              backgroundColor: option === 'Height' ? 'black' : 'transparent',
            }}
            onPress={() => setOption('Height')}
          >
            <Text
              style={{
                textAlign: 'center',
                fontSize: 14,
                fontWeight: ' 400',
                color: option === 'Height' ? 'white' : '#808080',
              }}
            >
              Height
            </Text>
          </Pressable>

          <Pressable
            style={{
              borderColor:
                option == 'Dating Intention' ? 'transparent' : '#808080',
              borderWidth: 0.7,
              paddingHorizontal: 10,
              paddingVertical: 8,
              borderRadius: 20,
              backgroundColor:
                option == 'Dating Intention' ? 'black' : 'transparent',
            }}
            onPress={() => setOption('Dating Intention')}
          >
            <Text
              style={{
                textAlign: 'center',
                fontSize: 14,
                fontWeight: '400',
                color: option == 'Dating Intention' ? 'white' : '#808080',
              }}
            >
              Dating Intention
            </Text>
          </Pressable>

          <Pressable
            style={{
              borderColor: option == 'Nearby' ? 'transparent' : '#808080',
              borderWidth: 0.7,
              paddingHorizontal: 10,
              paddingVertical: 8,
              borderRadius: 20,
              backgroundColor: option == 'Nearby' ? 'black' : 'transparent',
            }}
            onPress={() => setOption('Nearby')}
          >
            <Text
              style={{
                textAlign: 'center',
                fontSize: 14,
                fontWeight: '400',
                color: option == 'Nearby' ? 'white' : '#808080',
              }}
            >
              Nearby
            </Text>
          </Pressable>
        </View>

        {profileVisible && (
          <View
            style={{
              marginHorizontal: 12,
              marginVertical: 12,
            }}
          >
            <>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                      }}
                    >
                      {currentProfile?.firstName}
                    </Text>
                    <View
                      style={{
                        backgroundColor: '#452c63',
                        paddingHorizontal: 12,
                        paddingVertical: 4,
                        borderRadius: 20,
                      }}
                    >
                      <Text style={{ textAlign: 'center', color: 'white' }}>
                        New here
                      </Text>
                    </View>
                  </View>

                  <View>
                    <Entypo
                      name="dots-three-horizontal"
                      size={22}
                      color="black"
                    />
                  </View>
                </View>

                <View
                  style={{
                    marginVertical: 15,
                  }}
                >
                  <View>
                    {currentProfile?.imageUrls.length > 0 && (
                      <View>
                        <Image
                          style={{
                            width: '100%',
                            height: 410,
                            resizeMode: 'cover',
                            borderRadius: 10,
                          }}
                          source={{ uri: currentProfile?.imageUrls[0] }}
                        />
                        <Pressable
                          onPress={() =>
                            navigation.navigate('SendLike', {
                              type: 'image',
                              image: currentProfile?.imageUrls[0],
                              name: currentProfile?.firstName,
                              userId: userId,
                              likedUserId: currentProfile?.userId,
                            })
                          }
                          style={{
                            position: 'absolute',
                            bottom: 10,
                            right: 10,
                            backgroundColor: 'white',
                            width: 50,
                            height: 50,
                            borderRadius: 25,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <Image
                            style={{
                              width: 30,
                              height: 30,
                              resizeMode: 'contain',
                            }}
                            source={{
                              uri: 'https://cdn-icons-png.flaticon.com/128/2724/2724657.png',
                            }}
                          />
                        </Pressable>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </>
          </View>
        )}
      </ScrollView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
