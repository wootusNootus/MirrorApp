import React from 'react';
import { View } from 'react-native';
import { SafeAreaView, Image, StyleSheet } from 'react-native';
import { globalStyles, globalImageStyles } from '../../styles/global';

import { TextInput } from 'react-native-paper';

const RegisterScreen = () => {
    return (
        <SafeAreaView style={globalStyles.container}>
          <TextInput> Register Screen </TextInput>
          <Image
              style={globalImageStyles.logo}
              source={{uri: 'https://media.licdn.com/dms/image/D5603AQH5_ncA4xAYfw/profile-displayphoto-shrink_800_800/0/1664149885550?e=2147483647&v=beta&t=PESaJXWYmnJd45iD3SBaNQ1ZNQNZbI0p9FkE7xAp8IA'}}
            />
          <View style={globalStyles.separator} />
          <TextInput
            label="Username"
            secureTextEntry
            left={<TextInput.Icon icon="account-cowboy-hat" />}
            style={{ width: 300 }}
           />
           <TextInput
            label="Password"
            secureTextEntry
            left={<TextInput.Icon icon="security" />}
            style={{ width: 300 }}
           />
        </SafeAreaView>
      );
}



export default RegisterScreen