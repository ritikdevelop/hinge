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
import Ionicons from '@react-native-vector-icons/ionicons';

const EmailScreen = () => {
  const [email, setEmail] = useState('');

  const navigation = useNavigation();
  useEffect(() => {
    getRegistrationProgress('Email').then(progressData => {
      if (progressData) {
        setEmail(progressData.email || '');
      }
    });
  }, []);

  const handleNext = () => {
    if (email.trim() !== '') {
      saveRegistrationProgress('Email', { email });
    }
    navigation.navigate('Password', {
      email: email,
    });
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
              borderRadius: 12,
              borderWidth: 2,
              borderColor: 'black',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Ionicons name="mail" size={26} color="black" />
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
            fontSize: 23,
            fontWeight: 'bold',
            fontFamily: 'GeezaPro-Bold',
            marginTop: 15,
          }}
        >
          Enter your email
        </Text>

        <Text
          style={{
            marginTop: 10,
            fontSize: 14,
            color: 'gray',
          }}
        >
          Email Verification helps us keep the account secure
        </Text>

        <TextInput
          value={email}
          onChangeText={text => setEmail(text)}
          autoFocus={true}
          placeholder="Enter your email"
          placeholderTextColor={'#BEBEBE'}
          style={{
            width: 320,
            marginVertical: 10,
            marginTop: 25,
            borderColor: '#BEBEBE',
            borderWidth: 1,
            borderRadius: 10,
            paddingBottom: 10,
            paddingLeft: 10,
            fontFamily: 'GeezaPro-Bold',
            fontSize: email ? 17 : 17,
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'start',
          }}
        >
          <Ionicons name="information-circle-outline" size={20} color="black" />

          <Text
            style={{
              color: 'gray',
              fontSize: 14,
              marginLeft: 5,
            }}
          >
            You will be asked to verify your email
          </Text>
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

export default EmailScreen;

const styles = StyleSheet.create({});
