module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native(-community)?|react-native-vector-icons|@react-navigation|@react-native-vector-icons|react-native-svg)'
  ],
  watchPathIgnorePatterns: [
    'android(/.*)?\\\\.cxx',
    'android(/.*)?\\\\build',
    'ios/build',
    '\\.cxx(/.*)?',
    '\\\\.cxx(/.*)?',
    'build(/.*)?',
  ],
};
