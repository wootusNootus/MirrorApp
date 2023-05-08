import * as React from 'react';
import { Avatar, Card, IconButton } from 'react-native-paper';
import CardContent from 'react-native-paper/lib/typescript/src/components/Card/CardContent';

const ActivityScreen = () => (
  <Card>
  <Card.Title
    title="John Bobert"
    subtitle="Last Active 15 minutes ago"
    left={(props) => <Avatar.Icon {...props} icon="account" />}
    right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
  />
  <Card.Title
    title="Srihan Gullapali"
    subtitle="Last Active 1 minutes ago"
    left={(props) => <Avatar.Icon {...props} icon="account" />}
    right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
  />
  <Card.Title
    title="Calvini Franklini"
    subtitle="Last Active 60+ minutes ago"
    left={(props) => <Avatar.Icon {...props} icon="account" />}
    right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
  />
  <Card.Title
    title="Bruv McBruv"
    subtitle="Last Active 23 minutes ago"
    left={(props) => <Avatar.Icon {...props} icon="account" />}
    right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
  />
  </Card>
);

export default ActivityScreen;