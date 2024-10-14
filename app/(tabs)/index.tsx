import {
  IActiveFriendsState,
  setActiveUserIsCheckedIn,
  setNumActiveFriends
} from "@/state/activeFriendsSlice";
import {ActiveUserStateProp} from "@/state/activeUserSlice";
import {DisplayTextStateProp} from "@/state/displayLanguageSlice";
import {createSocketMessage} from "@/utils/createSocketMessage";

import ActionButton from "@/views/components/ActionButton";
import Icon from "@/views/components/Icon";
import Spacer from "@/views/components/Spacer";
import {GestureResponderEvent, StyleSheet, View, Text} from "react-native";
import {Colors} from "@/constants/Colors";
import PageTitle from "@/views/components/PageTitle";
import {ReactNode, useContext, useEffect} from "react";
import PageWrapper from "@/views/components/PageWrapper";
import {useDispatch, useSelector} from "react-redux";
import { WebSocketContext } from '@/context/WebSocketContext';
import {CHECK_IN, CHECK_OUT} from "@/constants/SocketTypes";

export default function Index(): ReactNode {
  const activeUser = useSelector((state: ActiveUserStateProp) => state.activeUser.user);
  const displayText = useSelector((state: DisplayTextStateProp) => state.displayText.displayTextJson);
  const numFriendsActive = useSelector((state: IActiveFriendsState) => state.activeFriends.numFriendsActive);
  const activeUserIsCheckedIn = useSelector((state: IActiveFriendsState) => state.activeFriends.activeUserIsCheckedIn);
  const dispatch = useDispatch();

  // @ts-ignore
  const [subscribe, unsubscribe, sendMessage] = useContext(WebSocketContext);

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
    <PageWrapper>
      <PageTitle
        title={displayText.index.title}
      />
      <Spacer />

      <View style={styles.infoBox}>
        <View style={styles.info}>
          <Text style={styles.infoText}>{displayText.index.friendsActive}</Text>
          <Text style={styles.infoCount}>({numFriendsActive})</Text>
        </View>
        <Icon size={24} name="chevron-forward-circle-outline" color={Colors.DARK_GREY} />
      </View>
      <Spacer />
      <ActionButton onClickBtn={onClickCheckIn} btnDisplayText={activeUserIsCheckedIn ? displayText.index.checkOutBtn : displayText.index.checkInBtn} />
    </PageWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: Colors.BLACK
  },
  infoBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: Colors.LIGHT_GREY,
    borderRadius: 5,
    borderColor: Colors.WHITE,
    borderWidth: 2,
    height: 50
  },
  info: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'flex-start'
  },
  infoText: {
    fontSize: 20
  },
  infoCount: {
    fontSize: 14,
    paddingLeft: 5
  }
});
