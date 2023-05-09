import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";
import React from "react";
import Menu from "../components/Menu";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const image = {uri: 'https://cdn.pixabay.com/photo/2014/03/24/13/42/male-294095_1280.png'};

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
        <View style = {localStyles.overlay}>
          <Image style = {localStyles.bottomImage} source = {{ uri: 'https://www.pngmart.com/files/16/Denim-Jeans-PNG-Clipart.png' }} />
        </View>
        <View style = {localStyles.overlay}>
          <Image style = {localStyles.topImage} source = {{ uri: 'https://content.mycutegraphics.com/graphics/clothing/pink-tshirt.png' }} />
        </View>
      </ImageBackground>
    </View>

  );
};

const localStyles = StyleSheet.create({
  bottomContainer: {
    flex: 1,
  },
  userImage: {
    width: 200,
    height: 400,
    alignItems: 'stretch',
    position: 'absolute',
    top: 150,
    left: 80,
  },
  topImage: {
    resizeMode: 'center',
    height: 170,
    width: 320,
    position: 'absolute',
    top: 60,
    left: -60,
  },
  bottomImage: {
    resizeMode: 'center',
    height: 200,
    width: 350,
    position: 'absolute',
    top: 200,
    left: -75,
  },
  overlay: {
    opacity: 1,
    justifycontent: 'center',
  },
});

export default MainScreen;
