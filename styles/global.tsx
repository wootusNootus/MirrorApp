import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#F4F4F4',
      marginBottom: 30,
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
    input: {
      color: '#FFFFFF',
      marginLeft: 10,
    },
    textInput: {
      width: 300
    },
  });
  
  export const globalImageStyles = StyleSheet.create({
    container: {
      paddingTop: 50,
    },
    tinyLogo: {
      width: 50,
      height: 50,
    },
    logo: {
      alignItems: 'center',
      width: 250,
      height: 250,
    },
  });