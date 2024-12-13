import React, { useEffect, useState } from 'react';
import {
  Button,
  View,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Linking,
  Alert,
  Text,
  TouchableOpacity,
} from 'react-native';
import * as Location from 'expo-location';
import haversine from 'haversine';
import NetInfo from '@react-native-community/netinfo';
import policeStations from './policeStations.json'; 

export default function App() {
  const [nearestStation, setNearestStation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [networkStatus, setNetworkStatus] = useState({
    isConnected: false,
    isInternetReachable: false,
  });

  
  const getLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  // Get current location
  const getCurrentLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Permission to access location was denied.');
      return null;
    }
    const location = await Location.getCurrentPositionAsync({});
    setUserLocation(location.coords);
    return location.coords;
  };

  // Find the nearest police station
  const findNearestPoliceStation = (userLocation) => {
    let nearestStation = null;
    let minDistance = Infinity;

    policeStations.forEach((station) => {
      const distance = haversine(userLocation, station.location);
      if (distance < minDistance) {
        minDistance = distance;
        nearestStation = station;
      }
    });
;
    return nearestStation;
  };

  // Handle "Send Alert Message" via SMS
  const handleSendAlert = () => {
    if (!nearestStation || !userLocation) {
      Alert.alert('Error', 'Unable to send alert. Ensure location and police station data are available.');
      return;
    }

    // Create SMS content
    const message = `Emergency Alert!
User Location:
- Latitude: ${userLocation.latitude}
- Longitude: ${userLocation.longitude}
Nearest Police Station:
- Name: ${nearestStation["p.s Name"]}
- Address: ${nearestStation.address}
- Phone: ${nearestStation["phone no"]}
Please come quickly and take necessary action.

Map Link:
https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(nearestStation.address)}&destination=${userLocation.latitude},${userLocation.longitude}
`;

  
    const smsUrl = `sms:${nearestStation["phone no"]}?body=${encodeURIComponent(message)}`;
    Linking.openURL(smsUrl).catch((err) =>
      Alert.alert('Error', 'Unable to open SMS app.')
    );
  };

  
  const handleCall = () => {
    if (!nearestStation) {
      Alert.alert('Error', 'No police station found nearby.');
      return;
    }
    const phoneUrl = `tel:${nearestStation["phone no"]}`;
    Linking.openURL(phoneUrl).catch((err) =>
      Alert.alert('Error', 'Unable to open the dialer.')
    );
  };

  
  useEffect(() => {
    const setup = async () => {
      const hasPermission = await getLocationPermission();
      if (hasPermission) {
        const location = await getCurrentLocation();
        if (location) {
          const station = findNearestPoliceStation(location);
          setNearestStation(station);
        }
      }
    };

    setup();

    const unsubscribe = NetInfo.addEventListener((state) => {
      setNetworkStatus({
        isConnected: state.isConnected,
        isInternetReachable: state.isInternetReachable,
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={styles.container}>
      {/* Display Nearest Police Station Details */}
      {nearestStation && (
        <View style={styles.stationContainer}>
          <Text style={styles.stationInfo}>Nearest Police Station: {nearestStation["p.s Name"] || 'Unknown'}</Text>
          <Text style={styles.stationInfo}>Address: {nearestStation.address}</Text>
        </View>
      )}

      {/* Display User's Location Details */}
      {userLocation && (
        <View style={styles.locationContainer}>
          <Text style={styles.locationInfo}>
            Your Location: Latitude: {userLocation.latitude}, Longitude: {userLocation.longitude}
          </Text>
        </View>
      )}

      {/* Call or Send Alert Buttons */}
      <View style={styles.buttonContainer}>
        <Button title="Call Nearest Police Station" onPress={handleCall} />

        <TouchableOpacity style={styles.alertButton} onPress={handleSendAlert}>
          <Text style={styles.alertButtonText}>SEND ALERT MESSAGE</Text>
        </TouchableOpacity>
      </View>

      {/* Debugging Information */}
      <View style={styles.debugContainer}>
        <Text>
          {networkStatus.isInternetReachable
            ? 'Status: Internet Available'
            : 'Status: No network available'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  stationContainer: {
    marginBottom: 20,
  },
  stationInfo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  locationContainer: {
    marginBottom: 20,
  },
  locationInfo: {
    fontSize: 16,
    color: 'gray',
  },
  buttonContainer: {
    margin: 20,
    alignItems: 'center',
  },
  alertButton: {
    backgroundColor: 'red',
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 20,
    borderRadius: 5,
  },
  alertButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  debugContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
});
