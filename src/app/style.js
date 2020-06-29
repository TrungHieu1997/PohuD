import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#313131',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(64,64,64,.5)',
  },
  rotateButton: {
    position: 'absolute',
    bottom: 32,
    right: 32,
  },
  rotateImage: {
    width: 32,
    height: 32,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceView: {
    paddingTop: 12,
  },
  distanceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Spy Agency',
    paddingTop: 12,
  },
  pin: {
    width: 24,
    height: 24,
  },
  topInfo: {
    justifyContent: 'space-between',
    paddingVertical: 24,
  },
  speedText: {
    color: '#fff',
    fontSize: 46,
    fontWeight: 'bold',
    fontFamily: 'Spy Agency Expanded Italic',
    paddingRight: 12,
  },
  middle: {
    justifyContent: 'space-between',
  },
  sunView: {
    paddingHorizontal: 36,
    justifyContent: 'space-between',
    height: 100,
  },
  locationTitle: {
    paddingLeft: 12,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Spy Agency',
  },
  time: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Spy Agency',
  },
  tempMain: {
    fontSize: 124,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Spy Agency Condensed',
    paddingHorizontal: 36,
    marginLeft: -24,
  },
  weatherDes: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Spy Agency',
    paddingLeft: 12,
  },
  iconWeather: {
    width: 48,
    height: 48,
  },
  windInfo: {
    paddingLeft: 12,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Spy Agency',
  },
  sunText: {
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Spy Agency',
    paddingLeft: 12,
  },
});
