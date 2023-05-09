// import { getStorage, ref, getDownloadURL } from "firebase/storage";
// import * as React from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { BottomNavigation, Text } from "react-native-paper";
// import { Image, StyleSheet } from "react-native";
// import { useState } from "react";

// const MusicRoute = () => {
//   const localStyles = StyleSheet.create({
//     bottomContainer: {
//       flex: 1,
//       justifyContent: "flex-end",
//     },
//     userImage: {
//       flex: 5,
//     },
//   });
//   const [photoUrl, setPhotoUrl] = useState(
//     "https://reactnative.dev/img/tiny_logo.png"
//   );
//   async function setImage() {
//     console.log("running");
//     const storage = getStorage();
//     const value = await AsyncStorage.getItem("email");
//     const pathReference = ref(
//       storage,
//       "gs://mirror-73945.appspot.com/" + value + "/clothing.jpg"
//     );
//     getDownloadURL(pathReference)
//       .then((url) => {
//         // `url` is the download URL for 'images/stars.jpg'
//         // This can be downloaded directly:
//         const xhr = new XMLHttpRequest();
//         xhr.responseType = "blob";
//         xhr.onload = (event) => {
//           const blob = xhr.response;
//         };
//         xhr.open("GET", url);
//         xhr.send();
//         // // Or inserted into an <img> element
//         // img.setAttribute("src", url);
//         console.log(url);
//         setPhotoUrl(url);
//       })
//       .catch((error) => {
//         // Handle any errors
//         console.log(error);
//         console.log(
//           "either hasn't uploaded anything or not retrieving properly"
//         );
//       });
//   }
//   setImage();
//   return <Image style={localStyles.userImage} source={{ uri: photoUrl }} />;
// };

// const AlbumsRoute = () => <Text>Pants/Skirts Displayed</Text>;

// const RecentsRoute = () => <Text>Shoes Displayed</Text>;

// const NotificationsRoute = () => <Text>Accessories Displayed</Text>;

// const ClosetScreen = () => {
//   const [index, setIndex] = React.useState(0);
//   const [routes] = React.useState([
//     {
//       key: "music",
//       title: "Tops",
//       focusedIcon: "tshirt-crew-outline",
//       unfocusedIcon: "tshirt-crew",
//     },
//     { key: "albums", title: "Bottoms", focusedIcon: "help" },
//     { key: "recents", title: "Shoes", focusedIcon: "shoe-sneaker" },
//     {
//       key: "notifications",
//       title: "Accessories",
//       focusedIcon: "treasure-chest",
//       unfocusedIcon: "treasure-chest",
//     },
//   ]);

//   const renderScene = BottomNavigation.SceneMap({
//     music: MusicRoute,
//     albums: AlbumsRoute,
//     recents: RecentsRoute,
//     notifications: NotificationsRoute,
//   });

//   return (
//     <BottomNavigation
//       navigationState={{ index, routes }}
//       onIndexChange={setIndex}
//       renderScene={renderScene}
//     />
//   );
// };

// export default ClosetScreen;

import * as React from "react";
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  Platform,
  Easing,
  TouchableHighlight,
} from "react-native";
import { Appbar, BottomNavigation, Menu, useTheme } from "react-native-paper";
import ScreenWrapper from "../ScreenWrapper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { StackNavigationProp } from "@react-navigation/stack";

type RoutesState = Array<{
  key: string;
  title: string;
  focusedIcon: string;
  unfocusedIcon?: string;
  color?: string;
  badge?: boolean;
  getAccessibilityLabel?: string;
  getTestID?: string;
}>;

type Route = { route: { key: string } };

type Props = {
  navigation: StackNavigationProp<{}>;
};

const handlePress = () => {
  // add Firebase logic here, Praneet
}

const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";

