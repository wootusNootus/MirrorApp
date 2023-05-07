import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { log } from "../../logger";
import { useNavigation } from "@react-navigation/native";
import { RootStackScreenProps } from "../../types";
import { globalStyles, globalImageStyles } from "../../styles/global";

const LoginScreen = () => {
  const { signIn, setSession, isLoaded } = useSignIn();
  const navigation = useNavigation();
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      await setSession(completeSignIn.createdSessionId);
      navigation.navigate("Main");
    } catch (err: any) {
      log("Error:> " + err?.status || "");
      log("Error:> " + err?.errors ? JSON.stringify(err.errors) : err);
    }
  };

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.input}>
        <TextInput
          autoCapitalize="none"
          value={emailAddress}
          style={globalStyles.input}
          placeholder="Email..."
          placeholderTextColor="#000"
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        />
      </View>

      <View style={globalStyles.input}>
        <TextInput
          value={password}
          style={globalStyles.textInput}
          placeholder="Password..."
          placeholderTextColor="#000"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity style={globalStyles.button} onPress={onSignInPress}>
        <Text style={globalStyles.text}>Sign in</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
