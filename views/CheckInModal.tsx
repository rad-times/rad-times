import {fetchSpotsByLatLng} from "@/api/spotApi";
import {Colors} from "@/constants/Colors";
import useCurrentLocation from "@/hooks/useCurrentLocation";
import {ActiveUserStateProp} from "@/state/activeUserSlice";
import {Spot} from "@/types/Spot";
import ActionButton from "@/views/components/ActionButton";
import CommonModalContentWrapper from "@/views/components/CommonModalContentWrapper";
import PageTitle from "@/views/components/PageTitle";
import PageWrapper from "@/views/components/PageWrapper";
import PressableBox from "@/views/components/PressableBox";
import Spacer from "@/views/components/Spacer";
import {LocationObject} from "expo-location";
import {ReactNode, useEffect, useState} from "react";
import {FlatList, GestureResponderEvent, StyleSheet, Text, View} from "react-native";
import {useSelector} from "react-redux";


interface ICheckInModalContent {
  showCheckInModal: (arg0: boolean) => void
}

interface ISpotOption {
  spotDetails: Spot
}

interface ILocationPickerContent {
  usersLocation: LocationObject
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
function SpotOption({
                      spotDetails
}:ISpotOption): ReactNode {

  const showSpot = () => {
    console.log('show');
  }

  return (
    <PressableBox
      boxDisabled={false}
      onSelectBox={showSpot}
    >
      <Text style={styles.spotNameText}>{spotDetails.spot_name}</Text>
    </PressableBox>
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
    console.log('create new');
  }

  return (
    <PageWrapper>
      <View style={styles.pageWrapper}>
        <View>
          <PageTitle
            title={"Nearby spots"}
          />
          <Spacer />
          <FlatList
            data={spotList}
            renderItem={({item}) => <SpotOption spotDetails={item} />}
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
export default function CheckInModalContent({
                               showCheckInModal
}:ICheckInModalContent): ReactNode {
  const [spotsReady, setSpotsReady] = useState<boolean>(false);
  const [loadingErrorMsg, setLoadingErrorMsg] = useState<string>('');
  const [spotList, setSpotList] = useState<Spot[]|[]>([]);
  const [location, errorMsg, usersLocationLoaded] = useCurrentLocation();
  const activeUser = useSelector((state: ActiveUserStateProp) => state.activeUser.user);

  useEffect(() => {
    async function fetchLocations(): Promise<void> {
      const {
        coords: {
          latitude,
          longitude
        }
      } = location;
      try {
        const closestSpots = await fetchSpotsByLatLng(latitude, longitude, 1, activeUser.id);
        setSpotList(closestSpots);
        setSpotsReady(true);
      } catch (err) {
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
      onTapCloseModal={() => showCheckInModal(false)}
      nameToShow={'Check In'}
    >
      {!spotsReady &&
          <View style={styles.centeredTextWrapper}>
              <Text style={styles.centeredText}>Loading location...</Text>
          </View>
      }
      {spotsReady &&
          <>
            {loadingErrorMsg ? <ErrorGettingLocation errorTypeMessage={loadingErrorMsg}/> : <LocationPickerContent spotList={spotList} usersLocation={location} />}
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
  },
  spotNameText: {
    color: Colors.DARK_GREY,
    fontSize: 18
  }
});
