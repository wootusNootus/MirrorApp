import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";
import React, { useState } from "react";
import Menu from "../components/Menu";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, getDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../firebaseConfig";

const image = {
  uri: "https://cdn.pixabay.com/photo/2014/03/24/13/42/male-294095_1280.png",
};

const MainScreen = () => {
  const [photoUrlShirt, setPhotoUrlShirt] = useState(
    "https://content.mycutegraphics.com/graphics/clothing/pink-tshirt.png"
  );
  const [photoUrlPant, setPhotoUrlPant] = useState(
    "https://www.pngmart.com/files/16/Denim-Jeans-PNG-Clipart.png"
  );
  async function setImage(setPhotoUrl: any) {
    console.log("running");
    const storage = getStorage();
    const value = await AsyncStorage.getItem("email");
    const docRef = doc(FIREBASE_DB, "users", value);
    const docSnap = await getDoc(docRef);
    let clothingType = "";
    let small_id = "";
    if (setPhotoUrl === setPhotoUrlShirt) {
      clothingType = "Shirt";
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.get("chosenShirt"));
        small_id = docSnap.get("chosenShirt");
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    } else {
      clothingType = "Pant";
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.get("chosenPant"));
        small_id = docSnap.get("chosenPant");
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    }
    const storageRef = ref(
      storage,
      value + "/" + clothingType + "/" + small_id + ".jpg"
    );
    getDownloadURL(storageRef)
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
  setImage(setPhotoUrlShirt);
  setImage(setPhotoUrlPant);

  return (
    <View style={localStyles.bottomContainer}>
      <Menu />
      <ImageBackground source={image} style={localStyles.userImage}>
        <View style={localStyles.overlay}>
          <Image
            style={localStyles.bottomImage}
            source={{ uri: photoUrlPant }}
          />
        </View>
        <View style={localStyles.overlay}>
          <Image style={localStyles.topImage} source={{ uri: photoUrlShirt }} />
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
    alignItems: "stretch",
    position: "absolute",
    top: 150,
    left: 80,
  },
  topImage: {
    resizeMode: "center",
    height: 170,
    width: 320,
    position: "absolute",
    top: 60,
    left: -60,
  },
  bottomImage: {
    resizeMode: "center",
    height: 200,
    width: 350,
    position: "absolute",
    top: 200,
    left: -75,
  },
  overlay: {
    opacity: 1,
    justifycontent: "center",
  },
});

export default MainScreen;
