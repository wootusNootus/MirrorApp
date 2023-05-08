import React from "react";
import { View } from "react-native";
import {
  SafeAreaView,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { globalStyles, globalImageStyles } from "../../styles/global";
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity } from "react-native";
import { RootStackScreenProps } from "../../types";
import { useSignUp } from "@clerk/clerk-expo";
import { log } from "../../logger";
import { addDoc, collection } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { FIREBASE_DB } from "../../firebaseConfig";

import { Button, TextInput } from "react-native-paper";

const RegisterScreen = () => {
  const { isLoaded, signUp } = useSignUp();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigation = useNavigation();
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });

      // https://docs.clerk.dev/popular-guides/passwordless-authentication
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      const doc = addDoc(collection(FIREBASE_DB, "users"), {
        title: emailAddress,
      });
      await AsyncStorage.setItem("email", emailAddress);

      navigation.navigate("Verify");
    } catch (err: any) {
      log("Error:> " + err?.status || "");
      log("Error:> " + err?.errors ? JSON.stringify(err.errors) : err);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={globalStyles.container}
    >
      <Button onPress={() => navigation.navigate("Login")}>Login</Button>
      <View style={globalStyles.separator} />
      <TextInput
        label="Email"
        value={emailAddress}
        left={<TextInput.Icon icon="account-cowboy-hat" />}
        style={{ width: 300 }}
        onChangeText={(email) => setEmailAddress(email)}
      />
      <TextInput
        label="Password"
        value={password}
        secureTextEntry
        left={<TextInput.Icon icon="security" />}
        style={{ width: 300 }}
        onChangeText={(password) => setPassword(password)}
      />
      <TextInput
        label="First Name"
        value={firstName}
        style={{ width: 300 }}
        onChangeText={(firstName) => setFirstName(firstName)}
      />
      <TextInput
        label="Last Name"
        value={lastName}
        style={{ width: 300 }}
        onChangeText={(lastName) => setLastName(lastName)}
      />
      <Button mode="elevated" onPress={onSignUpPress}>
        Register
      </Button>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
