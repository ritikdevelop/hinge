import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';
import { saveRegistrationProgress } from '../utils/registrationUtils';
import { useNavigation, useRoute } from '@react-navigation/native';
const PasswordScreen = () => {
  const [password, setPassword] = useState('');
  const route = useRoute();
  const navigation = useNavigation();

  const handleNext = () => {
    if (password.trim() !== '') {
      saveRegistrationProgress('Password', { password });
    }
    navigation.navigate('Birth'); //Note: Here Birth will change with Otp in the future
  };

  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === 'android' ? 35 : 0,
        flex: 1,
        backgroundColor: 'white',
      }}
    >
      <View style={{ marginTop: 80, marginHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              borderWidth: 2,
              justifyContent: 'center',
              borderColor: 'black',
              alignItems: 'center',
            }}
          >
            <Ionicons name="lock-closed" size={24} color="black" />
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
            fontSize: 20,
            fontWeight: 'bold',
            fontFamily: 'GeezaPro-Bold',
            marginTop: 15,
          }}
        >
          Please enter the password
        </Text>

        <TextInput
          value={password}
          onChangeText={text => setPassword(text)}
          autoFocus={true}
          placeholder="Enter your password"
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
            fontSize: password ? 17 : 17,
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
            Your details will be safe with us
          </Text>

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
      </View>
    </SafeAreaView>
  );
};

export default PasswordScreen;

const styles = StyleSheet.create({});
