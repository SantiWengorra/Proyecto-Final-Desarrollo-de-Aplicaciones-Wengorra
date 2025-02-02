import { StyleSheet, Image, View } from 'react-native';
import {googleapi} from '../googleApi';

const MapPreview = ({ location }) => {
  const mapStaticUrl = `https://maps.googleapis.com/maps/api/staticmap?
                        center=${location.lat},${location.long}
                        &zoom=13
                        &size=600x300
                        &maptype=roadmap
                        &markers=color:blue%7Clabel:S%7C${location.lat},${location.long}
                        &key=${googleapi}`;

  if (!location.lat || !location.long) {
    return <View style={styles.image}></View>;
  }

  return (
    <View>
      <Image source={{ uri: mapStaticUrl }} style={styles.image} />
    </View>
  );
};

export default MapPreview;

const styles = StyleSheet.create({
  image: {
    backgroundColor: 'grey',
    width: 300,
    height: 300,
  },
});