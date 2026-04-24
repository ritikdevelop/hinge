import {
  Image,
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
import Ionicons from '@react-native-vector-icons/ionicons';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const JobTitleScreen = () => {
  const [jobTitle, setJobTitle] = useState('');

  const navigation = useNavigation();
  useEffect(() => {
    // Load saved job title from registration progress
    getRegistrationProgress('JobTitle').then(progressData => {
      if (progressData) {
        setJobTitle(progressData.jobTitle || '');
      }
    });
  }, []);

  const handleNext = () => {
    if (jobTitle.trim() !== '') {
      // Save job title to registration progress
      saveRegistrationProgress('JobTitle', { jobTitle });
    }
    navigation.navigate('Photos');
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
              borderColor: 'black',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <MaterialDesignIcons name="lan" size={23} color="black" />
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
          What's your job title?
        </Text>

        <TextInput
          autoFocus={true}
          value={jobTitle}
          onChangeText={text => setJobTitle(text)}
          placeholder="Enter your job title"
          style={{
            width: 300,
            marginTop: 25,
            borderColor: 'gray',
            borderRadius: 8,
            borderWidth: 1,
            padding: 12,
            fontFamily: 'GeezaPro-Bold',
            fontSize: jobTitle ? 16 : 16,
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

export default JobTitleScreen;

const styles = StyleSheet.create({});
