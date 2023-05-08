import * as React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { ScrollView } from 'react-native';

const MyComponent = () => (
   <ScrollView>
    <Card>
    <Card.Content>
      <Text variant="titleLarge">New Adidas Collection</Text>
      <Text variant="bodyMedium">Featuring collabs with Gucci, BAPE, etc.</Text>
    </Card.Content>
    <Card.Cover source={{ uri: 'https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/01-ss23-gucci-launch-confirmed-clp-statement-d_tcm221-1008584.jpg' }} />
    <Card.Actions>
      <Button>See More</Button>
    </Card.Actions>
    <Card.Content>
      <Text variant="titleLarge">Northface expected to work with artist A$AP Rocky</Text>
      <Text variant="bodyMedium">Rapper teases new line of shoes in new music video</Text>
    </Card.Content>
    <Card.Cover source={{ uri: 'https://cdn.sanity.io/images/c1chvb1i/production/a491c9bc21313f32abc062d95a5fc77fe91d67e5-1100x735.jpg' }} />
    <Card.Actions>
      <Button>See More</Button>
    </Card.Actions>
    <Card.Content>
      <Text variant="titleLarge">New design challenge open to all users</Text>
      <Text variant="bodyMedium">Enter now for a chance at having your work launched through Mirror!</Text>
    </Card.Content>
    <Card.Cover source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX2vg3YhAZwY4I6C_BrJ4Ar92-YJW5yCbczA&usqp=CAU' }} />
    <Card.Actions>
      <Button>Enter Now</Button>
    </Card.Actions>
    </Card>
  </ScrollView>
);

export default MyComponent;