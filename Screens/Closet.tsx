import { getStorage, ref, getDownloadURL } from "firebase/storage";
import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BottomNavigation, Text } from "react-native-paper";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { useState } from "react";

const TopsRoute = () => {
  const [photoUrl, setPhotoUrl] = useState(
    "https://reactnative.dev/img/tiny_logo.png"
  );
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
        // img.setAttribute("src", url);
        console.log(url);
        setPhotoUrl(url);
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

  ////<Image style={localStyles.userImage} source={{ uri: photoUrl }} /> praneet display 

  return (
    <View>
      <Image style={localStyles.userImage} source={{ uri: photoUrl }} />
      <Image style={localStyles.userImage} source={{ uri: photoUrl }} />
    </View>
  );
};

const BottomsRoute = () => <Text>Pants/Skirts Displayed</Text>;

const ShoesRoute = () => <Text>Shoes Displayed</Text>;

const AccessoryRoute = () => <Text>Accessories Displayed</Text>;

const ClosetScreen = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "top",
      title: "Tops",
      focusedIcon: "tshirt-crew-outline",
      unfocusedIcon: "tshirt-crew",
    },

    { key: "bottom", title: "Bottoms", focusedIcon: "help" },

    { key: "shoe", title: "Shoes", focusedIcon: "shoe-sneaker" },

    {
      key: "accessory",
      title: "Accessories",
      focusedIcon: "treasure-chest",
      unfocusedIcon: "treasure-chest",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    top: TopsRoute,
    bottom: BottomsRoute,
    shoe: ShoesRoute,
    accessory: AccessoryRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
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
  displayImage: {
    flex: 1,
    justifyContent: "space-evenly",
  },
});

export default ClosetScreen;

//need to call seperate images depending on the which fashion item the user wants
//need to be able to call  mulitple of each itme
//need to be able to call select which item the user wants in there woredrobe
