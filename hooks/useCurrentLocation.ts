import {getLocationByLatLng} from "@/api/googlePlacesApi";

import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject
} from 'expo-location';
import {useEffect, useState} from "react";
import _ from 'lodash';

export interface ICurrentLocationResp {
  locationObj: google.maps.GeocoderResult;
  latLngCoords: LocationObject;
  locationDisplayString: string;
  errorMsg: string;
  usersLocationLoaded: boolean;
}

export default function useCurrentLocation(): ICurrentLocationResp {
  const [locationObj, setLocation] = useState({} as google.maps.GeocoderResult);
  const [latLngCoords, setLatLngCoords] = useState({} as LocationObject);
  const [locationDisplayString, setLocationDisplayString] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState('');
  const [usersLocationLoaded, setUsersLocationLoaded] = useState(false);

  async function fetchLocations(location: LocationObject): Promise<void> {
    const {
      coords: {
        latitude,
        longitude
      }
    } = location;
    try {
      const locationData = await getLocationByLatLng(latitude, longitude);
      setLocation(locationData);
      setLocationDisplayString(`${locationData.address_components[0].long_name} (${locationData.address_components[1].long_name})`);

    } catch (err) {
      console.error('Error getting location data from coordinates', err);
    }
  }

  useEffect(() => {
    (async (): Promise<void> => {

      let { status } = await requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location:LocationObject = await getCurrentPositionAsync({});

      if (_.isUndefined(_.get(location, 'coords.latitude')) || _.isUndefined(_.get(location, 'coords.longitude'))) {
        setErrorMsg('Returned location data is invalid');
        return;
      }
      setLatLngCoords(location);
      await fetchLocations(location);
      setUsersLocationLoaded(true);
    })();
  }, []);

  return {locationObj, latLngCoords, locationDisplayString, errorMsg, usersLocationLoaded};
}
