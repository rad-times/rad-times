import {fetchSpotsByLatLng} from "@/api/spotApi";
import {Colors} from "@/constants/Colors";
import useCurrentLocation, {
  ICurrentLocationResp
} from "@/hooks/useCurrentLocation";
import {ActiveUserStateProp} from "@/state/activeUserSlice";
import {setCheckInModalOpen} from "@/state/checkInAndActiveSlice";
import {Spot} from "@/types/Spot";
import CheckInSpotOption from "@/views/checkIn/CheckInSpotOption";
import ActionButton from "@/views/components/ActionButton";
import CommonModalContentWrapper from "@/views/components/CommonModalContentWrapper";
import HeaderText from "@/views/components/HeaderText";
import PageWrapper from "@/views/components/PageWrapper";
import Spacer from "@/views/components/Spacer";
import {ReactNode, useEffect, useState} from "react";
import {FlatList, GestureResponderEvent, StyleSheet, Text, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";

interface ILocationPickerContent {
  usersLocation: string
  spotList: Spot[]
}
interface IErrorGettingLocation {
  errorTypeMessage?: string
}

/**
 *
 */
function ErrorGettingLocation({
  errorTypeMessage
}: IErrorGettingLocation): ReactNode {
  return (
    <View style={styles.centeredTextWrapper}>
      <Text style={styles.centeredText}>{"Error accessing location data"}</Text>
      <Text style={styles.locationSubErrorText}>{errorTypeMessage}</Text>
    </View>
  );
}

/**
 *
 */
function LocationPickerContent({
  usersLocation,
  spotList
}: ILocationPickerContent): ReactNode {
  const createNewLocation = (e: GestureResponderEvent) => {
    // @TODO create new spot
    console.log('create new');
  }

  return (
    <PageWrapper>
      <View style={styles.pageWrapper}>
        <View>
          <HeaderText
            text={`Spots near ${usersLocation}`}
          />
          <Spacer />
          <FlatList
            data={spotList}
            renderItem={({item}) => <CheckInSpotOption spotDetails={item} />}
            keyExtractor={item => String(item.spot_id)}
          />
          <Spacer margin={30} />
        </View>

        <ActionButton onClickBtn={createNewLocation} btnDisplayText={"Add a new spot"} />
      </View>
    </PageWrapper>
  );
}
/**
 *
 */
export default function CheckInModalContent({}): ReactNode {
  const [spotsReady, setSpotsReady] = useState<boolean>(false);
  const [loadingErrorMsg, setLoadingErrorMsg] = useState<string>('');
  const [spotList, setSpotList] = useState<Spot[]|[]>([]);

  const {locationObj, latLngCoords, locationDisplayString, errorMsg, usersLocationLoaded}: ICurrentLocationResp = useCurrentLocation();
  const activeUser = useSelector((state: ActiveUserStateProp) => state.activeUser.user);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchLocations(): Promise<void> {
      const {
        coords: {
          latitude,
          longitude
        }
      } = latLngCoords;
      try {
        const closestSpots = await fetchSpotsByLatLng(latitude, longitude, 1, activeUser.id);

        setSpotList(closestSpots);
        setSpotsReady(true);

      } catch (err) {
        console.error(err);
        setLoadingErrorMsg('Error getting local spots');
        setSpotsReady(true);
      }
    }

    if (usersLocationLoaded) {
      fetchLocations();
    }
  }, [usersLocationLoaded]);

  useEffect(() => {
    if (errorMsg && errorMsg.length) {
      setLoadingErrorMsg(errorMsg);
      setSpotsReady(true);
    }
  }, [errorMsg]);

  return (
    <CommonModalContentWrapper
      onTapCloseModal={() => dispatch(setCheckInModalOpen(false))}
      nameToShow={'Check In'}
    >
      {!spotsReady &&
          <View style={styles.centeredTextWrapper}>
              <Text style={styles.centeredText}>Loading location...</Text>
          </View>
      }
      {spotsReady &&
          <>
            {loadingErrorMsg ? <ErrorGettingLocation errorTypeMessage={loadingErrorMsg}/> : <LocationPickerContent spotList={spotList} usersLocation={locationDisplayString} />}
          </>
      }
    </CommonModalContentWrapper>
  );
}

const styles = StyleSheet.create({
  pageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1
  },
  spotListWrapper: {
    flex: 1
  },
  centeredTextWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  centeredText: {
    color: Colors.WHITE,
    fontSize: 20
  },
  locationSubErrorText: {
    color: Colors.WHITE,
    paddingTop: 10,
    fontSize: 16
  }
});
