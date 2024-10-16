import CommonModalContentWrapper from "@/views/components/CommonModalContentWrapper";
import {StyleSheet, Text, View, Platform} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import {Colors} from "@/constants/Colors";
import {setCurrentSpotMapDetails, setSpotLocationMapShown, SpotState} from "@/state/spotSlice";
import {useDispatch, useSelector} from "react-redux";
import Icon from "@/views/components/Icon";
import _ from 'lodash';
import {Maps} from "@/constants/Maps";
import {ReactNode} from "react";

export default function SpotMapModalContent(): ReactNode {
  const dispatch = useDispatch();
  const spotDetails = useSelector((state: SpotState) => state.spotList.currentSpotMapDetails);

  const closeSpotMap = () => {
    dispatch(setCurrentSpotMapDetails(null));
    dispatch(setSpotLocationMapShown(false));
  }

  const getMapContentView = () => {
    if (_.isNil(spotDetails) || _.isNil(spotDetails.location)) {
      return (
        <View style={styles.missingLocationWrapper}>
          <Icon size={60} name="thumbs-down-outline" color={Colors.DARK_RED}/>
          <Text style={styles.missingLocationText}>Location details are missing for this spot.</Text>
        </View>
      );
    }
    return (
      <>
        {getMapViewByPlatform()}
      </>
    )
  }

  const getMapViewByPlatform = () => {
    return Platform.select({
      native: () => {
        return (
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            mapType={'standard'}
            customMapStyle={Maps.customSetup}
            initialRegion={{
              latitude: spotDetails?.location?.lat || 0,
              longitude: spotDetails?.location?.lng || 0,
              latitudeDelta: Maps.delta,
              longitudeDelta: Maps.delta,
            }}
          >
            <Marker
              coordinate={{
                latitude: spotDetails?.location?.lat || 0,
                longitude: spotDetails?.location?.lng || 0
              }}
              title={spotDetails?.spot_name}
              description={spotDetails?.spot_description}
              pinColor={Colors.DARK_RED}
            />
          </MapView>
        );
      },
      default: () => {
        return <View></View>
      }
    })();
  }

  return (
    <CommonModalContentWrapper
      onTapCloseModal={closeSpotMap}
      nameToShow={'Check In'}
    >
      <View style={styles.spotModalMap}>
        {getMapContentView()}
      </View>
    </CommonModalContentWrapper>
  );
}

const styles = StyleSheet.create({
  spotModalMap: {
    backgroundColor: Colors.LIGHT_GREY,
    flex: 1
  },
  missingLocationWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  missingLocationText: {
    fontSize: 20,
    color: Colors.DARK_RED,
    textAlign: 'center',
    marginTop: 10
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  }
});
