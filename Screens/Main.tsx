import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Menu from '../components/Menu';

const MainScreen = () => {
    return <View style = {styles.bottomContainer}>
        <Menu />
    </View>
}

const styles = StyleSheet.create({
    bottomContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
});


export default MainScreen