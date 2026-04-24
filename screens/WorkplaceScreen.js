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

const WorkplaceScreen = () => {
  const [workPlace, setWorkPlace] = useState('');

  const navigation = useNavigation();
  useEffect(() => {
    getRegistrationProgress('Workplace').then(progressData => {
      if (progressData) {
        setWorkPlace(progressData.workPlace || '');
      }
    });
  }, []);

  const handleNext = () => {
    if (workPlace.trim() !== '') {
      saveRegistrationProgress('Workplace', { workPlace });
    }
    navigation.navigate('JobTitle');
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
              name="briefcase-outline"
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
          Where do you work?
        </Text>

        <TextInput
          value={workPlace}
          autoFocus={true}
          onChangeText={text => setWorkPlace(text)}
          placeholder="Enter your workplace"
          style={{
            width: 300,
            marginTop: 25,
            borderColor: 'gray',
            borderRadius: 8,
            borderWidth: 1,
            padding: 12,
            fontFamily: 'GeezaPro-Bold',
            fontSize: workPlace ? 16 : 16,
          }}
        />

        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.8}
          style={{ marginTop: 30, marginLeft: 'auto' }}
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

export default WorkplaceScreen;

const styles = StyleSheet.create({});
