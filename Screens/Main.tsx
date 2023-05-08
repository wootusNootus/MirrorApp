import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Menu from '../components/Menu';
import { Canvas } from '@react-three/fiber';

const MainScreen = () => {
    return <View style = {styles.bottomContainer}>
        <Menu/>
        <Canvas> 
        </Canvas>
    </View> 
}

const styles = StyleSheet.create({
    bottomContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
});


export default MainScreen