import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

function HomeScreen({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      <Button title="Go to Screen1" onPress={() => navigation.navigate('Screen1')} />
      <Button title="Go to Screen2" onPress={() => navigation.navigate('Screen2')} />
      <Button title="Go to Screen3" onPress={() => navigation.navigate('Screen3')} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
