import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";
import React from "react";
import Menu from "../components/Menu";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const image = {uri: 'https://reactjs.org/logo-og.png'};

const MainScreen = () => {
  async function setImage() {
    console.log("running");
    const storage = getStorage();
    const value = await AsyncStorage.getItem("email");
    const pathReference = ref(
      storage,
      "gs://mirror-73945.appspot.com/" + value + "/clothing.jpg"
    );
    getDownloadURL(pathReference)
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'
        // This can be downloaded directly:
        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open("GET", url);
        xhr.send();
        // // Or inserted into an <img> element
        const img = document.getElementById("myimg");
        // img.setAttribute("src", url);
      })
      .catch((error) => {
        // Handle any errors
        console.log(error);
        console.log(
          "either hasn't uploaded anything or not retrieving properly"
        );
      });
  }
  setImage();

  

  return (
    <View style={localStyles.bottomContainer}>
      <Menu />
      <ImageBackground source={ image } style={localStyles.userImage}>
        <Text> Inside </Text>
      </ImageBackground>
    </View>

  );
};

const localStyles = StyleSheet.create({
  bottomContainer: {
    flex: 1,
  },
  userImage: {
    flex: 5,
  },
  clothingImage: {
    zIndex: 2,
    position: 'absolute',
    bottom: 32,
  }
});

export default MainScreen;
