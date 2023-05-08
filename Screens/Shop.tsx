import * as React from 'react';
import { Modal, Portal, Text, Button, Provider } from 'react-native-paper';
import { StyleSheet, Image } from 'react-native';
import { ScrollView } from 'react-native';

const ShopScreen = () => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  return (
    <ScrollView>
    <Provider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Text>Are you sure you want to add this item to cart?</Text>
          <Button> YES </Button>
          <Button> NO </Button>
        </Modal>
      </Portal>
      <Button style={{marginTop: 30}} onPress={showModal}>
        Leather Coat - 99.00
      </Button>
      <Image
        style={localStyles.purchaseImage}
        source = {{ uri: 'https://m.media-amazon.com/images/I/61FrTElnCGL._AC_UY1000_.jpg' }}
      />
      <Button style={{marginTop: 30}} onPress={showModal}>
        Beanie Hat - 15.00
      </Button>
      <Image
        style={localStyles.purchaseImage}
        source = {{ uri: 'https://images.stockx.com/images/Supreme-New-Era-Box-Logo-Beanie-FW18-Black.jpg?fit=fill&bg=FFFFFF&w=1200&h=857&fm=webp&auto=compress&dpr=2&trim=color&updated_at=1629498152&q=75' }}
      />
      <Button style={{marginTop: 30}} onPress={showModal}>
        Adidas Sambas - 59.00
      </Button>
      <Image
        style={localStyles.purchaseImage}
        source = {{ uri: 'https://m.media-amazon.com/images/I/61nJMsTUXdL._AC_SL1500_.jpg' }}
      />
    </Provider>
    </ScrollView>
  );
};

const localStyles = StyleSheet.create({
    container: {
      paddingTop: 50,
    },
    purchaseImage: {
      width: '100%',
      height: 200,
    },
});


export default ShopScreen;