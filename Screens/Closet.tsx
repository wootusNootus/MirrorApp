import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';

const MusicRoute = () => <Text>Blouses/Shirts Displayed</Text>;

const AlbumsRoute = () => <Text>Pants/Skirts Displayed</Text>;

const RecentsRoute = () => <Text>Shoes Displayed</Text>;

const NotificationsRoute = () => <Text>Accessories Displayed</Text>;

const ClosetScreen = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'music', title: 'Tops', focusedIcon: 'tshirt-crew-outline', unfocusedIcon: 'tshirt-crew'},
    { key: 'albums', title: 'Bottoms', focusedIcon: 'help' },
    { key: 'recents', title: 'Shoes', focusedIcon: 'shoe-sneaker' },
    { key: 'notifications', title: 'Accessories', focusedIcon: 'treasure-chest', unfocusedIcon: 'treasure-chest' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    music: MusicRoute,
    albums: AlbumsRoute,
    recents: RecentsRoute,
    notifications: NotificationsRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default ClosetScreen;