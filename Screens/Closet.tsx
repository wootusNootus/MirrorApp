import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Menu from '../components/Menu';

const ClosetScreen = () => {
    return <View>
        <Text>Closet Screen</Text>
        <View style={styles.container}>
            <Menu />
        </View>
    </View>

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: 150.
    },
  });

export default ClosetScreen