/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Alert,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import style from './style';
import RNLocation from 'react-native-location';
import ScreenBrightness from 'react-native-screen-brightness';
import haversine from 'haversine';
import axios from 'axios';
import images from '../assets/images';
import MapView from 'react-native-maps';
import moment from 'moment';

const {width} = Dimensions.get('window');

console.disableYellowBox = true;

const App = () => {
  // const [activeTab, setActiveTab] = useState(1);
  const [speed, setSpeed] = useState(0);
  const [isRotate, setRotate] = useState(false);
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState({});
  const [distance, setDistance] = useState(0);
  const [previousCoor, setPreviousCoor] = useState({});

  let locationSubscription = null;

  useEffect(() => {
    RNLocation.configure({
      distanceFilter: 5.0,
    });

    RNLocation.requestPermission({
      ios: 'whenInUse',
      android: {
        detail: 'fine',
        rationale: {
          title: 'Location permission',
          message: 'We use your location to demo the library',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        },
      },
    }).then(granted => {
      if (granted) {
        _startUpdatingLocation();
      } else {
        Alert.alert('Bạn chưa cung cấp quyền truy cập vị trí');
      }
    });
  }, []);

  const _startUpdatingLocation = () => {
    locationSubscription = RNLocation.subscribeToLocationUpdates(locations => {
      setLocation(locations[0]);
      const coors = {
        latitude: locations[0].latitude,
        longitude: locations[0].longitude,
      };
      if (locations[0]?.speed >= 0) {
        setSpeed(locations[0].speed.toFixed(2));
      } else {
        setSpeed(0);
      }
      if (Object.entries(previousCoor).length !== 0) {
        let distanceValue = distance + haversine(previousCoor, coors);
        setDistance(distanceValue);
      }
      setPreviousCoor(coors);
    });
  };

  useEffect(() => {
    if (speed > 70) {
      Alert.alert('Quá tốc độ bạn êiii');
    }
  }, [speed]);

  useEffect(() => {
    if (location) {
      if (distance > 10 || Object.entries(weather).length === 0) {
        const lon = location.longitude.toFixed(2);
        const lat = location.latitude.toFixed(2);
        getDataWeather(lon, lat);
      }
    }
  }, [distance, location]);

  const onScroll = e => {
    // console.log(e);
  };

  const onPressRotate = () => {
    setRotate(!isRotate);
    ScreenBrightness.setBrightness(1);
  };

  const getDataWeather = (lon, lat) => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=56236d628891ade235f46d991b15bff0`,
      )
      .then(result => {
        setWeather(result.data);
      });
  };

  return (
    <View style={style.container}>
      {location && (
        <MapView
          style={style.map}
          showsUserLocation
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}>
          {/* <MapView.Polyline
          coordinates={this.state.markers.map(marker => marker.coordinate)}
          strokeWidth={5}
        /> */}
        </MapView>
      )}
      <SafeAreaView
        pointerEvents={'none'}
        style={[
          style.content,
          isRotate
            ? {
                transform: [{rotateX: '180deg'}],
              }
            : null,
        ]}>
        <View style={[style.row, style.topInfo]}>
          <View style={[style.row, style.location]}>
            <Image source={images.pin} style={style.pin} />
            <Text style={style.locationTitle}>{weather?.name}</Text>
          </View>
          <Text style={style.time}>
            {moment().format('dddd')}, {moment().format('MMM DD')}
          </Text>
        </View>
        <View style={[style.row, style.middle]}>
          <View>
            <Text style={style.tempMain}>
              {(weather?.main?.temp - 273.15).toFixed(0)}
              <Text
                style={{
                  fontFamily: 'Spy Agency Outline',
                }}>
                °C
              </Text>
            </Text>
            <View style={style.row}>
              <Image
                style={style.iconWeather}
                source={{
                  uri: `http://openweathermap.org/img/wn/${
                    weather?.weather?.[0]?.icon
                  }@2x.png`,
                }}
              />
              <Text style={style.weatherDes}>
                {weather?.weather?.[0]?.description}
              </Text>
            </View>
          </View>
          <View style={style.speedView}>
            <Text style={style.speedText}>{speed} km/h</Text>
            <Text style={style.distanceText}>
              Distance: {distance.toFixed(1)} km
            </Text>
          </View>
        </View>
        <View
          style={[
            style.row,
            {
              paddingLeft: 12,
            },
          ]}>
          <Image source={images.wind} style={style.pin} />
          <Text style={style.windInfo}>
            {weather?.wind?.speed} m/s - {weather?.wind?.deg}°
          </Text>
        </View>
      </SafeAreaView>
      <TouchableOpacity onPress={onPressRotate} style={style.rotateButton}>
        <Image source={images.rotate} style={style.rotateImage} />
      </TouchableOpacity>
    </View>
  );
};

export default App;
