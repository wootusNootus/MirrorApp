import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import Menu from "../components/Menu";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
      <Image
        style={localStyles.userImage}
        id="myimg"
        source={{ uri: "https://illustoon.com/photo/8211.png" }}
      />
    </View>
  );
};

const localStyles = StyleSheet.create({
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  userImage: {
    flex: 5,
  },
});

export default MainScreen;
