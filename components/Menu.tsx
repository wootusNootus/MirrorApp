import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Button } from 'react-native-paper';


const Menu = () => {
    const navigation = useNavigation()
    return (
      <View style={styles.menu}> 
        <TouchableOpacity
            onPress={() => {
                // go to activity
                navigation.navigate('Activity');
            }}>
            <Button icon="account-multiple-outline"> </Button>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => {
                // go to closet
                navigation.navigate('Closet');
            }}>
            <Button icon="hanger"> </Button>
        </TouchableOpacity>
        <TouchableOpacity 
            onPress={() => {
                // go to explore
                navigation.navigate('Explore');
            }}>
            <Button icon="select-search"> </Button>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => {
                // go to scan
                navigation.navigate('Scan');
            }}>
            <Button icon="camera"> </Button>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => {
                // go to shop
                navigation.navigate('Shop');
            }}>
            <Button icon="basket-outline"> </Button>
        </TouchableOpacity>
      </View>
    );
};

const styles = StyleSheet.create({
    menu: {
        padding: 16,
        marginTop: 8,
        justifyContent: 'center',
        flexDirection: 'row', 
        flexWrap: 'wrap',
    },
});

export default Menu