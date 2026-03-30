import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';

const BasicInfoScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === 'android' ? 35 : 0,
        flex: 1,
        backgroundColor: 'white',
      }}
    >
      <View style={{ marginTop: 50 }}>
        <Text
          style={{
            fontSize: 32,
            fontWeight: 'bold',
            fontFamily: 'GeezaPro-Bold',
            marginLeft: 20,
          }}
        >
          You're one of a kind.
        </Text>

        <Text
          style={{
            fontSize: 20,
            fontWeight: 'medium',
            fontFamily: 'GeezaPro-Bold',
            marginLeft: 25,
            marginTop: 10,
          }}
        >
          Your profile should be too.
        </Text>
      </View>

      <View>
        <LottieView
          style={{
            height: 260,
            width: 300,
            alignSelf: 'center',
            marginTop: 40,
            justifyContent: 'center',
          }}
          source={require('../assets/love.json')}
          autoPlay
          loop={true}
          speed={0.7}
        />
      </View>

      <Pressable
        onPress={() => navigation.navigate('Name')}
        style={{
          marginTop: 'auto',
          backgroundColor: '#900C3F',
          padding: 15,
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontWeight: '600',
            fontSize: 15,
          }}
        >
          Enter Basic Info
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default BasicInfoScreen;

const styles = StyleSheet.create({});
