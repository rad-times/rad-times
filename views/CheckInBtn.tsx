import {CHECK_IN, CHECK_OUT} from "@/constants/SocketTypes";
import {WebSocketContext} from "@/context/WebSocketContext";
import useCurrentLocation from "@/hooks/useCurrentLocation";
import {IActiveFriendsState, setActiveUserIsCheckedIn, setNumActiveFriends} from "@/state/activeFriendsSlice";
import {ActiveUserStateProp} from "@/state/activeUserSlice";
import {DisplayTextStateProp} from "@/state/displayLanguageSlice";
import {createSocketMessage} from "@/utils/createSocketMessage";
import ActionButton from "@/views/components/ActionButton";
import CommonModalContentWrapper from "@/views/components/CommonModalContentWrapper";
import Spacer from "@/views/components/Spacer";
import {Colors} from '@/constants/Colors';
import {ReactNode, useContext, useEffect, useState} from "react";
import {GestureResponderEvent, StyleSheet, View, Text, Modal} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {LocationObject} from 'expo-location';

interface ICheckInModalContent {
  showCheckInModal: (arg0: boolean) => void
}

interface ILocationPickerContent {
  usersLocation: LocationObject
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
    <View style={styles.locationErrorWrapper}>
      <Text style={styles.locationErrorText}>{"Error accessing location data"}</Text>
      <Text style={styles.locationSubErrorText}>{errorTypeMessage}</Text>
    </View>
  );
}

/**
 *
 */
function LocationPickerContent({
  usersLocation
}: ILocationPickerContent): ReactNode {
  // @ts-ignore
  const [subscribe, unsubscribe, sendMessage] = useContext(WebSocketContext);
  const displayText = useSelector((state: DisplayTextStateProp) => state.displayText.displayTextJson);
  const activeUser = useSelector((state: ActiveUserStateProp) => state.activeUser.user);
  const activeUserIsCheckedIn = useSelector((state: IActiveFriendsState) => state.activeFriends.activeUserIsCheckedIn);
  const numFriendsActive = useSelector((state: IActiveFriendsState) => state.activeFriends.numFriendsActive);

  const dispatch = useDispatch();

  useEffect(() => {
    subscribe(CHECK_IN, () => {
      dispatch(setNumActiveFriends(numFriendsActive + 1));
    });

    subscribe(CHECK_OUT, () => {
      dispatch(setNumActiveFriends(numFriendsActive - 1));
    });

    return () => {
      unsubscribe(CHECK_IN);
      unsubscribe(CHECK_OUT);
    }
  }, [subscribe, unsubscribe, numFriendsActive]);

  const onClickCheckIn = (e: GestureResponderEvent) => {
    if (activeUserIsCheckedIn) {
      sendMessage(createSocketMessage(CHECK_OUT, activeUser.id));
      dispatch(setActiveUserIsCheckedIn(false));
      return;
    }

    sendMessage(createSocketMessage(CHECK_IN, activeUser.id));
    dispatch(setActiveUserIsCheckedIn(true));
  };

  return (
    <>
      <Spacer />
      <Text style={{color: Colors.WHITE}}>Latitude: {usersLocation.coords.latitude}</Text>
      <Text style={{color: Colors.WHITE}}>Longitude: {usersLocation.coords.longitude}</Text>
      <Spacer />
      <ActionButton onClickBtn={onClickCheckIn} btnDisplayText={displayText.index.checkInBtn} />
    </>
  );
}
/**
 *
 */
function CheckInModalContent({
  showCheckInModal
}:ICheckInModalContent): ReactNode {
  const [location, errorMsg, usersLocationLoaded] = useCurrentLocation();

  return (
    <CommonModalContentWrapper
      onTapCloseModal={() => showCheckInModal(false)}
      nameToShow={'Check In'}
    >
      {!usersLocationLoaded &&
        <>
          <Text style={{color: Colors.WHITE}}>Loading location...</Text>
        </>
      }
      {usersLocationLoaded &&
        <>
          {errorMsg ? <ErrorGettingLocation errorTypeMessage={errorMsg}/> : <LocationPickerContent usersLocation={location} />}
        </>
      }
    </CommonModalContentWrapper>
  );
}

/**
 *
 */
export function CheckInBtn({}): ReactNode {
  const activeUserIsCheckedIn = useSelector((state: IActiveFriendsState) => state.activeFriends.activeUserIsCheckedIn);
  const displayText = useSelector((state: DisplayTextStateProp) => state.displayText.displayTextJson);
  const [checkInModalShown, showCheckInModal] = useState(false);

  return (
    <>
      <ActionButton onClickBtn={() => showCheckInModal(true)} btnDisplayText={activeUserIsCheckedIn ? displayText.index.checkOutBtn : displayText.index.checkInBtn} />
      <Modal
        animationType="slide"
        transparent={false}
        visible={checkInModalShown}
      >
        <CheckInModalContent
          showCheckInModal={showCheckInModal}
        />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  locationErrorWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  locationErrorText: {
    color: Colors.WHITE,
    fontSize: 20
  },
  locationSubErrorText: {
    color: Colors.WHITE,
    paddingTop: 10,
    fontSize: 16
  }
});
