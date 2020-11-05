import React, {useState} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Circle} from 'react-native-maps';
const {width, height} = Dimensions.get('window');
const Location = () => {
  const [mapHeight, setMapHeight] = useState(height);

  const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      height: mapHeight,
      width: width,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
  });

  return (
    <View style={styles.container}>
      <MapView
        toolbarEnabled={true}
        showsUserLocation={true}
        followUserLocation={true}
        zoomEnabled={true}
        pitchEnabled={true}
        showsMyLocationButton={true}
        showsIndoors={true}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: 33.8988584,
          longitude: 35.5001239,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        <MapView.Marker
          onPress={() => setMapHeight(-0.08)}
          coordinate={{latitude: 33.8988584, longitude: 35.5001239}}
          title={'M1 Building'}
          description={
            'Bab Idriss Bayrut Mount Lebanon Governorate، Beirut'
          }></MapView.Marker>
        <Circle
          radius={150}
          fillColor={'rgba(232, 155, 155, 0.5)'}
          zIndex={1}
          center={{latitude: 33.8988584, longitude: 35.5001239}}
        />
      </MapView>
    </View>
  );
};

export default Location;
