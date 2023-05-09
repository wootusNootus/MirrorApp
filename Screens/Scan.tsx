import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Image,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { Camera, ImageType } from "expo-camera";
import { shareAsync } from "expo-sharing";
import { getStorage, ref, uploadBytes, uploadString } from "firebase/storage";
import * as MediaLibrary from "expo-media-library";
import { useNavigation } from "@react-navigation/native";

import { BrushAction, Configuration, PESDK } from "react-native-photoeditorsdk";
import firebase from "firebase/compat/app";
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";

import { globalStyles, globalImageStyles } from "../styles/global";
import {
  RemoveBgError,
  RemoveBgResult,
  removeBackgroundFromImageFile,
} from "remove.bg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { FIREBASE_DB } from "../firebaseConfig";
// const outputFile = `${__dirname}/out/img-removed-from-file.png`;

//remove bg code

const ScanScreen = () => {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState(null);
  const storage = getStorage();
  const [resultImageURI, setResultImageURI] = useState<string | null>(null);
  const navigation = useNavigation();
  const unique_id = uuid();
  const small_id = unique_id.slice(0, 8);
  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }

  let takePic = async () => {
    let options = {
      quality: 0.5,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  if (photo) {
    // const removeBackgroundSave = async () => {
    //   formData.append("size", "auto");
    //   const response = await fetch(photo.uri);
    //   const blob = await response.blob();
    //   formData.append(
    //     "image_file",
    //     fs.createReadStream(photo.uri),
    //     path.basename(photo.uri)
    //   );
    //   const storageRef = ref(storage, "Shirt");
    //   uploadBytes(storageRef, blob).then((snapshot) => {
    //     console.log("Uploaded a blob or file!");
    //   });
    // };
    const handleRemoveBackground = async () => {
      const formData = new FormData();

      try {
        // Replace 'YOUR_API_KEY' with your actual API key
        // const respnse = await fetch(photo.uri);
        const value = await AsyncStorage.getItem("email");
        // const blob = await respnse.blob();
        const apiKey = "xyP9ShhYFswnSU5A4ccZWvuF";
        const apiUrl = "https://api.remove.bg/v1.0/removebg";

        formData.append("image_file", {
          uri: photo.uri, // Replace with your actual image URI
          type: ImageType.photo,
          name: "image.jpg",
        });
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "X-Api-Key": apiKey,
          },
          body: formData,
        });
        // console.log("Response:", response);

        // console.log("sucess");
        // console.log("Response:", response);
        if (response.ok) {
          const imageBlob = await response.blob();

          const storageRef = ref(storage, value + "/" + small_id + ".jpg");
          // const doc = addDoc(collection(FIREBASE_DB, "users"), {
          //   title: emailAddress,
          // });

          const ShirtRef = doc(FIREBASE_DB, "users", value);
          await updateDoc(ShirtRef, {
            arrayShirtID: arrayUnion(small_id),
          });
          uploadBytes(storageRef, imageBlob).then((snapshot) => {
            console.log("Uploaded a Blob!");
            navigation.navigate("Main");
          });
        } else {
          console.error("Error:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    return (
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.preview}
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
        />
        {hasMediaLibraryPermission ? (
          <Button title="Save" onPress={handleRemoveBackground} />
        ) : undefined}
        <Button title="Discard" onPress={() => setPhoto(undefined)} />
      </SafeAreaView>
    );
  }

  return (
    <Camera style={styles.container} ref={cameraRef}>
      <View style={styles.buttonContainer}>
        <Button title="Take Pic" onPress={takePic} />
      </View>
      <StatusBar style="auto" />
    </Camera>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    backgroundColor: "#fff",
    alignSelf: "flex-end",
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
});

export default ScanScreen;

//adds specifaclly a shirt
//TODO: only adds shirts needs to have seperate page to add other things.
