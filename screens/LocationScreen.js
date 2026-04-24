import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  getRegistrationProgress,
  saveRegistrationProgress,
} from '../utils/registrationUtils';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import Ionicons from '@react-native-vector-icons/ionicons';

const LocationScreen = () => {
  const [location, setLocation] = useState('');

  const navigation = useNavigation();
  useEffect(() => {
    getRegistrationProgress('Location').then(progressData => {
      if (progressData) {
        setLocation(progressData.location || '');
      }
    });
  }, []);

  const handleNext = () => {
    if (location.trim() !== '') {
      saveRegistrationProgress('Location', { location });
    }
    navigation.navigate('Gender');
  };

  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === 'android' ? 35 : 0,
        flex: 1,
        backgroundColor: 'white',
      }}
    >
      <View
        style={{
          marginTop: 80,
          marginHorizontal: 20,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              borderWidth: 2,
              borderColor: 'black',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <MaterialDesignIcons
              name="map-marker-outline"
              size={23}
              color="black"
            />
          </View>
          <Image
            style={{ width: 100, height: 40 }}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png',
            }}
          />
        </View>

        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            fontFamily: 'GeezaPro-Bold',
            marginTop: 15,
          }}
        >
          Where are you located?
        </Text>

        <TextInput
          value={location}
          autoFocus={true}
          onChangeText={text => setLocation(text)}
          placeholder="Enter your location"
          style={{
            width: 340,
            marginVertical: 10,
            fontSize: location ? 17 : 17,
            fontFamily: 'GeezaPro-Bold',
            marginTop: 25,
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            paddingBottom: 10,
          }}
        />

        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.8}
          style={{
            marginTop: 30,
            marginLeft: 'auto',
            marginRight: 'auto',
            backgroundColor: '#581845',
            padding: 15,
            borderRadius: 6,
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontSize: 16,
              fontWeight: '600',
            }}
          >
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LocationScreen;