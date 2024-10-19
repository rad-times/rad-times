import {Colors} from "@/constants/Colors";
import {CHECK_IN} from "@/constants/SocketTypes";
import {setActiveUserIsCheckedIn, setCheckInModalOpen} from "@/state/checkInAndActiveSlice";
import {ActiveUserStateProp} from "@/state/activeUserSlice";
import {Spot} from "@/types/Spot";
import { WebSocketContext } from '@/context/WebSocketContext';
import {createSocketMessage} from "@/utils/createSocketMessage";
import ActionButton from "@/views/components/ActionButton";
import ExpandableBox from "@/views/components/ExpandableBox";
import {ReactNode, useContext} from "react";
import {GestureResponderEvent, StyleSheet, Text, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";

interface ISpotOption {
  spotDetails: Spot
}

/**
 *
 */
export default function CheckInSpotOption({
  spotDetails
}:ISpotOption): ReactNode {

  // @ts-ignore
  const {sendMessage} = useContext(WebSocketContext);
  const activeUser = useSelector((state: ActiveUserStateProp) => state.activeUser.user);

  const dispatch = useDispatch();

  const checkIntoSpot = (e: GestureResponderEvent) => {
    sendMessage(createSocketMessage(CHECK_IN, activeUser.id));
    dispatch(setActiveUserIsCheckedIn(true));
    dispatch(setCheckInModalOpen(false));
  };

  return (
    <ExpandableBox
      boxDisabled={false}
      collapsedContent={<Text style={styles.spotNameText}>{spotDetails.spot_name}</Text>}
      expandedContent={
        <View style={styles.spotDetailsExpanded}>
          <Text style={styles.spotDetailsDescription}>{spotDetails.spot_description}</Text>
          <ActionButton onClickBtn={checkIntoSpot} btnDisplayText={"Check in"} />
        </View>
      }
    >

    </ExpandableBox>
  );
}

const styles = StyleSheet.create({
  spotNameText: {
    color: Colors.DARK_GREY,
    fontSize: 18
  },
  spotDetailsExpanded: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  spotDetailsDescription: {
    paddingBottom: 10,
    fontStyle: 'italic'
  }
});
