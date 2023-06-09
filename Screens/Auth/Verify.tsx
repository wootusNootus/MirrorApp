import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useClerk, useSignUp } from "@clerk/clerk-expo";
import { RootStackScreenProps } from "../../types";
import { log } from "../../logger";
import { Button, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, Image, StyleSheet } from "react-native";
import { globalStyles, globalImageStyles } from "../../styles/global";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FIREBASE_DB } from "../../firebaseConfig";

const Verify = () => {
  const { isLoaded, signUp, setSession } = useSignUp();

  const [code, setCode] = React.useState("");

  const onPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      const emailAddress = await AsyncStorage.getItem("email");

      await setSession(completeSignUp.createdSessionId);
      console.log("email: " + emailAddress);
      await setDoc(doc(FIREBASE_DB, "users", emailAddress), {
        email: emailAddress,
        arrayShirtID: [],
        arrayPantID: [],
        arrayShoeID: [],
      });

      navigation.navigate("Main");
    } catch (err: any) {
      log("Error:> " + err?.status || "");
      log("Error:> " + err?.errors ? JSON.stringify(err.errors) : err);
      console.log("Error: " + err);
    }
  };
  const buttonstyles = StyleSheet.create({
    primaryButton: {
      width: "90%",
      borderRadius: 5,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 40,
      backgroundColor: "#000",
      color: "#ffffff",
    },
    primaryButtonText: {
      color: "#ffffff",
      fontWeight: "bold",
    },
  });

  const navigation = useNavigation();
  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.separator} />
      <TextInput
        value={code}
        style={globalStyles.textInput}
        placeholder="Code..."
        placeholderTextColor="#000"
        onChangeText={(code) => setCode(code)}
      />

      <TouchableOpacity style={buttonstyles.primaryButton} onPress={onPress}>
        <Text style={buttonstyles.primaryButtonText}>Verify Email</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Verify;