const PhotoGallery = ({ route }: Route) => {
  const PHOTOS = Array.from({ length: 24 }).map(
    (_, i) => `https://unsplash.it/300/300/?random&__id=${route.key}${i}`
  );

  return (
    <ScreenWrapper contentContainerStyle={styles.content}>
      {PHOTOS.map((uri) => (
        <View key={uri} style={styles.item}>
            <Image source={{ uri }} style={styles.photo} />
        </View>
      ))}
    </ScreenWrapper>
  );
};

const BottomNavigationExample = ({ navigation }: Props) => {
  const { isV3 } = useTheme();
  const insets = useSafeAreaInsets();
  const [index, setIndex] = React.useState(0);
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [sceneAnimation, setSceneAnimation] =
    React.useState<
      React.ComponentProps<typeof BottomNavigation>["sceneAnimationType"]
    >();

  const [routes] = React.useState<RoutesState>([
    {
      key: "album",
      title: "TOPS",
      focusedIcon: "tshirt-crew",
      ...(!isV3 && { color: "#6200ee" }),
    },
    {
      key: "library",
      title: "BOTTOMS",
      focusedIcon: "dresser",
      ...(isV3
        ? { unfocusedIcon: "dresser-outline" }
        : {
            color: "#2962ff",
          }),
    },
    {
      key: "favorites",
      title: "SHOES",
      focusedIcon: "shoe-sneaker",
      ...(isV3
        ? { unfocusedIcon: "shoe-sneaker" }
        : {
            color: "#00796b",
          }),
    },
    {
      key: "purchased",
      title: "ACCESSORIES",
      focusedIcon: "watch",
      ...(isV3 ? { unfocusedIcon: "watch" } : { color: "#c51162" }),
    },
  ]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <View style={styles.screen}>
      <Appbar.Header elevated>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Closet Screen" />
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <Appbar.Action
              icon={MORE_ICON}
              onPress={() => setMenuVisible(true)}
              {...(!isV3 && { color: "white" })}
            />
          }
        >
          <Menu.Item
            trailingIcon={sceneAnimation === undefined ? "check" : undefined}
            onPress={() => {
              setSceneAnimation(undefined);
              setMenuVisible(false);
            }}
            title="Scene animation: none"
          />
          <Menu.Item
            trailingIcon={sceneAnimation === "shifting" ? "check" : undefined}
            onPress={() => {
              setSceneAnimation("shifting");
              setMenuVisible(false);
            }}
            title="Scene animation: shifting"
          />
          <Menu.Item
            trailingIcon={sceneAnimation === "opacity" ? "check" : undefined}
            onPress={() => {
              setSceneAnimation("opacity");
              setMenuVisible(false);
            }}
            title="Scene animation: opacity"
          />
        </Menu>
      </Appbar.Header>
      <BottomNavigation
        safeAreaInsets={{ bottom: insets.bottom }}
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        labelMaxFontSizeMultiplier={2}
        renderScene={BottomNavigation.SceneMap({
          album: PhotoGallery,
          library: PhotoGallery,
          favorites: PhotoGallery,
          purchased: PhotoGallery,
        })}
        sceneAnimationEnabled={sceneAnimation !== undefined}
        sceneAnimationType={sceneAnimation}
        sceneAnimationEasing={Easing.ease}
      />
    </View>
  );
};

BottomNavigationExample.title = "Bottom Navigation";

export default BottomNavigationExample;

const styles = StyleSheet.create({
  ...Platform.select({
    web: {
      content: {
        // there is no 'grid' type in RN :(
        display: "grid" as "none",
        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
        gridRowGap: "8px",
        gridColumnGap: "8px",
        padding: 8,
      },
      item: {
        width: "100%",
        height: 150,
      },
    },
    default: {
      content: {
        flexDirection: "row",
        flexWrap: "wrap",
        padding: 4,
      },
      item: {
        height: Dimensions.get("window").width / 2,
        width: "50%",
        padding: 4,
      },
    },
  }),
  photo: {
    flex: 1,
    resizeMode: "cover",
  },
  screen: {
    flex: 1,
  },
});

//need to call seperate images depending on the which fashion item the user wants
//need to be able to call  mulitple of each itme
//need to be able to call select which item the user wants in there woredrobe
