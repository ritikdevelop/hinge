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
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';
import {
  getRegistrationProgress,
  saveRegistrationProgress,
} from '../utils/registrationUtils';

const NameScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    getRegistrationProgress('Name').then(progressData => {
      if (progressData) {
        setFirstName(progressData.firstName || '');
        setLastName(progressData.lastName || '');
      }
    });
  }, []);

  const handleNext = () => {
    if (firstName.trim() !== '' && lastName.trim() !== '') {
      saveRegistrationProgress('Name', { firstName, lastName });
    }
    navigation.navigate('Email');
  };

  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === 'android' ? 35 : 0,
        flex: 1,
        backgroundColor: 'white',
      }}
    >
      <Text style={{ marginTop: 50, textAlign: 'center', color: 'gray' }}>
        NO BACKGROUND CHECKS ARE CONDUCTED.
      </Text>

      <View
        style={{
          marginTop: 30,
          marginHorizontal: 20,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
            <Ionicons name="newspaper-outline" size={26} color="black" />
          </View>

          <Image
            style={{
              width: 100,
              height: 40,
            }}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png',
            }}
          />
        </View>

        <View
          style={{
            marginTop: 30,
          }}
        >
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              fontFamily: 'GeezaPro-Bold',
            }}
          >
            What's your name?
          </Text>

          <TextInput
            value={firstName}
            onChangeText={text => setFirstName(text)}
            autoFocus={true}
            placeholder="Enter your firstname"
            placeholderTextColor={'#BEBEBE'}
            style={{
              width: 300,
              marginVertical: 10,
              marginTop: 25,
              borderColor: '#BEBEBE',
              borderWidth: 1,
              borderRadius: 10,
              paddingBottom: 10,
              fontFamily: 'GeezaPro-Bold',
              fontSize: firstName ? 18 : 16,
              paddingLeft: 10,
            }}
          />

          <TextInput
            value={lastName}
            onChangeText={text => setLastName(text)}
            autoFocus={true}
            placeholder="Enter your lastname"
            placeholderTextColor={'#BEBEBE'}
            style={{
              width: 300,
              marginVertical: 10,
              marginTop: 15,
              borderColor: '#BEBEBE',
              borderWidth: 1,
              borderRadius: 10,
              paddingBottom: 10,
              fontFamily: 'GeezaPro-Bold',
              fontSize: lastName ? 18 : 16,
              paddingLeft: 10,
            }}
          />
        </View>

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

export default NameScreen;

const styles = StyleSheet.create({});
