import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import Menu from '../components/Menu';

const MainScreen = () => {
    return <View style = {localStyles.bottomContainer}>
        <Menu/>
        <Image
            style={localStyles.userImage}
            source = {{ uri: 'https://illustoon.com/photo/8211.png' }}
        />
    </View> 
    
}

const localStyles = StyleSheet.create({
    bottomContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    userImage: {
        flex: 5,
    },
});


export default MainScreen