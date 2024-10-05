import {Pressable, SafeAreaView, StyleSheet, Text, View} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import {Colors} from "@/constants/Colors";
import {setCurrentSpotMapDetails, setSpotLocationMapShown, SpotState} from "@/state/spotSlice";
import {useDispatch, useSelector} from "react-redux";
import Icon from "@/components/atom/Icon";
import _ from 'lodash';
import {Maps} from "@/constants/Maps";

export default function SpotMapModalContent() {
  const dispatch = useDispatch();
  const spotDetails = useSelector((state: SpotState) => state.spotSearch.currentSpotMapDetails);

  const closeSpotMap = () => {
    dispatch(setCurrentSpotMapDetails(null));
    dispatch(setSpotLocationMapShown(false));
  }
  const getMapContentView = () => {
    if (_.isNil(spotDetails) || _.isNil(spotDetails.location)) {
      return (
        <View style={styles.missingLocationWrapper}>
          <Icon size={60} name="thumbs-down-outline" color={Colors.DARK_RED} />
          <Text style={styles.missingLocationText}>Location details are missing for this spot.</Text>
        </View>
      );
    }
    return (
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        mapType={'standard'}
        customMapStyle={Maps.customSetup}
        initialRegion={{
          latitude: spotDetails.location.lat,
          longitude: spotDetails.location.lng,
          latitudeDelta: Maps.delta,
          longitudeDelta: Maps.delta,
        }}
      >
        <Marker
          coordinate={{
            latitude: spotDetails.location.lat,
            longitude: spotDetails.location.lng
          }}
          title={spotDetails.spot_name}
          description={spotDetails.spot_description}
          pinColor={Colors.DARK_RED}
        />
      </MapView>
    );
  }

  return (
    <SafeAreaView style={styles.mapWrapper}>
      <View style={styles.spotModalTopBar}>
        <Text style={styles.spotModalTopBarName}>{spotDetails?.spot_name}</Text>
        <Pressable
          onPress={closeSpotMap}>
          <Icon size={30} name="close-circle-outline" color={Colors.WHITE} />
        </Pressable>
      </View>
      <View style={styles.spotModalMap}>
        {getMapContentView()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  spotModalTopBar: {
    height: 50,
    backgroundColor: Colors.DARK_GREY,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10
  },
  spotModalTopBarName: {
    color: Colors.WHITE,
    fontSize: 18
  },
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
  mapWrapper: {
    flex: 1,
    flexDirection: 'column'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  }
});
