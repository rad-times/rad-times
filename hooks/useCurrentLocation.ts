import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject
} from 'expo-location';
import {useEffect, useState} from "react";
import _ from 'lodash';

export default function useCurrentLocation ():[LocationObject, string, boolean] {
  const [location, setLocation] = useState({} as LocationObject);
  const [errorMsg, setErrorMsg] = useState('');
  const [usersLocationLoaded, setUsersLocationLoaded] = useState(false);

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
      }

      setLocation(location);
      setUsersLocationLoaded(true);
    })();
  }, []);

  return [location, errorMsg, usersLocationLoaded];
}
