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
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import {
  getRegistrationProgress,
  saveRegistrationProgress,
} from '../utils/registrationUtils';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import Ionicons from '@react-native-vector-icons/ionicons';

const HomeTownScreen = () => {
  const [homeTown, setHomeTown] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    getRegistrationProgress('Hometown').then(progressData => {
      if (progressData) {
        setHomeTown(progressData.hometown || '');
      }
    });
  }, []);

  const handleNext = () => {
    if (homeTown.trim() !== '') {
      saveRegistrationProgress('Hometown', { hometown: homeTown });
    }
    navigation.navigate('Workplace');
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
              name="location-enter"
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
            fontSize: 24,
            fontWeight: 'bold',
            fontFamily: 'GeezaPro-Bold',
            marginTop: 15,
          }}
        >
          Where's your hometown?
        </Text>

        <TextInput
          autoFocus={true}
          value={homeTown}
          onChangeText={text => setHomeTown(text)}
          placeholder="Enter your homeTown"
          style={{
            width: 300,
            marginTop: 25,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 8,
            padding: 10,
            fontFamily: 'GeezaPro-Bold',
            fontSize: homeTown ? 16 : 16,
          }}
        />

        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.8}
          style={{
            marginTop: 30,
            marginLeft: 'auto',
          }}
        >
          <Ionicons
            name="chevron-forward-circle-outline"
            size={45}
            color="#581845"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeTownScreen;

const styles = StyleSheet.create({});
