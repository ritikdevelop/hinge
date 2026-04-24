import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthContext from '../AuthContext';

const ProfileScreen = () => {
  const { logout } = useContext(AuthContext);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flex: 1, padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>ProfileScreen</Text>

        <View style={{ marginTop: 20 }}>
          <Pressable
            onPress={logout}
            style={{
              backgroundColor: '#D90429',
              padding: 15,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}
          >
            <Text style={{ color: 'white', fontSize: 16, fontWeight: '700' }}>
              Logout
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
